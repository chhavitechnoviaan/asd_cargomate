import FieldSettings from "./FieldSetting";

const fields = [
  { id: 1, label: "Commercial Invoice", enabled: true },
  { id: 2, label: "Packing List", enabled: true },
  { id: 3, label: "MSDS", enabled: true },
  { id: 4, label: "COO", enabled: true },
  { id: 5, label: "IEC/GST", enabled: true },
  { id: 6, label: "Purchase Order", enabled: true },
  { id: 7, label: "Product Certificate", enabled: true },
  { id: 8, label: "Other Documents", enabled: true },
];

export default function DocumentsUploadSetting() {
  return (
    <FieldSettings
      title="Documents Upload Setting"
      subtitle="Manage documents upload files"
      fieldsBoxHeading="Upload Document Field"
      initialFields={fields}
      addButtonLabel="Add new Document field"
      sectionTitlePlaceholder="Documents Uploaded"
      sectionDescPlaceholder="Upload all relevant documents"
      apiEndpoint="/api/documents-upload-settings"
      modalContext="documents"
    />
  );
}