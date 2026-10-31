import FieldSettings from "./FieldSetting";

const fields = [
  { id: 1, label: "Quotation Number", type: "Text", enabled: true },
  { id: 2, label: "Quotation Date", type: "Date", enabled: true },
  { id: 3, label: "Valid Until", type: "Date", enabled: true },
  { id: 4, label: "Freight Cost", type: "Currency", enabled: true },
  { id: 5, label: "Additional Charges", type: "Date", enabled: true },
  { id: 6, label: "Approval Status", type: "Date", enabled: true },
];

export default function QuotationApprovalSettings() {
  return (
    <FieldSettings
      title="Quotation & Approval Settings"
      subtitle="Manage quotation fields and customer approval workflow"
      fieldsBoxHeading="Quotation & Approval Fields"
      initialFields={fields}
      addButtonLabel="Add new Document field"
      sectionTitlePlaceholder="Quotation & Approval"
      sectionDescPlaceholder="Configure quotation and approval workflow"
      apiEndpoint="/api/quotation-approval-settings"
      modalContext="quotation"
    />
  );
}