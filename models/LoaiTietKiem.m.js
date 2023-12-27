const db = require("../utilities/db");
const tbName = "LoaiTietKiem";
module.exports = class LoaiTietKiem {
    constructor(_MoTa, _SoThang, _LaiSuat) {
        this.MoTa = _MoTa;
        this.SoThang = _SoThang;
        this.LaiSuat = _LaiSuat;
    }
    
    static async insert(tietKiem) {
        db.InsertToTable(tbName, ["MoTa", "SoThang", "LaiSuat", "MaLoaiTietKiem"], [tietKiem.MoTa, tietKiem.SoThang, tietKiem.LaiSuat]);
    }

    static async select() {
        return db.SelectFromTable(tbName, ["*"], "");
    }
}