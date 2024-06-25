import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  organisations:[{ type: mongoose.Schema.Types.ObjectId, ref: "Organisation" } ]

}, {
  timestamps: true // Add this line to enable timestamps
});

export const Group = mongoose.models?.Group || mongoose.model("Group", groupSchema);