import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Home() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/experiences")
      .then((res) => setExperiences(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = experiences.filter(
    (e) =>
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.location.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading…</div>;

  return (
    <section className="bg-[#F5F6FA] min-h-screen py-10 px-5">
      <div className="max-w-6xl mx-auto">
        {/* Search bar */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search experiences…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md rounded-full border border-gray-300 px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((exp) => (
            <div
              key={exp._id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img src={exp.image} alt={exp.title} className="h-52 w-full object-cover" />
              <div className="p-5">
                <h2 className="text-lg font-semibold text-[#1E293B] mb-1">{exp.title}</h2>
                <p className="text-gray-500 text-sm">{exp.location}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-[#1E293B] text-sm">
                    From <span className="font-bold">₹{exp.price}</span>
                  </span>
                  <Link
                    to={`/details/${exp._id}`}
                    className="bg-[#FFD900] text-black px-4 py-1.5 rounded-lg text-sm font-medium shadow hover:shadow-md transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center col-span-full text-gray-500">No experiences found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
