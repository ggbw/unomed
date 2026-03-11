import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface LineItem {
  id: string;
  name: string;
  code: string;
  qty: number;
  fee: number;
  diagnosis: string;
}

const emptyLine = (): LineItem => ({
  id: crypto.randomUUID(),
  name: "",
  code: "",
  qty: 1,
  fee: 0,
  diagnosis: "",
});

export default function InvoiceForm() {
  const [consultations, setConsultations] = useState<LineItem[]>([emptyLine()]);
  const [medications, setMedications] = useState<LineItem[]>([emptyLine()]);
  const [investigations, setInvestigations] = useState<LineItem[]>([emptyLine()]);
  const [procedures, setProcedures] = useState<LineItem[]>([emptyLine()]);

  const total = [...consultations, ...medications, ...investigations, ...procedures].reduce(
    (sum, line) => sum + line.fee * line.qty, 0
  );
  const medAidPercentage = 80;
  const medAidAmount = total * (medAidPercentage / 100);
  const patientDue = total - medAidAmount;

  const addLine = (setter: React.Dispatch<React.SetStateAction<LineItem[]>>) => {
    setter((prev) => [...prev, emptyLine()]);
  };

  const removeLine = (setter: React.Dispatch<React.SetStateAction<LineItem[]>>, id: string) => {
    setter((prev) => prev.filter((l) => l.id !== id));
  };

  const updateLine = (
    setter: React.Dispatch<React.SetStateAction<LineItem[]>>,
    id: string,
    field: keyof LineItem,
    value: string | number
  ) => {
    setter((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const renderLineTable = (
    title: string,
    items: LineItem[],
    setter: React.Dispatch<React.SetStateAction<LineItem[]>>,
    showQty: boolean = false
  ) => (
    <Card className="border shadow-none">
      <CardHeader className="py-3 bg-muted/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          <Button type="button" variant="ghost" size="sm" onClick={() => addLine(setter)}>
            <Plus className="w-4 h-4 mr-1" /> Add Row
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{title.slice(0, -1)} Name</TableHead>
              <TableHead>Code</TableHead>
              {showQty && <TableHead className="w-20">Qty</TableHead>}
              <TableHead className="w-28">Fee</TableHead>
              <TableHead>Diagnosis</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((line) => (
              <TableRow key={line.id}>
                <TableCell>
                  <Input
                    value={line.name}
                    onChange={(e) => updateLine(setter, line.id, "name", e.target.value)}
                    placeholder="Select..."
                    className="h-8"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={line.code}
                    onChange={(e) => updateLine(setter, line.id, "code", e.target.value)}
                    placeholder="Auto"
                    className="h-8 bg-muted"
                    readOnly
                  />
                </TableCell>
                {showQty && (
                  <TableCell>
                    <Input
                      type="number"
                      value={line.qty}
                      onChange={(e) => updateLine(setter, line.id, "qty", Number(e.target.value))}
                      className="h-8"
                      min={1}
                    />
                  </TableCell>
                )}
                <TableCell>
                  <Input
                    type="number"
                    value={line.fee}
                    onChange={(e) => updateLine(setter, line.id, "fee", Number(e.target.value))}
                    className="h-8"
                    step="0.01"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={line.diagnosis}
                    onChange={(e) => updateLine(setter, line.id, "diagnosis", e.target.value)}
                    placeholder="ICD-10..."
                    className="h-8"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeLine(setter, line.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-3">
        <Link to="/invoices">
          <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
        </Link>
        <h1 className="text-2xl font-bold">New Invoice</h1>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Header Fields */}
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
              </div>
              <div className="space-y-2">
                <Label>Patient Full Name</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Search patient..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Mr Selebogo Maditse</SelectItem>
                    <SelectItem value="2">Mrs Keabetswe Moagi</SelectItem>
                    <SelectItem value="3">Ms Tlotlo Kgosi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Patient Initials</Label>
                <Input placeholder="Mr/Mrs/Ms" className="bg-muted" readOnly />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="space-y-2">
                <Label>Medical Aid Scheme</Label>
                <Input placeholder="Auto-filled" className="bg-muted" readOnly />
              </div>
              <div className="space-y-2">
                <Label>Medical Aid Code</Label>
                <Input placeholder="Auto-filled" className="bg-muted" readOnly />
              </div>
              <div className="space-y-2">
                <Label>DOB</Label>
                <Input placeholder="Auto-filled" className="bg-muted" readOnly />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="space-y-2">
                <Label>Referring Consultant</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select consultant" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr1">Dr. Mogomotsi</SelectItem>
                    <SelectItem value="dr2">Dr. Nkomo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Consultant Practice No</Label>
                <Input placeholder="Auto-filled" className="bg-muted" readOnly />
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox />
                  Export Status
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Line Items */}
        <div className="space-y-4">
          {renderLineTable("Consultations", consultations, setConsultations)}
          {renderLineTable("Medications", medications, setMedications, true)}
          {renderLineTable("Investigations", investigations, setInvestigations)}
          {renderLineTable("Procedures", procedures, setProcedures)}
        </div>

        {/* Totals */}
        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col items-end gap-2 text-sm">
              <div className="flex gap-8">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="font-semibold w-32 text-right">P {total.toFixed(2)}</span>
              </div>
              <div className="flex gap-8">
                <span className="text-muted-foreground">Medical Aid ({medAidPercentage}%):</span>
                <span className="font-semibold w-32 text-right">P {medAidAmount.toFixed(2)}</span>
              </div>
              <div className="flex gap-8 border-t pt-2">
                <span className="font-medium">Patient Due:</span>
                <span className="font-bold w-32 text-right text-lg">P {patientDue.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Link to="/invoices">
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Button type="submit">Save Invoice</Button>
        </div>
      </form>
    </div>
  );
}
