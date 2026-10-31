import FieldSettings from "./FieldSetting";

const fields = [
  { id: 1, label: "Shipment Status Update", enabled: true },
  { id: 2, label: "Document Upload Reminder", enabled: true },
  { id: 3, label: "Compliance Alert", enabled: true },
  { id: 4, label: "High Risk Alert", enabled: true },
  { id: 5, label: "ETA Delay Alert", enabled: true },
  { id: 6, label: "AI Analysis Completed", enabled: true },
  { id: 7, label: "Estimated Timeline", enabled: true },
  { id: 8, label: "Recommended Actions", enabled: true },
];

export default function NotificationsAlertsSettings() {
  return (
    <FieldSettings
      currencyVar={true}
      title="Notifications & Alerts Settings"
      subtitle="Configure system notifications and automated alerts"
      titleUnderline
      fieldsBoxHeading="Notification Rules"
      initialFields={fields}
      addButtonLabel="Add new Document field"
      sectionTitlePlaceholder="Notifications & Alerts"
      sectionDescPlaceholder="Configure alerts and automated messages"
      apiEndpoint="/api/notifications-alerts-settings"
      modalContext="notification"
    />
  );
}