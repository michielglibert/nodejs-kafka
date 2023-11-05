import "./pre-start"; // Must be the first import

import server from "./server";
import EnvVars from "./constants/EnvVars";
import kafka from "./constants/Kafka";

const port = EnvVars.Port || 3001;

server.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export const producer = kafka.producer();

const main = async () => {
	await producer.connect();
	console.log("kafka connected");
};

main().catch(async (error) => {
	console.error(error);
	try {
		await producer.disconnect();
		console.log("kafka disconnected");
	} catch (e) {
		console.error("Error");
	}
	process.exit(1);
});
