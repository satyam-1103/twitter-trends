import { useEffect, useState } from "react";
import QuillEditor from "@/components/QuillEditor.jsx"; // Adjust the path as necessary
import axios from "axios";

const AddContentHome = ({ section }) => {
  // States for the title, subtitle, and description
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contentData = {
      title,
      content: [{ subtitle, body: description }], // Adjusted to match the schema
    };

    try {
      setLoading(true);
      // Send data to your API for creating new content
      const response = await axios.post(
        "http://localhost:5000/api/homepage",
        contentData
      );
      console.log("Response:", response.data);

      // Optionally, reset the form or handle the response as needed
      setTitle("");
      setSubtitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating content:", error);
      setError("Failed to create content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-semibold mb-6 text-gray-700 border-b pb-4">
        Add {section} Content
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Title Field */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter title"
            value={title} // Bind state
            onChange={(e) => setTitle(e.target.value)} // Update state on change
          />
        </div>

        <hr className="my-6" />

        {/* Subtitle and Body Section */}
        <h4 className="text-2xl font-medium text-gray-700 mb-4">Content</h4>

        {/* Subtitle Field */}
        <div className="mb-6">
          <label
            htmlFor="subtitle"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Subtitle
          </label>
          <input
            type="text"
            id="subtitle"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter subtitle"
            value={subtitle} // Bind state
            onChange={(e) => setSubtitle(e.target.value)} // Update state on change
          />
        </div>

        {/* Description (Body) Field */}
        <div className="mb-6">
          <label
            htmlFor="body"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Body
          </label>
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <QuillEditor onChange={setDescription} value={description} />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const PrivacyPolicyForm = () => {
  // States for last updated date and description
  const [lastUpdated, setLastUpdated] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Error state
  const [success, setSuccess] = useState("");

  // Automatically set the last updated date when the component loads
  useEffect(() => {
    const currentDate = new Date().toLocaleDateString(); // Format the current date
    setLastUpdated(currentDate); // Set the auto-generated date
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      lastUpdated,
      description,
    };
    // Handle the submission logic here (e.g., sending data to an API)
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await axios.post(
        "http://localhost:5000/api/privacy-policy/",
        data
      );

      setSuccess("Privacy policy submitted successfully.");
    } catch (error) {
      setError("An error occurred while submitting the Privacy Policy");
      console.error("Error submitting privacy policy:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-semibold mb-6 text-gray-700 border-b pb-4">
        Privacy Policy
      </h2>

      {/* Display success or error messages */}
      {success && <p className="text-green-600 mb-4">{success}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Last Updated Field (auto-generated) */}
        <div className="mb-6">
          <label
            htmlFor="last-updated"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Last Updated
          </label>
          <input
            type="text"
            id="last-updated"
            value={lastUpdated} // Bind the auto-generated date
            readOnly // Prevent editing
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
          />
        </div>

        <hr className="my-6" />

        {/* Description Field */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Description
          </label>
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <QuillEditor onChange={setDescription} value={description} />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition-colors"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

const DisclaimerForm = () => {
  // States for last updated date and description
  const [lastUpdated, setLastUpdated] = useState("");
  const [description, setDescription] = useState("");

  // Automatically set the last updated date when the component loads
  useEffect(() => {
    const currentDate = new Date().toLocaleDateString(); // Format the current date
    setLastUpdated(currentDate); // Set the auto-generated date
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { lastUpdated, description };
    console.log("Submitted Data:", data);

    try {
      // Handle the submission logic here (e.g., sending data to an API)
      const response = await axios.post(
        "http://localhost:5000/api/disclaimer/",
        data
      );
      // Handle success response (e.g., show a success message, reset form, etc.)
      console.log("Disclaimer submitted successfully:", response.data);
    } catch (error) {
      console.error("Failed to submit disclaimer:", error);
      // Handle error response (e.g., show an error message)
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-semibold mb-6 text-gray-700 border-b pb-4">
        Disclaimer
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Last Updated Field (auto-generated) */}
        <div className="mb-6">
          <label
            htmlFor="last-updated"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Last Updated
          </label>
          <input
            type="text"
            id="last-updated"
            value={lastUpdated} // Bind the auto-generated date
            readOnly // Prevent editing
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
          />
        </div>

        <hr className="my-6" />

        {/* Description Field */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Description
          </label>
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <QuillEditor onChange={setDescription} value={description} />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};


const TermsAndConditionsForm = () => {
  // States for last updated date and description
  const [lastUpdated, setLastUpdated] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Error state
  const [success, setSuccess] = useState("");

  // Automatically set the last updated date when the component loads
  useEffect(() => {
    const currentDate = new Date().toLocaleDateString(); // Format the current date
    setLastUpdated(currentDate); // Set the auto-generated date
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      lastUpdated,
      description,
    };
    // Handle the submission logic here (e.g., sending data to an API)
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await axios.post(
        "http://localhost:5000/api/terms-conditions/", // Change to your endpoint for Terms and Conditions
        data
      );

      setSuccess("Terms and Conditions submitted successfully.");
    } catch (error) {
      setError("An error occurred while submitting the Terms and Conditions.");
      console.error("Error submitting terms and conditions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-semibold mb-6 text-gray-700 border-b pb-4">
        Terms and Conditions
      </h2>

      {/* Display success or error messages */}
      {success && <p className="text-green-600 mb-4">{success}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Last Updated Field (auto-generated) */}
        <div className="mb-6">
          <label
            htmlFor="last-updated"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Last Updated
          </label>
          <input
            type="text"
            id="last-updated"
            value={lastUpdated} // Bind the auto-generated date
            readOnly // Prevent editing
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
          />
        </div>

        <hr className="my-6" />

        {/* Description Field */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-600 mb-2"
          >
            Description
          </label>
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <QuillEditor onChange={setDescription} value={description} />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition-colors"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export {
  AddContentHome,
  PrivacyPolicyForm,
  DisclaimerForm,
  TermsAndConditionsForm,
};
