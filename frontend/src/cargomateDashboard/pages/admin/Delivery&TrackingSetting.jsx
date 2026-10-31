import FieldSettings from "./FieldSetting";

const fields = [
  { id: 1, label: "Tracking Number", type: "Text", enabled: true },
  { id: 2, label: "Shipment Status", type: "Text", enabled: true },
  { id: 3, label: "Estimated Delivery Date", type: "Text", enabled: true },
  { id: 4, label: "Actual Delivery Date", type: "Text", enabled: true },
  { id: 5, label: "Delivery Location", type: "Text", enabled: true },
  { id: 6, label: "Carrier Updates", type: "Text", enabled: true },
];

export default function DeliveryTrackingSettings() {
  return (
    <FieldSettings
     validationVar={true}
      title="Delivery & Tracking Settings"
      subtitle="Manage delivery status, tracking and shipment milestones"
      fieldsBoxHeading="Delivery & Tracking Fields"
      initialFields={fields}
      addButtonLabel="Add new field"
      sectionTitlePlaceholder="Delivery & Tracking"
      sectionDescPlaceholder="Configure delivery and shipment tracking"
      apiEndpoint="/api/delivery-tracking-settings"
      modalContext="delivery"
    />
  );
}