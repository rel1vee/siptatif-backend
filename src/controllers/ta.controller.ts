import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger";
import { Request, Response } from "express";
import {
  getTAFromDB,
  getTAByNIM,
  addTAToDB,
  updateTAByKode,
  deleteTAByKode,
} from "../services/ta.service";
import {
  createTAValidation,
  updateTAValidation,
} from "../validations/ta.validation";

export const getTA = async (req: Request, res: Response) => {
  const {
    params: { nim },
  } = req;

  if (nim) {
    const TA = await getTAByNIM(nim);
    if (TA) {
      logger.info("Success get TA");
      return res.status(200).send({ status: true, statusCode: 200, data: TA });
    } else {
      return res
        .status(404)
        .send({ status: false, statusCode: 404, message: "Data Not Found" });
    }
  } else {
    const TA = await getTAFromDB();
    logger.info("Success get TA");
    return res.status(200).send({ status: true, statusCode: 200, data: TA });
  }
};

export const createTA = async (req: Request, res: Response) => {
  req.body.kode = uuidv4();
  const { error, value } = createTAValidation(req.body);
  if (error) {
    logger.error("Failed add new TA", error.details[0].message);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
    });
  }

  // Pengecekan keberadaan file
  // if (!req.files || req.files.length === 0) {
  //   return res
  //     .status(400)
  //     .send({
  //       status: false,
  //       statusCode: 400,
  //       message: "No files were uploaded",
  //     });
  // }

  try {
    const files = req.files as Express.Multer.File[]; // Mendapatkan array of files dari request
    const fileBuffers = files.map((file) => file.buffer); // Mengubah file menjadi buffer

    value.file = fileBuffers; // Menambahkan buffer file ke payload

    const result = await addTAToDB(value);
    console.log("Result:", result); // Log the result for debugging

    logger.info("Success add new TA");
    return res
      .status(201)
      .send({ status: true, statusCode: 201, message: "Add TA success" });
  } catch (error) {
    logger.error("Failed add new TA", error);
    return res
      .status(422)
      .send({ status: false, statusCode: 422, message: error });
  }
};

export const updateTA = async (req: Request, res: Response) => {
  const {
    params: { kode },
  } = req;

  const { error, value } = updateTAValidation(req.body);
  if (error) {
    logger.error("Failed update dosen", error.details[0].message);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
    });
  }

  try {
    const result = await updateTAByKode(kode, value);
    if (result) {
      logger.info("Success update TA");
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Update TA success",
      });
    } else {
      logger.info("Data not found");
      return res
        .status(404)
        .send({ status: false, statusCode: 404, message: "Data not found" });
    }
  } catch (error) {
    logger.error("Failed update TA", error);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error,
    });
  }
};

export const deleteTA = async (req: Request, res: Response) => {
  const {
    params: { kode },
  } = req;

  try {
    const result = await deleteTAByKode(kode);
    if (result) {
      logger.info("Success delete TA");
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Delete TA success",
      });
    } else {
      logger.info("Data not found");
      return res
        .status(404)
        .send({ status: false, statusCode: 404, message: "Data not found" });
    }
  } catch (error) {
    logger.error("Failed delete TA", error);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error,
    });
  }
};
