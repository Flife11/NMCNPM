const db = require("../utilities/db");
const tbWithdraw = "PhieuRutTien";
const tbDeposit = "PhieuGuiTien";

const IDWithdraw = "MaPhieuRutTien";
const IDDeposit = "MaPhieuGuiTien";

module.exports = class GiaoDich {
    constructor(_MaSoTietKiem, _NgayGiaoDich, _SoTienGiaoDich) {
        this.MaSoTietKiem = _MaSoTietKiem;
        this.NgayGiaoDich = _NgayGiaoDich;
        this.SoTienGiaoDich = _SoTienGiaoDich;
    }

    static async insertWithdraw(giaoDich) {
        try {
            db.InsertToTable(tbWithdraw, ["MaSoTietKiem", "NgayRut", "SoTienRut", IDWithdraw], [giaoDich.MaSoTietKiem, giaoDich.NgayGiaoDich, giaoDich.SoTienGiaoDich]);
        } catch (error) {
            throw (error);
        }
    }

    static async insertDeposit(giaoDich) {
        try {
            db.InsertToTable(tbDeposit, ["MaSoTietKiem", "NgayGui", "SoTienGui", IDDeposit], [giaoDich.MaSoTietKiem, giaoDich.NgayGiaoDich, giaoDich.SoTienGiaoDich]);
        } catch (error) {
            throw (error);
        }
    }

    static async selectWithdrawby(col, val) {
        try {
            return db.SelectFromTable(tbWithdraw, ["*"], `${col}='${val}'`);
        } catch (error) {
            throw (error);
        }
    }

    static async selectDepositby(col, val) {
        try {
            return db.SelectFromTable(tbDeposit, ["*"], `${col}='${val}'`);
        } catch (error) {
            throw (error);
        }
    }

    static async selectLastWithdrawOf(ID, month, year) {
        try {
            //console.log(ID, month, year)
            const data = await db.SelectFromTable(tbWithdraw, [`MAX(${IDWithdraw}) as m`, 'NgayRut'],
                `MaSoTietKiem='${ID}' and MONTH(NgayRut)='${month}' and YEAR(NgayRut)='${year}' group by NgayRut`);
            //console.log(data, 'giaodich');
            if (data.length == 0) return undefined;
            return data[0];
        } catch (error) {
            throw (error);
        }
    }
}