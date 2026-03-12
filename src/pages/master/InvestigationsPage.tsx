import MasterDataPage from "@/components/master/MasterDataPage";

export default function InvestigationsPage() {
  return (
    <MasterDataPage
      title="Investigations"
      table="investigations"
      columns={[
        { key: "name", label: "Investigation Name" },
        { key: "code", label: "Code" },
        { key: "fee", label: "Fee", type: "number" },
      ]}
    />
  );
}
