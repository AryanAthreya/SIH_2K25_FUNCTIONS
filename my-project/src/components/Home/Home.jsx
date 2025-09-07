import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const user = localStorage.getItem("mockUser");

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      <header className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
                Welcome to the Kochi Metro Rail System
              </h1>
              <p className="mt-4 text-gray-600 max-w-xl">
                Demonstration portal for document ingestion, summarization and compliance tracking — SIH 2025 problem statement: 25080. Upload documents, view role-based summaries and manage compliance — quickly.
              </p>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => navigate(user ? "/dashboard" : "/login")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:scale-105 transition transform"
                >
                  Get Started
                </button>

                <button
                  onClick={() => navigate("/upload")}
                  className="inline-flex items-center gap-2 px-5 py-3 border rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Upload a file
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard title="Fast Uploads" desc="Upload PDFs, images or paste text directly to simulate multiple sources." />
              <FeatureCard title="Auto Summaries" desc="Auto-generate short summaries for quick review during the demo." />
              <FeatureCard title="Role Views" desc="View documents filtered by role (Admin, Staff, Student)." />
              <FeatureCard title="Compliance" desc="Track compliance documents and deadlines in a dedicated dashboard." />
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Welcome to Kochi Metro" text="This demo is built for SIH 2025 — quick MVP for document summarization and compliance workflows." />
          <Card title="Secure Storage" text="Integrate with Firebase Storage & Firestore for metadata." />
          <Card title="Notifications" text="In-app alerts and role-specific notifications for new docs." />
        </div>
      </section>
    </div>
  );
}

function Card({ title, text }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="mt-3 text-gray-600">{text}</p>
      <div className="mt-4">
        <button className="text-indigo-600 text-sm font-medium hover:underline">Learn more →</button>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-lg p-4 hover:shadow-lg transition transform hover:-translate-y-1">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
          {title.charAt(0)}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
          <p className="text-xs text-gray-600 mt-1">{desc}</p>
        </div>
      </div>
    </div>
  );
}
