const app = require("express");
const router = app.Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

module.exports = router;