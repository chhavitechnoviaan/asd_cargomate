import FieldSettings from "./FieldSetting";

const fields = [
  { id: 1, label: "Freight Charges", enabled: true },
  { id: 2, label: "Customs Duty", enabled: true },
  { id: 3, label: "Handling Charges", enabled: true },
  { id: 4, label: "Insurance Cost", enabled: true },
  { id: 5, label: "Other Charges", enabled: true },
  { id: 6, label: "Total Shipment Cost", enabled: true },
];

export default function CustomsComplianceSettings() {
  return (
    <FieldSettings
      title="Customs & Compliance Settings"
      subtitle="Manage customs, compliance and regulatory shipment fields"
      fieldsBoxHeading="Charges & Cost Fields"
      initialFields={fields}
      addButtonLabel="Add new Document field"
      sectionTitlePlaceholder="Customs & Compliance"
      sectionDescPlaceholder="Configure customs and compliance information"
      apiEndpoint="/api/customs-compliance-settings"
      modalContext="Customs"
    />
  );
}