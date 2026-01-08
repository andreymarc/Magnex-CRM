const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: `Webhook Error: ${err.message}` })
    };
  }

  const { type, data } = stripeEvent;

  try {
    switch (type) {
      case 'checkout.session.completed':
        await handleCheckoutComplete(data.object);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdate(data.object);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(data.object);
        break;
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(data.object);
        break;
      case 'invoice.payment_failed':
        await handlePaymentFailed(data.object);
        break;
      default:
        console.log(`Unhandled event type: ${type}`);
    }

    // Log the event
    await logSubscriptionEvent(stripeEvent);

  } catch (error) {
    console.error('Webhook handler error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Webhook handler failed' })
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ received: true })
  };
};

async function handleCheckoutComplete(session) {
  const userId = session.metadata?.supabase_user_id;
  if (!userId) {
    console.error('No user ID in checkout session metadata');
    return;
  }

  // The subscription webhook will handle the actual subscription update
  console.log('Checkout completed for user:', userId);
}

async function handleSubscriptionUpdate(subscription) {
  const userId = subscription.metadata?.supabase_user_id;

  if (!userId) {
    // Try to find user by customer ID
    const customerId = subscription.customer;
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('stripe_customer_id', customerId)
      .single();

    if (!profile) {
      console.error('Could not find user for subscription:', subscription.id);
      return;
    }

    await updateUserSubscription(profile.id, subscription);
  } else {
    await updateUserSubscription(userId, subscription);
  }
}

async function updateUserSubscription(userId, subscription) {
  const billingCycle = subscription.metadata?.billing_cycle ||
    (subscription.items.data[0]?.price.recurring?.interval === 'year' ? 'annual' : 'monthly');

  const updateData = {
    stripe_subscription_id: subscription.id,
    subscription_status: subscription.status,
    subscription_price_id: subscription.items.data[0]?.price.id,
    subscription_current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    subscription_cancel_at_period_end: subscription.cancel_at_period_end,
    billing_cycle: billingCycle,
    // Set plan to 'pro' if subscription is active
    plan: subscription.status === 'active' ? 'pro' : 'free'
  };

  const { error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', userId);

  if (error) {
    console.error('Error updating user subscription:', error);
    throw error;
  }

  console.log('Updated subscription for user:', userId, 'Status:', subscription.status);
}

async function handleSubscriptionDeleted(subscription) {
  const userId = subscription.metadata?.supabase_user_id;

  let targetUserId = userId;

  if (!targetUserId) {
    const customerId = subscription.customer;
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('stripe_customer_id', customerId)
      .single();

    if (profile) {
      targetUserId = profile.id;
    }
  }

  if (!targetUserId) {
    console.error('Could not find user for deleted subscription:', subscription.id);
    return;
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      subscription_status: 'canceled',
      plan: 'free',
      subscription_cancel_at_period_end: false
    })
    .eq('id', targetUserId);

  if (error) {
    console.error('Error handling subscription deletion:', error);
    throw error;
  }

  console.log('Subscription deleted for user:', targetUserId);
}

async function handlePaymentSucceeded(invoice) {
  console.log('Payment succeeded for invoice:', invoice.id);
  // The subscription update webhook handles the plan status
}

async function handlePaymentFailed(invoice) {
  console.log('Payment failed for invoice:', invoice.id);
  // Stripe will automatically retry and eventually update subscription status
}

async function logSubscriptionEvent(stripeEvent) {
  try {
    const userId = stripeEvent.data.object?.metadata?.supabase_user_id;

    await supabase
      .from('subscription_events')
      .insert({
        user_id: userId || null,
        event_type: stripeEvent.type,
        stripe_event_id: stripeEvent.id,
        data: stripeEvent.data.object
      });
  } catch (error) {
    console.error('Error logging subscription event:', error);
    // Don't throw - logging failure shouldn't break the webhook
  }
}
