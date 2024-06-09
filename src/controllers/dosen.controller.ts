import { logger } from "../utils/logger";
import { Request, Response } from "express";
import {
  getDosenFromDB,
  getDosenByNIP,
  addDosenToDB,
  updateDosenByNIP,
  deleteDosenByNIP,
} from "../services/dosen.service";
import {
  createDosenValidation,
  updateDosenValidation,
} from "../validations/dosen.validation";

export const getDosen = async (req: Request, res: Response) => {
  const {
    params: { nip },
  } = req; 

  if (nip) {
    const dosen = await getDosenByNIP(nip);
    if (dosen) {
      logger.info("Success get dosen");
      return res
        .status(200)
        .send({ status: true, statusCode: 200, data: dosen });
    } else {
      return res
        .status(404)
        .send({ status: false, statusCode: 404, message: "Data Not Found" });
    }
  } else {
    const dosen = await getDosenFromDB();
    logger.info("Success get dosen");
    return res.status(200).send({ status: true, statusCode: 200, data: dosen });
  }
};

export const createDosen = async (req: Request, res: Response) => {
  const { error, value } = createDosenValidation(req.body);
  if (error) {
    logger.error("Failed add new dosen", error.details[0].message);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
    });
  }

  try {
    await addDosenToDB(value);
    logger.info("Success add new dosen");
    return res
      .status(201)
      .send({ status: true, statusCode: 201, message: "Add dosen success" });
  } catch (error) {
    logger.error("Failed add new dosen", error);
    return res
      .status(422)
      .send({ status: false, statusCode: 422, message: error });
  }
};

export const updateDosen = async (req: Request, res: Response) => {
  const {
    params: { nip },
  } = req;

  const { error, value } = updateDosenValidation(req.body);
  if (error) {
    logger.error("Failed update dosen", error.details[0].message);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
    });
  }

  try {
    const result = await updateDosenByNIP(nip, value);
    if (result) {
      logger.info("Success update dosen");
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Update dosen success",
      });
    } else {
      logger.info("Data not found");
      return res
        .status(404)
        .send({ status: false, statusCode: 404, message: "Data not found" });
    }
  } catch (error) {
    logger.error("Failed update dosen", error);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error,
    });
  }
};

export const deleteDosen = async (req: Request, res: Response) => {
  const {
    params: { nip },
  } = req;

  try {
    const result = await deleteDosenByNIP(nip);
    if (result) {
      logger.info("Success delete dosen");
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Delete dosen success",
      });
    } else {
      logger.info("Data not found");
      return res
        .status(404)
        .send({ status: false, statusCode: 404, message: "Data not found" });
    }
  } catch (error) {
    logger.error("Failed delete dosen", error);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error,
    });
  }
};
