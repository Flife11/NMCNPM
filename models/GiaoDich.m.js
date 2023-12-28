const db = require("../utilities/db");
const tbWithdraw = "PhieuRutTien";
const tbDeposit = "PhieuGuiTien";

const IDWithdraw = "MaPhieuRutTien";
const IDDeposit = "MaPhieuGuiTien";

module.exports = class GiaoDich {
    constructor( _MaSoTietKiem, _NgayGiaoDich, _SoTienGiaoDich) {
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
}