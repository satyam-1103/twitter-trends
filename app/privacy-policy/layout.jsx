import React from "react";
import Navbar from "@/components/Navbar/Navbar";
const PrivacyPolicyLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default PrivacyPolicyLayout;
