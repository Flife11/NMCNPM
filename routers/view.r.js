const app = require("express");
const router = app.Router();

const { viewRender, viewSearch } = require("../controllers/view.c");

router.get('/', viewRender);

router.post('/search', viewSearch);

module.exports = router;