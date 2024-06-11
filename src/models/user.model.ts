import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    nama: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "mahasiswa",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
