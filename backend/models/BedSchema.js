import mongoose from "mongoose";

const bedSchema = new mongoose.Schema({
  bedNumber: { type: Number, required: true, unique: true },
  occupied: { type: Boolean, default: false },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", default: null },
});

const Bed = mongoose.model("Bed", bedSchema);
export  default Bed;
