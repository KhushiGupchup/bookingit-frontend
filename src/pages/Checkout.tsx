import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api";

export default function Checkout() {
  const { state } = useLocation() as any;
  const navigate = useNavigate();
  const exp = state?.experience;
  const sel = state?.selected;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!exp || !sel)
    return <div className="text-center text-gray-500 mt-10">Invalid booking flow</div>;

  const subtotal = exp.price * (sel.quantity || 1);
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + taxes - discount;

  const applyPromo = () => {
    if (promo.toUpperCase() === "SAVE10") setDiscount(100);
    else setDiscount(0);
  };

  const handleConfirm = async () => {
    if (!agree) return alert("Please agree to the policy");
    setLoading(true);
    navigate("/result", { state: { success: true, booking: { id: Math.random().toString(36).slice(2, 8).toUpperCase() } } });
  };

  return (
    <section className="bg-[#F5F6FA] min-h-screen py-10 px-5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Left form */}
        <div className="md:col-span-2 bg-white rounded-3xl shadow p-6 space-y-4">
          <div className="flex gap-3">
            <input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <input
              placeholder="Promo code"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
            <button
              onClick={applyPromo}
              className="bg-black text-white rounded-lg px-5 text-sm hover:opacity-90"
            >
              Apply
            </button>
          </div>
          <label className="flex items-center gap-2 text-xs text-gray-600">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            I agree to the terms and safety policy
          </label>
        </div>

        {/* Right summary */}
        <div className="bg-white rounded-3xl shadow p-6 h-fit space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Experience</span><span>{exp.title}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Date</span><span>{sel.date}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Time</span><span>{sel.time}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Qty</span><span>{sel.quantity || 1}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span><span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Taxes</span><span>₹{taxes}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total</span><span>₹{total}</span>
          </div>
          <button
            disabled={loading}
            onClick={handleConfirm}
            className="w-full mt-3 py-2 rounded-lg text-black font-medium bg-[#FFD900] hover:opacity-90"
          >
            Pay and Confirm
          </button>
        </div>
      </div>
    </section>
  );
}
