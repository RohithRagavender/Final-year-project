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

router.put("/book/:bedNumber", async (req, res) => {
  try {
    const { bedNumber } = req.params;
    const { patientName, admissionDate } = req.body;

    const bed = await Bed.findOne({ bedNumber });

    if (!bed) {
      return res.status(404).json({ message: "Bed not found" });
    }

    if (bed.occupied) {
      return res.status(400).json({ message: "Bed is already booked" });
    }

    bed.occupied = true;
    bed.patientName = patientName;
    bed.admissionDate = admissionDate;

    await bed.save();

    res.status(200).json({ message: "Bed booked successfully!", bed });
  } catch (error) {
    res.status(500).json({ message: "Error booking bed", error });
  }
});

router.delete("/:bedNumber", async (req, res) => {
  try {
    const { bedNumber } = req.params;

    const deletedBed = await Bed.findOneAndDelete({ bedNumber });

    if (!deletedBed) {
      return res.status(404).json({ message: "Bed not found" });
    }

    res.status(200).json({ message: "Bed removed successfully!", deletedBed });
  } catch (error) {
    console.error("Error removing bed:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


export default router;
