import { useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiList,
  FiDollarSign,
  FiClock,
  FiUsers,
  FiBarChart2,
  FiFileText,
  FiSettings,
  FiUserPlus,
  FiCheckSquare,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  {
    icon: FiHome,
    label: "דף הבית",
    path: "/dashboard",
    active: true,
    description: "סקירה כללית וגישה מהירה למדדים חשובים",
  },
  {
    icon: FiUserPlus,
    label: "לידים",
    path: "/dashboard/leads",
    description: "ניהול לקוחות פוטנציאליים והפקת לידים",
  },
  {
    icon: FiUsers,
    label: "אנשי קשר",
    path: "/dashboard/contacts",
    description: "צפייה וניהול כל אנשי הקשר שלך",
  },
  {
    icon: FiCheckSquare,
    label: "משימות",
    path: "/dashboard/tasks",
    description: "מעקב אחר משימות ופעילויות המשך",
  },
  {
    icon: FiList,
    label: "עסקאות",
    path: "/dashboard/deals",
    description: "ניהול צינור מכירות ושלבי עסקה",
  },
  {
    icon: FiClock,
    label: "יומן",
    path: "/dashboard/schedule",
    description: "תצוגת לוח שנה ותזמון אירועים",
  },
  {
    icon: FiFileText,
    label: "מסמכים",
    path: "/dashboard/documents",
    description: "אחסון וניהול מסמכים עסקיים",
  },
  {
    icon: FiBarChart2,
    label: "אנליטיקס",
    path: "/dashboard/analytics",
    description: "צפייה בדוחות, גרפים ותובנות עסקיות",
  },
  {
    icon: FiDollarSign,
    label: "תשלומים",
    path: "/dashboard/payments",
    description: "ניהול חשבוניות ומעקב תשלומים",
  },
  {
    icon: FiSettings,
    label: "הגדרות",
    path: "/dashboard/settings",
    description: "הגדרת החשבון וההעדפות שלך",
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (path) => {
    navigate(path);
    // Close mobile menu after navigation
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 right-0 z-50
        w-64
        bg-gray-900
        transform transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        ${isOpen ? "lg:w-64" : "lg:w-16"}
        flex flex-col
        shadow-xl
      `}
      >
        {/* Header - visible on mobile when open, always visible on desktop */}
        <div className={`flex items-center justify-between p-4 border-b border-gray-800 ${!isOpen ? "lg:hidden" : ""}`}>
          <h2 className="text-white font-semibold text-lg">תפריט</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4 lg:py-6 min-h-0">
          <div className={`flex flex-col space-y-2 lg:space-y-6 px-2 lg:px-0 ${isOpen ? 'lg:items-start' : 'lg:items-center'}`}>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <div key={index} className="relative group">
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className={`
                      w-full h-12
                      rounded-lg
                      flex items-center
                      ${isOpen ? 'lg:justify-start px-4' : 'lg:w-12 lg:justify-center lg:px-0'}
                      transition-all duration-200
                      ${
                        active
                          ? "bg-primary-600 text-white shadow-lg shadow-primary-600/50"
                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                      }
                    `}
                    title={item.label}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className={`mr-3 text-sm font-medium ${!isOpen ? "lg:hidden" : ""}`}>
                      {item.label}
                    </span>
                  </button>

                  {/* Tooltip - Only show on desktop when sidebar is collapsed */}
                  <div
                    className="
                    absolute right-full mr-2 top-1/2 -translate-y-1/2
                    hidden lg:group-hover:block
                    z-50
                    pointer-events-none
                  "
                  >
                    <div
                      className="
                      bg-gray-800 text-white text-sm
                      px-3 py-2 rounded-lg
                      whitespace-nowrap
                      shadow-xl
                      border border-gray-700
                    "
                    >
                      <div className="font-semibold mb-1">{item.label}</div>
                      <div className="text-gray-300 text-xs max-w-xs">
                        {item.description}
                      </div>
                      {/* Tooltip arrow */}
                      <div
                        className="
                        absolute left-full top-1/2 -translate-y-1/2
                        border-4 border-transparent
                        border-l-gray-800
                      "
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Logout Button */}
        <div className={`flex-shrink-0 border-t border-gray-800 ${isOpen ? 'p-4' : 'p-4 lg:py-4 lg:px-2'}`}>
          <div className={`relative group flex ${isOpen ? 'lg:justify-start' : 'lg:justify-center'}`}>
            <button
              onClick={handleLogout}
              className={`
                w-full h-12
                rounded-lg
                flex items-center
                ${isOpen ? 'lg:justify-start px-4' : 'lg:w-12 lg:justify-center lg:px-0'}
                transition-all duration-200
                text-gray-400 hover:text-red-400 hover:bg-red-500/10
                bg-gray-800/50
              `}
              title="התנתק"
            >
              <FiLogOut className="w-5 h-5 flex-shrink-0" />
              <span className={`mr-3 text-sm font-medium ${!isOpen ? "lg:hidden" : ""}`}>
                התנתק
              </span>
            </button>

            {/* Tooltip - Only show on desktop when sidebar is collapsed */}
            <div
              className="
              absolute right-full mr-2 top-1/2 -translate-y-1/2
              hidden lg:group-hover:block
              z-50
              pointer-events-none
            "
            >
              <div
                className="
                bg-gray-800 text-white text-sm
                px-3 py-2 rounded-lg
                whitespace-nowrap
                shadow-xl
                border border-gray-700
              "
              >
                <div className="font-semibold mb-1">התנתק</div>
                <div className="text-gray-300 text-xs max-w-xs">
                  יציאה מהחשבון שלך
                </div>
                {/* Tooltip arrow */}
                <div
                  className="
                  absolute left-full top-1/2 -translate-y-1/2
                  border-4 border-transparent
                  border-l-gray-800
                "
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
