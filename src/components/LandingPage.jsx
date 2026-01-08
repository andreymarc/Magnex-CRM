import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiGlobe, FiMenu, FiX } from 'react-icons/fi'
import Logo from './Logo'
import SwipeableCarousel from './SwipeableCarousel'
import IntegrationIcon from './IntegrationIcon'
import ContactForm from './ContactForm'
import { useLanguage } from '../context/LanguageContext'

const translations = {
  en: {
    hero: {
      headline: "The CRM That Actually Works for Your Business",
      subheadline: "Everything you need to manage customers, track sales, and get paid—all in one place. No complicated setup, no confusing features. Just what works."
    },
    problem: {
      title: "Running a Business Is Hard Enough",
      items: [
        {
          title: "Everything's Everywhere",
          description: "Customer info in spreadsheets, notes in emails, tasks in your head. You spend more time looking for things than actually working."
        },
        {
          title: "Invoicing Takes Forever",
          description: "Creating invoices, sending reminders, tracking who paid—it's hours of work every week that could be spent on growing your business."
        },
        {
          title: "Payments Are a Headache",
          description: "Trying to match payments to invoices, figuring out who owes what, and chasing late payments. It's frustrating and error-prone."
        }
      ]
    },
    solution: {
      title: "Everything You Need, All in One Place",
      items: [
        {
          title: "One System for Everything",
          description: "All your contacts, deals, tasks, and conversations in one place. No more switching between tools or losing track of important info."
        },
        {
          title: "Get Paid Faster",
          description: "Accept payments, send invoices, and track what's owed—all from your CRM. Less chasing, more getting paid."
        },
        {
          title: "Invoices That Send Themselves",
          description: "Set it up once, and invoices go out automatically. Track who paid, send reminders, and spend your time on actual work."
        }
      ]
    },
    caseStudy: {
      title: "Real Results from Real Businesses",
      subtitle: "Here's what companies like yours are actually achieving",
      stats: [
        { number: "~70%", label: "Less Time on Admin Tasks" },
        { number: "94%+", label: "Customer Satisfaction" },
        { number: "2.3x", label: "Average Revenue Growth" },
        { number: "~55%", label: "Lower Operating Costs" }
      ],
      testimonials: [
        {
          quote: "I used to spend 3-4 hours every Monday just creating invoices and chasing payments. Now it's all automated - I literally click a button and invoices go out. My accountant loves it too because everything's organized.",
          author: "David Levy",
          role: "Owner",
          company: "Levy Tech Services"
        },
        {
          quote: "We were losing track of leads constantly. The AI scoring thing? Game changer. Now we know which customers to call first, and honestly, we're closing about 30% more deals. My team actually uses it, which says a lot.",
          author: "Sarah Cohen",
          role: "Sales Manager",
          company: "Cohen & Partners"
        },
        {
          quote: "Look, I was skeptical at first - another CRM, right? But the document storage and those automated reminders? I don't miss deadlines anymore. My assistant says it's the best thing we've added this year.",
          author: "Michael Rosen",
          role: "Operations Lead",
          company: "Rosen Consulting"
        }
      ]
    },
    benefits: {
      title: "Why Businesses Choose Us",
      items: [
        "Complete customer relationship management",
        "Seamless payment processing integration",
        "Automated invoice generation and tracking",
        "Real-time sales pipeline visibility",
        "Centralized communication history",
        "Customizable to your business needs",
        "Access from anywhere, anytime",
        "Integrate with your favorite tools"
      ]
    },
    cta: {
      title: "Ready to Give It a Try?",
      subtitle: "Join other businesses who've made the switch. No commitment, no credit card—just see if it works for you.",
      button: "Start Your Free Trial",
      secondaryButton: "Start Free Trial",
      freeTrial: "First Month Free - No Credit Card Required"
    },
    ai: {
      title: "Smart AI That Actually Helps",
      subtitle: "AI that works behind the scenes to make your job easier",
      headline: "AI That Helps You Close More Deals",
      items: [
        {
          title: "Intelligent Lead Scoring",
          description: "The system looks at your leads and tells you which ones are most likely to buy. Focus on what matters instead of guessing."
        },
        {
          title: "Predictive Sales Forecasting",
          description: "Get a realistic picture of what you'll actually sell this month. Based on your actual data, not wishful thinking."
        },
        {
          title: "Smart Email Automation",
          description: "Get suggestions for what to write, auto-respond to common questions, and never forget to follow up. It learns how you communicate."
        },
        {
          title: "Sentiment Analysis",
          description: "Know when a customer is frustrated before they tell you. Spot problems early and fix them before they become bigger issues."
        },
        {
          title: "AI Assistant Chatbot",
          description: "Ask questions, get answers, generate reports—all without waiting. Your team can find what they need, when they need it."
        },
        {
          title: "Automated Data Entry",
          description: "Stop copying info from emails and documents. The system pulls it out automatically and puts it where it belongs."
        },
        {
          title: "Deal Probability Prediction",
          description: "See which deals are likely to close and which ones need attention. Spend your time where it'll actually make a difference."
        },
        {
          title: "Smart Workflow Suggestions",
          description: "The system watches how you work and suggests ways to do things faster. Small improvements that add up to big time savings."
        }
      ]
    },
    pricing: {
      title: "Packages and Pricing",
      subtitle: "Find the perfect plan for your organization",
      trial: "14-day trial | No credit card required",
      monthly: "Monthly License",
      annual: "Annual License",
      save: "Save 20%",
      plans: [
        {
          name: "Basic",
          icon: "star",
          price: 79,
          description: "Centralize organizational data and manage basic sales and customer management processes",
          features: [
            "Lead management",
            "Automated intake forms",
            "Campaign data centralization and control",
            "Task and alert management",
            "Event calendar management",
            "Customer management",
            "Cloud document management",
            "Project management",
            "Service call management",
            "Dashboards and reports",
            "Email inbox connection",
            "Reports and charts",
            "Mobile-optimized application"
          ]
        },
        {
          name: "Advanced",
          icon: "diamond",
          price: 249,
          description: "Take your organization a step forward with advanced automations and tools",
          features: [
            "All features from Basic package",
            "Automated workflows",
            "Scheduling automations",
            "Building online forms",
            "Designed price quotes",
            "Virtual PBX",
            "Digital signature",
            "Integrated WhatsApp Web",
            "Mailing system",
            "Adding relationships between modules",
            "Automated lead collection from calls",
            "Automated lead collection from WhatsApp",
            "WhatsApp API connection option"
          ]
        },
        {
          name: "Premium",
          icon: "crown",
          price: 289,
          description: "Build a dream system with full customization for managing all organizational processes",
          features: [
            "All features from all packages",
            "Accounting management interface",
            "Building new models",
            "External calendar synchronization",
            "Custom key metrics",
            "Work timer",
            "Inventory and supplier management",
            "Calculation and formula fields",
            "Sending data via Webhook",
            "Automated document collection",
            "Two-way OneDrive connection",
            "Organizational security settings",
            "Advanced AI capabilities - coming soon"
          ]
        }
      ]
    },
    integrations: {
      title: "System Integrations",
      subtitle: "Connect with the tools you already use",
      items: [
        {
          name: "REST API",
          description: "REST API",
          icon: "api"
        },
        {
          name: "MailChimp",
          description: "Email Marketing",
          icon: "mailchimp"
        },
        {
          name: "Zapier",
          description: "Automation Platform",
          icon: "zapier"
        },
        {
          name: "OneDrive",
          description: "Cloud Storage",
          icon: "onedrive"
        },
        {
          name: "Gmail/Outlook",
          description: "Calendar Connection",
          icon: "email"
        },
        {
          name: "Google",
          description: "One-click connection to Google",
          icon: "google"
        },
        {
          name: "Facebook",
          description: "One-click connection to Facebook",
          icon: "facebook"
        },
        {
          name: "WordPress",
          description: "Website Integration",
          icon: "wordpress"
        }
      ]
    },
    features: {
      title: "All the Features You Actually Need",
      subtitle: "Tools that help you stay organized and close more deals",
      items: [
        {
          title: "Contact Management",
          description: "Keep all your customers, leads, and contacts in one place. See who you talked to, when, and what about—no more digging through emails."
        },
        {
          title: "Sales Pipeline",
          description: "See exactly where each deal stands at a glance. Move deals through stages, set reminders, and never lose track of what's next."
        },
        {
          title: "Email Integration",
          description: "Your emails sync automatically. Reply from the CRM, see the full conversation history, and know when someone opens your email."
        },
        {
          title: "Task & Activity Management",
          description: "Get reminders for follow-ups, assign tasks to your team, and see everything that needs to happen today. No more dropped balls."
        },
        {
          title: "Document Management",
          description: "Store contracts, proposals, and files right where you need them. Share with your team, control who sees what, and keep everything organized."
        },
        {
          title: "Analytics & Reports",
          description: "See how your business is really doing with easy-to-read dashboards. Know your numbers without spending hours in spreadsheets."
        },
        {
          title: "Workflow Automation",
          description: "Set up rules once, and the system handles the rest. Auto-assign tasks, send follow-ups, and trigger actions based on what happens."
        },
        {
          title: "Mobile App",
          description: "Check your CRM from anywhere. Update deals, add notes, and see what's happening—all from your phone."
        },
        {
          title: "Team Collaboration",
          description: "Everyone sees the same information. Assign tasks, share notes, and work together without constant meetings and emails."
        },
        {
          title: "Custom Fields & Forms",
          description: "Make it work for your business. Add the fields you need, create forms that capture what matters, and organize data your way."
        },
        {
          title: "Integrations",
          description: "Works with the tools you already use. Connect to Slack, Google, Microsoft, and hundreds of other apps you rely on."
        },
        {
          title: "Security & Privacy",
          description: "Your data is encrypted and secure. Control who sees what, meet compliance requirements, and sleep well knowing it's protected."
        }
      ]
    },
    nav: {
      language: "עברית"
    }
  },
  he: {
    hero: {
      headline: "ה-CRM שבאמת עובד לעסק שלכם",
      subheadline: "כל מה שאתם צריכים לניהול לקוחות, מעקב מכירות וגביית תשלומים—הכל במקום אחד. בלי הגדרות מסובכות, בלי תכונות מבלבלות. פשוט מה שעובד."
    },
    problem: {
      title: "ניהול עסק זה כבר מספיק קשה",
      items: [
        {
          title: "הכל מפוזר",
          description: "מידע על לקוחות בגיליונות, הערות באימיילים, משימות בראש. אתם מבלים יותר זמן בחיפוש אחר דברים מאשר בעבודה עצמה."
        },
        {
          title: "יצירת חשבוניות לוקחת נצח",
          description: "יצירת חשבוניות, שליחת תזכורות, מעקב אחר מי שילם—זה שעות של עבודה כל שבוע שיכולות להיות מושקעות בצמיחה של העסק."
        },
        {
          title: "תשלומים זה כאב ראש",
          description: "ניסיון להתאים תשלומים לחשבוניות, להבין מי חייב מה, ולרדוף אחר תשלומים מאוחרים. זה מתסכל ומועד לשגיאות."
        }
      ]
    },
    solution: {
      title: "כל מה שאתם צריכים, במקום אחד",
      items: [
        {
          title: "מערכת אחת להכל",
          description: "כל אנשי הקשר, העסקאות, המשימות והשיחות שלכם במקום אחד. בלי לעבור בין כלים או לאבד מעקב אחר מידע חשוב."
        },
        {
          title: "קבלו תשלומים מהר יותר",
          description: "קבלו תשלומים, שלחו חשבוניות, ותעקבו אחר מה שחייבים—הכל מה-CRM שלכם. פחות רדיפה, יותר קבלת תשלומים."
        },
        {
          title: "חשבוניות שנשלחות לבד",
          description: "הגדירו פעם אחת, והחשבוניות נשלחות אוטומטית. עקבו אחר מי שילם, שלחו תזכורות, והשקיעו את הזמן שלכם בעבודה אמיתית."
        }
      ]
    },
    caseStudy: {
      title: "תוצאות אמיתיות מעסקים אמיתיים",
      subtitle: "זה מה שחברות כמו שלכם באמת משיגות",
      stats: [
        { number: "~70%", label: "פחות זמן על משימות אדמיניסטרטיביות" },
        { number: "94%+", label: "שביעות רצון לקוחות" },
        { number: "2.3x", label: "גידול ממוצע בהכנסות" },
        { number: "~55%", label: "עלויות תפעול נמוכות יותר" }
      ],
      testimonials: [
        {
          quote: "הייתי מבלה 3-4 שעות כל יום שני רק ביצירת חשבוניות ומעקב אחר תשלומים. עכשיו הכל אוטומטי - פשוט לוחץ על כפתור והחשבוניות נשלחות. גם רואה החשבון שלי אוהב את זה כי הכל מאורגן.",
          author: "דוד לוי",
          role: "בעלים",
          company: "לוי פתרונות טכנולוגיה"
        },
        {
          quote: "איבדנו לידים כל הזמן. הדירוג האוטומטי של AI? משנה משחק. עכשיו אנחנו יודעים איזה לקוחות להתקשר אליהם קודם, ובכנות, אנחנו סוגרים בערך 30% יותר עסקאות. הצוות שלי באמת משתמש בזה, וזה אומר הרבה.",
          author: "שרה כהן",
          role: "מנהלת מכירות",
          company: "כהן ושותפים"
        },
        {
          quote: "תראו, הייתי סקפטי בהתחלה - עוד CRM, נכון? אבל אחסון המסמכים והתזכורות האוטומטיות? אני כבר לא מפספס דדליינים. העוזרת שלי אומרת שזה הדבר הכי טוב שהוספנו השנה.",
          author: "מיכאל רוזן",
          role: "ראש פעילות",
          company: "ייעוץ רוזן"
        }
      ]
    },
    benefits: {
      title: "למה עסקים בוחרים בנו",
      items: [
        "ניהול קשרי לקוחות מלא",
        "אינטגרציה חלקה לעיבוד תשלומים",
        "יצירת ומעקב חשבוניות אוטומטי",
        "נראות צינור מכירות בזמן אמת",
        "היסטוריית תקשורת מרכזית",
        "התאמה אישית לצרכים העסקיים שלכם",
        "גישה מכל מקום, בכל עת",
        "אינטגרציה עם הכלים האהובים עליכם"
      ]
    },
    cta: {
      title: "מוכנים לנסות?",
      subtitle: "הצטרפו לעסקים אחרים שעשו את המעבר. בלי התחייבות, בלי כרטיס אשראי—פשוט תראו אם זה עובד בשבילכם.",
      button: "התחילו ניסיון חינם",
      secondaryButton: "התחילו ניסיון חינם",
      freeTrial: "חודש ראשון חינם - ללא צורך בכרטיס אשראי"
    },
    pricing: {
      title: "חבילות ותמחורים",
      subtitle: "מצאו את התוכנית המושלמת עבור הארגון שלכם",
      trial: "14 יום ניסיון | ללא צורך בכרטיס אשראי",
      monthly: "רישיון חודשי",
      annual: "רישיון שנתי",
      save: "חיסכו 20%",
      plans: [
        {
          name: "בסיסי",
          icon: "star",
          price: 79,
          description: "לרכז את המידע בארגון ולנהל תהליכים בסייסים של מכירה וניהול לקוחות",
          features: [
            "ניהול מתעניינים",
            "טפסי קליטה אוטומטים",
            "ריכוז ובקרת נתוני קמפיינים",
            "ניהול משימות והתראות",
            "ניהול יומן אירועים",
            "ניהול לקוחות",
            "ניהול מסמכים בענן",
            "ניהול פרויקטים",
            "ניהול קריאות שירות",
            "לוחות בקרה ודוחות",
            "חיבור תיבת אימייל",
            "דוחות ותרשימים",
            "אפלקציה מותאמת לנייד"
          ]
        },
        {
          name: "מתקדם",
          icon: "diamond",
          price: 249,
          description: "לקחת את הארגון צעד קדימה באמצעות אוטומציות וכלים מתקדמים",
          features: [
            "כל מה שיש בחבילת בסיס",
            "תהליכי עבודה אוטומטיים",
            "אוטומציות תזמון",
            "בניית טפסים אינטרנטיים",
            "הצעת מחיר מעוצבת",
            "מרכזיה וירטואלית",
            "חתימה דיגיטלית",
            "WhatsApp Web מובנה",
            "מערכת דיוור",
            "הוספת הקשרים בין מודולים",
            "איסוף לידים אוטומטי משיחות",
            "איסוף לידים אוטומטי מ WA",
            "אפשרות חיבור WhatsApp API"
          ]
        },
        {
          name: "פרימיום",
          icon: "crown",
          price: 289,
          description: "לבנות מערכת חלומית בהתאמה אישית מלאה לניהול כל התהליכים בארגון",
          features: [
            "כל מה שיש בכל החבילות",
            "ממשק להנהלת חשבונות",
            "בניית מודלים חדשים",
            "סנכרון יומנים חיצוני",
            "מדדי מפתח מותאמים",
            "טיימר עבודה",
            "ניהול מלאי וספקים",
            "שדות חישוב ונוסחה",
            "שליחת נתונים ב Webhook",
            "איסוף מסמכים אוטומטי",
            "חיבור דו-כיווני ל-OneDrive",
            "הגדרות אבטחה ארגוניות",
            "יכולות AI מתקדמות - בקרוב"
          ]
        }
      ]
    },
    ai: {
      title: "AI חכם שבאמת עוזר",
      subtitle: "AI שעובד ברקע כדי להקל על העבודה שלכם",
      headline: "AI שעוזר לכם לסגור יותר עסקאות",
      items: [
        {
          title: "ציון לידים חכם",
          description: "המערכת בודקת את הלידים שלכם ואומרת לכם אילו הכי סביר שיקנו. התמקדו במה שחשוב במקום לנחש."
        },
        {
          title: "תחזית מכירות חיזויית",
          description: "קבלו תמונה ריאלית של מה שאתם באמת תמכרו החודש. מבוסס על הנתונים האמיתיים שלכם, לא על משאלות."
        },
        {
          title: "אוטומציה חכמה לאימייל",
          description: "קבלו הצעות למה לכתוב, ענו אוטומטית לשאלות נפוצות, ולעולם אל תשכחו מעקב. זה לומד איך אתם מתקשרים."
        },
        {
          title: "ניתוח סנטימנט",
          description: "דעו מתי לקוח מתוסכל לפני שהם אומרים לכם. זיהו בעיות מוקדם ותקנו אותן לפני שהן הופכות לגדולות יותר."
        },
        {
          title: "צ'אטבוט עוזר AI",
          description: "שאלו שאלות, קבלו תשובות, צרו דוחות—הכל בלי לחכות. הצוות שלכם יכול למצוא מה שצריך, מתי שצריך."
        },
        {
          title: "הזנת נתונים אוטומטית",
          description: "תפסיקו להעתיק מידע מאימיילים ומסמכים. המערכת מוציאה את זה אוטומטית ומכניסה את זה איפה שצריך."
        },
        {
          title: "חיזוי הסתברות עסקה",
          description: "ראו אילו עסקאות סביר שיסגרו ואילו צריכות תשומת לב. השקיעו את הזמן שלכם איפה שזה באמת יעשה הבדל."
        },
        {
          title: "הצעות תהליכי עבודה חכמים",
          description: "המערכת צופה איך אתם עובדים ומציעה דרכים לעשות דברים מהר יותר. שיפורים קטנים שמוסיפים לחיסכון זמן גדול."
        }
      ]
    },
    integrations: {
      title: "אינטגרציות למערכות",
      subtitle: "התחברו לכלים שאתם כבר משתמשים בהם",
      items: [
        {
          name: "REST API",
          description: "REST API",
          icon: "api"
        },
        {
          name: "MailChimp",
          description: "שיווק באימייל",
          icon: "mailchimp"
        },
        {
          name: "Zapier",
          description: "פלטפורמת אוטומציה",
          icon: "zapier"
        },
        {
          name: "OneDrive",
          description: "אחסון בענן",
          icon: "onedrive"
        },
        {
          name: "Gmail/Outlook",
          description: "חיבור ליומן",
          icon: "email"
        },
        {
          name: "Google",
          description: "חיבור בקליק לגוגל",
          icon: "google"
        },
        {
          name: "Facebook",
          description: "חיבור בקליק לפייסבוק",
          icon: "facebook"
        },
        {
          name: "WordPress",
          description: "אינטגרציה לאתר",
          icon: "wordpress"
        }
      ]
    },
    features: {
      title: "כל התכונות שאתם באמת צריכים",
      subtitle: "כלים שעוזרים לכם להישאר מאורגנים ולסגור יותר עסקאות",
      items: [
        {
          title: "ניהול אנשי קשר",
          description: "שמרו את כל הלקוחות, הלידים ואנשי הקשר שלכם במקום אחד. ראו עם מי דיברתם, מתי, ועל מה—בלי לחפש באימיילים."
        },
        {
          title: "צינור מכירות",
          description: "ראו בדיוק איפה כל עסקה עומדת במבט אחד. העבירו עסקאות בין שלבים, הגדירו תזכורות, ולעולם אל תאבדו מעקב על מה הבא."
        },
        {
          title: "אינטגרציה לאימייל",
          description: "האימיילים שלכם מסתנכרנים אוטומטית. ענו מה-CRM, ראו את כל היסטוריית השיחה, ודעו מתי מישהו פתח את האימייל שלכם."
        },
        {
          title: "ניהול משימות ופעילויות",
          description: "קבלו תזכורות למעקבים, הקצו משימות לצוות שלכם, וראו כל מה שצריך לקרות היום. בלי דברים שנשכחים."
        },
        {
          title: "ניהול מסמכים",
          description: "שמרו חוזים, הצעות וקבצים בדיוק איפה שצריך. שתפו עם הצוות, שליטו מי רואה מה, ושמרו הכל מאורגן."
        },
        {
          title: "אנליטיקה ודוחות",
          description: "ראו איך העסק שלכם באמת מתנהל עם לוחות בקרה קלים לקריאה. הכירו את המספרים בלי לבלות שעות בגיליונות אלקטרוניים."
        },
        {
          title: "אוטומציה של תהליכי עבודה",
          description: "הגדירו כללים פעם אחת, והמערכת מטפלת בשאר. הקצאה אוטומטית של משימות, שליחת מעקבים, והפעלת פעולות לפי מה שקורה."
        },
        {
          title: "אפליקציה לנייד",
          description: "בדקו את ה-CRM שלכם מכל מקום. עדכנו עסקאות, הוסיפו הערות, וראו מה קורה—הכל מהטלפון."
        },
        {
          title: "שיתוף פעולה בצוות",
          description: "כולם רואים את אותה מידע. הקצו משימות, שתפו הערות, ועבדו יחד בלי פגישות ואימיילים מתמידים."
        },
        {
          title: "שדות וטפסים מותאמים",
          description: "עשו את זה עובד לעסק שלכם. הוסיפו את השדות שאתם צריכים, צרו טפסים שלוכדים מה שחשוב, וארגנו נתונים בדרך שלכם."
        },
        {
          title: "אינטגרציות",
          description: "עובד עם הכלים שאתם כבר משתמשים בהם. התחברו ל-Slack, Google, Microsoft, ומאות אפליקציות אחרות שאתם מסתמכים עליהן."
        },
        {
          title: "אבטחה ופרטיות",
          description: "הנתונים שלכם מוצפנים ומאובטחים. שליטו מי רואה מה, עמדו בדרישות תאימות, וישנו טוב בידיעה שזה מוגן."
        }
      ]
    },
    nav: {
      language: "English"
    }
  }
}

export default function LandingPage() {
  const { language, changeLanguage, isRTL } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const languageMenuRef = useRef(null)

  const t = translations[language]

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setShowLanguageMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-white antialiased">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 py-4 px-4 sm:px-6 lg:px-8 transition-all duration-300">
        <div className={`mx-auto transition-all duration-300 ${
          isScrolled ? 'max-w-2xl' : 'max-w-7xl'
        }`}>
          <div className={`bg-purple-dark rounded-full shadow-xl transition-all duration-300 ${
            isScrolled ? 'px-4 py-3' : 'px-6 py-4'
          }`}>
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Logo 
                size={isScrolled ? 'small' : 'default'}
                className="transition-all duration-300"
              />

              {/* Navigation Links - Hidden when scrolled */}
              <div className={`hidden md:flex items-center space-x-6 rtl:space-x-reverse transition-all duration-300 ${
                isScrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
              }`}>
                <button className="text-white/90 hover:text-white font-medium text-sm transition-colors flex items-center space-x-1 rtl:space-x-reverse">
                  <span>Solutions</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button className="text-white/90 hover:text-white font-medium text-sm transition-colors">
                  Company
                </button>
                <button className="text-white/90 hover:text-white font-medium text-sm transition-colors flex items-center space-x-1 rtl:space-x-reverse">
                  <span>Resources</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <Link
                  to="/pricing"
                  className="text-white/90 hover:text-white font-medium text-sm transition-colors"
                >
                  {language === 'en' ? 'Pricing' : 'מחירון'}
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                {/* Dashboard Link - Hidden when scrolled */}
                <Link
                  to="/dashboard"
                  className={`text-white/90 hover:text-white font-medium text-sm transition-all duration-300 hidden sm:block ${
                    isScrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                  }`}
                >
                  {language === 'en' ? 'Login' : 'כניסה למערכת'}
                </Link>
                
                {/* Language Selector - Hidden when scrolled */}
                <div className={`relative transition-all duration-300 ${
                  isScrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                }`} ref={languageMenuRef}>
                  <button
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    className="text-white/90 hover:text-white transition-colors flex items-center space-x-1 rtl:space-x-reverse p-2"
                    title="Select Language"
                  >
                    <FiGlobe className="w-5 h-5" />
                  </button>
                  
                  {showLanguageMenu && (
                    <div className="absolute right-0 rtl:left-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                      <button
                        onClick={() => {
                          changeLanguage('en')
                          setShowLanguageMenu(false)
                        }}
                        className={`w-full text-left rtl:text-right px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${
                          language === 'en' ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-700'
                        }`}
                      >
                        <span>English</span>
                        {language === 'en' && (
                          <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          changeLanguage('he')
                          setShowLanguageMenu(false)
                        }}
                        className={`w-full text-left rtl:text-right px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${
                          language === 'he' ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-700'
                        }`}
                      >
                        <span>עברית</span>
                        {language === 'he' && (
                          <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden text-white/90 hover:text-white transition-colors p-2"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                </button>

                {/* Book a Demo Button - Always visible */}
                <Link
                  to="/register"
                  className={`bg-primary-500 hover:bg-primary-600 text-white rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 hidden sm:block ${
                    isScrolled ? 'px-4 py-1.5 text-xs' : 'px-6 py-2.5 text-sm'
                  }`}
                >
                  {language === 'en' ? 'Book a Demo' : 'התחילו עוד היום'}
                </Link>
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && !isScrolled && (
              <div className="md:hidden mt-4 pt-4 border-t border-white/20">
                <div className="flex flex-col space-y-3">
                  <button className="text-white/90 hover:text-white font-medium text-sm text-left rtl:text-right py-2">
                    Solutions
                  </button>
                  <button className="text-white/90 hover:text-white font-medium text-sm text-left rtl:text-right py-2">
                    Company
                  </button>
                  <button className="text-white/90 hover:text-white font-medium text-sm text-left rtl:text-right py-2">
                    Resources
                  </button>
                  <Link
                    to="/pricing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white/90 hover:text-white font-medium text-sm text-left rtl:text-right py-2"
                  >
                    {language === 'en' ? 'Pricing' : 'מחירון'}
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white/90 hover:text-white font-medium text-sm text-left rtl:text-right py-2"
                  >
                    {language === 'en' ? 'Login' : 'כניסה למערכת'}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-primary-500 hover:bg-primary-600 text-white rounded-full font-semibold text-sm py-2.5 mt-2 inline-block text-center"
                  >
                    {language === 'en' ? 'Book a Demo' : 'התחילו עוד היום'}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Free Trial Banner */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm sm:text-base font-semibold glowing-text">
            {t.cta.freeTrial}
          </p>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gradient-start via-primary-500 to-gradient-end bg-clip-text text-transparent">
                {t.hero.headline}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              {t.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="group relative bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-0.5 inline-block"
              >
                {t.cta.button}
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {t.problem.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.problem.items.map((item, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border border-red-100 hover:border-red-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-100 rounded-bl-full opacity-50"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-dark via-purple-darker to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              {t.ai.headline}
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {t.ai.subtitle}
            </p>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {t.ai.items.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-80 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 snap-start">
                <div className="w-12 h-12 bg-gradient-to-br from-gradient-start to-gradient-end rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {t.solution.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.solution.items.map((item, index) => (
              <div key={index} className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-200 hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 rounded-t-2xl"></div>
                <div className="mt-2">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {t.features.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.items.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              {t.caseStudy.title}
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              {t.caseStudy.subtitle}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {t.caseStudy.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-200 text-sm sm:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials Carousel */}
          <div className="grid md:grid-cols-3 gap-6">
            {t.caseStudy.testimonials.map((testimonial, index) => {
              // Generate avatar URL using UI Avatars (free service)
              const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author)}&size=128&background=ffffff&color=6366f1&bold=true&font-size=0.5`
              
              return (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-start mb-4">
                    <svg className="w-6 h-6 text-primary-200 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                    <p className="text-base sm:text-lg italic text-white leading-relaxed flex-1 ml-2 rtl:mr-2 rtl:ml-0">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-center mt-6 pt-6 border-t border-white/20">
                    <img 
                      src={avatarUrl}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full border-2 border-white/30 flex-shrink-0"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(testimonial.author)}`
                      }}
                    />
                    <div className="ml-4 rtl:mr-4 rtl:ml-0">
                      <p className="text-white font-semibold text-sm sm:text-base">
                        {testimonial.author}
                      </p>
                      <p className="text-primary-200 text-xs sm:text-sm">
                        {testimonial.role}
                      </p>
                      <p className="text-primary-300 text-xs mt-1">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {t.benefits.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.benefits.items.map((benefit, index) => (
              <div key={index} className="group flex items-start space-x-4 rtl:space-x-reverse p-6 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-lg">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mt-1 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 flex-1 font-medium leading-relaxed">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {t.integrations.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.integrations.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.integrations.items.map((integration, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <IntegrationIcon icon={integration.icon} className="w-10 h-10" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {integration.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-primary-700/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-6">
            <span className="inline-block bg-green-500 text-white px-6 py-2 rounded-full text-lg font-bold mb-4 shadow-lg glowing-text-white">
              {t.cta.freeTrial}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            {t.cta.title}
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="group relative bg-white text-gray-900 px-10 py-5 rounded-xl text-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:-translate-y-1 inline-block"
            >
              {t.cta.button}
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactForm language={language} />

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="opacity-80">
              <Logo size="default" variant="light" />
            </div>
          </div>
          <p className="text-sm">
            {language === 'en' 
              ? '© 2026 Magnex CRM. All rights reserved.'
              : '© 2026 מגנקס CRM. כל הזכויות שמורות.'}
          </p>
        </div>
      </footer>
    </div>
  )
}
