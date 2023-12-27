const app = require("express");
const router = app.Router();
const {OpenPassbookRender,AddToDB} = require('../controllers/passbook.c');

router.get('/', OpenPassbookRender);
router.post('/', AddToDB);

module.exports = router;