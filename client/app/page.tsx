"use client";

import LoadingView from "@/components/views/LoadingView";
import ReportView from "@/components/views/ReportView";
import UploadView from "@/components/views/UploadView";
import { useRef, useState } from "react";

type ViewState = "upload" | "loading" | "report";

export default function HomePage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [view, setView] = useState<ViewState>("upload");

  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  function handleFileSelect(selectedFile: File) {
    setFile(selectedFile);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  }

  function handleAnalysis() {
    if (!file) return;

    setView("loading");

    setTimeout(() => {
      setView("report");
    }, 2000);
  }

  if (view === "loading") {
    return <LoadingView />;
  }

  if (view === "report") {
    return (
      <ReportView
        file={file}
        onReset={() => {
          setFile(null);
          setView("upload");
        }}
      />
    );
  }

  return (
    <UploadView
      inputRef={inputRef}
      file={file}
      dragActive={dragActive}
      setDragActive={setDragActive}
      handleDrop={handleDrop}
      handleFileSelect={handleFileSelect}
      handleAnalysis={handleAnalysis}
    />
  );
}
