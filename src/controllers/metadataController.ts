import { Request, Response } from "express";

//import metadata from "../db/metadata.json";
import { catalog, metadata } from "../db"

export const getMetadata = (req: Request, res: Response, next: () => void) => {
    res.json(metadata)
}

export const getCatalog = (req: Request, res: Response, next: () => void) => {

    return res.json(catalog)
}