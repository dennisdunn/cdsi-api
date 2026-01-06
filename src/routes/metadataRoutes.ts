import express from "express";
import * as controller from "../controllers/metadataController";

const router = express.Router();

router.get("/about", controller.getMetadata)
router.get("/catalog", controller.getCatalog);

export default router;
