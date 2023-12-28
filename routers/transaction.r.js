const app = require("express");
const router = app.Router();
const {DepositRender,WithdrawRender,selectTransactionRender,Deposit,Withdraw} = require('../controllers/transaction.c');

router.get('/deposit', DepositRender);

router.get('/withdraw', WithdrawRender);

router.get('/', selectTransactionRender);

router.post('/deposit', Deposit);

router.post('/withdraw', Withdraw);

module.exports = router;