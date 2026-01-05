import express from "express";
import * as controller from "../controllers/testcaseController";

const router = express.Router();
router.get("/:id/medical", controller.getTestcaseMedicalById);
router.get("/:id", controller.getTestcaseById);
router.get("/", controller.getTestcases);

export default router;
