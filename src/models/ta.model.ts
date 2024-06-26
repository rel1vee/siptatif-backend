import mongoose from "mongoose";

const TASchema = new mongoose.Schema(
  {
    kode: {
      type: String,
      unique: true,
    },
    nim: {
      type: String,
    },
    nama: {
      type: String,
    },
    judul: {
      type: String,
    },
    kategori: {
      type: String,
    },
    pembimbing_1: {
      type: String,
    },
    pembimbing_2: {
      type: String,
    },
    file: {
      type: String,
    },
    status: {
      type: String,
      default: "Diproses",
    },
    penguji_1: {
      type: String,
      default: "",
    },
    penguji_2: {
      type: String,
      default: "",
    },
    keterangan: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const TAModel = mongoose.model("ta", TASchema);

export default TAModel;
