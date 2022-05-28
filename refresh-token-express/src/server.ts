import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use(router);
app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        return response.json({ status: 'Error', message: error.message });
    }
);

const tokenKey = process.env.TOKEN_KEY;
const port = 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
