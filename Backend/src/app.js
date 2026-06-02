import express, { urlencoded } from 'express';
import cors from 'cors';
import cokkieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(cookieParser());

app.use(express({limit : '16kb'}));
app.use(urlencoded());


// ? Routes Import 
import userRouter from './routes/user.route.js';
import projectRouter from './routes/project.route.js'
import cookieParser from 'cookie-parser';

app.use("/api/v1/user" , userRouter);
app.use("/api/v1/project" , projectRouter)

export default app;