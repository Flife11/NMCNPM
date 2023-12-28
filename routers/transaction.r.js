const app = require("express");
const router = app.Router();

router.get('/deposit', (req, res) => {
    res.render('deposit');
});

router.get('/withdraw', (req, res) => {
    res.render('withdraw');
});

router.get('/', (req, res) => {
    res.render('selectTransaction');
});

module.exports = router;