const app = require("express");
const { MonthReport, DayReport, MonthReportRender } = require("../controllers/report.c");
const router = app.Router();


router.get('/month', MonthReportRender);

router.get('/day', (req, res) => {
    res.render('reportDay');
});

router.get('/', (req, res) => {
    res.render('selectReport');
});

router.post('/month', MonthReport);

router.post('/day', DayReport);

module.exports = router;