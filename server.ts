import express from "express";
import mongoose from "mongoose";
mongoose.connect('mongodb://localhost:27017/data')

import bodyParser from "body-parser";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import UserDao from "./daos/UserDao";
import TuitDao from "./daos/TuitDao";

const app = express();
app.use(bodyParser.json())


app.get('/', (req, res) =>
 res.send('Hello World!'));

app.get('/add/:a/:b', (req, res) => {
    res.send(req.params.a + req.params.b);
})
const userDao = new UserDao();
const tuitDao = new TuitDao();
const userController = new UserController(app, userDao);
const tuitController = new TuitController(app, tuitDao);


const PORT = 4000;
app.listen(process.env.PORT || PORT);