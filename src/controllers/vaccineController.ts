import { Request, Response } from "express";

import groups from '../db/groups.json';
import vaccines from '../db/vaccines.json';
import catalog from '../db/catalog'

import { readDb } from '../lib/db'

export const getVaccineCatalog = (req: Request, res: Response, next: () => void) => {
    res.send(catalog.vaccines);
};

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

export const getVaccineGroupsCatalog = (req: Request, res: Response, next: () => void) => {
    res.send(catalog.groups);
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