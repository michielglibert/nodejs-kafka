import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import PatientsService from "@src/services/RoomService";
import { Handler } from "express";

const updateRoom: Handler = async (req, res) => {
	const { id } = req.params;
	const patient = req.body;
	try {
		await PatientsService.update(id, patient);
	} catch (e) {
		return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: e });
	}
	return res.status(HttpStatusCodes.OK).json({ success: true });
};

export default {
	updateRoom,
};
