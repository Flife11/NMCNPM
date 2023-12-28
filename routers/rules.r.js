const express = require('express');
const router = express.Router();
const {RuleChangeRender, RulesRender, 
    PeriodRender, InterestRender, PeriodAdd, PeriodEdit, PeriodRemove,
    InterestUpdate,
    RuleUpdate} = require('../controllers/rules.c');

router.get('/', RulesRender);
router.get('/rule', RuleChangeRender);
router.get('/period', PeriodRender);
router.get('/interest', InterestRender);

router.post('/add', PeriodAdd);
router.post('/remove', PeriodRemove);
router.post('/edit', PeriodEdit);
router.post('/interest_update', InterestUpdate);
router.post('/rule_update', RuleUpdate);


module.exports = router;