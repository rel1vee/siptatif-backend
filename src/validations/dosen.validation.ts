import Joi from "joi";
import DosenType from "../types/dosen.type";

export const createDosenValidation = (payload: DosenType) => {
  const schema = Joi.object({
    nip: Joi.string().required(),
    nama: Joi.string().required(),
    keahlian: Joi.string().required(),
    kuota: Joi.number().allow("", null),
  });

  return schema.validate(payload);
};

export const updateDosenValidation = (payload: DosenType) => {
  const schema = Joi.object({
    nama: Joi.string().allow("", null),
    keahlian: Joi.string().allow("", null),
    kuota: Joi.number().allow("", null),
  });

  return schema.validate(payload);
};
