import {
  FiUpload,
  FiDownload,
  FiFileText,
} from "react-icons/fi";

interface ReportViewProps {
  file: File | null;
  reportBlob: Blob | null;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  reportData: any;

  onReset: () => void;
}

export default function ReportView({
  file,
  reportBlob,
  onReset,
}: ReportViewProps) {
  function handleDownload() {
    if (!reportBlob) return;

    const url = window.URL.createObjectURL(reportBlob);

    const link = document.createElement("a");

    link.href = url;

    link.setAttribute("download", "ticket-analysis-report.xlsx");

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  }

  return (
    <main className="relative overflow-hidden bg-slate-50 px-6 py-16">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
        <div className="w-full rounded-[28px] border border-slate-200/70 bg-white/90 p-10 shadow-lg backdrop-blur">
          {/* Header */}
          <div className="text-center">
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">
              Report Ready
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-7 text-slate-500">
              Your support ticket dataset has been processed successfully and
              the AI-generated analysis report is ready to download.
            </p>
          </div>

          {/* Report Card */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-blue-100 p-4 text-blue-600">
                  <FiFileText size={22} />
                </div>

                <div>
                  <p className="text-sm text-slate-400">Generated Report</p>

                  <h2 className="mt-1 text-[15px] font-medium text-slate-800">
                    ticket-analysis-report.xlsx
                  </h2>

                  {file && (
                    <p className="mt-1 text-sm text-slate-500">
                      Generated from {file.name}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
              >
                <FiDownload size={16} />
                Download Report
              </button>
            </div>
          </div>

          {/* Action */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={onReset}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-black px-5 py-3 text-sm font-medium text-black transition-all duration-200 hover:bg-slate-900 hover:text-white active:scale-[0.98]"
            >
              <FiUpload size={16} />
              Upload Another File
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
