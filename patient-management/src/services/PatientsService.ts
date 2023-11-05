import { IPatient, Patient } from "@src/models/Patient";
import { PatientRepository } from "@src/repository/PatientRepository";
import { producer } from "..";
import { EachMessageHandler } from "kafkajs";

const patientRepository = new PatientRepository(Patient);

const getAll = (): Promise<IPatient[]> => {
	return patientRepository.getAll();
};

const get = (id: string): Promise<IPatient | undefined> => {
	return patientRepository.getOne(id);
};

const create = async (patient: IPatient): Promise<boolean> => {
	const createdPatient = await patientRepository.create(patient);

	if (createdPatient) {
		await producer.send({
			topic: "patient-created",
			messages: [
				{
					value: Buffer.from(JSON.stringify(createdPatient)),
				},
			],
		});
		return true;
	}

	return false;
};

const update = (id: string, patient: IPatient): Promise<boolean> => {
	return patientRepository.update(id, patient);
};

const remove = (id: string): Promise<boolean> => {
	return patientRepository.delete(id);
};

interface AssignedRoom {
	patient_id: string;
	room_id: string;
}

export const handleRoomAssignedEvent: EachMessageHandler = async ({
	message,
}) => {
	const assignedRoom: AssignedRoom = message.value
		? JSON.parse(message.value.toString())
		: undefined;
	if (assignedRoom) {
		const patient = await patientRepository.getOne(assignedRoom.patient_id);
		console.log(patient);
		if (patient) {
			patient.room_id = assignedRoom.room_id;
			await patientRepository.update(assignedRoom.patient_id, patient);
		}
	}
};

export default { getAll, get, create, update, remove };
