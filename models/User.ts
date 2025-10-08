import mongoose, { Document, Model } from "mongoose";

// 1️⃣ Define the TypeScript interface
export interface IUser extends Document {
  clerkId: string;
  name?: string;
  email?: string;
  phone?: string;
}

// 2️⃣ Define the schema
const UserSchema = new mongoose.Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String },
    // phone: { type: String },
  },
  { timestamps: true } // optional: adds createdAt & updatedAt
);

// 3️⃣ Create or reuse the model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

// 4️⃣ Export the model
export default User;
