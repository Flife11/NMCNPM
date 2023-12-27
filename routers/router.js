const express = require('express');
const router = express.Router();
const rulesRouter = require('./rules.r');

router.use('/rules', rulesRouter);

module.exports = router;