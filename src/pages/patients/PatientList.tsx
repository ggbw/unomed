import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import { PatientRegistrationModal } from "@/components/patients/PatientRegistrationModal";

export interface Patient {
  id: string;
  patient_file_no: string;
  first_name: string;
  last_name: string;
  initials: string;
  gender: string;
  date_of_birth: string;
  address: string;
  mobile_phone_1: string;
  mobile_phone_2: string;
  email: string;
  omang_id: string;
  medical_aid_scheme: string;
  medical_aid_code: string;
  medical_aid_percentage: number;
  membership_no: string;
  principal_member_name: string;
  relationship_to_member: string;
  registration_date: string;
  medical_aid_registration_date: string;
}

const mockPatients: Patient[] = [
  {
    id: "1", patient_file_no: "PF-0001", first_name: "Selebogo", last_name: "Maditse",
    initials: "Mr", gender: "Male", date_of_birth: "1952-11-11", address: "Gaborone",
    mobile_phone_1: "+267 7100 0001", mobile_phone_2: "", email: "s.maditse@email.com",
    omang_id: "17569", medical_aid_scheme: "Bomaid", medical_aid_code: "BOM001",
    medical_aid_percentage: 80, membership_no: "122209-05", principal_member_name: "Selebogo Maditse",
    relationship_to_member: "Self", registration_date: "2025-01-15", medical_aid_registration_date: "2024-06-01",
  },
  {
    id: "2", patient_file_no: "PF-0002", first_name: "Keabetswe", last_name: "Moagi",
    initials: "Mrs", gender: "Female", date_of_birth: "1985-03-22", address: "Francistown",
    mobile_phone_1: "+267 7200 0002", mobile_phone_2: "+267 7300 0003", email: "k.moagi@email.com",
    omang_id: "23456", medical_aid_scheme: "Bpomas", medical_aid_code: "BPO001",
    medical_aid_percentage: 90, membership_no: "334455-01", principal_member_name: "Thabo Moagi",
    relationship_to_member: "Spouse", registration_date: "2025-02-20", medical_aid_registration_date: "2024-08-15",
  },
  {
    id: "3", patient_file_no: "PF-0003", first_name: "Tlotlo", last_name: "Kgosi",
    initials: "Ms", gender: "Female", date_of_birth: "1990-07-14", address: "Maun",
    mobile_phone_1: "+267 7400 0004", mobile_phone_2: "", email: "t.kgosi@email.com",
    omang_id: "34567", medical_aid_scheme: "Pula", medical_aid_code: "PUL001",
    medical_aid_percentage: 85, membership_no: "556677-02", principal_member_name: "Tlotlo Kgosi",
    relationship_to_member: "Self", registration_date: "2025-03-01", medical_aid_registration_date: "2025-01-10",
  },
];

export default function PatientList() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [patients] = useState<Patient[]>(mockPatients);

  const filtered = patients.filter(
    (p) =>
      `${p.first_name} ${p.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
      p.patient_file_no.toLowerCase().includes(search.toLowerCase()) ||
      p.membership_no.toLowerCase().includes(search.toLowerCase())
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
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, file no, or membership..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
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
              {filtered.map((p) => (
                <TableRow key={p.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{p.patient_file_no}</TableCell>
                  <TableCell>{p.initials} {p.first_name} {p.last_name}</TableCell>
                  <TableCell>{p.medical_aid_scheme}</TableCell>
                  <TableCell>{p.membership_no}</TableCell>
                  <TableCell>{p.principal_member_name}</TableCell>
                  <TableCell>{p.mobile_phone_1}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No patients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <PatientRegistrationModal open={showModal} onOpenChange={setShowModal} />
    </div>
  );
}
