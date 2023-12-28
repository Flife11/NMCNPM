const SoTietKiem = require("../models/SoTietKiem.m");
const LoaiTietKiem = require("../models/LoaiTietKiem.m");
const GiaoDich = require("../models/GiaoDich.m");

async function tongThuSTK(arr, colName, ltk) {
    var res = 0;
    const l = await LoaiTietKiem.selectbyName(ltk);    
    for (var s of arr) {        
        if (s.MaLoaiTietKiem==l.MaLoaiTietKiem) res += parseInt(s[`${colName}`]);
    }
    return res;
}

async function tongThuGiaodich(arr, colName, mota) {
    var res = 0;    
    const l = await LoaiTietKiem.selectbyName(mota);
    console.log(arr, mota);
    for (var s of arr) {        
        const stk = await SoTietKiem.selectbyID(s.MaSoTietKiem);
        //console.log(stk, 1);
        if (stk[0].MaLoaiTietKiem==l.MaLoaiTietKiem) res += parseInt(s[`${colName}`]);
    }
    return res;
}

const DayReport = async (req, res, next) => {
    try {
        const {date} = req.body;
        const loaiTietKiem = await LoaiTietKiem.select(['*']);
        const result = [];

        const stk = await SoTietKiem.selectbyAttr("NgayMoSo", date);
        const rut = await GiaoDich.selectWithdrawby("NgayRut" , date);
        const gui = await GiaoDich.selectDepositby("NgayGui" , date);

        for (var ltk of loaiTietKiem) { 
            //console.log(ltk, 1);
            const mota = ltk.MoTa;
            const tmp = {};
            tmp.LoaiTietKiem = mota;
            var tongThu = 0;
            var tongChi = 0;
            
            var tmpRes = await tongThuSTK(stk, "SoTien", mota);
            tongThu = tongThu + parseInt(tmpRes);
            tmpRes = await tongThuGiaodich(gui, "SoTienGui", mota);
            tongThu = tongThu + parseInt(tmpRes);
            tmpRes = await tongThuGiaodich(rut, "SoTienRut", mota);
            tongChi = tongChi + parseInt(tmpRes);
            

            tmp.tongThu = tongThu;
            tmp.tongChi = tongChi;
            tmp.chenhLech = tongThu-tongChi;  
            
            result.push(tmp);
        }        
        res.status(201).json(result);        
    }
    catch (error) {
        next(error);
    }
};

const MonthReportRender = async (req, res, next) =>  {
    try {
        const data = await LoaiTietKiem.select(["*"]);
        res.render('reportMonth', {
            ltk: () => data,
            title: 'Month Report'
        })
    } catch (error) {
        next(error);
    }
}

const DayReportRender = async (req, res, next) =>  {
    try {
        res.render('reportDay',{title: 'Day Report'});
    } catch (error) {
        next(error);
    }
}

const SelectReportRender = async (req, res, next) =>  {
    try {
        res.render('selectReport',{title: 'Select Report'});
    } catch (error) {
        next(error);
    }
}

async function SoMo(month, year, mota) {
    const res = {};
    const stk = await SoTietKiem.selectbyMonthYear("NgayMoSo", month, year); 
    const l = await LoaiTietKiem.selectbyName(mota);    
    const newSTK = stk.map((s) => {
        if (l.MaLoaiTietKiem==s.MaLoaiTietKiem) return s;
    })
    //console.log(newSTK);
    newSTK.forEach(s => {
        if (s!=undefined) {
            var date = s.NgayMoSo.toISOString().slice(0, 10);            
            if (res[date]==undefined) res[date] = parseInt(1);
            else res[date] += parseInt(1);
        }
    });
    return res;
}

async function SoDong(month, year, mota) {
    const res = {};
    const stk = await SoTietKiem.selectbyAttr();
    const l = await LoaiTietKiem.selectbyName(mota);   
    const closedSTK = stk.map((s) => {
        if (s.TinhTrang==0 && l.MaLoaiTietKiem==s.MaLoaiTietKiem) return s;        
    })
    for (var s of closedSTK) {
        if (s!=undefined) {
            const wd = await GiaoDich.selectLastWithdrawOf(s.MaSoTietKiem, month, year);
            //console.log(wd);
            if (wd!=undefined) {
                var date = wd.NgayRut.toISOString().slice(0, 10);
                if (res[date]==undefined) res[date] = parseInt(1);
                else res[date] += parseInt(1);
            }
        }
    }
    return res;
}

const MonthReport = async (req, res, next) => {
    try {
        const result = [];
        const {date, attribute} = req.body;
        const [year, month] = [...date.split('-')];        
        const somo = await SoMo(month, year, attribute);
        const sodong = await SoDong(month, year, attribute);
        //console.log(sodong);

        const dateList = [];
        for (var key in somo) {
            if (!dateList.includes(key)) {
                dateList.push(key);
            }
        }
        for (var key in sodong) {
            if (!dateList.includes(key)) {
                dateList.push(key);
            }
        }
        
        //console.log(dateList);
        dateList.forEach(d => {
            const tmp = {'SoMo': 0, 'SoDong': 0, 'ChenhLech': 0};
            tmp['Ngay'] = d;
            if (somo[d]!=undefined) {                
                tmp['SoMo'] += parseInt(somo[d]);
            }
            if (sodong[d]!=undefined) {
                tmp['SoDong'] += parseInt(sodong[d]);
            }
            tmp['ChenhLech'] = tmp['SoMo'] - tmp['SoDong'];
            result.push(tmp);
        });
        //console.log(res);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};

module.exports = {DayReport, MonthReport, MonthReportRender,DayReportRender, SelectReportRender};
