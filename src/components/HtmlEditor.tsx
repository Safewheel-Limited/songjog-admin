import { HtmlEditorFormats, HtmlEditorModule } from "@/common/utils";
import React from "react";
import ReactQuill from "react-quill";

const HtmlEditor = ({
  editorValue,
  setEditorValue,
}: {
  editorValue: string;
  setEditorValue: (value: string) => void;
}) => {
  const handleChange = (value: string) => {
    setEditorValue(value);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <ReactQuill
        theme="snow"
        value={editorValue}
        onChange={handleChange}
        modules={HtmlEditorModule}
        formats={HtmlEditorFormats}
      />
    </div>
  );
};

export default HtmlEditor;
