import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
//   password: { type: String, select: false },
  role: { type: String, default: "user" },
  image: { type: String },
  authProviderId: { type: String },
  events:[{ type: mongoose.Schema.Types.ObjectId, ref: "Organisation" } ]

});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);