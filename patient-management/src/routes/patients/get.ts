import PatientsService from "@src/services/PatientsService";
import { Handler } from "express";

const getAll: Handler = async (_, res) => {
	const patients = await PatientsService.getAll();
	return res.json({ patients });
};

const getOne: Handler = async (req, res) => {
	const { id } = req.params;
	const patient = await PatientsService.get(id);
	return res.json({ patient });
};

export default {
	getAll,
	getOne,
};
