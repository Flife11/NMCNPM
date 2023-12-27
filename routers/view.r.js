const app = require("express");
const router = app.Router();

router.get('/', (req, res) => {
    res.render('viewPassbook');
});

module.exports = router;