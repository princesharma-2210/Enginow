import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  phone: String,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);