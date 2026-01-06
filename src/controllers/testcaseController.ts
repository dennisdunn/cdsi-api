import { Request, Response } from "express";
import testcases from '../db/testcases.json';
import catalog from '../db/catalog'

import {readDb} from '../lib/db';

export const getTestcaseCatalog = (req: Request, res: Response, next: () => void) => {
  res.json(catalog.testcases);
};


export const getTestcases = (req: Request, res: Response, next: () => void) => {
  res.json(testcases);
};

export const getTestcaseById = (req: Request, res: Response, next: () => void) => {
  const { id } = req.params;

  const data = readDb(id, testcases)
  if (!!!data) res.sendStatus(404);

  res.json(data);
};

export const getTestcaseMedicalById = (req: Request, res: Response, next: () => void) => {
  const { id } = req.params;

  const data = readDb(id, testcases)
  data.patient.observationCodes = []; // Added to support select-relevant-series
  if (!!!data) res.sendStatus(404);

  const doses = data.evaluation.administeredDoses.map(x => ({
    cvx: x.cvx,
    mvx: x.mvx,
    vaccineName: x.vaccineName,
    dateAdministered: x.dateAdministered,
    lotExpiration: null,
    condition: null
  }))

  res.json({ ...data.patient, doses });
};
