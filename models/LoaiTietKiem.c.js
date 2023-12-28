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
    
    static async deleteLTT(MoTa) {
        return db.DeleteLTT(tbName, MoTa);
    }

    static async updateName(MoTaCu, MoTaMoi) {
        return db.UpdateTable(tbName, ["MoTa"], [MoTaMoi], ["MoTa"], [MoTaCu]);
    }

    static async select(colName) {
        return db.SelectFromTable(tbName, colName, "");
    }

    static async updateInterest(ID, interest) {
        var cnt = 0;
        //console.log(ID);
        //console.log(interest);
        for (var index in interest) {
            if (!(isNaN(interest[index]))) {                
                cnt += await db.UpdateTable(tbName, ["LaiSuat"], [interest[index]], ["MaLoaiTietKiem"], [ID[index]]);
                //console.log(cnt, 0);
            }
        }
        return cnt;
    }    
}