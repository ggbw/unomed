import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export interface ColumnDef {
  key: string;
  label: string;
  type?: "text" | "number";
  readOnly?: boolean;
}

interface MasterDataPageProps {
  title: string;
  table: "services" | "items" | "consultants" | "medical_aid_schemes" | "diagnoses" | "investigations" | "procedures";
  columns: ColumnDef[];
}

export default function MasterDataPage({ title, table, columns }: MasterDataPageProps) {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const qc = useQueryClient();

  const { data: rows = [], isLoading } = useQuery({
    queryKey: [table],
    queryFn: async () => {
      const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const upsertMutation = useMutation({
    mutationFn: async (values: Record<string, any>) => {
      if (editing) {
        const { error } = await supabase.from(table).update(values as any).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(table).insert(values as any);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
      toast.success(editing ? "Updated successfully" : "Created successfully");
      closeDialog();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
      toast.success("Deleted successfully");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const openNew = () => {
    setEditing(null);
    const empty: Record<string, any> = {};
    columns.forEach((c) => { if (!c.readOnly) empty[c.key] = ""; });
    setForm(empty);
    setDialogOpen(true);
  };

  const openEdit = (row: any) => {
    setEditing(row);
    const vals: Record<string, any> = {};
    columns.forEach((c) => { vals[c.key] = row[c.key] ?? ""; });
    setForm(vals);
    setDialogOpen(true);
  };

  const closeDialog = () => { setDialogOpen(false); setEditing(null); };

  const handleSubmit = () => {
    const values: Record<string, any> = {};
    columns.forEach((c) => {
      if (!c.readOnly) values[c.key] = c.type === "number" ? Number(form[c.key] || 0) : form[c.key];
    });
    upsertMutation.mutate(values);
  };

  const filtered = rows.filter((r: any) =>
    columns.some((c) => String(r[c.key] ?? "").toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-1" /> Add New</Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder={`Search ${title.toLowerCase()}...`} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((c) => <TableHead key={c.key}>{c.label}</TableHead>)}
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={columns.length + 1} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={columns.length + 1} className="text-center py-8 text-muted-foreground">No records found</TableCell></TableRow>
              ) : (
                filtered.map((row: any) => (
                  <TableRow key={row.id}>
                    {columns.map((c) => (
                      <TableCell key={c.key}>
                        {c.type === "number" ? Number(row[c.key] ?? 0).toFixed(2) : String(row[c.key] ?? "")}
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(row)}>
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => deleteMutation.mutate(row.id)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit" : "Add"} {title.replace(/s$/, "")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            {columns.filter((c) => !c.readOnly).map((c) => (
              <div key={c.key} className="space-y-1">
                <Label>{c.label}</Label>
                <Input
                  type={c.type === "number" ? "number" : "text"}
                  value={form[c.key] ?? ""}
                  onChange={(e) => setForm({ ...form, [c.key]: e.target.value })}
                  step={c.type === "number" ? "0.01" : undefined}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={closeDialog}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={upsertMutation.isPending}>
              {editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
