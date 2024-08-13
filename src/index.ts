import express, { Express} from "express";
import bodyParser from "body-parser";
import { getGuests, addGuest, updateGuest, deleteGuest } from './routes';

const port: number = 8080;
const app: Express = express();

app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Define API routes
app.get("/api/guests", getGuests);
app.post("/api/guests", addGuest);
app.put("/api/guests/:name", updateGuest);
app.delete("/api/guests/:name", deleteGuest);

app.listen(port, () => console.log(`Server listening on port ${port}`));