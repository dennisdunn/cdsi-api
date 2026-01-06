import cors from "cors";
import express from "express";
import compression from "compression";
import metadata from "./db/metadata.json";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import antigenRoutes from "./routes/antigenRoutes";
import vaccineRoutes from './routes/vaccineRoutes';
import testcaseRoutes from "./routes/testcaseRoutes";
import observationRoutes from "./routes/observationRoutes";

import { partialReply, searchReply } from './middleware';

const app = express();

app.get("/", (req, res) => res.redirect("/api-docs"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(compression());

app.use(searchReply);
app.use(partialReply);

app.use("/api/antigens", antigenRoutes);
app.use("/api/vaccines", vaccineRoutes);
app.use("/api/testcases", testcaseRoutes);
app.use("/api/observations", observationRoutes);
app.use("/api/about", (req, res) => {
    res.json(metadata)
});

export default app;
