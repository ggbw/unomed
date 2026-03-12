import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, FileText, Stethoscope, Building2, Package,
  Layers, ChevronDown, Activity, LogOut, User,
  ClipboardList, HeartPulse, CalendarDays, FilePlus, FileCheck,
  Pill, FlaskConical, Scissors, ShieldCheck, BookOpen,
  PackagePlus, PackageMinus, PackageX, BarChart3,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface MenuItem {
  label: string;
  icon: React.ElementType;
  path?: string;
  children?: { label: string; path: string; icon?: React.ElementType }[];
}

const menuSections: { heading: string; items: MenuItem[] }[] = [
  {
    heading: "MAIN",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/" },
    ],
  },
  {
    heading: "PATIENT RECORDS",
    items: [
      { label: "All Patients", icon: Users, path: "/patients" },
      { label: "New Patient", icon: FilePlus, path: "/patients/new" },
    ],
  },
  {
    heading: "TRANSACTIONS",
    items: [
      { label: "Invoices", icon: FileText, path: "/invoices" },
      { label: "Prescriptions", icon: Pill, path: "/prescriptions" },
      { label: "Referral Letters", icon: HeartPulse, path: "/referrals" },
      { label: "Sick Leaves", icon: ClipboardList, path: "/sick-leaves" },
      { label: "Appointments", icon: CalendarDays, path: "/appointments" },
    ],
  },
  {
    heading: "MASTER DATA",
    items: [
      { label: "Organisation", icon: Building2, path: "/master/organisation" },
      { label: "Services", icon: Stethoscope, path: "/master/services" },
      { label: "Items", icon: Package, path: "/master/items" },
      { label: "Consultants", icon: User, path: "/master/consultants" },
      { label: "Medical Aid Schemes", icon: ShieldCheck, path: "/master/schemes" },
      { label: "Diagnoses (ICD-10)", icon: BookOpen, path: "/master/diagnoses" },
      { label: "Investigations", icon: FlaskConical, path: "/master/investigations" },
      { label: "Procedures", icon: Scissors, path: "/master/procedures" },
    ],
  },
  {
    heading: "STOCK",
    items: [
      { label: "Stock Items", icon: Package, path: "/stock/items" },
      { label: "Stock Received", icon: PackagePlus, path: "/stock/received" },
      { label: "Stock Dispensed", icon: PackageMinus, path: "/stock/dispensed" },
      { label: "Adjustments", icon: PackageX, path: "/stock/adjustments" },
      { label: "Stock Reports", icon: BarChart3, path: "/stock/reports" },
    ],
  },
  {
    heading: "BATCH FILES",
    items: [
      { label: "Create Batch", icon: FilePlus, path: "/batches/create" },
      { label: "View Batches", icon: FileCheck, path: "/batches" },
      { label: "Batch Status", icon: Layers, path: "/batches/status" },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
  };

  return (
    <aside className="w-56 min-h-screen bg-sidebar text-sidebar-foreground flex flex-col shrink-0">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 px-4 py-4 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
          <Activity className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        <span className="font-semibold text-base">ClinicPro</span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 space-y-1">
        {menuSections.map((section) => (
          <div key={section.heading}>
            <p className="px-4 pt-4 pb-1 text-[10px] font-semibold tracking-widest text-sidebar-foreground/50 uppercase">
              {section.heading}
            </p>
            {section.items.map((item) => {
              const isActive = item.path
                ? location.pathname === item.path
                : false;

              return (
                <Link
                  key={item.label}
                  to={item.path || "/"}
                  className={cn(
                    "flex items-center gap-2.5 px-4 py-2 text-sm transition-colors mx-2 rounded-md",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2 px-1 mb-2">
          <div className="w-7 h-7 rounded-full bg-sidebar-accent flex items-center justify-center">
            <User className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs truncate flex-1">{user?.email}</span>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-1 py-1.5 text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors w-full"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
