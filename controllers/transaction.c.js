const SoTietKiem = require("../models/SoTietKiem.m");
const LoaiTietKiem = require("../models/LoaiTietKiem.m");
const GiaoDich = require("../models/GiaoDich.m");
const QuyDinh = require("../models/QuyDinh.m");

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

        

        //check if passbook exists
        if (passbook.length == 0) {
            return res.status(400).json({ error: "Sổ tiết kiệm không tồn tại" });
        }

        //check if passbook is closed
        if (passbook[0].TinhTrang == 0) {
            return res.status(400).json({ error: "Sổ tiết kiệm đã đóng, không thể giao dịch" });
        }

        //check name
        if (passbook[0].HoTenKhachHang != name) {
        return res.status(400).json({ error: "Tên khách hàng không khớp, vui lòng nhập lại" });
        }

        //check if passbook has term
        const interest = await LoaiTietKiem.selectbyID(passbook[0].MaLoaiTietKiem);
        if (interest.SoThang) {
            return res.status(400).json({ error: "Không thể gửi tiền cho sổ có kỳ hạn" });
        }
        //check min amount
        let minAmount = await QuyDinh.selectbyName("Tiền gửi tối thiểu");
        if (amount < minAmount.MoTa) {
            return res.status(400).json({ error: `Số tiền gửi phải lớn hơn ${minAmount.MoTa} ${minAmount.DonVi}` });
        }

        //update amount
        const newAmount = parseInt(passbook[0].SoTien) + parseInt(amount);
        const giaoDich = new GiaoDich(id, date, amount);
        await GiaoDich.insertDeposit(giaoDich);
        await SoTietKiem.updateAmount(id, newAmount);

        return res.status(200).json({ success: `Gửi tiền thành công!\nSố dư mới: ${newAmount}` });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error });
    }

};

const Withdraw = async (req, res, next) => {

    try {
        let { id, name, date, amount } = req.body;
        if (!id || !name || !date || !amount) {
            return res.status(400).json({ error: "Vui lòng điền đầy đủ thông tin" });
        }
        amount = parseInt(amount);
        const passbook = await SoTietKiem.selectbyID(id);
        //check if passbook exists
        if (passbook.length == 0) {
            return res.status(400).json({ error: "Sổ tiết kiệm không tồn tại" });
        }

        //check if passbook is closed
        if (passbook[0].TinhTrang == 0) {
            return res.status(400).json({ error: "Sổ tiết kiệm đã đóng, không thể giao dịch" });
        }

        //check name
        if (passbook[0].HoTenKhachHang != name) {
        return res.status(400).json({ error: "Tên khách hàng không khớp, vui lòng nhập lại" });
        }

        //check if passbook is able to withdraw (after x days)
        let minDay = await QuyDinh.selectbyName("Thời gian gửi tối thiểu");
        // Convert strings to Date objects
        let dateObj = new Date(date);
        let ngayMoSoObj = new Date(passbook[0].NgayMoSo);
        let differenceInDays = (dateObj - ngayMoSoObj) / (1000 * 60 * 60 * 24);
        if (differenceInDays < minDay.MoTa) {
            let ngayRutTien = new Date(ngayMoSoObj.getTime());
            ngayRutTien.setDate(ngayRutTien.getDate() + minDay.MoTa);
            return res.status(400).json({ error: `Chỉ được rút ít nhất ${minDay.MoTa} ${minDay.DonVi} sau ngày mở sổ\nNgày mở sổ: ${ngayMoSoObj}\nNgày có thể rút: ${ngayRutTien}` });
        }

        let interest = await LoaiTietKiem.selectbyID(passbook[0].MaLoaiTietKiem);
        if (interest.SoThang) { // sổ có kỳ hạn
            if (differenceInDays < interest.SoThang * 30) {
                let ngayDaoHanObj = new Date(ngayMoSoObj.getTime());
                ngayDaoHanObj.setDate(ngayDaoHanObj.getDate() + interest.SoThang * 30);
                return res.status(400).json({ error: `Chưa đến ngày đáo hạn, không thể rút!\n (Ngày mở sổ: ${passbook[0].NgayMoSo}\nKì hạn: ${interest.MoTa}\nNgày đáo hạn: ${ngayDaoHanObj})` });
            }
            if (amount > passbook[0].SoTien) {
                return res.status(400).json({ error: `Số tiền rút không được lớn hơn số tiền hiện có\nSố tiền hiện có: ${passbook[0].SoTien}` });
            }

            if (amount != passbook[0].SoTien) {
                return res.status(400).json({ error: `Sổ có kỳ hạn, chỉ được rút toàn bộ số tiền! (số tiền hiện tại: ${passbook[0].SoTien})` });
            }

            //để ý công thức chỗ này có sai hong ?
            let total = passbook[0].SoTien + passbook[0].SoTien * interest.LaiSuat / 100 * parseInt(parseInt((differenceInDays) / 30) / interest.SoThang) * interest.SoThang;
            const giaoDich = new GiaoDich(id, date, total);

            await GiaoDich.insertWithdraw(giaoDich);
            await SoTietKiem.updateAmount(id, 0);
            await SoTietKiem.updateStatus(id, 0); // close passbook

            let success = "Rút tiền thành công! \n";
            success += "Số tiền gốc: " + passbook[0].SoTien + "\n";
            success += "Số tháng đã gửi: " + parseInt(differenceInDays / 30) + "\n";
            success += "Kì hạn: " + interest.SoThang + "\n";
            success += "Số lần đáo hạn: " + parseInt(parseInt(differenceInDays / 30) / interest.SoThang) + "\n";
            success += "Lãi suất: " + interest.LaiSuat + "%\n";
            success += "Số tiền lãi: " + passbook[0].SoTien * interest.LaiSuat / 100 * parseInt(parseInt(differenceInDays / 30) / interest.SoThang) * interest.SoThang + "\n";
            success += "Tổng tiền: " + total + "\n";
            success += "Số tiền còn lại: " + 0 + "\n";
            success += "Sổ đã đóng";
            return res.status(200).json({ success: success });
        }

        //sổ không kỳ hạn
        if (amount > passbook[0].SoTien) {
            return res.status(400).json({ error: `Số tiền rút không được lớn hơn số tiền hiện có\nSố tiền hiện có: ${passbook[0].SoTien}` });
        }
        let total = amount + passbook[0].SoTien * interest.LaiSuat / 100 * parseInt(differenceInDays / 30);
        const giaoDich = new GiaoDich(id, date, total);
        await GiaoDich.insertWithdraw(giaoDich);

        let newAmount = passbook[0].SoTien - amount;
        await SoTietKiem.updateAmount(id, newAmount);
        if (newAmount == 0) {
            await SoTietKiem.updateStatus(id, 0); // close passbook
        }

        let success = "Rút tiền thành công! \n";
        success += "Số tiền gốc: " + passbook[0].SoTien + "\n";
        success += "Số tiền đã rút: " + amount + "\n";
        success += "Số tháng đã gửi: " + parseInt(differenceInDays / 30) + "\n";
        success += "Kì hạn: " + "Không có kì hạn, mặc định 1 tháng" + "\n";
        success += "Số lần đáo hạn: " + parseInt(differenceInDays / 30)  + "\n";
        success += "Lãi suất: " + interest.LaiSuat + "%\n ";
        success += "Số tiền lãi: " + passbook[0].SoTien * interest.LaiSuat / 100 * parseInt(differenceInDays / 30) + "\n";
        success += "Tổng tiền: " + total + "\n";
        success += "Số tiền còn lại: " + newAmount +"\n";
        success += "Sổ đã đóng: " + (newAmount == 0 ? "Có\n" : "Không\n");
        return res.status(200).json({ success: success });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error });
    }
};

module.exports = { DepositRender, WithdrawRender, selectTransactionRender, Deposit, Withdraw };