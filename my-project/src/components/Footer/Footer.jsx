import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h4 className="text-lg font-bold text-gray-800"> Kochi Metro Rail — KMRL</h4>
            <p className="text-sm font-bold text-gray-700">📄 SIH 2025 demo • Document Summarizer & Compliance</p>
          </div>

          <div className="flex items-center gap-4">
            <a className="text-sm font-bold hover:underline text-gray-800" href="https://kochimetro.org" target="_blank" rel="noreferrer"> Official Site</a>
            <a className="text-sm font-bold hover:underline text-gray-800" href="#" onClick={(e) => e.preventDefault()}>🔒 Privacy</a>
            <span className="text-sm font-bold text-gray-600">© {new Date().getFullYear()} KMRL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
