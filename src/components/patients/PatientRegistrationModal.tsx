import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PatientRegistrationModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Patient Registration</DialogTitle>
        </DialogHeader>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onOpenChange(false); }}>
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Registration Date</Label>
              <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
            </div>
            <div className="space-y-2">
              <Label>Patient Initials</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mr">Mr</SelectItem>
                  <SelectItem value="Mrs">Mrs</SelectItem>
                  <SelectItem value="Ms">Ms</SelectItem>
                  <SelectItem value="Dr">Dr</SelectItem>
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
              <Label>First Name</Label>
              <Input placeholder="First name" />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input placeholder="Last name" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Omang/Passport ID</Label>
              <Input placeholder="ID number" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Address</Label>
              <Input placeholder="Address" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="Email" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Mobile Phone 1</Label>
              <Input placeholder="+267..." />
            </div>
            <div className="space-y-2">
              <Label>Mobile Phone 2</Label>
              <Input placeholder="+267..." />
            </div>
          </div>

          {/* Medical Aid */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Medical Aid Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Principal Member Name</Label>
                <Input placeholder="Principal member name" />
              </div>
              <div className="space-y-2">
                <Label>Relationship To Member</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Self">Self</SelectItem>
                    <SelectItem value="Spouse">Spouse</SelectItem>
                    <SelectItem value="Child">Child</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="space-y-2">
                <Label>Medical Aid Scheme</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select scheme" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bomaid">Bomaid</SelectItem>
                    <SelectItem value="Bpomas">Bpomas</SelectItem>
                    <SelectItem value="Pula">Pula Medical Aid</SelectItem>
                    <SelectItem value="Botsogo">Botsogo</SelectItem>
                    <SelectItem value="Private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Medical Aid Code</Label>
                <Input placeholder="Code" />
              </div>
              <div className="space-y-2">
                <Label>Medical Aid %</Label>
                <Input type="number" placeholder="80" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label>Membership Number</Label>
                <Input placeholder="Membership No" />
              </div>
              <div className="space-y-2">
                <Label>Medical Aid Registration Date</Label>
                <Input type="date" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Patient</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
