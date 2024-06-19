import mongoose from "mongoose";

const organisationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  organisationMainUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" } ,
  parentOrganisation: { type: mongoose.Schema.Types.ObjectId, ref: "Organisation" } ,
  childrenOrganisations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Organisation" } ]
});

export const Organisation = mongoose.models?.Organisation || mongoose.model("Organisation", organisationSchema);