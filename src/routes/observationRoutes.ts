import express from "express";
import * as controller from "../controllers/observationController";

const router = express.Router();

router.get("/:code", controller.getObservationByCode);
router.get("/", controller.getObservations);

export default router;
