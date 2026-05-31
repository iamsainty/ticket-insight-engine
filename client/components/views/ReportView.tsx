import {
  FiCheckCircle,
  FiUpload,
  FiDownload,
  FiFileText,
} from "react-icons/fi";

interface ReportViewProps {
  file: File | null;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  reportData: any;

  onReset: () => void;
}

export default function ReportView({ file, onReset }: ReportViewProps) {
  return (
    <main className="min-h-[calc(100vh-128px)] bg-[#f5f7fb] px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[32px] border border-slate-200/80 bg-white p-10 shadow-sm">
          {/* Success Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
            <FiCheckCircle size={16} />
            Analysis Complete
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-bold tracking-[-0.03em] text-slate-900">
            Report Generated Successfully
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Your ticket dataset has been processed successfully and the
            generated Excel report has been downloaded to your device.
          </p>

          {/* Dataset Info */}
          {file && (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                  <FiFileText size={20} />
                </div>

                <div className="flex-1">
                  <p className="text-sm text-slate-500">Uploaded Dataset</p>

                  <div className="mt-1 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                    <p className="font-medium text-slate-900">{file.name}</p>

                    <p className="text-sm text-slate-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success Info */}
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
                  <FiCheckCircle size={18} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Processing Completed
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Dataset preprocessing, AI analysis, embeddings, clustering,
                    and report generation completed successfully.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                  <FiDownload size={18} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Report Downloaded
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    The generated Excel report has been downloaded automatically
                    to your device.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
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
