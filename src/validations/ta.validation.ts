import Joi from "joi";
import TAType from "../types/ta.type";

export const createTAValidation = (payload: TAType) => {
  const schema = Joi.object({
    kode: Joi.string().required(),
    nim: Joi.string().required(),
    nama: Joi.string().required(),
    judul: Joi.string().required(),
    kategori: Joi.string().required(),
    pembimbing_1: Joi.string().required(),
    pembimbing_2: Joi.string().allow("", null),
    file: Joi.string().allow("", null),
  });

  return schema.validate(payload);
};

export const updateTAValidation = (payload: TAType) => {
  const schema = Joi.object({
    penguji_1: Joi.string().allow("", null),
    penguji_2: Joi.string().allow("", null),
    status: Joi.string().allow("", null),
    keterangan: Joi.string().allow("", null),
  });

  return schema.validate(payload);
};
