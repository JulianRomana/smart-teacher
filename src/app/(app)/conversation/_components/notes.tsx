"use client";

import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

export function Notes() {
  const [content, setContent] = useState("");

  return (
    <div className="flex h-full flex-col p-4" data-color-mode="light">
      <h2 className="mb-4 text-lg font-semibold">Notes</h2>
      <div className="flex-1 overflow-hidden [&_.w-md-editor]:h-full [&_.w-md-editor]:border-input">
        <MDEditor
          value={content}
          onChange={(value) => setContent(value || "")}
          preview="edit"
          height="100%"
        />
      </div>
    </div>
  );
}
