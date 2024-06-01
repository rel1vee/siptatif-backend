import mongoose from "mongoose";

const dosenSchema = new mongoose.Schema(
  {
    nip: {
      type: String,
      unique: true,
    },
    nama: {
      type: String,
    },
    keahlian: {
      type: String,
    },
    kuota: {
      type: Number,
    },
  },
  { timestamps: true }
);

const dosenModel = mongoose.model("dosen", dosenSchema);

export default dosenModel;
