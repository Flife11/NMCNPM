const db = require("../utilities/db");
const tbName = "SoTietKiem";
const IDName = "MaSoTietKiem";
module.exports = class SoTietKiem {
    constructor(_MaLoaiTietKiem, _HoTenKhachHang, _DiaChi, _CMND, _NgayMoSo, _SoTien, _TinhTrang) {
        this.MaLoaiTietKiem = _MaLoaiTietKiem;
        this.HoTenKhachHang = _HoTenKhachHang;
        this.DiaChi = _DiaChi;
        this.CMND = _CMND;
        this.NgayMoSo = _NgayMoSo;
        this.SoTien = _SoTien;
        this.TinhTrang = _TinhTrang;
    }

    static async insert(tietKiem) {
        try {
            db.InsertToTable(tbName, ["MaLoaiTietKiem", "HoTenKhachHang", "DiaChi", "CMND", "NgayMoSo", "SoTien",IDName],
            [tietKiem.MaLoaiTietKiem, tietKiem.HoTenKhachHang, tietKiem.DiaChi, tietKiem.CMND, tietKiem.NgayMoSo, tietKiem.SoTien]);
        } catch (error) {
            throw(error);
        }
    }

    static async selectbyID(ID) {
        try {
            return db.SelectFromTable(tbName, ["*"], `${IDName} = ${ID}`);
        } catch (error) {
            throw(error);
        }
    }

    static async updateAmount(ID, amount) {
        try {
            db.UpdateTable(tbName, ["SoTien"], [amount] ,[IDName],[ID]);
        } catch (error) {
            throw(error);
        }
    }

    static async updateStatus(ID, status) {
        try {
            db.UpdateTable(tbName, ["TinhTrang"], [status] ,[IDName],[ID]);
        } catch (error) {
            throw(error);
        }
    }

    // Không truyền tham số value sẽ là select all
    static async selectbyAttr(attr, value) {
        try {
            if (value==undefined) return db.SelectFromTable(tbName, ['*'], "");
            return db.SelectFromTable(tbName, ["*"], `${attr}=N'${value}'`);
        } catch(error) {
            throw(error);
        }
    }
}