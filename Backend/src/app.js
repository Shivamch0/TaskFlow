import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// ? Routes Import 
import userRouter from './routes/user.route.js';
import projectRouter from './routes/project.route.js';
import taskRouter from './routes/task.route.js';
import subTaskRouter from './routes/subTask.route.js';
import errorHandler from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json({limit : '16kb'}));
app.use(urlencoded());

app.use("/api/v1/user" , userRouter);
app.use("/api/v1/project" , projectRouter);
app.use("/api/v1/task" , taskRouter);
app.use("/api/v1/subTask" , subTaskRouter);

app.use(errorHandler);

export default app;