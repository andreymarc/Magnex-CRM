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
} from "react-icons/fi";

const menuItems = [
  {
    icon: FiHome,
    label: "Home",
    path: "/dashboard",
    active: true,
    description: "Dashboard overview and quick access to key metrics",
  },
  {
    icon: FiUserPlus,
    label: "Leads",
    path: "/dashboard/leads",
    description: "Manage potential customers and lead generation",
  },
  {
    icon: FiUsers,
    label: "Contacts",
    path: "/dashboard/contacts",
    description: "View and manage all your customer contacts",
  },
  {
    icon: FiCheckSquare,
    label: "Tasks",
    path: "/dashboard/tasks",
    description: "Track tasks, to-dos, and follow-up activities",
  },
  {
    icon: FiList,
    label: "Deals",
    path: "/dashboard/deals",
    description: "Manage sales pipeline and deal stages",
  },
  {
    icon: FiClock,
    label: "Schedule",
    path: "/dashboard/schedule",
    description: "Calendar view and event scheduling",
  },
  {
    icon: FiFileText,
    label: "Documents",
    path: "/dashboard/documents",
    description: "Store and manage business documents",
  },
  {
    icon: FiBarChart2,
    label: "Analytics",
    path: "/dashboard/analytics",
    description: "View reports, charts, and business insights",
  },
  {
    icon: FiDollarSign,
    label: "Payments",
    path: "/dashboard/payments",
    description: "Manage invoices and payment tracking",
  },
  {
    icon: FiSettings,
    label: "Settings",
    path: "/dashboard/settings",
    description: "Configure your account and preferences",
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

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
        w-64 lg:w-16
        bg-gray-900
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        flex flex-col
        shadow-xl lg:shadow-none
      `}
      >
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-white font-semibold text-lg">Menu</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4 lg:py-6">
          <div className="flex flex-col lg:items-center space-y-2 lg:space-y-6 px-2 lg:px-0">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <div key={index} className="relative group">
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className={`
                      w-full lg:w-12 h-12
                      rounded-lg
                      flex items-center
                      lg:justify-center
                      px-4 lg:px-0
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
                    <span className="mr-3 lg:hidden text-sm font-medium">
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
      </div>
    </>
  );
}
