import express, { Express } from "express";
import bodyParser from 'body-parser';
import { listAuctions, addAuction, bidInAuction, getAuction } from './routes';


// Configure and start the HTTP server.
const port: number = 8088;
const app: Express = express();
app.use(bodyParser.json());
app.get("/api/list", listAuctions);
app.post("/api/add", addAuction);
app.post("/api/bid", bidInAuction);
app.get("/api/get", getAuction);
app.listen(port, () => console.log(`Server listening on ${port}`));
