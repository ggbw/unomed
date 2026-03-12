import MasterDataPage from "@/components/master/MasterDataPage";

export default function ItemsPage() {
  return (
    <MasterDataPage
      title="Items"
      table="items"
      columns={[
        { key: "name", label: "Item Name" },
        { key: "nappi_code", label: "Nappi Code" },
        { key: "unit_price", label: "Unit Price", type: "number" },
        { key: "unit_cost", label: "Unit Cost", type: "number" },
        { key: "category", label: "Category" },
        { key: "stock_qty", label: "Stock Qty", type: "number" },
        { key: "reorder_level", label: "Reorder Level", type: "number" },
      ]}
    />
  );
}
