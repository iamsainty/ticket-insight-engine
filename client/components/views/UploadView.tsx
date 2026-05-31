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
    <main className="relative overflow-hidden bg-[#f5f7fb]">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-200/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-128px)] max-w-6xl items-center justify-center px-6 py-16">
        <div className="w-full max-w-3xl">
          {/* Heading */}
          <div className="mb-14 text-center">
            <h1 className="mb-5 text-5xl font-bold tracking-[-0.03em] text-slate-900">
              Ticket Insight Engine
            </h1>

            <p className="mx-auto text-md leading-8 text-slate-600">
              Identify recurring problems, analyze trends, and generate insights
              from support ticket data.
            </p>
          </div>

          {/* Upload Container */}
          <div className="rounded-[32px] border border-white/70 bg-white/70 p-4 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`group relative cursor-pointer rounded-[24px] border-2 border-dashed px-10 py-16 transition-all duration-300
              
              ${
                dragActive
                  ? "border-blue-400 bg-blue-50/70"
                  : "border-slate-300/90 hover:border-blue-300 hover:bg-blue-50/30"
              }`}
            >
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

              <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-blue-50/50 via-transparent to-emerald-50/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex flex-col items-center text-center">
                <div className="mb-4 rounded-2xl bg-blue-100/80 p-5 text-blue-600">
                  <FiUploadCloud size={38} />
                </div>

                <p className="mb-2 max-w-xl text-slate-600">
                  Drag and drop your Excel file here or click to browse from
                  your computer.
                </p>

                <p className="text-sm text-slate-400">
                  Supports .xls and .xlsx files
                </p>
              </div>
            </div>

            {file && (
              <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
                    <FiFileText size={20} />
                  </div>

                  <div>
                    <p className="font-medium text-slate-900">{file.name}</p>

                    <p className="text-sm text-slate-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleAnalysis}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
                >
                  Analyze
                  <FiArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
