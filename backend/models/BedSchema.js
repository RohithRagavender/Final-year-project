import mongoose from "mongoose";

const bedSchema = new mongoose.Schema({
  bedNumber: { type: Number, required: true, unique: true },
  patientName : {type:String, default:null},
  occupied: { type: Boolean, default: false },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", default: null },
  date: { type: Date, default: Date.now },
});

const Bed = mongoose.model("Bed", bedSchema);
export  default Bed;
