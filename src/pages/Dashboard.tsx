import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, DollarSign, Clock, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Input } from "@/components/ui/input";

const summaryCards = [
  { title: "Total Invoices", value: "1,284", icon: FileText, change: "+12%" },
  { title: "Collections", value: "P 482,350", icon: DollarSign, change: "+8%" },
  { title: "Pending Claims", value: "67", icon: Clock, change: "-5%" },
  { title: "Low Stock Items", value: "12", icon: AlertTriangle, change: "+3" },
];

const batchStatusData = [
  { name: "Jan", exported: 45, pending: 12 },
  { name: "Feb", exported: 52, pending: 8 },
  { name: "Mar", exported: 38, pending: 15 },
  { name: "Apr", exported: 61, pending: 6 },
  { name: "May", exported: 55, pending: 10 },
  { name: "Jun", exported: 48, pending: 14 },
];

const schemeData = [
  { name: "Bomaid", amount: 125000 },
  { name: "Bpomas", amount: 98000 },
  { name: "Pula", amount: 76000 },
  { name: "Botsogo", amount: 54000 },
  { name: "Private", amount: 42000 },
  { name: "Other", amount: 18000 },
];

export default function Dashboard() {
  const [dateFrom, setDateFrom] = useState("2026-01-01");
  const [dateTo, setDateTo] = useState("2026-03-11");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-40" />
          <span className="text-muted-foreground">to</span>
          <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-40" />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <Card key={card.title} className="border-none shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className="text-2xl font-bold mt-1">{card.value}</p>
                  <p className="text-xs text-primary mt-1">{card.change}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <card.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Batch Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={batchStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="exported" fill="hsl(164, 70%, 48%)" name="Exported" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="hsl(215, 15%, 70%)" name="Pending" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Totals Per Medical Aid Scheme</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={schemeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} tickFormatter={(v) => `P${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value: number) => [`P ${value.toLocaleString()}`, "Amount"]} />
                <Bar dataKey="amount" fill="hsl(164, 70%, 48%)" name="Amount" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
