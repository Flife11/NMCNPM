const app = require("express");
const router = app.Router();

router.get('/deposit', (req, res) => {
    res.render('deposit', { title: 'Deposit' });
});

router.get('/withdraw', (req, res) => {
    res.render('withdraw', { title: 'Withdraw' });
});

router.get('/', (req, res) => {
    res.render('selectTransaction', { title: 'Transaction' });
});

module.exports = router;