import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function OrganisationPage() {
  const [form, setForm] = useState<Record<string, string>>({});
  const qc = useQueryClient();

  const { data: org } = useQuery({
    queryKey: ["organisation"],
    queryFn: async () => {
      const { data, error } = await supabase.from("organisation").select("*").limit(1).single();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (org) {
      setForm({
        clinic_name: org.clinic_name || "",
        address: org.address || "",
        city: org.city || "",
        country: org.country || "",
        telephone: org.telephone || "",
        fax: org.fax || "",
        cell: org.cell || "",
        email: org.email || "",
        bhf_provider_no: org.bhf_provider_no || "",
        vat_no: org.vat_no || "",
      });
    }
  }, [org]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!org) return;
      const { error } = await supabase.from("organisation").update(form).eq("id", org.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["organisation"] });
      toast.success("Organisation details updated");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const fields = [
    { key: "clinic_name", label: "Clinic Name" },
    { key: "address", label: "Address" },
    { key: "city", label: "City" },
    { key: "country", label: "Country" },
    { key: "telephone", label: "Telephone" },
    { key: "fax", label: "Fax" },
    { key: "cell", label: "Cell" },
    { key: "email", label: "Email" },
    { key: "bhf_provider_no", label: "BHF/Provider No" },
    { key: "vat_no", label: "VAT No" },
  ];

  return (
    <div className="space-y-4 max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground">Organisation Details</h1>
      <Card className="border-none shadow-sm">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.key} className="space-y-1">
                <Label>{f.label}</Label>
                <Input value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
