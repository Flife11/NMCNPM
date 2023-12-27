// package npm
require('dotenv').config();
const express = require("express");
const { engine } = require('express-handlebars');
const http= require('http');
const app = express();

const port = process.env.PORT | 3000;
const host = process.env.HOST || 'localhost';

// custom module
const db = require('./utilities/db');

// custom router
const homeRouter = require('./routers/home.r.js');
const openPassbookRouter = require('./routers/openPassbook.r');
const transactionRouter = require('./routers/transaction.r');
const rulesRouter = require('./routers/rules.r');
const reportRouter = require('./routers/report.r');
const viewPassbookRouter = require('./routers/view.r');

// setup hbs

app.engine('.hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use('/img', express.static(__dirname + "/img"));



app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something broke!');
})

// routing
app.use('/view', viewPassbookRouter);
app.use('/transaction', transactionRouter);
app.use('/report', reportRouter);
app.use('/rules', rulesRouter);
app.use('/openPassbook', openPassbookRouter);
app.use('/', homeRouter);




//db.query();

// listen
const server = http.createServer(app);   
server.listen(port, () => console.log(`Server is running at http://${host}:${port}`));