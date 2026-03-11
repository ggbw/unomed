import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const mockInvoices = [
  { id: "1", invoice_no: "INV-0001", date: "2026-02-07", patient: "Mr Selebogo Maditse", scheme: "Bomaid", total: 3080.71, medical_aid_amount: 2464.57, patient_due: 616.14, exported: true },
  { id: "2", invoice_no: "INV-0002", date: "2026-02-10", patient: "Mrs Keabetswe Moagi", scheme: "Bpomas", total: 1250.00, medical_aid_amount: 1125.00, patient_due: 125.00, exported: false },
  { id: "3", invoice_no: "INV-0003", date: "2026-03-01", patient: "Ms Tlotlo Kgosi", scheme: "Pula", total: 890.50, medical_aid_amount: 757.93, patient_due: 132.58, exported: false },
];

export default function InvoiceList() {
  const [search, setSearch] = useState("");

  const filtered = mockInvoices.filter(
    (inv) =>
      inv.patient.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoice_no.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Link to="/invoices/new">
          <Button><Plus className="w-4 h-4 mr-1" /> New Invoice</Button>
        </Link>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search invoices..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice No</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Scheme</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Med Aid</TableHead>
                <TableHead className="text-right">Patient Due</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inv) => (
                <TableRow key={inv.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{inv.invoice_no}</TableCell>
                  <TableCell>{inv.date}</TableCell>
                  <TableCell>{inv.patient}</TableCell>
                  <TableCell>{inv.scheme}</TableCell>
                  <TableCell className="text-right">P {inv.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">P {inv.medical_aid_amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">P {inv.patient_due.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={inv.exported ? "default" : "secondary"}>
                      {inv.exported ? "Exported" : "Pending"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
