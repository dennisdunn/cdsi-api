import { Request, Response } from "express";
import observations from "../db/observations.json";
import catalog from "../db/catalog"

import { readDb } from '../lib/db'

export const getObservationCatalog = (req: Request, res: Response, next: () => void) => {
    return res.json(catalog.observations)
};

export const getObservations = (req: Request, res: Response, next: () => void) => {
    return res.json(observations)
};

export const getObservationByCode = (req: Request, res: Response, next: () => void) => {
    const { code } = req.params;

    const data = readDb(code, observations)
    if (!!!data) res.sendStatus(404);

    res.json(data);
};