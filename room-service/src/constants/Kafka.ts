import { Kafka } from "kafkajs";

const kafka = new Kafka({
	clientId: "patient-management",
	brokers: ["localhost:9092"],
});

export default kafka;
