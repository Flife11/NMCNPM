const express = require('express');
const router = express.Router();
const {RuleChangeRender, RulesRender, 
    PeriodRender, InterestRender, RulesAdd, RulesRemove, RulesEdit} = require('../controllers/rules.c');

router.get('/', RulesRender);
router.get('/rule', RuleChangeRender);
router.get('/period', PeriodRender);
router.get('/interest', InterestRender);

router.post('/add', RulesAdd);
router.post('/remove', RulesRemove);
router.post('/edit', RulesEdit);

module.exports = router;