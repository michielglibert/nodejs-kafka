import kafka from "@src/constants/Kafka";
import UserRepo from "@src/repository/UserRepo";
import { producer } from "..";

const getAll = (): Promise<any[]> => {
	return UserRepo.getAll();
};

const createUser = async (username: string): Promise<any> => {
	const user = UserRepo.createUser(username);
	await producer.send({
		topic: "user-created",
		messages: [
			{
				value: username,
			},
		],
	});
	return user;
};

export default { getAll, createUser };
