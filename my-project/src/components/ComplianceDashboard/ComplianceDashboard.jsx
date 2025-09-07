import React, { useState } from "react";

export default function ComplianceDashboard() {
  const [docs, setDocs] = useState(sampleComplianceDocs());
  const [selected, setSelected] = useState(null);

  function handleDelete(id) {
    if (!window.confirm("Delete this compliance document?")) return;
    setDocs(docs.filter((d) => d.id !== id));
    if (selected && selected.id === id) setSelected(null);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-7xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">Compliance Dashboard</h1>
        <p className="text-gray-600 mt-1">Track deadlines and regulatory documents.</p>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* Sidebar list */}
        <section className="col-span-4 bg-white p-4 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Compliance Docs</h2>
          <ul className="divide-y">
            {docs.map((doc) => (
              <li
                key={doc.id}
                className={`py-3 flex justify-between cursor-pointer ${
                  selected && selected.id === doc.id ? "bg-indigo-50 p-2" : ""
                }`}
              >
                <div onClick={() => setSelected(doc)} className="flex-1">
                  <div className="font-medium">{doc.title}</div>
                  <div className="text-xs text-gray-500">
                    Due: {new Date(doc.deadline).toLocaleDateString()}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      new Date(doc.deadline) < new Date() ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {new Date(doc.deadline) < new Date() ? "⚠ Overdue" : "✅ On Track"}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="ml-2 text-xs px-2 py-1 border rounded text-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Preview */}
        <section className="col-span-8 bg-white p-6 rounded-2xl shadow-sm">
          {!selected ? (
            <div className="h-96 flex items-center justify-center text-gray-400">
              Select a compliance document to preview.
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold">{selected.title}</h2>
              <div className="text-sm text-gray-500 mb-4">
                Deadline: {new Date(selected.deadline).toLocaleString()}
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold mb-2">Summary</h3>
                <p className="text-gray-800 whitespace-pre-wrap">{selected.summary}</p>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">Full Text</h3>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{selected.content}</p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

// 🔹 Mock data
function sampleComplianceDocs() {
  const now = new Date();
  return [
    {
      id: "c1",
      title: "Fire Safety Compliance",
      deadline: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      summary: "Annual fire safety compliance check. Pending renewal.",
      content: "Details of fire safety inspection and pending approvals.",
    },
    {
      id: "c2",
      title: "Environmental Audit Report",
      deadline: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 10).toISOString(), // in 10 days
      summary: "Quarterly environmental compliance audit report.",
      content: "Audit shows emission levels within permissible range.",
    },
  ];
}
