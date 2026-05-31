"use client";

import LoadingView from "@/components/views/LoadingView";
import ReportView from "@/components/views/ReportView";
import UploadView from "@/components/views/UploadView";
import { useRef, useState } from "react";
import { uploadDataset } from "@/lib/api/upload";
import ErrorView from "@/components/views/ErrorView";

type ViewState = "upload" | "loading" | "report" | "error";

export default function HomePage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [view, setView] = useState<ViewState>("upload");

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [reportData, setReportData] = useState<any>(null);
  const [reportBlob, setReportBlob] = useState<Blob | null>(null);

  const [errorMessage, setErrorMessage] = useState("");

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

  async function handleAnalysis() {
    if (!file) return;

    try {
      setView("loading");

      const response = await uploadDataset(file);

      const contentType = String(response.headers["content-type"] || "");

      // If backend returned JSON error
      if (contentType.includes("application/json")) {
        const errorText = await response.data.text();

        const errorData = JSON.parse(errorText);

        setErrorMessage(errorData?.message || "Failed to process dataset.");

        setView("error");

        return;
      }

      // Successful excel blob
      const blob = new Blob([response.data]);

      setReportBlob(blob);

      setView("report");
    } catch (error) {
      console.error(error);

      setErrorMessage("Something went wrong while processing the dataset.");

      setView("error");
    }
  }

  if (view === "loading") {
    return <LoadingView />;
  }

  if (view === "report") {
    return (
      <ReportView
        file={file}
        reportBlob={reportBlob}
        reportData={reportData}
        onReset={() => {
          setFile(null);
          setReportBlob(null);
          setReportData(null);
          setView("upload");
        }}
      />
    );
  }

  if (view === "error") {
    return (
      <ErrorView
        message={errorMessage}
        onReset={() => {
          setFile(null);
          setErrorMessage("");
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
