import React, { useState, useEffect } from "react";

// Mock role-based dashboard
export default function Dashboard() {
  const [role, setRole] = useState("Student"); // mock current user role
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState("");

  const [documents, setDocuments] = useState(getRoleDocs("Student"));
  const [filters, setFilters] = useState({ tag: "All" });

  useEffect(() => {
    // when role changes, load new docs
    setDocuments(getRoleDocs(role));
    setSelected(null);
  }, [role]);

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
      <header className="max-w-7xl mx-auto mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Role-based Dashboard</h1>
          <p className="text-gray-600">Documents visible to: {role}</p>
        </div>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="Admin">Admin</option>
          <option value="Student">Student</option>
          <option value="Staff">Staff</option>
        </select>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <section className="col-span-4 bg-white p-4 rounded-2xl shadow-sm">
          <div className="mt-6">
            <input
              value={query}
              onChange={handleSearch}
              placeholder="Search documents..."
              className="w-full rounded border px-3 py-2"
            />
          </div>

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

          <ul className="mt-4 divide-y">
            {filteredDocs().map((d) => (
              <li
                key={d.id}
                className={`py-3 flex justify-between ${
                  selected && selected.id === d.id
                    ? "bg-indigo-50 p-2"
                    : ""
                }`}
              >
                <div onClick={() => pickDocument(d)} className="cursor-pointer flex-1">
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
                  {role === "Admin" && (
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="text-xs px-2 py-1 border rounded text-red-600"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

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

// Mock: role-based documents
function getRoleDocs(role) {
  const now = new Date();
  if (role === "Admin") {
    return [
      {
        id: "ad1",
        title: "System-wide Compliance Report",
        uploadedAt: now.toISOString(),
        tags: ["Compliance", "Audit"],
        summary: "Full compliance report for Q3.",
        content: "Admin-only detailed compliance data...",
      },
      {
        id: "ad2",
        title: "All Student Feedback Logs",
        uploadedAt: new Date(now.getTime() - 86400000).toISOString(),
        tags: ["Feedback"],
        summary: "Collected feedback from 250 students.",
        content: "Logs of student complaints and feedback...",
      },
    ];
  } else if (role === "Staff") {
    return [
      {
        id: "st1",
        title: "Staff Meeting Notes",
        uploadedAt: now.toISOString(),
        tags: ["Notes"],
        summary: "Minutes of the weekly staff meeting.",
        content: "Discussion about department improvements...",
      },
    ];
  } else {
    // Student
    return [
      {
        id: "s1",
        title: "Exam Schedule - Fall 2025",
        uploadedAt: now.toISOString(),
        tags: ["Schedule"],
        summary: "Exam timetable for all subjects.",
        content: "Full exam timetable content...",
      },
      {
        id: "s2",
        title: "Library Policy Updates",
        uploadedAt: new Date(now.getTime() - 7200000).toISOString(),
        tags: ["Policy"],
        summary: "New late fee rules effective immediately.",
        content: "Detailed policy content...",
      },
    ];
  }
}
