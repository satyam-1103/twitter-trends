import { useState, useEffect } from "react";
import axios from "axios";

const ViewContentDisclaimer = ({ section }) => {
  const [contentData, setContentData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editedLastUpdated, setEditedLastUpdated] = useState(""); // Last Updated field
  const [editedDescription, setEditedDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // Fetch disclaimer data from the API when the component mounts
  useEffect(() => {
    const fetchDisclaimers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/disclaimer/"
        );
        setContentData(response.data.response); // Set the API response data to contentData
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch disclaimers data.");
        setLoading(false);
      }
    };

    fetchDisclaimers();
  }, []);

  // Edit and save logic
  const handleEdit = (item) => {
    setCurrentItem(item);
    setEditedLastUpdated(item.lastUpdated); // Assuming lastUpdated is what you're editing
    setEditedDescription(item.description);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (currentItem) {
      setSaving(true);
      try {
        const response = await axios.put(
          `http://localhost:5000/api/disclaimer/${currentItem._id}`,
          {
            lastUpdated: editedLastUpdated,
            description: editedDescription,
          }
        );

        // Update the local state after successful API call
        const updatedData = contentData.map((item) =>
          item._id === currentItem._id
            ? {
                ...item,
                lastUpdated: editedLastUpdated,
                description: editedDescription,
              }
            : item
        );
        setContentData(updatedData);
        setIsEditing(false);
        setCurrentItem(null);
        setEditedLastUpdated("");
        setEditedDescription("");
      } catch (error) {
        console.error("Failed to save disclaimer:", error);
        setError("Failed to save disclaimer.");
      } finally {
        setSaving(false);
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/disclaimer/${id}`);
        setContentData(contentData.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Failed to delete disclaimer:", error);
        setError("Failed to delete disclaimer.");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">View {section} Content</h2>

      {/* Content Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Last Updated</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contentData.map((item) => (
            <tr key={item._id}>
              <td className="py-2 px-4 border">{item.lastUpdated}</td>
              <td className="py-2 px-4 border">{item.description}</td>
              <td className="py-2 px-4 border flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)} // Make sure you're using _id
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Edit {section} Item</h3>
            <div>
              <label className="block mb-2">Last Updated</label>
              <input
                type="text"
                value={editedLastUpdated}
                onChange={(e) => setEditedLastUpdated(e.target.value)}
                className="border rounded w-full px-3 py-2 mb-4"
              />
              <label className="block mb-2">Description</label>
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="border rounded w-full px-3 py-2 mb-4"
              ></textarea>
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ViewContentPrivacyPolicy = ({ section }) => {
  const [contentData, setContentData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // Fetch privacy policy data from the API when the component mounts
  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/privacy-policy/"
        );
        setContentData(response.data.response); // Set the API response data to contentData
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch privacy policy data.");
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  // Edit and save logic
  const handleEdit = (item) => {
    setCurrentItem(item);
    setEditedTitle(item.lastUpdated); // Assuming lastUpdated is what you're editing
    setEditedDescription(item.description);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (currentItem) {
      setSaving(true);
      try {
        const response = await axios.put(
          `http://localhost:5000/api/privacy-policy/${currentItem._id}`,
          {
            lastUpdated: editedTitle, // Change to editedTitle if it's Last Updated
            description: editedDescription,
          }
        );

        // Update the local state after successful API call
        const updatedData = contentData.map((item) =>
          item._id === currentItem._id
            ? {
                ...item,
                lastUpdated: editedTitle,
                description: editedDescription,
              }
            : item
        );
        setContentData(updatedData);
        setIsEditing(false);
        setCurrentItem(null);
        setEditedTitle("");
        setEditedDescription("");
      } catch (error) {
        console.error("Failed to save privacy policy:", error);
        setError("Failed to save privacy policy.");
      } finally {
        setSaving(false);
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/privacy-policy/${id}`);
        setContentData(contentData.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Failed to delete privacy policy:", error);
        setError("Failed to delete privacy policy.");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">View {section} Content</h2>

      {/* Content Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Last Updated</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contentData.map((item) => (
            <tr key={item._id}>
              <td className="py-2 px-4 border">{item.lastUpdated}</td>
              <td className="py-2 px-4 border">{item.description}</td>
              <td className="py-2 px-4 border flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)} // Make sure you're using _id
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Edit {section} Item</h3>
            <div>
              <label className="block mb-2">Last Updated</label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="border rounded w-full px-3 py-2 mb-4"
              />
              <label className="block mb-2">Description</label>
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="border rounded w-full px-3 py-2 mb-4"
              ></textarea>
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ViewContentTermsAndConditions = ({ section }) => {
  const [contentData, setContentData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editedTitle, setEditedTitle] = useState(""); // Last Updated field
  const [editedDescription, setEditedDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // Fetch terms and conditions data from the API when the component mounts
  useEffect(() => {
    const fetchTermsAndConditions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/terms-conditions/"
        );
        setContentData(response.data.response); // Set the API response data to contentData
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch terms and conditions data.");
        setLoading(false);
      }
    };

    fetchTermsAndConditions();
  }, []);

  // Edit and save logic
  const handleEdit = (item) => {
    setCurrentItem(item);
    setEditedTitle(item.lastUpdated); // Assuming lastUpdated is what you're editing
    setEditedDescription(item.description);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (currentItem) {
      setSaving(true);
      try {
        const response = await axios.put(
          `http://localhost:5000/api/terms-conditions/${currentItem._id}`,
          {
            lastUpdated: editedTitle, // Change to editedTitle if it's Last Updated
            description: editedDescription,
          }
        );

        // Update the local state after successful API call
        const updatedData = contentData.map((item) =>
          item._id === currentItem._id
            ? {
                ...item,
                lastUpdated: editedTitle,
                description: editedDescription,
              }
            : item
        );
        setContentData(updatedData);
        setIsEditing(false);
        setCurrentItem(null);
        setEditedTitle("");
        setEditedDescription("");
      } catch (error) {
        console.error("Failed to save terms and conditions:", error);
        setError("Failed to save terms and conditions.");
      } finally {
        setSaving(false);
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/terms-conditions/${id}`);
        setContentData(contentData.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Failed to delete terms and conditions:", error);
        setError("Failed to delete terms and conditions.");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">View {section} Content</h2>

      {/* Content Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Last Updated</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contentData.map((item) => (
            <tr key={item._id}>
              <td className="py-2 px-4 border">{item.lastUpdated}</td>
              <td className="py-2 px-4 border">{item.description}</td>
              <td className="py-2 px-4 border flex space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)} // Make sure you're using _id
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Edit {section} Item</h3>
            <div>
              <label className="block mb-2">Last Updated</label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="border rounded w-full px-3 py-2 mb-4"
              />
              <label className="block mb-2">Description</label>
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="border rounded w-full px-3 py-2 mb-4"
              ></textarea>
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ViewContentHomePage = ({ section }) => {
  const [contentData, setContentData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [editedSubtitle, setEditedSubtitle] = useState("");
  const [editedBody, setEditedBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // Fetch homepage data from the API when the component mounts
  useEffect(() => {
    const fetchHomepageContent = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/homepage/");
        setContentData(response.data.response); // Set the API response data to contentData
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch homepage content data.");
        setLoading(false);
      }
    };

    fetchHomepageContent();
  }, []);

  // Edit and save logic
  const handleEdit = (item) => {
    setCurrentItem(item);
    setEditedSubtitle(item.content[0]?.subtitle || ""); // Assuming there's only one content item
    setEditedBody(item.content[0]?.body || ""); // Assuming there's only one content item
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (currentItem) {
      setSaving(true);
      try {
        const response = await axios.put(
          `http://localhost:5000/api/homepage/${currentItem._id}`,
          {
            content: [{ title, subtitle: editedSubtitle, body: editedBody }], // Update content structure
          }
        );

        // Update the local state after successful API call
        const updatedData = contentData.map((item) =>
          item._id === currentItem._id
            ? {
                ...item,
                content: [
                  { title, subtitle: editedSubtitle, body: editedBody },
                ],
              }
            : item
        );
        setContentData(updatedData);
        setIsEditing(false);
        setCurrentItem(null);
        setEditedSubtitle("");
        setEditedBody("");
      } catch (error) {
        console.error("Failed to save homepage content:", error);
        setError("Failed to save homepage content.");
      } finally {
        setSaving(false);
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/homepage/${id}`);
        setContentData(contentData.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Failed to delete homepage content:", error);
        setError("Failed to delete homepage content.");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">View {section} Content</h2>

      {/* Content Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">Subtitle</th>
            <th className="py-2 px-4 border">Body</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contentData.map((item) =>
            item.content.map((contentItem, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border">{item.title}</td>{" "}
                {/* Access title from item */}
                <td className="py-2 px-4 border">{contentItem.subtitle}</td>
                <td className="py-2 px-4 border">{contentItem.body}</td>
                <td className="py-2 px-4 border flex space-x-2">
                  <button
                    onClick={() => handleEdit(contentItem)} // Use contentItem for editing
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)} // Use item._id for deletion
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Edit {section} Item</h3>
            <div>
              <label className="block mb-2">Subtitle</label>
              <input
                type="text"
                value={editedSubtitle}
                onChange={(e) => setEditedSubtitle(e.target.value)}
                className="border rounded w-full px-3 py-2 mb-4"
              />
              <label className="block mb-2">Body</label>
              <textarea
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
                className="border rounded w-full px-3 py-2 mb-4"
              ></textarea>
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export {
  ViewContentPrivacyPolicy,
  ViewContentHomePage,
  ViewContentTermsAndConditions,
  ViewContentDisclaimer,
};
