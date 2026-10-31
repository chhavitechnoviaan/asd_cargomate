import FieldSettings from "./FieldSetting";

const fields = [
  { id: 1, label: "User Name", enabled: true },
  { id: 2, label: "Activity Type", enabled: true },
  { id: 3, label: "Module", enabled: true },
  { id: 4, label: "Action", enabled: true },
  { id: 5, label: "Date & Time", enabled: true },
  { id: 6, label: "IP Address", enabled: true },
];

export default function ActivityLogsAuditSettings() {
  return (
    <FieldSettings
      title="Activity Logs & Audit settings"
      subtitle="Manage system activity tracking and audit information"
      fieldsBoxHeading="Activity & Audit Settings"
      initialFields={fields}
      sectionTitlePlaceholder="Activity tracking"
      sectionDescPlaceholder="Track user actions and system activities"
      apiEndpoint="/api/activity-logs-settings"
      modalContext="activity logs"
    />
  );
}