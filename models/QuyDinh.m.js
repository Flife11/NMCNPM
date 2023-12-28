const db = require("../utilities/db");
const tbName = "QuyDinh";
module.exports = class QuyDinh {
    constructor(_MoTa, _Ten, _DonVi) {
        this.MoTa = _MoTa;
        this.TenQuyDinh = _Ten;
        this.DonVi = _DonVi;
    }

    static async select(colName) {
        return db.SelectFromTable(tbName, colName, "");
    }

    static async updateRule(name, val) {
        var cnt = 0;
        for (var index in val) {
            if (!(isNaN(val[index]))) {                
                cnt += await db.UpdateTable(tbName, ["MoTa"], [val[index]], ["TenQuyDinh"], [name[index]]);
            }
        }
        return cnt;
    }

    static async selectbyName(name) {
        try {
            const data= await db.SelectFromTable(tbName, ["*"], `TenQuyDinh = N'${name}'`);
            return data[0];
        } catch (error) {
            throw (error);
        }
    }
}