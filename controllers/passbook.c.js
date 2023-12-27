const SoTietKiem = require("../models/SoTietKiem.m");
const LoaiTietKiem = require("../models/LoaiTietKiem.m");

const OpenPassbookRender = async (req, res, next) => {
    try {
        let interest = await LoaiTietKiem.select();
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
        if(amount < 100000) {
            return res.status(400).json({ error: "Số tiền gửi phải lớn hơn 100.000" });
        }

        const tietKiem = new SoTietKiem(interest, name, address, cccd, opendate, amount, 1);
        await SoTietKiem.insert(tietKiem);

        //return a success message for ajax call
        res.json({ success: "Mở sổ tiết kiệm thành công" });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
};

module.exports = {OpenPassbookRender,AddToDB};
