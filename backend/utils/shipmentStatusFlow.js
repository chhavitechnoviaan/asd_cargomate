const shipmentStatusFlow = {

    "Draft": [
      "Submitted"
    ],
  
    "Submitted": [
        "Approved",
        "Correction Required"
      ],
  
    "Approved": [
      "Carrier Assigned"
    ],
  
    "Carrier Assigned": [
      "Pickup Scheduled"
    ],
  
    "Pickup Scheduled": [
      "Picked Up"
    ],
  
    "Picked Up": [
      "Warehouse Received"
    ],
  
    "Warehouse Received": [
      "Customs Documentation"
    ],
  
    "Customs Documentation": [
      "Customs Clearance"
    ],
  
    "Customs Clearance": [
      "In Transit"
    ],
  
    "In Transit": [
      "Arrived at Destination"
    ],
  
    "Arrived at Destination": [
      "Out for Delivery"
    ],
  
    "Out for Delivery": [
      "Delivered"
    ],
  
    "Delivered": [
      "Closed"
    ],
  
    "Closed": []
  
  };
  const canMoveToStatus = (currentStatus, nextStatus) => {

    const allowedStatus = shipmentStatusFlow[currentStatus] || [];
  
    return allowedStatus.includes(nextStatus);
  
  };

  
  module.exports = {
    shipmentStatusFlow,
    canMoveToStatus
  };

