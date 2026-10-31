import FieldSettings from "./FieldSetting";

const fields = [
  { id: 1, label: "Freight Charges", enabled: true },
  { id: 2, label: "Customs Duty", enabled: true },
  { id: 3, label: "Handling Charges", enabled: true },
  { id: 4, label: "Insurance Cost", enabled: true },
  { id: 5, label: "Other Charges", enabled: true },
  { id: 6, label: "Total Shipment Cost", enabled: true },
];

export default function ChargesCostDetailsSetting() {
  return (
    <FieldSettings
      currencyVar={true}
      title="Charges & Cost Details Setting"
      subtitle="Manage shipment charges, fees and cost relatable fields"
      fieldsBoxHeading="Charges & Cost Field"
      initialFields={fields}
      addButtonLabel="Add new field"
      sectionTitlePlaceholder="Charges & Cost"
      sectionDescPlaceholder="Configure alerts and automated messages"
      apiEndpoint="/api/charges-cost-details-settings"
      modalContext="charges"
    />
  );
}