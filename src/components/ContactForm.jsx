import { useState } from "react";
import { FiPhone, FiMessageCircle, FiSend } from "react-icons/fi";

const translations = {
  en: {
    title: "Your Success is Our Priority",
    description1:
      "Implementation doesn't have to be stressful. Our support team provides clear, step-by-step guidance throughout the process.",
    description2:
      "You'll have a dedicated representative supporting you from initial setup through daily operations, ensuring you get the most out of your CRM.",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    preferredTime: "Preferred time to receive a call",
    sendRequest: "Send Request",
    sending: "Sending...",
    success: "Thank you! We'll contact you soon.",
    error: "Something went wrong. Please try again.",
    timeOptions: [
      "Morning (9:00-12:00)",
      "Afternoon (12:00-15:00)",
      "Evening (15:00-18:00)",
      "Flexible",
    ],
  },
  he: {
    title: "ההצלחה שלכם היא העדיפות שלנו",
    description1:
      "הטמעה לא חייבת להיות מלחיצה. צוות התמיכה שלנו מספק הדרכה ברורה שלב אחר שלב לאורך התהליך.",
    description2:
      "יהיה לכם נציג ייעודי שתומך בכם מההגדרה הראשונית ועד לפעילות השוטפת, ומבטיח שתפיקו את המרב מה-CRM.",
    fullName: "שם מלא",
    email: "אימייל",
    phone: "טלפון",
    preferredTime: "זמן מועדף לקבל שיחה",
    sendRequest: "שלח פניה",
    sending: "שולח...",
    success: "תודה! ניצור איתכם קשר בקרוב.",
    error: "משהו השתבש. אנא נסה שוב.",
    timeOptions: [
      "בוקר (9:00-12:00)",
      "צהריים (12:00-15:00)",
      "ערב (15:00-18:00)",
      "גמיש",
    ],
  },
};

export default function ContactForm({ language = "he" }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredTime: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const t = translations[language];
  const isRTL = language === "he";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Netlify Forms - encode form data
      const formDataEncoded = new URLSearchParams({
        "form-name": "contact",
        ...formData,
      }).toString();

      // Try submitting to the current page
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formDataEncoded,
      });

      // Log response for debugging
      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      // Netlify Forms can return 200, 302, or even 404 if form not detected
      // But if status is 200-299, consider it success
      if (response.status >= 200 && response.status < 300) {
        setSubmitStatus("success");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          preferredTime: "",
        });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        const errorText = await response.text().catch(() => "No error details");
        console.error("Form submission failed:", {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative bg-gradient-to-b from-blue-500 via-blue-400 to-blue-50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background decorative shapes - paper airplane style */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 right-10 w-72 h-72 bg-white rounded-lg transform rotate-12 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg transform -rotate-6 m-2"></div>
          <div className="absolute top-2 left-2 w-16 h-1 bg-teal-500 rounded"></div>
          <div className="absolute top-4 left-2 w-12 h-1 bg-teal-500 rounded"></div>
          <div className="absolute top-6 left-2 w-8 h-1 bg-teal-500 rounded"></div>
        </div>
        <div className="absolute top-40 left-10 w-56 h-56 bg-white rounded-lg transform -rotate-12 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-300 to-teal-500 rounded-lg transform rotate-6 m-2"></div>
        </div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-white rounded-lg transform rotate-45 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg transform -rotate-12 m-2"></div>
        </div>
        <div className="absolute top-10 right-1/3 w-80 h-80 bg-white/30 rounded-full blur-3xl"></div>
      </div>

      {/* White overlay */}
      <div className="absolute inset-0 bg-white opacity-30"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar - Contact Icons */}
          <div className="lg:col-span-1 flex lg:flex-col items-center justify-center lg:items-start space-x-4 lg:space-x-0 lg:space-y-4 rtl:space-x-reverse">
            <a
              href="tel:+972501234567"
              className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center text-white hover:bg-blue-900 transition-colors shadow-lg hover:scale-110"
              aria-label="Phone"
            >
              <FiPhone className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/972523670072"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors shadow-lg hover:scale-110"
              aria-label="WhatsApp"
            >
              <FiMessageCircle className="w-5 h-5" />
            </a>
            <a
              href="mailto:andreymarchuk4@gmail.com"
              className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center text-white hover:bg-blue-900 transition-colors shadow-lg hover:scale-110"
              aria-label="Email"
            >
              <FiSend className="w-5 h-5" />
            </a>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-11">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl">
              {/* Text Content */}
              <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {t.title}
                </h2>
                <p className="text-white/90 text-base sm:text-lg mb-3 leading-relaxed">
                  {t.description1}
                </p>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                  {t.description2}
                </p>
              </div>

              {/* Contact Form */}
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Hidden field for Netlify */}
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />

                {/* Success/Error Messages */}
                {submitStatus === "success" && (
                  <div className="bg-green-500 text-white px-4 py-3 rounded-lg text-sm font-semibold">
                    {t.success}
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="bg-red-500 text-white px-4 py-3 rounded-lg text-sm font-semibold">
                    {t.error}
                  </div>
                )}

                {/* Form Fields Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className={`w-full bg-white px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-500 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                      placeholder={t.fullName}
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full bg-white px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-500 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                      placeholder={t.email}
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={`w-full bg-white px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-500 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                      placeholder={t.phone}
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                  </div>

                  {/* Preferred Time */}
                  <div className="relative">
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      required
                      className={`w-full bg-white py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 appearance-none ${
                        isRTL ? "pl-10 pr-4 text-right" : "pl-4 pr-10 text-left"
                      }`}
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      <option value="">{t.preferredTime}</option>
                      {t.timeOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <div
                      className={`absolute top-1/2 transform -translate-y-1/2 pointer-events-none ${
                        isRTL ? "left-3" : "right-3"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 rounded-full font-bold text-lg sm:text-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      {t.sending}
                    </span>
                  ) : (
                    t.sendRequest
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
