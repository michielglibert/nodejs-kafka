import { Router } from "express";
import Paths from "./constants/Paths";
import roomRouter from "./rooms/RoomRoutes";

const apiRouter = Router();

apiRouter.use(Paths.Rooms.Base, roomRouter);

export default apiRouter;
