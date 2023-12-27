const app = require("express");
const router = app.Router();

router.get('/month', (req, res) => {
    res.render('reportMonth');
});

router.get('/day', (req, res) => {
    res.render('reportDay');
});

router.get('/', (req, res) => {
    res.render('selectReport');
});

module.exports = router;