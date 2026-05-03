import cors from "cors";
import express from "express";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import antigenRoutes from "./routes/antigenRoutes";
import vaccineRoutes from './routes/vaccineRoutes';
import metadataRoutes from "./routes/metadataRoutes";
import testcaseRoutes from "./routes/testcaseRoutes";
import observationRoutes from "./routes/observationRoutes";

import { partialReply, searchReply, normalize } from './middleware';

const app = express();

app.get("/", (req, res) => res.redirect("/api-docs"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(compression());

app.use(searchReply);
app.use(partialReply);
app.use(normalize);

app.use("/api/v2", metadataRoutes);
app.use("/api/v2/antigens", antigenRoutes);
app.use("/api/v2/vaccines", vaccineRoutes);
app.use("/api/v2/testcases", testcaseRoutes);
app.use("/api/v2/observations", observationRoutes);

export default app;
