import { IRead } from "@src/interfaces/IRead";
import { IWrite } from "@src/interfaces/IWrite";
import { Model } from "mongoose";

abstract class BaseRepository<T> implements IRead<T>, IWrite<T> {
	public readonly DbModel: Model<T>;

	constructor(DbModel: Model<T>) {
		this.DbModel = DbModel;
	}

	async getAll(): Promise<T[]> {
		return this.DbModel.find();
	}
	async getOne(id: string): Promise<T | undefined> {
		const dbItem = await this.DbModel.findOne({ id });
		if (dbItem) return dbItem;
		return undefined;
	}
	async create(item: T): Promise<boolean> {
		const dbItem = new this.DbModel(item);
		try {
			await dbItem.save();
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}
	async update(id: string, item: T): Promise<boolean> {
		const dbItem = new this.DbModel({ id, ...item });
		try {
			await dbItem.save();
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}
	async delete(id: string): Promise<boolean> {
		try {
			await this.DbModel.deleteOne({ id });
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}
}

export default BaseRepository;
