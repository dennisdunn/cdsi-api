import { Request, Response } from "express";

import { readDb } from '../lib/db'

import groups from '../db/groups.json';
import vaccines from '../db/vaccines.json';


export const getVaccines = (req: Request, res: Response, next: () => void) => {
    res.send(vaccines);
};

export const getVaccineByCvx = (req: Request, res: Response, next: () => void) => {
    const { cvx } = req.params;

    const data = readDb(cvx, vaccines)
    if (!!!data) res.sendStatus(404);

    res.json(data);
};

export const getVaccineConflictsByCvx = (req: Request, res: Response, next: () => void) => {
    const { cvx } = req.params;

    const data = readDb(cvx, vaccines)
    if (!!!data) res.sendStatus(404);

    res.json(data.conflicts);
};

export const getVaccineAntigensByCvx = (req: Request, res: Response, next: () => void) => {
    const { cvx } = req.params;

    const data = readDb(cvx, vaccines)
    if (!!!data) res.sendStatus(404);

    res.json(data.association.map(item => item.antigen));
};


export const getVaccineGroups = (req: Request, res: Response, next: () => void) => {
    res.json(groups);
};

export const getVaccineGroupByName = (req: Request, res: Response, next: () => void) => {
    const { name } = req.params;

    const data = readDb(name, groups)
    if (!!!data) res.sendStatus(404);

    res.json(data);
};

export const getVaccineGroupAntigensByName = (req: Request, res: Response, next: () => void) => {
    const { name } = req.params;

    const data = readDb(name, groups)
    if (!!!data) res.sendStatus(404);

    res.json(data.antigen);
};