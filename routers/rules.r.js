const express = require('express');
const router = express.Router();
const {RuleChangeRender, RulesRender, 
    PeriodRender, InterestRender} = require('../controllers/rules.c');

router.get('/', RulesRender);
router.get('/rule', RuleChangeRender);
router.get('/period', PeriodRender);
router.get('/interest', InterestRender);

module.exports = router;