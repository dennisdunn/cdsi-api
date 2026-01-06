import express from "express";
import * as controller from "../controllers/antigenController";

const router = express.Router();

router.get("/catalog", controller.getAntigenCatalog)
router.get("/:name/contraindications", controller.getContraindicationsByAntigenName);
router.get("/:name/series/:id", controller.getSeriesByAntigenNameAndIndex);
router.get("/:name/series", controller.getSeriesByAntigenName);
router.get("/:name", controller.getAntigenByName);
router.get("/", controller.getAntigens);

export default router;
