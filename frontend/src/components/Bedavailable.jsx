import React, { useEffect, useState } from "react";
import axios from "axios";

const Bedavailable = () => {
  const [beds, setBeds] = useState([]);
  const [selectedBed, setSelectedBed] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/api/beds")
      .then((res) => setBeds(res.data))
      .catch((err) => console.error("Error fetching beds:", err));
  }, []);

  // Open the booking modal
  const openBookingModal = (bed) => {
    setSelectedBed(bed);
  };

  // Handle bed booking
  const handleBookBed = async () => {
    if (!patientName || !admissionDate) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await axios.put(`http://localhost:4000/api/beds/book/${selectedBed.bedNumber}`, {
        patientName,
        admissionDate,
      });

      // Update UI
      setBeds((prevBeds) =>
        prevBeds.map((bed) =>
          bed.bedNumber === selectedBed.bedNumber
            ? { ...bed, occupied: true, patientName, admissionDate }
            : bed
        )
      );

      setSelectedBed(null);
      setPatientName("");
      setAdmissionDate("");
    } catch (error) {
      console.error("Error booking bed:", error);
    }
  };

  return (
    <>
    <br />
    <br />  
    <br />  
    <br />  
    <br />  

    <div className="p-6">
     
    <h2 className="text-3xl font-bold mb-6 text-gray-700 text-center">🏥 Bed Availability</h2>

    {/* Bed Grid */}
   
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
   
      {beds.map((bed) => (
        
        <div
          key={bed._id}
          className={`p-4 rounded-xl shadow-lg transition-transform transform hover:scale-105 ${
            bed.occupied ? "bg-red-100 border-red-500" : "bg-green-100 border-green-500"
          } border-2`}
        >
          <h3 className="text-xl font-semibold mb-2">🛏️ Bed {bed.bedNumber}</h3>
          <p className={`text-lg font-medium ${bed.occupied ? "text-red-600" : "text-green-600"}`}>
            {bed.occupied ? "Occupied ❌" : "Available ✅"}
          </p>

          {!bed.occupied && (
            <button
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
              onClick={() => openBookingModal(bed)}
            >
              Book Now
            </button>
          )}
        </div>
      ))}
    </div>

    {/* Booking Modal */}
    {selectedBed && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4">Book Bed {selectedBed.bedNumber}</h2>
          <input
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full p-3 mb-3 border rounded-lg"
          />
          <input
            type="date"
            value={admissionDate}
            onChange={(e) => setAdmissionDate(e.target.value)}
            className="w-full p-3 mb-3 border rounded-lg"
          />
          <div className="flex justify-between mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              onClick={handleBookBed}
            >
              Confirm Booking
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              onClick={() => setSelectedBed(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  </>
);
};

export default Bedavailable;
