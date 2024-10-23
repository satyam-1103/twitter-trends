import React from "react";

const AdminSidebar = ({ selectedSection, setSelectedSection, onLogout }) => {
  return (
    <div className="w-64 bg-gray-800 text-white">
      <ul>
        <li
          className={`p-4 ${
            selectedSection === "homepage-view" ? "bg-gray-600" : ""
          }`}
          onClick={() => setSelectedSection("homepage-view")}
        >
          View Homepage Content
        </li>
        <li
          className={`p-4 ${
            selectedSection === "homepage-add" ? "bg-gray-600" : ""
          }`}
          onClick={() => setSelectedSection("homepage-add")}
        >
          Add Homepage Content
        </li>
        <li
          className={`p-4 ${
            selectedSection === "privacy-policy-view" ? "bg-gray-600" : ""
          }`}
          onClick={() => setSelectedSection("privacy-policy-view")}
        >
          View Privacy Policy
        </li>
        <li
          className={`p-4 ${
            selectedSection === "privacy-policy-add" ? "bg-gray-600" : ""
          }`}
          onClick={() => setSelectedSection("privacy-policy-add")}
        >
          Add Privacy Policy
        </li>
        <li className="p-4 cursor-pointer" onClick={onLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
