import MasterDataPage from "@/components/master/MasterDataPage";

export default function DiagnosesPage() {
  return (
    <MasterDataPage
      title="Diagnoses (ICD-10)"
      table="diagnoses"
      columns={[
        { key: "icd10_code", label: "ICD-10 Code" },
        { key: "description", label: "Description" },
      ]}
    />
  );
}
