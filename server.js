const express = require('express');
const url = require('url');
const fs = require('fs');
const gc = require('./controllers/gc.js');
const port = process.env.PORT || 3000;

const app = express();

app.set("view engine","ejs");

app.get('/', gc.getHomePage);


app.post('/submit', gc.insertData);

app.get('/getphotos', gc.getPhotoData);

app.get('/grade', gc.grade);




app.use(express.static('public'));

app.listen(port);
