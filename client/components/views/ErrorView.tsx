import { FiAlertTriangle } from "react-icons/fi";

interface ErrorViewProps {
  message: string;
  onReset: () => void;
}

export default function ErrorView({ message, onReset }: ErrorViewProps) {
  return (
    <main className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-[#f5f7fb] px-6">
      <div className="w-full max-w-lg rounded-3xl border border-red-100 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
          <FiAlertTriangle size={28} />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          Something went wrong
        </h1>

        <p className="mt-3 leading-7 text-slate-600">{message}</p>

        <button
          onClick={onReset}
          className="mt-8 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
