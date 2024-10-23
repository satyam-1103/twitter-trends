"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AdminSidebar from "@/components/adminSidebar/AdminSidebar";
import {
  ViewContentDisclaimer,
  ViewContentHomePage,
  ViewContentPrivacyPolicy,
  ViewContentTermsAndConditions,
} from "@/components/ViewContent/ViewContent";
import {
  AddContentHome,
  DisclaimerForm,
  PrivacyPolicyForm,
  TermsAndConditionsForm,
} from "@/components/AddContent/AddContent";

const Admin = () => {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState("homepage-view");
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />

      {/* Main Content Area */}
      <div className="flex-grow p-8 bg-gray-100">
        {selectedSection === "homepage-view" && (
          <ViewContentHomePage section="Homepage" />
        )}
        {selectedSection === "homepage-add" && (
          <AddContentHome section="Homepage" />
        )}
        {selectedSection === "privacy-policy-view" && (
          <ViewContentPrivacyPolicy section="Privacy Policy" />
        )}
        {selectedSection === "privacy-policy-add" && (
          <PrivacyPolicyForm section="Privacy Policy" />
        )}
        {selectedSection === "disclaimer-view" && (
          <ViewContentDisclaimer section="Disclaimer" />
        )}
        {selectedSection === "disclaimer-add" && (
          <DisclaimerForm section="Disclaimer" />
        )}
        {selectedSection === "terms-view" && (
          <ViewContentTermsAndConditions section="Terms and Conditions" />
        )}
        {selectedSection === "terms-add" && (
          <TermsAndConditionsForm section="Terms and Conditions" />
        )}
      </div>
    </div>
  );
};

export default Admin;
