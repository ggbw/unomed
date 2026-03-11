import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, ChevronDown, User, Activity } from "lucide-react";

interface NavItem {
  label: string;
  path?: string;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/" },
  {
    label: "Patient Records",
    children: [
      { label: "All Patient Registrations", path: "/patients" },
      { label: "New Patient Registration", path: "/patients/new" },
    ],
  },
  {
    label: "Patient Transactions",
    children: [
      { label: "Create/View Invoices", path: "/invoices" },
      { label: "Create/View Prescriptions", path: "/prescriptions" },
      { label: "Create/View Referral Letters", path: "/referrals" },
      { label: "Create/View Sick Leaves", path: "/sick-leaves" },
      { label: "Create/View Appointments", path: "/appointments" },
    ],
  },
  {
    label: "Master Data",
    children: [
      { label: "Organisation Details", path: "/master/organisation" },
      { label: "Services", path: "/master/services" },
      { label: "Items", path: "/master/items" },
      { label: "Consultants", path: "/master/consultants" },
      { label: "Medical Aid Schemes", path: "/master/schemes" },
      { label: "Diagnoses (ICD-10)", path: "/master/diagnoses" },
      { label: "Investigations", path: "/master/investigations" },
      { label: "Procedures", path: "/master/procedures" },
    ],
  },
  {
    label: "Stock Management",
    children: [
      { label: "Stock Items", path: "/stock/items" },
      { label: "Stock Received", path: "/stock/received" },
      { label: "Stock Dispensed", path: "/stock/dispensed" },
      { label: "Stock Adjustments", path: "/stock/adjustments" },
      { label: "Stock Reports", path: "/stock/reports" },
    ],
  },
  {
    label: "Batch Files",
    children: [
      { label: "Create Batch", path: "/batches/create" },
      { label: "View/Submit Batch Files", path: "/batches" },
      { label: "Batch Status", path: "/batches/status" },
    ],
  },
];

export function TopNavbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = (item: NavItem) => {
    if (item.path) return location.pathname === item.path;
    return item.children?.some((c) => location.pathname.startsWith(c.path)) ?? false;
  };

  return (
    <nav ref={navRef} className="bg-nav text-nav-foreground shadow-lg z-50 relative">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Logo & Name */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-nav-active flex items-center justify-center">
            <Activity className="w-5 h-5 text-nav-foreground" />
          </div>
          <span className="font-semibold text-lg hidden sm:block">ClinicPro</span>
        </Link>

        {/* Nav Items */}
        <div className="flex items-center gap-0.5 overflow-x-auto">
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              {item.path ? (
                <Link
                  to={item.path}
                  className={`px-3 py-4 text-sm font-medium transition-colors hover:text-nav-active whitespace-nowrap block border-b-2 ${
                    isActive(item) ? "border-nav-active text-nav-active" : "border-transparent"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  className={`px-3 py-4 text-sm font-medium transition-colors hover:text-nav-active whitespace-nowrap flex items-center gap-1 border-b-2 ${
                    isActive(item) ? "border-nav-active text-nav-active" : "border-transparent"
                  }`}
                >
                  {item.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                </button>
              )}

              {item.children && openDropdown === item.label && (
                <div className="absolute top-full left-0 mt-0 bg-nav-dropdown rounded-b-md shadow-xl min-w-[220px] py-1 z-50 animate-in fade-in-0 slide-in-from-top-1 duration-150">
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      onClick={() => setOpenDropdown(null)}
                      className={`block px-4 py-2.5 text-sm transition-colors hover:bg-nav-active/20 ${
                        location.pathname === child.path ? "text-nav-active font-medium" : "text-nav-foreground"
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="relative p-2 rounded-full hover:bg-nav-active/20 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-nav-active rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-full bg-nav-active/30 flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </nav>
  );
}
