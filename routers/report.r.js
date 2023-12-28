const app = require("express");
const { MonthReport, DayReport, MonthReportRender,DayReportRender,SelectReportRender } = require("../controllers/report.c");
const router = app.Router();


router.get('/month', MonthReportRender);

router.get('/day', DayReportRender);

router.get('/', SelectReportRender);

router.post('/month', MonthReport);

router.post('/day', DayReport);

module.exports = router;