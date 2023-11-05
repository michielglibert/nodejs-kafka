import { Schema, Types, model } from "mongoose";

interface IRoom {
	_id: Types.ObjectId;
	capacity: number;
	max_capacity: number;
	class: "LOW" | "MEDIUM" | "HIGH";
	price: number;
}

const roomSchema = new Schema<IRoom>({
	capacity: {
		type: Number,
		required: true,
	},
	max_capacity: {
		type: Number,
		required: true,
	},
	class: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
});

const Room = model<IRoom>("Room", roomSchema);

export { roomSchema, IRoom, Room };
