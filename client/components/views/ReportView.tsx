interface ReportViewProps {
  file: File | null;
  onReset: () => void;
}

export default function ReportView({ file, onReset }: ReportViewProps) {
  return (
    <main className="min-h-[calc(100vh-128px)] bg-[#f5f7fb] px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">
                Analysis Complete
              </p>

              <h1 className="mt-2 text-4xl font-bold text-slate-900">
                Dataset Processed Successfully
              </h1>

              <p className="mt-3 text-slate-600">
                Your ticket dataset has been analyzed successfully.
              </p>
            </div>

            <button
              onClick={onReset}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Upload Another File
            </button>
          </div>

          {/* File Info */}
          {file && (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Uploaded Dataset</p>

              <div className="mt-2 flex items-center justify-between">
                <p className="font-medium text-slate-900">{file.name}</p>

                <p className="text-sm text-slate-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}

          {/* Mock Stats */}
          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Tickets</p>

              <h3 className="mt-2 text-3xl font-bold text-slate-900">4,281</h3>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Categories</p>

              <h3 className="mt-2 text-3xl font-bold text-slate-900">12</h3>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Recurring Issues</p>

              <h3 className="mt-2 text-3xl font-bold text-slate-900">34</h3>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">High Priority</p>

              <h3 className="mt-2 text-3xl font-bold text-slate-900">118</h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
