import {
  FiCheckCircle,
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
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white/90 shadow-xl backdrop-blur">
          {/* Top Banner */}
          <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-white to-blue-50 px-10 py-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700">
              <FiCheckCircle size={16} />
              Analysis Complete
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900">
              Ticket Insight Report is Ready
            </h1>

            <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">
              Your ticket dataset has been processed successfully. The generated
              report is ready to download.
            </p>
          </div>

          <div className="p-10">
            {/* Report Card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-blue-100 p-4 text-blue-600">
                    <FiFileText size={24} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-slate-500">
                      Generated Report
                    </p>

                    <h2 className="text-xl font-semibold text-slate-900">
                      ticket-analysis-report.xlsx
                    </h2>

                    {file && (
                      <p className="text-sm text-slate-500">
                        Generated from {file.name}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleDownload}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-medium text-white shadow-sm transition duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98] cursor-pointer"
                >
                  <FiDownload size={18} />
                  Download Report
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={onReset}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition duration-200 hover:bg-slate-50 hover:shadow-sm"
              >
                <FiUpload size={16} />
                Upload Another File
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
