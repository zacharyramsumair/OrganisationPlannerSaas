import mongoose from "mongoose";

const organisationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, },
  description: { type: String },
  email: { type: String },
  contactNumber: { type: String },
  organisationMainUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" } ,
  parentOrganisation: { type: mongoose.Schema.Types.ObjectId, ref: "Organisation" } ,
  childrenOrganisations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Organisation" } ],
  childrenOrganisationsRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Organisation" } ],
  events:[{ type: mongoose.Schema.Types.ObjectId, ref: "Event" } ]
}, {
  timestamps: true // Add this line to enable timestamps
});

export const Organisation = mongoose.models?.Organisation || mongoose.model("Organisation", organisationSchema);