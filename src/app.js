import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer();

// HBS Configuration
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

// Register partials directory
hbs.registerPartials(path.join(__dirname, '../views/partials'));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({
    limit: "16kb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));

app.use(upload.none());


// Static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js";
import pageRouter from "./routes/page.routes.js";

// page routes
app.use("/", pageRouter);





// routes declaration
app.use("/api/v1/users", userRouter);


export { app };




