import React, { useState } from "react";
import axios from "axios";

const BedBookingForm = () => {
  const [bedNumber, setBedNumber] = useState("");
  const [patientName, setPatientName] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:4000/api/beds/book/${bedNumber}`, {
        patientName,
        admissionDate,
      });

      alert(response.data.message);
      setBedNumber("");
      setPatientName("");
      setAdmissionDate("");
    } catch (error) {
      console.error("Error booking bed:", error);
      alert(error.response?.data?.message || "Failed to book bed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">🛏️ Book a Bed</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Bed Number:</label>
          <input
            type="text"
            value={bedNumber}
            onChange={(e) => setBedNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Patient Name:</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Admission Date:</label>
          <input
            type="date"
            value={admissionDate}
            onChange={(e) => setAdmissionDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Book Bed
        </button>
      </form>
    </div>
  );
};

export default BedBookingForm;
