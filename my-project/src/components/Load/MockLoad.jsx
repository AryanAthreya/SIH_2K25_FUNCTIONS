import React, { useState, useEffect } from "react";

export default function LoadDocuments() {
  const [documents, setDocuments] = useState(sampleDocs());
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [filters, setFilters] = useState({ tag: "All" });
  const [newFile, setNewFile] = useState(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // Later: fetch documents from Firestore
  }, []);

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  function filteredDocs() {
    const q = query.trim().toLowerCase();
    return documents.filter((d) => {
      if (filters.tag !== "All" && !d.tags.includes(filters.tag)) return false;
      if (!q) return true;
      return (
        d.title.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q) ||
        d.content.toLowerCase().includes(q)
      );
    });
  }

  function pickDocument(doc) {
    setSelected(doc);
    setNotes("");
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!newFile) return alert("Choose a file to upload");
    setUploading(true);
    await fakeDelay(800);

    const id = Math.random().toString(36).slice(2, 9);
    const newDoc = {
      id,
      title: newFile.name,
      uploadedAt: new Date().toISOString(),
      tags: ["Report"],
      summary: generateMockSummary(newFile.name),
      content: `This is extracted text of ${newFile.name}.`,
    };
    setDocuments([newDoc, ...documents]);
    setNewFile(null);
    setUploading(false);
    setSelected(newDoc);
  }

  function handleAnnotate() {
    if (!selected) return;
    const updated = documents.map((d) =>
      d.id === selected.id ? { ...d, notes: (d.notes || "") + "\n" + notes } : d
    );
    setDocuments(updated);
    setSelected({ ...selected, notes: (selected.notes || "") + "\n" + notes });
    setNotes("");
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this document?")) return;
    setDocuments(documents.filter((d) => d.id !== id));
    if (selected && selected.id === id) setSelected(null);
  }

  function uniqueTags() {
    const s = new Set();
    documents.forEach((d) => d.tags.forEach((t) => s.add(t)));
    return ["All", ...Array.from(s)];
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-7xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">📄 Document Summarizer</h1>
        <p className="text-gray-600 mt-1">
          Upload PDFs, view summaries, search and annotate.
        </p>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <section className="col-span-4 bg-white p-4 rounded-2xl shadow-sm">
          {/* Upload Form */}
          <form onSubmit={handleUpload} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload document
            </label>
            <input
              type="file"
              accept="application/pdf,image/*"
              onChange={(e) => setNewFile(e.target.files[0])}
              className="block w-full text-sm"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload & Summarize"}
              </button>
              <button
                type="button"
                className="px-4 py-2 border rounded"
                onClick={() => setNewFile(null)}
              >
                Clear
              </button>
            </div>
          </form>

          {/* Search */}
          <div className="mt-6">
            <input
              value={query}
              onChange={handleSearch}
              placeholder="Search documents..."
              className="w-full rounded border px-3 py-2"
            />
          </div>

          {/* Filter */}
          <div className="mt-4 flex items-center gap-2">
            <label className="text-sm text-gray-600">Filter by tag:</label>
            <select
              className="border rounded px-2 py-1"
              value={filters.tag}
              onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
            >
              {uniqueTags().map((t) => (
                <option value={t} key={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Document List */}
          <ul className="mt-4 divide-y">
            {filteredDocs().map((d) => (
              <li
                key={d.id}
                className={`py-3 flex justify-between ${
                  selected && selected.id === d.id ? "bg-indigo-50 p-2" : ""
                }`}
              >
                <div
                  onClick={() => pickDocument(d)}
                  className="cursor-pointer flex-1"
                >
                  <div className="font-medium">{d.title}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(d.uploadedAt).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-700 mt-1 line-clamp-2">
                    {d.summary}
                  </div>
                </div>
                <div className="ml-3 flex flex-col gap-2">
                  <button
                    onClick={() => pickDocument(d)}
                    className="text-xs px-2 py-1 border rounded"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => handleDelete(d.id)}
                    className="text-xs px-2 py-1 border rounded text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Main Preview */}
        <section className="col-span-8 bg-white p-6 rounded-2xl shadow-sm">
          {!selected ? (
            <div className="h-96 flex items-center justify-center text-gray-400">
              Select a document to preview.
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold">{selected.title}</h2>
                  <div className="text-sm text-gray-500">
                    Uploaded: {new Date(selected.uploadedAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-12 gap-4">
                <article className="col-span-7 bg-gray-50 p-4 rounded">
                  <h3 className="font-semibold mb-2">Auto Summary</h3>
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {selected.summary}
                  </p>

                  <div className="mt-4">
                    <h4 className="font-medium">Extracted Content</h4>
                    <div className="text-sm text-gray-700 mt-2 whitespace-pre-wrap max-h-48 overflow-auto">
                      {selected.content}
                    </div>
                  </div>
                </article>

                <aside className="col-span-5 p-4">
                  <h4 className="font-semibold">Annotations</h4>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={6}
                    placeholder="Add a note"
                    className="w-full border rounded mt-2 p-2"
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={handleAnnotate}
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      Save Note
                    </button>
                  </div>

                  <div className="mt-4">
                    <h5 className="font-medium">Previous Notes</h5>
                    <div className="text-sm text-gray-700 mt-2 whitespace-pre-wrap max-h-40 overflow-auto bg-gray-50 p-2 rounded">
                      {selected.notes || "No notes yet."}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

// Mock data
function sampleDocs() {
  const now = new Date();
  return [
    {
      id: "a1",
      title: "Track Maintenance Report - Line 1",
      uploadedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      tags: ["Maintenance"],
      summary: "Monthly inspection identified 3 sections requiring attention.",
      content: "Full maintenance log text (mock).",
    },
  ];
}

function fakeDelay(ms = 500) {
  return new Promise((res) => setTimeout(res, ms));
}

function generateMockSummary(filename) {
  return `Summary for ${filename}: key points extracted.`;
}
