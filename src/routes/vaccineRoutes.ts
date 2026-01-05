import express from "express";
import * as controller from "../controllers/vaccineController";

const router = express.Router();

router.get("/groups/:name/antigens", controller.getVaccineGroupAntigensByName)
router.get("/groups/:name", controller.getVaccineGroupByName)
router.get("/groups", controller.getVaccineGroups)
router.get('/:cvx/conflicts', controller.getVaccineConflictsByCvx)
router.get('/:cvx/antigens', controller.getVaccineAntigensByCvx)
router.get("/:cvx", controller.getVaccineByCvx)
router.get("/", controller.getVaccines)

export default router;