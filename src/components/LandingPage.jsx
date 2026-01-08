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
      headline: "Tailor-Made CRM for Modern Businesses",
      subheadline: "A complete CRM solution with payment integration and automated invoice generation. All the features you need, customized for your business."
    },
    problem: {
      title: "The Challenge with Traditional Business Management",
      items: [
        {
          title: "Disconnected Systems",
          description: "Customer data scattered across spreadsheets, emails, and different tools, making it impossible to get a complete view."
        },
        {
          title: "Manual Invoice Creation",
          description: "Time-consuming invoice generation, payment tracking, and follow-ups that take away from growing your business."
        },
        {
          title: "Payment Processing Complexity",
          description: "Managing payments separately from customer relationships leads to errors, delays, and missed opportunities."
        }
      ]
    },
    solution: {
      title: "Your Complete Business CRM Solution",
      items: [
        {
          title: "Full-Featured CRM",
          description: "All modern CRM capabilities including contact management, sales pipeline, task tracking, and communication history in one place."
        },
        {
          title: "Payment Integration",
          description: "Seamlessly connect with payment processors to accept payments, track transactions, and manage subscriptions directly from your CRM."
        },
        {
          title: "Automated Invoice Generation",
          description: "Generate professional invoices automatically, send them to clients, track payment status, and manage your billing effortlessly."
        }
      ]
    },
    caseStudy: {
      title: "Proven Results",
      subtitle: "See how businesses are transforming their operations",
      stats: [
        { number: "75%", label: "Time Saved" },
        { number: "98%", label: "Customer Satisfaction" },
        { number: "2.5x", label: "Revenue Growth" },
        { number: "60%", label: "Cost Reduction" }
      ],
      testimonials: [
        {
          quote: "This CRM has transformed how we manage our business. The payment integration and automated invoicing alone have saved us countless hours every week.",
          author: "David Levy",
          role: "Business Owner",
          company: "Tech Solutions Ltd"
        },
        {
          quote: "The AI-powered features help us prioritize leads and close deals faster. Our sales team productivity increased by 40% in just two months.",
          author: "Sarah Cohen",
          role: "Sales Director",
          company: "Growth Partners"
        },
        {
          quote: "Best investment we've made. The automated workflows and document management save us hours every day. Highly recommend!",
          author: "Michael Rosen",
          role: "Operations Manager",
          company: "Innovate Corp"
        }
      ]
    },
    benefits: {
      title: "Why Choose Our Platform",
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
      title: "Ready to Transform Your Business Operations?",
      subtitle: "Join hundreds of businesses already using our tailor-made CRM solution",
      button: "Get Started Today",
      secondaryButton: "Start Today",
      freeTrial: "First Month Free - No Credit Card Required"
    },
    ai: {
      title: "AI-Powered Intelligence",
      subtitle: "Let artificial intelligence transform your CRM into a smart business assistant",
      headline: "AI That Helps You Close More Profitable Deals",
      items: [
        {
          title: "Intelligent Lead Scoring",
          description: "AI automatically ranks leads based on their likelihood to convert, helping you focus on the most promising opportunities."
        },
        {
          title: "Predictive Sales Forecasting",
          description: "Get accurate sales predictions using AI analysis of historical data, trends, and customer behavior patterns."
        },
        {
          title: "Smart Email Automation",
          description: "AI-powered email suggestions, auto-responses, and follow-up reminders that adapt to your communication style."
        },
        {
          title: "Sentiment Analysis",
          description: "Understand customer emotions from emails and conversations to identify at-risk accounts and improve satisfaction."
        },
        {
          title: "AI Assistant Chatbot",
          description: "24/7 AI assistant that answers questions, generates reports, and helps your team find information instantly."
        },
        {
          title: "Automated Data Entry",
          description: "AI automatically extracts and organizes information from emails, calls, and documents, saving hours of manual work."
        },
        {
          title: "Deal Probability Prediction",
          description: "AI calculates the probability of closing each deal, helping you prioritize and allocate resources effectively."
        },
        {
          title: "Smart Workflow Suggestions",
          description: "AI analyzes your processes and suggests optimizations to improve efficiency and reduce bottlenecks."
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
      title: "Enterprise-Grade Features",
      subtitle: "Everything you need to manage your business relationships",
      items: [
        {
          title: "Contact Management",
          description: "Centralized database of all your contacts, customers, and leads with detailed profiles and interaction history."
        },
        {
          title: "Sales Pipeline",
          description: "Visual sales pipeline to track deals from lead to close with customizable stages and automation."
        },
        {
          title: "Email Integration",
          description: "Connect your email accounts to sync conversations, send emails directly from CRM, and track engagement."
        },
        {
          title: "Task & Activity Management",
          description: "Never miss a follow-up with automated reminders, task assignments, and activity tracking."
        },
        {
          title: "Document Management",
          description: "Store, organize, and share documents, contracts, and files with version control and access permissions."
        },
        {
          title: "Advanced Analytics",
          description: "Real-time dashboards, custom reports, and insights to make data-driven business decisions."
        },
        {
          title: "Workflow Automation",
          description: "Automate repetitive tasks, create custom workflows, and trigger actions based on conditions."
        },
        {
          title: "Mobile App",
          description: "Access your CRM on the go with native mobile apps for iOS and Android."
        },
        {
          title: "Team Collaboration",
          description: "Share information, assign tasks, and collaborate seamlessly with your team in real-time."
        },
        {
          title: "Custom Fields & Forms",
          description: "Customize your CRM with custom fields, forms, and data structures tailored to your business."
        },
        {
          title: "API & Integrations",
          description: "Connect with 1000+ apps including Slack, Google Workspace, Microsoft 365, and more."
        },
        {
          title: "Security & Compliance",
          description: "Enterprise-grade security with data encryption, role-based access, and GDPR compliance."
        }
      ]
    },
    nav: {
      language: "עברית"
    }
  },
  he: {
    hero: {
      headline: "CRM מותאם אישית לעסקים מודרניים",
      subheadline: "פתרון CRM מלא עם אינטגרציה לתשלומים ויצירת חשבוניות אוטומטית. כל התכונות שאתם צריכים, מותאמות לעסק שלכם."
    },
    problem: {
      title: "האתגר בניהול עסק מסורתי",
      items: [
        {
          title: "מערכות מפוצלות",
          description: "נתוני לקוחות מפוזרים על פני גיליונות אלקטרוניים, אימיילים וכלים שונים, מה שמקשה על קבלת תמונה מלאה."
        },
        {
          title: "יצירת חשבוניות ידנית",
          description: "יצירת חשבוניות, מעקב תשלומים ומעקבים שגוזלים זמן ומסיחים את הדעת מהצמיחה העסקית."
        },
        {
          title: "מורכבות עיבוד תשלומים",
          description: "ניהול תשלומים בנפרד מקשרי לקוחות מוביל לשגיאות, עיכובים והזדמנויות מבוזבזות."
        }
      ]
    },
    solution: {
      title: "פתרון ה-CRM המלא לעסק שלכם",
      items: [
        {
          title: "CRM מלא תכונות",
          description: "כל יכולות ה-CRM המודרניות כולל ניהול אנשי קשר, צינור מכירות, מעקב משימות והיסטוריית תקשורת במקום אחד."
        },
        {
          title: "אינטגרציה לתשלומים",
          description: "התחברות חלקה למעבדי תשלומים לקבלת תשלומים, מעקב עסקאות וניהול מנויים ישירות מה-CRM שלכם."
        },
        {
          title: "יצירת חשבוניות אוטומטית",
          description: "יצירת חשבוניות מקצועיות אוטומטית, שליחה ללקוחות, מעקב סטטוס תשלום וניהול חיוב ללא מאמץ."
        }
      ]
    },
    caseStudy: {
      title: "תוצאות מוכחות",
      subtitle: "ראו כיצד עסקים משנים את הפעילות שלהם",
      stats: [
        { number: "75%", label: "חיסכון בזמן" },
        { number: "98%", label: "שביעות רצון לקוחות" },
        { number: "2.5x", label: "גידול בהכנסות" },
        { number: "60%", label: "הפחתת עלויות" }
      ],
      testimonials: [
        {
          quote: "ה-CRM הזה שינה את האופן שבו אנו מנהלים את העסק שלנו. האינטגרציה לתשלומים ויצירת החשבוניות האוטומטית לבדן חסכו לנו שעות רבות מדי שבוע.",
          author: "דוד לוי",
          role: "בעל עסק",
          company: "פתרונות טכנולוגיה בע״מ"
        },
        {
          quote: "התכונות המונעות ב-AI עוזרות לנו לסדר עדיפויות למתעניינים ולסגור עסקאות מהר יותר. הפרודוקטיביות של צוות המכירות שלנו עלתה ב-40% תוך חודשיים בלבד.",
          author: "שרה כהן",
          role: "מנהלת מכירות",
          company: "שותפי צמיחה"
        },
        {
          quote: "ההשקעה הטובה ביותר שעשינו. תהליכי העבודה האוטומטיים וניהול המסמכים חוסכים לנו שעות מדי יום. ממליץ בחום!",
          author: "מיכאל רוזן",
          role: "מנהל פעילות",
          company: "חברת חדשנות"
        }
      ]
    },
    benefits: {
      title: "למה לבחור בפלטפורמה שלנו",
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
      title: "מוכנים לשנות את הפעילות העסקית שלכם?",
      subtitle: "הצטרפו למאות עסקים שכבר משתמשים בפתרון ה-CRM המותאם שלנו",
      button: "התחילו עוד היום",
      secondaryButton: "התחילו עוד היום",
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
      title: "בינה מלאכותית חכמה",
      subtitle: "תנו לבינה מלאכותית להפוך את ה-CRM שלכם לעוזר עסקי חכם",
      headline: "AI שעוזר לכם לסגור עסקאות רווחיות יותר",
      items: [
        {
          title: "ציון לידים חכם",
          description: "AI מדרג אוטומטית לידים לפי הסבירות להמרה, עוזר לכם להתמקד בהזדמנויות המבטיחות ביותר."
        },
        {
          title: "תחזית מכירות חיזויית",
          description: "קבלו תחזיות מכירות מדויקות באמצעות ניתוח AI של נתונים היסטוריים, מגמות ודפוסי התנהגות לקוחות."
        },
        {
          title: "אוטומציה חכמה לאימייל",
          description: "הצעות אימייל מונעות AI, תגובות אוטומטיות ותזכורות מעקב המתאימות לסגנון התקשורת שלכם."
        },
        {
          title: "ניתוח סנטימנט",
          description: "הבינו רגשות לקוחות מאימיילים ושיחות כדי לזהות חשבונות בסיכון ולשפר שביעות רצון."
        },
        {
          title: "צ'אטבוט עוזר AI",
          description: "עוזר AI 24/7 שעונה על שאלות, מייצר דוחות ועוזר לצוות שלכם למצוא מידע מיידית."
        },
        {
          title: "הזנת נתונים אוטומטית",
          description: "AI מחלץ ומארגן אוטומטית מידע מאימיילים, שיחות ומסמכים, חוסך שעות של עבודה ידנית."
        },
        {
          title: "חיזוי הסתברות עסקה",
          description: "AI מחשב את ההסתברות לסגירת כל עסקה, עוזר לכם לקבוע עדיפויות ולהקצות משאבים ביעילות."
        },
        {
          title: "הצעות תהליכי עבודה חכמים",
          description: "AI מנתח את התהליכים שלכם ומציע אופטימיזציות לשיפור יעילות והפחתת צווארי בקבוק."
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
      title: "תכונות ברמה ארגונית",
      subtitle: "כל מה שאתם צריכים לניהול קשרי העסק שלכם",
      items: [
        {
          title: "ניהול אנשי קשר",
          description: "מסד נתונים מרכזי של כל אנשי הקשר, הלקוחות והלידים שלכם עם פרופילים מפורטים והיסטוריית אינטראקציות."
        },
        {
          title: "צינור מכירות",
          description: "צינור מכירות ויזואלי למעקב עסקאות מליד לסגירה עם שלבים הניתנים להתאמה ואוטומציה."
        },
        {
          title: "אינטגרציה לאימייל",
          description: "חברו את חשבונות האימייל שלכם לסנכרון שיחות, שליחת אימיילים ישירות מה-CRM ומעקב מעורבות."
        },
        {
          title: "ניהול משימות ופעילויות",
          description: "לעולם לא תפספסו מעקב עם תזכורות אוטומטיות, הקצאת משימות ומעקב פעילויות."
        },
        {
          title: "ניהול מסמכים",
          description: "אחסון, ארגון ושיתוף מסמכים, חוזים וקבצים עם בקרת גרסאות והרשאות גישה."
        },
        {
          title: "אנליטיקה מתקדמת",
          description: "לוחות בקרה בזמן אמת, דוחות מותאמים אישית ותובנות לקבלת החלטות עסקיות מבוססות נתונים."
        },
        {
          title: "אוטומציה של תהליכי עבודה",
          description: "אוטומציה של משימות חוזרות, יצירת תהליכי עבודה מותאמים אישית והפעלת פעולות על בסיס תנאים."
        },
        {
          title: "אפליקציה לנייד",
          description: "גישה ל-CRM שלכם על הדרך עם אפליקציות נייד מקוריות ל-iOS ו-Android."
        },
        {
          title: "שיתוף פעולה בצוות",
          description: "שיתוף מידע, הקצאת משימות ושיתוף פעולה חלק עם הצוות שלכם בזמן אמת."
        },
        {
          title: "שדות וטפסים מותאמים",
          description: "התאמה אישית של ה-CRM שלכם עם שדות מותאמים, טפסים ומבני נתונים המותאמים לעסק שלכם."
        },
        {
          title: "API ואינטגרציות",
          description: "התחברות ל-1000+ אפליקציות כולל Slack, Google Workspace, Microsoft 365 ועוד."
        },
        {
          title: "אבטחה ותאימות",
          description: "אבטחה ברמה ארגונית עם הצפנת נתונים, גישה מבוססת תפקידים ותאימות ל-GDPR."
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
                  {language === 'en' ? 'Pricing' : 'תמחור'}
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
                    {language === 'en' ? 'Pricing' : 'תמחור'}
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
            <div className="inline-block mb-6">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold glowing-text-green">
                {t.cta.freeTrial}
              </span>
            </div>
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
          <SwipeableCarousel
            items={t.ai.items}
            itemsPerView={{ mobile: 1, tablet: 2, desktop: 4 }}
            renderItem={(item, index) => (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
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
            )}
          />
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
