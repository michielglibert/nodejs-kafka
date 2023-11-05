import { IRead } from "@src/interfaces/IRead";
import { IWrite } from "@src/interfaces/IWrite";
import { IPatient, Patient, patientSchema } from "@src/models/Patient";
import { model } from "mongoose";
import BaseRepository from "./BaseRepository";

export class PatientRepository extends BaseRepository<IPatient> {}
