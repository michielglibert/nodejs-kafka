import "./pre-start"; // Must be the first import

import server from "./server";
import EnvVars from "./constants/EnvVars";
import kafka from "./constants/Kafka";
import mongoose from "mongoose";
import { handleRoomAssignedEvent } from "./services/PatientsService";

const port = EnvVars.Port || 3001;

export const producer = kafka.producer();

export const consumer = kafka.consumer({
	groupId: "group-idddd",
});

server.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

const main = async () => {
	await mongoose.connect("mongodb://127.0.0.1:27017/test");
	await producer.connect();
	await consumer.connect();
	await consumer.subscribe({ topic: "room-assigned", fromBeginning: false });
	await consumer.run({
		eachMessage: handleRoomAssignedEvent,
	});
	console.log("kafka connected");
};

main().catch(async (error) => {
	console.error(error);
	try {
		await producer.disconnect();
		await consumer.disconnect();
		console.log("kafka disconnected");
	} catch (e) {
		console.error("Error");
	}
	process.exit(1);
});
