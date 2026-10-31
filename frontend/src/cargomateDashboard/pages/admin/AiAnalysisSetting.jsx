import FieldSettings from "./FieldSetting";

const fields = [
  { id: 1, label: "Suggested Cargo Value", type: "Currency", typeColor: "text-blue-600", enabled: true },
  { id: 2, label: "Estimated Freight Cost", type: "Number", typeColor: "text-blue-600", enabled: true },
  { id: 3, label: "Recommended Route", type: "Currency", typeColor: "text-blue-600", enabled: true },
  { id: 4, label: "Estimated Transit Time", type: "Score", typeColor: "text-green-600", enabled: true },
  { id: 5, label: "Shipment Summary", type: "Number", typeColor: "text-green-600", enabled: true },
];

export default function AIAnalysisSettings() {
  return (
    <FieldSettings
      title="AI Analysis Settings"
      subtitle="Manage and customize AI-generated analysis fields."
      fieldsBoxHeading="Field Management"
      fieldsBoxSubtext="Shipment Analysis"
      initialFields={fields}
      sectionBoxHeading={null}
      sectionBoxSubtext="Customize this section"
      sectionTitlePlaceholder="Ai output after analysis"
      sectionDescPlaceholder="Configure AI-generated analysis results"
      apiEndpoint="/api/ai-analysis-settings"
      modalContext="AI analysis"
    />
  );
}