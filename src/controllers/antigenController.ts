
import { Request, Response } from "express";

import { readDb } from '../lib/db'
import antigens from '../db/antigens.json';
import catalog from '../db/catalog'

export const getAntigenCatalog =  (req: Request, res: Response, next: () => void) => {
    res.send(catalog.antigens);
};

export const getAntigens = (req: Request, res: Response, next: () => void) => {
    res.send(antigens);
};

export const getAntigenByName = (req: Request, res: Response, next: () => void) => {
    const { name } = req.params;

    const data = readDb(name, antigens)
    if (!!!data) res.sendStatus(404);

    res.json(data);
};

export const getSeriesByAntigenName = (req: Request, res: Response, next: () => void) => {
    const { name } = req.params;

    const data = readDb(name, antigens)
    if (!!!data) res.sendStatus(404);

    res.json(data.series);
};

export const getSeriesByAntigenNameAndIndex = (req: Request, res: Response, next: () => void) => {
    const { name, id } = req.params;

    let data = readDb(name, antigens)
    if (!!!data) res.sendStatus(404);

    const idx = parseInt(id);
    data = isNaN(idx) ? data.series.find(x => x.seriesName === id) : data.series[idx];
    if (!!!data) res.sendStatus(404);

    res.json(data);
};

export const getContraindicationsByAntigenName = (req: Request, res: Response, next: () => void) => {
    const { name } = req.params;

    let data = readDb(name, antigens)
    if (!!!data) res.sendStatus(404);

    res.json(data.contraindications);
};
