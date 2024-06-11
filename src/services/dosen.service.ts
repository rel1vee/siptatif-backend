import { logger } from "../utils/logger";
import DosenType from "../types/dosen.type";
import dosenModel from "../models/dosen.model";

export const getDosenFromDB = async () => {
  return await dosenModel
    .find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      logger.info("Cannot get data from DB");
      logger.error(error);
    });
};

export const getDosenByNIP = async (nip: String) => {
  return await dosenModel.findOne({ nip: nip });
};

export const addDosenToDB = async (payload: DosenType) => {
  return await dosenModel.create(payload);
};

export const updateDosenByNIP = async (nip: String, payload: DosenType) => {
  const result = await dosenModel.findOneAndUpdate(
    {
      nip: nip,
    },
    { $set: payload }
  );
  return result;
};

export const deleteDosenByNIP = async (nip: String) => {
  const result = await dosenModel.findOneAndDelete({
    nip: nip,
  });
  return result;
};
