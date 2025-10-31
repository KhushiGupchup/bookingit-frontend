import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const { state } = useLocation() as any;
  const navigate = useNavigate();
  const booking = state?.booking;
  return (
    <section className="bg-[#F5F6FA] min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-3xl shadow p-10 text-center max-w-md w-full">
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-[#1E293B]">Booking Confirmed</h2>
        <p className="text-sm text-gray-600 mt-1">
          Ref ID: {booking?.id || "N/A"}
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-4 py-2 text-sm rounded-lg border bg-gray-100 hover:bg-gray-200"
        >
          Back to Home
        </button>
      </div>
    </section>
  );
}
