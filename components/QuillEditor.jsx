import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Add styles for the editor

const QuillEditor = ({ value, onChange }) => {
  // Define a custom toolbar with fewer options
  const modules = {
    toolbar: [
      [{ bold: true, italic: true, underline: true, strike: true }], // Bold, Italic, Underline, Strikethrough
      [{ list: "ordered" }, { list: "bullet" }], // Ordered list, bullet list
      [{ align: [] }], // Text alignment (left, center, right, justify)
      ["image"], // Image upload
      [{ clean: true }], // Add a 'clean' button to remove formatting
    ],
  };

  return (
    <div className="text-editor">
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules} // Apply custom toolbar
        theme="snow"
        style={{ height: "150px" }} // Adjust height to prevent large spacing
      />
    </div>
  );
};

export default QuillEditor;
