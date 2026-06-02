import express, { urlencoded } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express({limit : '16kb'}));
app.use(urlencoded());

export default app;