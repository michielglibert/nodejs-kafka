import { Schema, Types, model } from "mongoose";

interface IPatient {
	_id: Types.ObjectId;
	first_name: string;
	last_name: string;
	email: string;
	room_id: string;
}

const patientSchema = new Schema<IPatient>({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: String,
	room_id: String,
});

const Patient = model<IPatient>("Patient", patientSchema);

export { patientSchema, IPatient, Patient };
