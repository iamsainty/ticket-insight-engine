export default function Footer() {
  return (
    <footer className="sticky bottom-0 border-t border-slate-200 bg-white">
      <div className="mx-auto flex flex-col items-center justify-between gap-3 px-5 py-5 text-sm md:max-w-6xl md:flex-row md:px-8">
        {/* Left */}
        <p className="text-slate-500">© 2026 Ticket Insight Engine</p>

        {/* Right */}
        <div className="flex items-center gap-1.5 text-slate-500">
          <address className="not-italic font-medium">
            Designed and Developed with &hearts; by{" "}
            <a
              href="https://www.heysainty.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              Priyanshu Chaurasiya
            </a>
          </address>
        </div>
      </div>
    </footer>
  );
}
