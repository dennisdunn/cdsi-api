const cors = require("cors");
import express from "express";
import swaggerUi from "swagger-ui-express";
import antigenRoutes from "./routes/antigenRoutes";
import testcaseRoutes from "./routes/testcaseRoutes";
import scheduleRoutes from "./routes/scheduleRoutes";
import observationRoutes from "./routes/observationRoutes";
import swaggerDocument from "./swagger.json";
import metadata from "./db/metadata.json";
// import { noCache, partialReply, searchReply, nullstringReply } from './middleware';
import { noCache, partialReply, searchReply, cleanUpReply } from './middleware';

const app = express();

app.get("/", (req, res) => res.redirect("/api-docs"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());

app.use(noCache);
app.use(searchReply);
app.use(partialReply);
// app.use(nullstringReply);
app.use(cleanUpReply);

app.use("/api/antigens", antigenRoutes);
app.use("/api/vaccines", scheduleRoutes);
app.use("/api/testcases", testcaseRoutes);
app.use("/api/observations", observationRoutes);

app.use("/api/about", (req, res) => {
    res.json(metadata)
})

export default app;
