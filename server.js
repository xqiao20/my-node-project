const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movie-db');
const express = require('express');
const app = express();

require('./movies/service')(app);
app.listen(4000);
