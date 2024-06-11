import TAType from "../types/ta.type";
import { logger } from "../utils/logger";
import TAModel from "../models/ta.model";

export const getTAFromDB = async () => {
  return await TAModel.find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      logger.info("Cannot get data from DB");
      logger.error(error);
    });
};

export const getTAByNIM = async (nim: String) => {
  return await TAModel.find({ nim: nim });
};

export const addTAToDB = async (payload: TAType) => {
  return await TAModel.create(payload);
};

export const updateTAByKode = async (kode: String, payload: TAType) => {
  const result = await TAModel.findOneAndUpdate(
    {
      kode: kode,
    },
    { $set: payload }
  );
  return result;
};

export const deleteTAByKode = async (kode: String) => {
  const result = await TAModel.findOneAndDelete({
    kode: kode,
  });
  return result;
};