import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiGlobe,
  FiMail,
  FiPhone,
  FiUser,
  FiBriefcase,
  FiHome,
  FiLock,
} from "react-icons/fi";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const translations = {
  en: {
    nav: {
      language: "עברית",
      back: "Back",
    },
    register: {
      title: "Open a Free Account",
      subtitle: "Start now in a few simple steps",
      step1Title: "Personal Information",
      step2Title: "Company Information",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      mobile: "Mobile",
      companyName: "Company Name",
      companyPhone: "Company Phone",
      companySubdomain: "Company Subdomain",
      companySubdomainHint:
        "Enter the company name in English, without spaces between letters",
      next: "Next",
      previous: "Previous",
      submit: "Open System",
      alreadyHaveAccount: "Already have an account?",
      loginLink: "Click here to log in",
      freeTrial: "First Month Free - No Credit Card Required",
      planSelected: "Plan Selected",
      terms:
        "By continuing, you agree to our Terms of Service and Privacy Policy",
      passwordMinLength: "Password must be at least 6 characters",
      passwordsNotMatch: "Passwords do not match",
      emailExists: "This email is already registered",
      registrationFailed: "Registration failed. Please try again.",
      checkEmail: "Please check your email to verify your account",
    },
  },
  he: {
    nav: {
      language: "English",
      back: "חזרה",
    },
    register: {
      title: "פתיחת חשבון בחינם",
      subtitle: "התחילו עכשיו בכמה צעדים פשוטים",
      step1Title: "פרטים אישיים",
      step2Title: "פרטי החברה",
      firstName: "שם פרטי",
      lastName: "שם משפחה",
      email: "אימייל",
      password: "סיסמה",
      confirmPassword: "אימות סיסמה",
      mobile: "נייד",
      companyName: "שם החברה",
      companyPhone: "טלפון בחברה",
      companySubdomain: "הזן את שם החברה באנגלית, ללא רווחים בין האותיוו",
      companySubdomainHint: "לדוגמה: mycompany",
      next: "הבא",
      previous: "הקודם",
      submit: "פתח מערכת",
      alreadyHaveAccount: "יש לך כבר חשבון?",
      loginLink: "לחץ כאן להתחברות",
      freeTrial: "חודש ראשון חינם - ללא צורך בכרטיס אשראי",
      planSelected: "תוכנית נבחרה",
      terms: "בהמשך, אתה מסכים לתנאי השירות ומדיניות הפרטיות שלנו",
      passwordMinLength: "הסיסמה חייבת להכיל לפחות 6 תווים",
      passwordsNotMatch: "הסיסמאות אינן תואמות",
      emailExists: "אימייל זה כבר רשום במערכת",
      registrationFailed: "ההרשמה נכשלה. אנא נסה שוב.",
      checkEmail: "אנא בדוק את האימייל שלך לאימות החשבון",
    },
  },
};

export default function RegisterPage() {
  const { language, changeLanguage, isRTL } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const planId = searchParams.get("plan_id");
  const planName = searchParams.get("plan") || "BASIC";

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    companyName: "",
    companyPhone: "",
    companySubdomain: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const t = translations[language];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName =
        language === "en" ? "First name is required" : "שם פרטי נדרש";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName =
        language === "en" ? "Last name is required" : "שם משפחה נדרש";
    }

    if (!formData.email.trim()) {
      newErrors.email = language === "en" ? "Email is required" : "אימייל נדרש";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email =
        language === "en" ? "Invalid email format" : "פורמט אימייל לא תקין";
    }

    if (!formData.password.trim()) {
      newErrors.password =
        language === "en" ? "Password is required" : "סיסמה נדרשת";
    } else if (formData.password.length < 6) {
      newErrors.password = t.register.passwordMinLength;
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword =
        language === "en" ? "Please confirm password" : "אנא אמת את הסיסמה";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.register.passwordsNotMatch;
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile =
        language === "en" ? "Mobile number is required" : "מספר נייד נדרש";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.mobile)) {
      newErrors.mobile =
        language === "en" ? "Invalid mobile number" : "מספר נייד לא תקין";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName =
        language === "en" ? "Company name is required" : "שם החברה נדרש";
    }

    if (!formData.companyPhone.trim()) {
      newErrors.companyPhone =
        language === "en" ? "Company phone is required" : "טלפון בחברה נדרש";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.companyPhone)) {
      newErrors.companyPhone =
        language === "en" ? "Invalid phone number" : "מספר טלפון לא תקין";
    }

    if (!formData.companySubdomain.trim()) {
      newErrors.companySubdomain =
        language === "en"
          ? "Company subdomain is required"
          : "שם החברה באנגלית נדרש";
    } else if (!/^[a-zA-Z0-9-]+$/.test(formData.companySubdomain)) {
      newErrors.companySubdomain =
        language === "en"
          ? "Only English letters, numbers, and hyphens allowed"
          : "רק אותיות באנגלית, מספרים ומקפים מותרים";
    } else if (formData.companySubdomain.length < 3) {
      newErrors.companySubdomain =
        language === "en"
          ? "Subdomain must be at least 3 characters"
          : "שם החברה חייב להכיל לפחות 3 תווים";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      // Clear step 2 errors
      setErrors((prev) => {
        const { companyName, companyPhone, companySubdomain, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentStep === 1) {
      handleNext();
      return;
    }

    // Step 2 - Final submission
    if (!validateStep2()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Register with Supabase Auth
      await signUp({
        email: formData.email,
        password: formData.password,
        fullName: `${formData.firstName} ${formData.lastName}`,
        companyName: formData.companyName,
        phone: formData.mobile,
      });

      // Show success message
      setRegistrationSuccess(true);

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);

      // Handle specific errors
      if (
        error.message.includes("already registered") ||
        error.message.includes("already exists")
      ) {
        setErrors({ email: t.register.emailExists });
      } else {
        alert(t.register.registrationFailed);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPlanDisplayName = () => {
    const planNames = {
      BASIC: language === "en" ? "Basic" : "בסיסי",
      ADVANCED: language === "en" ? "Advanced" : "מתקדם",
      PREMIUM: language === "en" ? "Premium" : "פרימיום",
      PRO5: language === "en" ? "Pro 5" : "פרו 5",
    };
    return planNames[planName] || planName;
  };

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 antialiased relative overflow-hidden"
    >
      {/* Background decorative elements - smaller on mobile */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 sm:opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 sm:opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 sm:opacity-20 animate-blob animation-delay-4000"></div>

      {/* Navbar - more compact on mobile */}
      <nav className="sticky top-0 z-50 py-2 sm:py-4 px-3 sm:px-6 lg:px-8 bg-white/90 sm:bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="scale-90 sm:scale-100">
              <Logo size="default" variant="dark" />
            </div>
          </Link>

          <div className="flex items-center space-x-2 sm:space-x-4 rtl:space-x-reverse">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse text-gray-700 hover:text-primary-600 font-medium text-xs sm:text-sm transition-colors p-1.5 sm:p-2"
              aria-label={t.nav.back}
            >
              <FiArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t.nav.back}</span>
            </button>

            <button
              onClick={() => changeLanguage(language === "en" ? "he" : "en")}
              className="flex items-center space-x-1 sm:space-x-2 rtl:space-x-reverse text-gray-700 hover:text-primary-600 font-medium text-xs sm:text-sm transition-colors p-1.5 sm:p-2"
              aria-label={t.nav.language}
            >
              <FiGlobe className="w-4 h-4" />
              <span className="hidden sm:inline">{t.nav.language}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content - better mobile spacing */}
      <div className="relative z-10 flex items-center justify-center py-3 sm:py-4 px-3 sm:px-4 lg:px-8">
        <div className="w-full max-w-md mx-auto">
          {/* Free Trial Badge - responsive text */}
          <div className="text-center mb-2 sm:mb-3">
            <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg glowing-text-white whitespace-nowrap">
              {t.register.freeTrial}
            </span>
          </div>

          {/* Registration Card - less padding on mobile */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 border border-gray-100">
            {/* Success Message */}
            {registrationSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {language === "en"
                    ? "Registration Successful!"
                    : "ההרשמה הצליחה!"}
                </h2>
                <p className="text-gray-600 mb-4">{t.register.checkEmail}</p>
                <p className="text-sm text-gray-500">
                  {language === "en"
                    ? "Redirecting to dashboard..."
                    : "מעביר לדשבורד..."}
                </p>
              </div>
            ) : (
              <>
                {/* Plan Info - compact on mobile */}
                {planName && (
                  <div className="mb-2 sm:mb-3 p-2 sm:p-2.5 bg-primary-50 rounded-lg sm:rounded-xl border border-primary-200">
                    <p className="text-xs text-primary-600 font-semibold mb-0.5 sm:mb-1">
                      {t.register.planSelected}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-primary-700">
                      {getPlanDisplayName()}
                    </p>
                  </div>
                )}

                {/* Form Title - smaller on mobile */}
                <div className="text-center mb-2 sm:mb-3">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {t.register.title}
                  </h1>
                  <p className="text-gray-600 text-xs mb-1">
                    {t.register.subtitle}
                  </p>
                  {/* Step Indicator */}
                  <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mt-1">
                    <div
                      className={`h-1.5 w-6 sm:w-8 rounded-full transition-all ${
                        currentStep >= 1 ? "bg-primary-600" : "bg-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`h-1.5 w-6 sm:w-8 rounded-full transition-all ${
                        currentStep >= 2 ? "bg-primary-600" : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                </div>

                {/* Registration Form - tighter spacing on mobile */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-2 sm:space-y-2.5"
                >
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <>
                      {/* First Name */}
                      <div>
                        <div className="relative">
                          <FiUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`w-full bg-white pl-3 sm:pl-4 pr-9 sm:pr-10 py-1.5 sm:py-2 text-sm text-gray-900 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                              isRTL ? "text-right" : "text-left"
                            } ${
                              errors.firstName
                                ? "border-red-300"
                                : "border-gray-300"
                            }`}
                            placeholder={t.register.firstName}
                            dir={isRTL ? "rtl" : "ltr"}
                          />
                        </div>
                        {errors.firstName && (
                          <p className="mt-0.5 text-xs sm:text-sm text-red-600">
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      {/* Last Name */}
                      <div>
                        <div className="relative">
                          <FiUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`w-full bg-white pl-3 sm:pl-4 pr-9 sm:pr-10 py-1.5 sm:py-2 text-sm text-gray-900 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                              isRTL ? "text-right" : "text-left"
                            } ${
                              errors.lastName
                                ? "border-red-300"
                                : "border-gray-300"
                            }`}
                            placeholder={t.register.lastName}
                            dir={isRTL ? "rtl" : "ltr"}
                          />
                        </div>
                        {errors.lastName && (
                          <p className="mt-0.5 text-xs sm:text-sm text-red-600">
                            {errors.lastName}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <div className="relative">
                          <FiMail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full bg-white pl-3 sm:pl-4 pr-9 sm:pr-10 py-1.5 sm:py-2 text-sm text-gray-900 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                              isRTL ? "text-right" : "text-left"
                            } ${
                              errors.email
                                ? "border-red-300"
                                : "border-gray-300"
                            }`}
                            placeholder={t.register.email}
                            dir={isRTL ? "rtl" : "ltr"}
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-0.5 text-xs sm:text-sm text-red-600">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Password */}
                      <div>
                        <div className="relative">
                          <FiLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`w-full bg-white pl-3 sm:pl-4 pr-9 sm:pr-10 py-1.5 sm:py-2 text-sm text-gray-900 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                              isRTL ? "text-right" : "text-left"
                            } ${
                              errors.password
                                ? "border-red-300"
                                : "border-gray-300"
                            }`}
                            placeholder="••••••••"
                            dir={isRTL ? "rtl" : "ltr"}
                          />
                        </div>
                        {errors.password && (
                          <p className="mt-0.5 text-xs sm:text-sm text-red-600">
                            {errors.password}
                          </p>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <div className="relative">
                          <FiLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={`w-full bg-white pl-3 sm:pl-4 pr-9 sm:pr-10 py-1.5 sm:py-2 text-sm text-gray-900 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                              isRTL ? "text-right" : "text-left"
                            } ${
                              errors.confirmPassword
                                ? "border-red-300"
                                : "border-gray-300"
                            }`}
                            placeholder="••••••••"
                            dir={isRTL ? "rtl" : "ltr"}
                          />
                        </div>
                        {errors.confirmPassword && (
                          <p className="mt-0.5 text-xs sm:text-sm text-red-600">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>

                      {/* Mobile */}
                      <div>
                        <div className="relative">
                          <FiPhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            className={`w-full bg-white pl-3 sm:pl-4 pr-9 sm:pr-10 py-1.5 sm:py-2 text-sm text-gray-900 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                              isRTL ? "text-right" : "text-left"
                            } ${
                              errors.mobile
                                ? "border-red-300"
                                : "border-gray-300"
                            }`}
                            placeholder={t.register.mobile}
                            dir={isRTL ? "rtl" : "ltr"}
                          />
                        </div>
                        {errors.mobile && (
                          <p className="mt-0.5 text-xs sm:text-sm text-red-600">
                            {errors.mobile}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {/* Step 2: Company Information */}
                  {currentStep === 2 && (
                    <>
                      {/* Company Name */}
                      <div>
                        <div className="relative">
                          <FiHome className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className={`w-full bg-white pl-3 sm:pl-4 pr-9 sm:pr-10 py-1.5 sm:py-2 text-sm text-gray-900 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                              isRTL ? "text-right" : "text-left"
                            } ${
                              errors.companyName
                                ? "border-red-300"
                                : "border-gray-300"
                            }`}
                            placeholder={t.register.companyName}
                            dir={isRTL ? "rtl" : "ltr"}
                          />
                        </div>
                        {errors.companyName && (
                          <p className="mt-0.5 text-xs sm:text-sm text-red-600">
                            {errors.companyName}
                          </p>
                        )}
                      </div>

                      {/* Company Phone */}
                      <div>
                        <div className="relative">
                          <FiPhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="tel"
                            id="companyPhone"
                            name="companyPhone"
                            value={formData.companyPhone}
                            onChange={handleInputChange}
                            className={`w-full bg-white pl-3 sm:pl-4 pr-9 sm:pr-10 py-1.5 sm:py-2 text-sm text-gray-900 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                              isRTL ? "text-right" : "text-left"
                            } ${
                              errors.companyPhone
                                ? "border-red-300"
                                : "border-gray-300"
                            }`}
                            placeholder={t.register.companyPhone}
                            dir={isRTL ? "rtl" : "ltr"}
                          />
                        </div>
                        {errors.companyPhone && (
                          <p className="mt-0.5 text-xs sm:text-sm text-red-600">
                            {errors.companyPhone}
                          </p>
                        )}
                      </div>

                      {/* Company Subdomain */}
                      <div>
                        <div className="relative">
                          <FiBriefcase className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            id="companySubdomain"
                            name="companySubdomain"
                            value={formData.companySubdomain}
                            onChange={(e) => {
                              // Only allow English letters, numbers, and hyphens, convert to lowercase
                              const value = e.target.value
                                .toLowerCase()
                                .replace(/[^a-z0-9-]/g, "");
                              handleInputChange({
                                target: { name: "companySubdomain", value },
                              });
                            }}
                            className={`w-full bg-white pl-3 sm:pl-4 pr-9 sm:pr-10 py-1.5 sm:py-2 text-sm text-gray-900 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                              isRTL ? "text-right" : "text-left"
                            } ${
                              errors.companySubdomain
                                ? "border-red-300"
                                : "border-gray-300"
                            }`}
                            placeholder={t.register.companySubdomainHint}
                            dir="ltr"
                          />
                        </div>
                        {errors.companySubdomain && (
                          <p className="mt-0.5 text-xs sm:text-sm text-red-600">
                            {errors.companySubdomain}
                          </p>
                        )}
                        {formData.companySubdomain &&
                          !errors.companySubdomain && (
                            <p className="mt-1 text-xs text-gray-600">
                              {language === "en"
                                ? "Your URL will be: "
                                : "כתובת המערכת שלך תהיה: "}
                              <span className="font-mono text-primary-600">
                                {formData.companySubdomain}.magnex-crm.com
                              </span>
                            </p>
                          )}
                        <p className="mt-1 text-xs text-gray-500">
                          {t.register.companySubdomainHint}
                        </p>
                      </div>
                    </>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1">
                    {/* Previous Button - only show on step 2 */}
                    {currentStep === 2 && (
                      <button
                        type="button"
                        onClick={handlePrevious}
                        className="w-full sm:w-auto sm:flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 touch-manipulation"
                      >
                        {t.register.previous}
                      </button>
                    )}

                    {/* Next/Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full ${
                        currentStep === 2 ? "sm:flex-1" : ""
                      } bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span className="text-sm sm:text-base">
                            {language === "en" ? "Processing..." : "מעבד..."}
                          </span>
                        </span>
                      ) : currentStep === 1 ? (
                        t.register.next
                      ) : (
                        t.register.submit
                      )}
                    </button>
                  </div>

                  {/* Terms - smaller on mobile */}
                  {currentStep === 1 && (
                    <p className="text-xs text-gray-500 text-center mt-1 sm:mt-2 px-2">
                      {t.register.terms}
                    </p>
                  )}
                </form>

                {/* Login Link - compact on mobile */}
                <div className="mt-2 sm:mt-3 text-center">
                  <p className="text-xs sm:text-sm text-gray-600">
                    {t.register.alreadyHaveAccount}{" "}
                    <Link
                      to="/login"
                      className="text-primary-600 hover:text-primary-700 font-semibold underline"
                    >
                      {t.register.loginLink}
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
