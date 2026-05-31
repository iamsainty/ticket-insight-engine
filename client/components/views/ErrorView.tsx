import { FiUpload } from "react-icons/fi";

interface ErrorViewProps {
  message: string;
  onReset: () => void;
}

export default function ErrorView({ message, onReset }: ErrorViewProps) {
  return (
    <main className="relative overflow-hidden bg-slate-50 px-6 py-16">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-red-100/40 blur-3xl" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
        <div className="w-full rounded-[28px] border border-slate-200/70 bg-white/90 p-10 shadow-lg backdrop-blur">
          {/* Content */}
          <div className="mt-8 text-center">
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
              Unable to Process Dataset
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-7 text-slate-500">
              Something went wrong while processing your support ticket dataset.
              Please review the error details and try again.
            </p>
          </div>

          {/* Error Box */}
          <div className="mt-8 rounded-2xl border border-red-100 bg-red-50/60 p-5">
            <p className="text-sm font-semibold text-red-600">Error Details</p>

            <p className="mt-2 text-sm leading-6 text-slate-700">{message}</p>
          </div>

          {/* Action */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={onReset}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium border border-black text-black hover:text-white transition-all duration-200 hover:bg-slate-800 active:scale-[0.98]"
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
