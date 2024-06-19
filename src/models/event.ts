import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String,  },
//   password: { type: String, select: false },
  image: { type: String },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  location: { type: String },

  //make this a relationship, get organisation id and name
  host: { type: String,required: true },
  organisation: { type: String, required: true },

  });

export const Event = mongoose.models?.Event || mongoose.model("Event", eventSchema);