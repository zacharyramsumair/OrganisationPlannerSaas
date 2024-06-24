import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  location: { type: String },
  host: { type: String, required: true }, // Host name
  organisation: { type: mongoose.Schema.Types.ObjectId, ref: "Organisation", required: true } // Reference to Organisation
}, {
  timestamps: true // Enable timestamps
});

export const Event = mongoose.models?.Event || mongoose.model("Event", eventSchema);
