import { RefObject } from "react";
import { FiUploadCloud, FiFileText, FiArrowRight } from "react-icons/fi";

interface UploadViewProps {
  inputRef: RefObject<HTMLInputElement | null>;
  file: File | null;
  dragActive: boolean;
  setDragActive: (value: boolean) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleFileSelect: (file: File) => void;
  handleAnalysis: () => void;
}

export default function UploadView({
  inputRef,
  file,
  dragActive,
  setDragActive,
  handleDrop,
  handleFileSelect,
  handleAnalysis,
}: UploadViewProps) {
  return (
    <main className="relative overflow-hidden bg-slate-50 px-6 py-16">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
        <div className="w-full rounded-[28px] border border-slate-200/70 bg-white/90 shadow-lg backdrop-blur">
          {/* Header */}
          <div className="px-8 pt-10 text-center">
            <h1 className="mt-5 text-3xl font-semibold leading-wide text-slate-900">
              Ticket Insight Engine
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-7 text-slate-500">
              Upload your support ticket dataset to discover recurring issues
              and generate AI-powered operational insights.
            </p>
          </div>

          {/* Upload Area */}
          <div className="p-8">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`cursor-pointer rounded-[24px] border border-dashed p-8 transition-all duration-200
              
              ${
                dragActive
                  ? "border-blue-300 bg-blue-50/70"
                  : "border-slate-300 bg-slate-50/80 hover:border-blue-200 hover:bg-blue-50/40"
              }`}
            >
              {/* Hidden Input */}
              <input
                ref={inputRef}
                type="file"
                accept=".xls,.xlsx"
                className="hidden"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];

                  if (selectedFile) {
                    handleFileSelect(selectedFile);
                  }
                }}
              />

              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500 text-white">
                  <FiUploadCloud size={30} />
                </div>

                <div className="flex flex-1 flex-col">
                  <h3 className="text-lg tracking-tight text-slate-900">
                    Upload Excel File
                  </h3>

                  <p className="text-sm leading-6 text-slate-600">
                    Drag and drop your Excel file here or click to browse from
                    your computer.
                  </p>

                  <div className="mt-2 inline-flex w-fit items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    Supports .xls and .xlsx formats
                  </div>
                </div>
              </div>
            </div>

            {/* Selected File */}
            {file && (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-4">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
                      <FiFileText size={18} />
                    </div>

                    <div>
                      <p className="text-sm text-slate-400">Selected Dataset</p>

                      <h3 className="mt-1 text-[15px] font-medium text-slate-800">
                        {file.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleAnalysis}
                    className="inline-flex cursor-pointer gap-2 px-5 py-3 text-sm font-medium items-center justify-center rounded-2xl bg-blue-500 text-white"
                  >
                    Analyze Dataset
                    <FiArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
