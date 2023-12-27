const db = require("../utilities/db");
const tbName = "LoaiTietKiem";
const IDName = "MaLoaiTietKiem";
module.exports = class LoaiTietKiem {
    constructor(_MoTa, _SoThang, _LaiSuat) {
        this.MoTa = _MoTa;
        this.SoThang = _SoThang;
        this.LaiSuat = _LaiSuat;
    }

    static async insert(tietKiem) {
        try {
            db.InsertToTable(tbName, ["MoTa", "SoThang", "LaiSuat", IDName], [tietKiem.MoTa, tietKiem.SoThang, tietKiem.LaiSuat]);
        } catch (error) {
            throw (error);
        }
    }

    static async select() {
        try {
            return db.SelectFromTable(tbName, ["*"], "");
        } catch (error) {
            throw (error);
        }
    }

    static async selectbyID(ID) {
        try {
            return db.SelectFromTable(tbName, ["*"], `${IDName} = ${ID}`);
        } catch (error) {
            throw (error);
        }
    }
}