import MasterDataPage from "@/components/master/MasterDataPage";

export default function ServicesPage() {
  return (
    <MasterDataPage
      title="Services"
      table="services"
      columns={[
        { key: "name", label: "Service Name" },
        { key: "service_code", label: "Service Code" },
        { key: "fee", label: "Fee", type: "number" },
        { key: "category", label: "Category" },
      ]}
    />
  );
}
