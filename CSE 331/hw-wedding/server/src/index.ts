import express, { Express } from "express";
import { addGuest, getGuest, listGuests } from './routes';
import bodyParser from 'body-parser';


// Configure and start the HTTP server.
const port: number = 8088;
const app: Express = express();
app.use(bodyParser.json());
app.get("/api/list", listGuests);
app.post("/api/add", addGuest);
app.get("/api/get", getGuest);
app.listen(port, () => console.log(`Server listening on ${port}`));
