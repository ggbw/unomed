import MasterDataPage from "@/components/master/MasterDataPage";

export default function ProceduresPage() {
  return (
    <MasterDataPage
      title="Procedures"
      table="procedures"
      columns={[
        { key: "name", label: "Procedure Name" },
        { key: "code", label: "Code" },
        { key: "fee", label: "Fee", type: "number" },
      ]}
    />
  );
}
