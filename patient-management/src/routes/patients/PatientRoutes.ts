import { Router } from "express";
import Paths from "@src/routes/constants/Paths";
import get from "./get";
import post from "./post";
import { body } from "express-validator";
import put from "./put";
import del from "./del";

const userRouter = Router();

userRouter.get(Paths.Patients.Get, get.getAll);
userRouter.get(Paths.Patients.GetOne, get.getOne);

userRouter.post(Paths.Patients.Post, post.createPatient);

userRouter.put(Paths.Patients.Put, put.updatePatient);

userRouter.delete(Paths.Patients.Delete, del.deletePatient);

export default userRouter;
