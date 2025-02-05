import express from "express";
import Bed from "../models/BedSchema.js"; // Make sure this exists

const router = express.Router();

// Get all bed data
router.get("/", async (req, res) => {
  try {
    const beds = await Bed.find(); // Fetch data from MongoDB
    res.json(beds);
  } catch (error) {
    console.error("Error fetching bed data:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Add a new bed (for testing)
router.post("/", async (req, res) => {
  try {
    const { bedNumber, occupied } = req.body;
    const newBed = new Bed({ bedNumber, occupied });
    await newBed.save();
    res.status(201).json(newBed);
  } catch (error) {
    console.error("Error adding bed:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
  

// For booking the bed
router.put("/book/:bedNumber", async (req, res) => {
  try {
    const { bedNumber } = req.params;
    const { patientName, date } = req.body;

    const bed = await Bed.findOne({ bedNumber });

    if (!bed) {
      return res.status(404).json({ message: "Bed not found" });
    }

    if (bed.occupied) {
      return res.status(400).json({ message: "Bed is already booked" });
    }

    bed.occupied = true;
    bed.patientName = patientName;
    bed.date = new Date (date);

    await bed.save();

    res.status(200).json({ message: "Bed booked successfully!", bed });
  } catch (error) {
    res.status(500).json({ message: "Error booking bed", error });
  }
});

// for Delete the Bed in the Db
router.delete("/:bedNumber", async (req, res) => {
  try {
    const { bedNumber } = req.params;
    console.log(`🔔 Deleting bed: ${bedNumber}`);

    const deletedBed = await Bed.findOneAndDelete({ bedNumber });

    if (!deletedBed) {
      console.log("🚫 Bed not found in database");
      return res.status(404).json({ message: "Bed not found" });
    }

    console.log("✅ Bed deleted successfully:", deletedBed);
    res.status(200).json({ message: "Bed deleted successfully!", deletedBed });
  } catch (error) {
    console.error("❌ Error deleting bed:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// for free the bed 
router.patch("/:bedNumber", async (req, res) => {
  try {
    const { bedNumber } = req.params;
    console.log(`Received PATCH request for bedNumber: ${bedNumber}`);

    const updatedBed = await Bed.findOneAndUpdate(
      { bedNumber },
      { $set: { bedNumber: bedNumber, occupied: false, patientId: null } },
      { new: true }
    );

    if (!updatedBed) {
      console.log("Bed not found");
      return res.status(404).json({ message: "Bed not found" });
    }

    console.log("Bed updated successfully:", updatedBed);
    res.status(200).json({ message: "Bed data removed successfully!", updatedBed });
  } catch (error) {
    console.error("Error updating bed:", error);
    res.status(500).json({ message: "Server Error" });
  }
});



export default router;
