import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

const formatDate = (d: string) => {
  const dateObj = new Date(d);
  return dateObj.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exp, setExp] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/experiences/${id}`)
      .then((res) => {
        const experience = res.data;
        // Add mock multiple dates/times for better display
        const today = new Date();
        const extraDates = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          return {
            date: date.toISOString(),
            times: [
              { time: "7:00 am", seats: 5 },
              { time: "9:30 am", seats: 0 },
              { time: "12:00 pm", seats: 3 },
              { time: "3:00 pm", seats: 2 },
              { time: "6:00 pm", seats: 4 },
            ],
          };
        });
        experience.slots = extraDates;
        setExp(experience);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  if (!exp)
    return (
      <div className="text-center text-red-500 mt-10">
        Experience not found
      </div>
    );

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime)
      return alert("Please select date and time.");
    navigate("/checkout", {
      state: {
        experience: exp,
        selected: { date: selectedDate, time: selectedTime, quantity },
      },
    });
  };

  // calculations
  const subtotal = exp.price * quantity;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + taxes;

  return (
    <section className="min-h-screen bg-[#F5F6FA] py-10 px-5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* LEFT CONTENT */}
        <div className="md:col-span-2 bg-white rounded-3xl shadow-md p-6">
          <img
            src={exp.image}
            alt={exp.title}
            className="w-full h-72 object-cover rounded-2xl"
          />

          <h1 className="text-2xl font-bold text-[#1E293B] mt-6">
            {exp.title}
          </h1>
          <p className="text-gray-600 text-sm">
            {exp.location} • {exp.duration}
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">{exp.description}</p>

          {/* Choose Date */}
          <div className="mt-8">
            <h3 className="font-semibold text-[#1E293B] mb-2">Choose date</h3>
            <div className="flex flex-wrap gap-2">
              {exp.slots.map((s: any, i: number) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedDate(s.date);
                    setSelectedTime(null);
                  }}
                  className={`px-4 py-2 rounded-xl border text-sm transition
                    ${
                      selectedDate === s.date
                        ? "bg-[#FFD900] text-black border-[#FFD900]"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {formatDate(s.date)}
                </button>
              ))}
            </div>
          </div>

          {/* Choose Time */}
          {selectedDate && (
            <div className="mt-6">
              <h3 className="font-semibold text-[#1E293B] mb-2">Choose time</h3>
              <div className="flex flex-wrap gap-2">
                {exp.slots
                  .find((d: any) => d.date === selectedDate)
                  ?.times.map((slot: any, i: number) => (
                    <button
                      key={i}
                      disabled={slot.seats <= 0}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`px-4 py-2 rounded-xl text-sm border transition
                        ${
                          selectedTime === slot.time
                            ? "bg-[#FFD900] text-black border-[#FFD900]"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                        }
                        ${
                          slot.seats <= 0
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                    >
                      {slot.time}
                    </button>
                  ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                All times in IST (GMT +5:30)
              </p>
            </div>
          )}

          {/* About */}
          <div className="mt-8 border-t pt-4">
            <h3 className="font-semibold text-[#1E293B] mb-1">About</h3>
            <p className="text-sm text-gray-600">
              Scenic routes, trained guides, safety briefing. Minimum age 10.
            </p>
          </div>
        </div>

        {/* RIGHT SUMMARY PANEL */}
        <div className="bg-white rounded-3xl shadow-md p-6 h-fit">
          <div className="space-y-3">
            <div className="flex justify-between text-gray-700 text-sm">
              <span>Starts at</span>
              <span className="font-medium">₹{exp.price}</span>
            </div>

            {/* Quantity selector */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Quantity</span>
              <div className="flex items-center border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  –
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between text-gray-700 text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-gray-700 text-sm">
              <span>Taxes</span>
              <span>₹{taxes}</span>
            </div>

            <div className="border-t pt-2 flex justify-between font-semibold text-[#1E293B]">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full mt-3 py-2 rounded-xl text-black font-medium shadow hover:shadow-md transition"
              style={{ backgroundColor: "#FFD900" }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
