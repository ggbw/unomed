import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import { PatientRegistrationModal } from "@/components/patients/PatientRegistrationModal";
import { toast } from "sonner";

export default function PatientList() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: patients = [], isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("patients")
        .select("*, medical_aid_schemes(name)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const createPatient = useMutation({
    mutationFn: async (patient: any) => {
      const { data, error } = await supabase.from("patients").insert(patient).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast.success("Patient registered successfully!");
      setShowModal(false);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const filtered = patients.filter(
    (p: any) =>
      `${p.first_name} ${p.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
      (p.patient_file_no || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.membership_no || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Patient Registrations</h1>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-1" /> Add Patient
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by name, file no, or membership..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading patients...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File No</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Medical Aid</TableHead>
                  <TableHead>Membership No</TableHead>
                  <TableHead>Principal Member</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p: any) => (
                  <TableRow key={p.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{p.patient_file_no}</TableCell>
                    <TableCell>{p.initials} {p.first_name} {p.last_name}</TableCell>
                    <TableCell>{p.medical_aid_schemes?.name || "—"}</TableCell>
                    <TableCell>{p.membership_no || "—"}</TableCell>
                    <TableCell>{p.principal_member_name || "—"}</TableCell>
                    <TableCell>{p.mobile_phone_1 || "—"}</TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      {patients.length === 0 ? "No patients registered yet. Click 'Add Patient' to get started." : "No patients found."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <PatientRegistrationModal
        open={showModal}
        onOpenChange={setShowModal}
        onSave={(data) => createPatient.mutate(data)}
        saving={createPatient.isPending}
      />
    </div>
  );
}
