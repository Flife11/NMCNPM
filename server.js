require('dotenv').config();
const express = require("express");
const { engine } = require('express-handlebars');
const http= require('http');
const app = express();
const router = require('./routers/router');

app.engine('.hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use('/img', express.static(__dirname + "/img"));

const port = process.env.PORT | 3000;
const host = process.env.HOST || 'localhost';

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
// app.use(
//     session({
//         resave: true,
//         saveUninitialized: true,
//         secret: secret,
//         cookie: { secure: false },
//     }),
// );

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something broke!');
})

app.use(router);
// app.use("/", async (req, res, next) => {
//     res.render('rules');
// });

const db = require('./utilities/db');
//db.query();

const server = http.createServer(app);   
server.listen(port, () => console.log(`Server is running at http://${host}:${port}`));