import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import PatientsService from "@src/services/PatientsService";
import { Handler } from "express";

const createPatient: Handler = async (req, res) => {
	const patient = req.body;
	try {
		await PatientsService.create(patient);
	} catch (e) {
		return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: e });
	}
	return res.status(HttpStatusCodes.OK).json({ success: true });
};

export default {
	createPatient,
};
