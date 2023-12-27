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
        db.InsertToTable(tbName, ["MaLoaiTietKiem", "HoTenKhachHang", "DiaChi", "CMND", "NgayMoSo", "SoTien",IDName],
            [tietKiem.MaLoaiTietKiem, tietKiem.HoTenKhachHang, tietKiem.DiaChi, tietKiem.CMND, tietKiem.NgayMoSo, tietKiem.SoTien]);
    }
}