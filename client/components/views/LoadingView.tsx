export default function LoadingView() {
  return (
    <main className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-[#f5f7fb] px-6">
      <div className="text-center">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          Analyzing Dataset
        </h1>

        <p className="mt-3 text-slate-500">
          Processing ticket data and generating insights...
        </p>
      </div>
    </main>
  );
}
