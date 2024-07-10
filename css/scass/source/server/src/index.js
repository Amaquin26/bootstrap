import express, {urlencoded} from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { UserRoute } from './route/UserRoute.js';

dotenv.config()

const app = express();

const corsConfig = {
    origin:[
        'http://localhost:5174',
        'http://localhost:5173',
    ],
    credentials:true
}

app.use(cors(corsConfig));
app.use(urlencoded({extended:true}));
app.use(express.json());

app.use("/users",UserRoute)

const port = process.env.PORT || 5000
app.listen(port, () => {console.log("Server has started")})