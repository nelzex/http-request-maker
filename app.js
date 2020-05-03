const express = require('express');
const app = express();
const ejs = require('ejs');

const PORT = process.env.PORT || 5000;

app.set('view engine','ejs');
app.use(express.static('public'))
app.use('/', require('./routes/index'));


app.listen(PORT);
