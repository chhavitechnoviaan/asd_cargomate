import React from "react";

const ImageIcon = ({ icon }) => {
  if (typeof icon === "string") {
    return <img src={icon} alt="icon" className="w-full h-full" />;
  }

  if (React.isValidElement(icon)) {
    return icon;
  }

  return null;
};

export default ImageIcon;