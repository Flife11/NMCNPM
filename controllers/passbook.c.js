const SoTietKiem = require("../models/SoTietKiem.m");
const LoaiTietKiem = require("../models/LoaiTietKiem.m");
const QuyDinh = require("../models/QuyDinh.m");

const OpenPassbookRender = async (req, res, next) => {
    try {
        let interest = await LoaiTietKiem.select(["*"]);
        res.render('openPassbook', { title: 'Open Passbook' , interest: interest});
    }
    catch (error) {
        next(error);
    }
};

const AddToDB = async (req, res, next) => {
    try {
        const {interest, name, address, cccd, opendate, amount} = req.body;

        if(!interest || !name || !address || !cccd || !opendate || !amount) {
            return res.status(400).json({ error: "Vui lòng điền đầy đủ thông tin" });
        }
        //check if cccd contains only numbers
        if(!/^\d+$/.test(cccd)) {
            return res.status(400).json({ error: "Số CCCD không được chứa chữ cái" });
        }
        if(cccd.length != 12 && cccd.length != 9 ) { 
            return res.status(400).json({ error: "Số CCCD phải có độ dài là 9 hoặc 12" });
        }

        //check min amount
        let minAmount = await QuyDinh.selectbyName("Tiền gửi tối thiểu");
        if(amount < minAmount.MoTa) {
            return res.status(400).json({ error: `Số tiền gửi phải lớn hơn ${minAmount.MoTa} ${minAmount.DonVi}` });
        }

        const tietKiem = new SoTietKiem(interest, name, address, cccd, opendate, amount, 1);
        let InsertedData = await SoTietKiem.insert(tietKiem);
        //InsertedData is a object, for each property in InsertedData, make it a string `key: value\n`
        let message = `Mở sổ tiết kiệm thành công\n`;
        for (const [key, value] of Object.entries(InsertedData)) {
            message += `${key}: ${value}\n`;
        }

        //return a success message for ajax call
        return res.status(200).json({ success: message });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
};

module.exports = {OpenPassbookRender,AddToDB};
