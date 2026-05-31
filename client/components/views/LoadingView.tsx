export default function LoadingView() {
  return (
    <main className="relative overflow-hidden bg-slate-50 px-6 py-16">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
        <div className="w-full rounded-[28px] border border-slate-200/70 bg-white/90 p-10 text-center shadow-lg backdrop-blur">
          {/* Loader */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50">
            <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-blue-200 border-t-blue-600" />
          </div>

          {/* Content */}
          <h1 className="mt-8 text-3xl font-semibold tracking-tight text-slate-900">
            Analyzing Dataset
          </h1>

          <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-slate-500">
            Processing support ticket data, identifying recurring issues, and
            generating AI-powered operational insights.
          </p>

          {/* Progress Steps */}
          <div className="mt-8 space-y-3 text-left">
            {[
              "Reading Excel dataset",
              "Preprocessing ticket data",
              "Generating AI insights",
            ].map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3"
              >
                <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-500" />

                <p className="text-sm text-slate-600">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
