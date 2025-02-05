import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminBedManagement = () => {
  const [occupiedBeds, setOccupiedBeds] = useState([]);

  // Fetch bed data function
  const fetchBedData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/beds");
      const occupied = response.data.filter(bed => bed.occupied);
      setOccupiedBeds(occupied);
    } catch (error) {
      console.error("Error fetching bed data:", error);
    }
  };

  // Fetch data when the component loads
  useEffect(() => {
    fetchBedData();
  }, []);

  // Handle Free Bed
  const handleFreeBed = async (bedNumber) => {
    try {
      // console.log(`🔔 Sending PATCH request to free bed: ${bedNumber}`);
       await axios.patch(`http://localhost:4000/api/beds/${bedNumber}`);
      // console.log(`✅ Bed ${bedNumber} freed successfully`);

      // Re-fetch bed data to update UI
      fetchBedData();
    } catch (error) {
      console.error("❌ Error freeing bed:", error?.response?.data || error.message);
      alert("Failed to free the bed. Check server logs.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-32 bg-gray-900 text-white flex flex-col items-center py-7 space-y-8 "></div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Admin Bed Management</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left">Bed Number</th>
                <th className="py-3 px-4 border-b text-left">Patient Name</th>
                <th className="py-3 px-4 border-b text-left">Booked Date</th>
                <th className="py-3 px-4 border-b text-left">Status</th>
                <th className="py-3 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {occupiedBeds.length > 0 ? (
                occupiedBeds.map((bed) => (
                  <tr key={bed.bedNumber} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b text-black">{bed.bedNumber}</td>
                    <td className="py-3 px-4 border-b text-black">{bed.patientName}</td>
                    <td className="py-3 px-4 border-b text-black">{new Date(bed.date).toLocaleDateString("en-GB")}</td>
                    <td className="py-3 px-4 border-b">
                      <span className="px-3 py-1 rounded-full text-white text-sm bg-red-500">
                        Occupied
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <button 
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => handleFreeBed(bed.bedNumber)}
                      >
                        Free Bed
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-3 px-4 text-center">No occupied beds available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBedManagement;
