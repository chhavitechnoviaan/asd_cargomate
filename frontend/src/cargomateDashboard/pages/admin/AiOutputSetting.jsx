import FieldSettings from "./FieldSetting";

const fields = [
  { id: 1, label: "Suggest HS Code", enabled: true },
  { id: 2, label: "Required Documents", enabled: true },
  { id: 3, label: "Freight Estimate", enabled: true },
  { id: 4, label: "RoDTEP/Incentive", enabled: true },
  { id: 5, label: "Compliance Requirement", enabled: true },
  { id: 6, label: "Risk Score", enabled: true },
  { id: 7, label: "Estimated Timeline", enabled: true },
  { id: 8, label: "Recommended Actions", enabled: true },
];

export default function AIOutputSetting() {
  return (
    <FieldSettings
      title="AI Output Setting"
      subtitle="Manage AI output & analysis fields."
      fieldsBoxHeading="AI Output Fields"
      initialFields={fields}
      addButtonLabel="Add new Document field"
      highlightFieldsBox
      sectionTitlePlaceholder="AI output after analysis"
      sectionDescPlaceholder="AI generated insights and recommdations"
      apiEndpoint="/api/ai-output-settings"
      modalContext="AI output"
    />
  );
}