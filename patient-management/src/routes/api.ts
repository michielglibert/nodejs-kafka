import { Router } from "express";
import Paths from "./constants/Paths";
import PatientRouter from "./patients/PatientRoutes";

const apiRouter = Router();

apiRouter.use(Paths.Patients.Base, PatientRouter);

export default apiRouter;
