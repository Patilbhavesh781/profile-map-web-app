import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: String,
  age: Number,
  job: String,
  salary: Number,
  hobbies: String,
  location: String,
  photo: String,
  description: String,
  lat: Number,
  lng: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // owner
});

export default mongoose.model("Profile", profileSchema);
