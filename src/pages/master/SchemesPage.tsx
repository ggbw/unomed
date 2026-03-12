import MasterDataPage from "@/components/master/MasterDataPage";

export default function SchemesPage() {
  return (
    <MasterDataPage
      title="Medical Aid Schemes"
      table="medical_aid_schemes"
      columns={[
        { key: "name", label: "Scheme Name" },
        { key: "scheme_code", label: "Scheme Code" },
        { key: "plan_code", label: "Plan Code" },
        { key: "provider_bhf", label: "Provider BHF" },
        { key: "contact", label: "Contact" },
      ]}
    />
  );
}
