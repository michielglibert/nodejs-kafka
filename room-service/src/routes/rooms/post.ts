import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import PatientsService from "@src/services/RoomService";
import { Handler } from "express";
import { validationResult } from "express-validator/src/validation-result";

const createRoom: Handler = async (req, res) => {
	const patient = req.body;
	try {
		await PatientsService.create(patient);
	} catch (e) {
		return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: e });
	}
	return res.status(HttpStatusCodes.OK).json({ success: true });
};

export default {
	createRoom,
};
