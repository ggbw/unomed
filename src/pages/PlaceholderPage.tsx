import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function PlaceholderPage() {
  const location = useLocation();
  const title = location.pathname
    .split("/")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " "))
    .join(" › ");

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="border-none shadow-sm max-w-md w-full">
        <CardContent className="pt-8 pb-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Construction className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">{title || "Page"}</h2>
          <p className="text-muted-foreground text-sm">
            This module is coming soon. Connect the database to enable full functionality.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
