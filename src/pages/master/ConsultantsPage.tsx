import MasterDataPage from "@/components/master/MasterDataPage";

export default function ConsultantsPage() {
  return (
    <MasterDataPage
      title="Consultants"
      table="consultants"
      columns={[
        { key: "name", label: "Name" },
        { key: "practice_no", label: "Practice No" },
        { key: "specialty", label: "Specialty" },
        { key: "contact", label: "Contact" },
      ]}
    />
  );
}
