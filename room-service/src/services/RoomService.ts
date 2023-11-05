import { IRoom, Room } from "@src/models/Room";
import { RoomRepository } from "@src/repository/RoomRepository";
import { producer } from "..";
import { EachMessageHandler } from "kafkajs";

const roomRepository = new RoomRepository(Room);

const getAll = (): Promise<IRoom[]> => {
	return roomRepository.getAll();
};

const get = (id: string): Promise<IRoom | undefined> => {
	return roomRepository.getOne(id);
};

const create = (patient: IRoom): Promise<boolean> => {
	return roomRepository.create(patient);
};

const update = (id: string, patient: IRoom): Promise<boolean> => {
	return roomRepository.update(id, patient);
};

const remove = (id: string): Promise<boolean> => {
	return roomRepository.delete(id);
};

interface PatientCreatedEvent {
	_id: string;
}

export const handleCreatePatientEvent: EachMessageHandler = async ({
	message,
}) => {
	const patient: PatientCreatedEvent = message.value
		? JSON.parse(message.value?.toString())
		: undefined;

	if (patient) {
		const rooms = await getAll();
		const availableRoom = rooms.filter(
			({ capacity, max_capacity }) => capacity < max_capacity
		)[0];

		console.log(availableRoom);
		if (availableRoom) {
			await producer.send({
				topic: "room-assigned",
				messages: [
					{
						value: Buffer.from(
							JSON.stringify({
								patient_id: patient._id,
								room_id: availableRoom._id.toString(),
							})
						),
					},
				],
			});
		}
	}
};

export default {
	getAll,
	get,
	create,
	update,
	remove,
};
