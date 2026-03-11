import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: any) => void;
  saving: boolean;
}

export function PatientRegistrationModal({ open, onOpenChange, onSave, saving }: Props) {
  const [form, setForm] = useState({
    registration_date: new Date().toISOString().split("T")[0],
    initials: "Mr",
    first_name: "",
    last_name: "",
    gender: "Male",
    date_of_birth: "",
    address: "",
    email: "",
    mobile_phone_1: "",
    mobile_phone_2: "",
    omang_id: "",
    principal_member_name: "",
    relationship_to_member: "Self",
    medical_aid_scheme_id: "",
    medical_aid_code: "",
    medical_aid_percentage: 80,
    membership_no: "",
    medical_aid_registration_date: "",
  });

  const { data: schemes = [] } = useQuery({
    queryKey: ["medical_aid_schemes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("medical_aid_schemes").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });

  const update = (field: string, value: any) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      medical_aid_scheme_id: form.medical_aid_scheme_id || null,
      date_of_birth: form.date_of_birth || null,
      medical_aid_registration_date: form.medical_aid_registration_date || null,
    };
    onSave(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Patient Registration</DialogTitle>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Registration Date</Label>
              <Input type="date" value={form.registration_date} onChange={(e) => update("registration_date", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Patient Initials</Label>
              <Select value={form.initials} onValueChange={(v) => update("initials", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Mr", "Mrs", "Ms", "Dr"].map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Patient File No</Label>
              <Input placeholder="Auto-generated" disabled className="bg-muted" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name *</Label>
              <Input value={form.first_name} onChange={(e) => update("first_name", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Last Name *</Label>
              <Input value={form.last_name} onChange={(e) => update("last_name", e.target.value)} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={form.gender} onValueChange={(v) => update("gender", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Input type="date" value={form.date_of_birth} onChange={(e) => update("date_of_birth", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Omang/Passport ID</Label>
              <Input value={form.omang_id} onChange={(e) => update("omang_id", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Address</Label>
              <Input value={form.address} onChange={(e) => update("address", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Mobile Phone 1</Label>
              <Input value={form.mobile_phone_1} onChange={(e) => update("mobile_phone_1", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Mobile Phone 2</Label>
              <Input value={form.mobile_phone_2} onChange={(e) => update("mobile_phone_2", e.target.value)} />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Medical Aid Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Principal Member Name</Label>
                <Input value={form.principal_member_name} onChange={(e) => update("principal_member_name", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Relationship To Member</Label>
                <Select value={form.relationship_to_member} onValueChange={(v) => update("relationship_to_member", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Self", "Spouse", "Child", "Other"].map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="space-y-2">
                <Label>Medical Aid Scheme</Label>
                <Select value={form.medical_aid_scheme_id} onValueChange={(v) => update("medical_aid_scheme_id", v)}>
                  <SelectTrigger><SelectValue placeholder="Select scheme" /></SelectTrigger>
                  <SelectContent>
                    {schemes.map((s: any) => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Medical Aid Code</Label>
                <Input value={form.medical_aid_code} onChange={(e) => update("medical_aid_code", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Medical Aid %</Label>
                <Input type="number" value={form.medical_aid_percentage} onChange={(e) => update("medical_aid_percentage", Number(e.target.value))} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label>Membership Number</Label>
                <Input value={form.membership_no} onChange={(e) => update("membership_no", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Medical Aid Registration Date</Label>
                <Input type="date" value={form.medical_aid_registration_date} onChange={(e) => update("medical_aid_registration_date", e.target.value)} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Patient"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
