import { Router } from "express";
import Paths from "@src/routes/constants/Paths";
import get from "./get";
import post from "./post";
import { body } from "express-validator";
import put from "./put";
import del from "./del";

const roomRouter = Router();

roomRouter.get(Paths.Rooms.GetAll, get.getAll);
roomRouter.get(Paths.Rooms.Get, get.getOne);

roomRouter.post(Paths.Rooms.Post, post.createRoom);

roomRouter.put(Paths.Rooms.Put, put.updateRoom);

roomRouter.delete(Paths.Rooms.Delete, del.deleteRoom);

export default roomRouter;
