import FieldSettings from "./FieldSetting";

const fields = [
  { id: 1, label: "Product Name", enabled: true },
  { id: 2, label: "Product description", enabled: true },
  { id: 3, label: "HS Code", enabled: true },
  { id: 4, label: "Product Category", enabled: true },
  { id: 5, label: "Dangerous Goods", enabled: true },
  { id: 6, label: "Temperature Controlled", enabled: true },
  { id: 7, label: "Quantity", enabled: true },
  { id: 8, label: "Unit", enabled: true },
  { id: 9, label: "Net Weight", enabled: true },
  { id: 10, label: "Gross Weight", enabled: true },
  { id: 11, label: "Volumetric Weight", enabled: true },
  { id: 12, label: "No.of Packages", enabled: true },
  { id: 13, label: "Packing Type", enabled: true },
  { id: 14, label: "Battery Included", enabled: true },
  { id: 15, label: "Lithium Battery", enabled: true },
  { id: 16, label: "UN Number (if DG)", enabled: true },
];

export default function ProductDetailsSettings() {
  return (
    <FieldSettings
      title="Product Details Settings"
      subtitle="Manage product details field"
      fieldsBoxHeading="Product details field"
      initialFields={fields}
      sectionBoxHeading="Section settings"
      sectionBoxSubtext="Customize this section"
      sectionTitlePlaceholder="Product name"
      sectionDescPlaceholder="Enter product informatio and specifications"
      apiEndpoint="/api/product-details-settings"
      modalContext="Product details"
    />
  );
}