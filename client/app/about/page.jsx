import {
    FiUploadCloud,
    FiCpu,
    FiFileText,
    FiShield,
  } from "react-icons/fi";
  
  export default function AboutPage() {
    return (
      <main className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-24">
  
            <div className="mt-8 max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
                AI-powered support ticket clustering
              </div>
  
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl md:leading-tight">
                Understand recurring support issues faster
              </h1>
  
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Ticket Insight Engine analyzes support ticket datasets and groups
                similar issues together using semantic AI embeddings and
                clustering.
              </p>
  
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Instead of manually reviewing thousands of records, teams can
                quickly identify patterns, repeated incidents, and operational
                bottlenecks through automated analysis.
              </p>
            </div>
          </div>
        </section>
  
        {/* Simple explanation */}
        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <h2 className="text-xl font-semibold text-slate-900">
                Why it matters
              </h2>
  
              <p className="mt-5 leading-8 text-slate-600">
                Large support datasets often contain many tickets describing the
                same problem in different ways. Reviewing them manually takes
                time, creates repetition, and makes it difficult to spot trends.
              </p>
            </div>
  
            <div className="rounded-3xl border border-slate-200 bg-white p-8">
              <h2 className="text-xl font-semibold text-slate-900">
                What the engine does
              </h2>
  
              <p className="mt-5 leading-8 text-slate-600">
                The platform preprocesses ticket text, generates semantic
                embeddings, and automatically groups related incidents into
                meaningful clusters for easier analysis.
              </p>
            </div>
          </div>
        </section>
  
        {/* Flow */}
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                Simple processing flow
              </h2>
  
              <p className="mt-4 leading-8 text-slate-600">
                The workflow is designed to stay minimal, fast, and easy to
                understand.
              </p>
            </div>
  
            <div className="mt-12 space-y-4">
              {[
                "Upload support ticket dataset",
                "Validate and preprocess ticket content",
                "Generate semantic embeddings",
                "Measure similarity across records",
                "Cluster related incidents together",
                "Generate downloadable Excel insights",
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm text-white">
                    {index + 1}
                  </div>
  
                  <p className="text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Usage */}
        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              How to use
            </h2>
  
            <p className="mt-4 leading-8 text-slate-600">
              Upload your dataset and let the engine handle the analysis.
            </p>
          </div>
  
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <FiUploadCloud size={20} />,
                title: "Upload",
                desc: "Upload an Excel file containing support tickets.",
              },
              {
                icon: <FiCpu size={20} />,
                title: "Analyze",
                desc: "The engine processes and groups related issues automatically.",
              },
              {
                icon: <FiFileText size={20} />,
                title: "Download",
                desc: "Export the generated report with clustered insights.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 bg-white p-8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  {item.icon}
                </div>
  
                <h3 className="mt-5 text-lg font-medium text-slate-900">
                  {item.title}
                </h3>
  
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
  
        {/* Privacy */}
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                <FiShield size={20} />
              </div>
  
              <div className="max-w-3xl">
                <h2 className="text-xl font-semibold text-slate-900">
                  Privacy & temporary storage
                </h2>
  
                <p className="mt-4 leading-8 text-slate-600">
                  Uploaded files and generated reports are stored temporarily
                  during processing and automatically removed once the workflow is
                  completed.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }