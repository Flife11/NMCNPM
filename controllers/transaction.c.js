const SoTietKiem = require("../models/SoTietKiem.m");
const LoaiTietKiem = require("../models/LoaiTietKiem.m");
const GiaoDich = require("../models/GiaoDich.m");

const DepositRender = async (req, res, next) => {
    try {
        res.render('deposit', { title: 'Deposit' });
    }
    catch (error) {
        next(error);
    }
};

const WithdrawRender = async (req, res, next) => {
    try {
        res.render('withdraw', { title: 'Withdraw' });
    }
    catch (error) {
        next(error);
    }
};

const selectTransactionRender = async (req, res, next) => {
    try {
        res.render('selectTransaction', { title: 'Transaction' });
    }
    catch (error) {
        next(error);
    }
};

const Deposit = async (req, res, next) => {
    try {
        const { id, name, date, amount } = req.body;
        if (!id || !name || !date || !amount) {
            return res.status(400).json({ error: "Vui lòng điền đầy đủ thông tin" });
        }
        const passbook = await SoTietKiem.selectbyID(id);
        
        if (amount < 100000) {
            return res.status(400).json({ error: "Số tiền gửi phải lớn hơn hoặc bằng 100.000" });
        }
        if (passbook.length == 0) {
            return res.status(400).json({ error: "Sổ tiết kiệm không tồn tại" });
        }
        if (passbook[0].TinhTrang == 0) {
            return res.status(400).json({ error: "Sổ tiết kiệm đã đóng, không thể giao dịch" });
        }
        //if (passbook[0].HoTenKhachHang != name) {
           // return res.status(400).json({ error: "Tên khách hàng không khớp, vui lòng nhập lại" });
        //}
        const interest = await LoaiTietKiem.selectbyID(passbook[0].MaLoaiTietKiem);
        if (interest[0].SoThang) {
            return res.status(400).json({ error: "Không thể gửi tiền cho sổ có kỳ hạn" });
        }
        const newAmount = parseInt(passbook[0].SoTien) + parseInt(amount);
        const giaoDich = new GiaoDich(id, date, amount);
        await GiaoDich.insertDeposit(giaoDich);
        await SoTietKiem.updateAmount(id, newAmount);

        res.json({ success: "Gửi tiền thành công!" });
    } catch (error) {
        return res.status(500).json({ error: error });
    }

};

const Withdraw = async (req, res, next) => {

};

module.exports = { DepositRender, WithdrawRender, selectTransactionRender, Deposit, Withdraw };