const LoaiTietKiem = require("../models/LoaiTietKiem.c");
const QuyDinh = require("../models/QuyDinh.c");

const RulesRender = async (req, res, next) => {
    try {
        res.render('rules', {
            title: () => "rules",
            pcss: () => "css/rules_css"
        });
    }
    catch (error) {
        next(error);
    }
}

const RuleChangeRender = async (req, res, next) => {
    try {
        const data = await QuyDinh.select(["TenQuyDinh", "MoTa", "DonVi"]);
        res.render('rules_change', {
            title: () => "rule change",
            pcss: () => "css/empty_css",
            data: () => data
        });
    }
    catch (error) {
        next(error);
    }
}

const PeriodRender = async (req, res, next) => {
    try {
        res.render('period', {
            title: () => "period",
            pcss: () => "css/empty_css"
        });
    }
    catch (error) {
        next(error);
    }
}

const InterestRender = async (req, res, next) => {
    try {
        const data = await LoaiTietKiem.select(["MoTa", "LaiSuat"]);
        res.render('interest_rate',{
            title: () => "interest",
            pcss: () => "css/empty_css",
            data: () => data        
        });
    }
    catch (error) {
        next(error);
    }
}

const PeriodAdd = async (req, res, next) => {
    try {
        const MoTa = req.body["kyhan_them"];
        const SoThang = req.body["thang"];
        const LaiSuat = req.body["laisuat"];
        const result = {code: 0, err1: "", err2: "", err3: ""};
        try {
            if (MoTa=='' || LaiSuat=='') {
                result.code = 1;
                if (MoTa=='') result.err1="Mô tả về kỳ hạn không được để trống";
                if (LaiSuat=='') result.err3="Lai suất không được để trống";
            }
            else {
                LoaiTietKiem.insert(new LoaiTietKiem(MoTa, SoThang, LaiSuat));                
            }
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
    catch (error) {
        next(error);
    }
}

const PeriodRemove = async (req, res, next) => {
    try {
        const MoTa = req.body["kyhan_xoa"]; 
        const result = {noti: ""};
        const rowaffect = await LoaiTietKiem.deleteLTT(MoTa);
        result.noti = `Đã xóa ${rowaffect} loại kỳ hạn`;
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
}

const PeriodEdit = async (req, res, next) => {
    try {
        const {kyhan_sua, kyhan_moi} = req.body;
        
        const result = {noti: ""};
        const rowaffect = await LoaiTietKiem.updateName(kyhan_sua, kyhan_moi);        
        result.noti = `Đã cập nhật ${rowaffect} loại kỳ hạn`;
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
}

const InterestUpdate = async (req, res, next) => {
    try {        
        const interest = req.body;
        const ID = [];
        const inter = [];
        let cnt = 0;
        for (var key in interest) {
            // console.log(key);
            if (cnt % 2 == 0) ID.push(parseInt(interest[key])+1);
            else inter.push(parseFloat(interest[key]));
            cnt+=1;
        }
        
        const result = {noti: ""};
        const rowaffect = await LoaiTietKiem.updateInterest(ID, inter);
        result.noti = `Đã cập nhật ${rowaffect} loại kỳ hạn`;
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
}

const RuleUpdate = async (req, res, next) => {
    try {        
        const opt = req.body;
        const name = [];
        const val = [];
        for (var key in opt) {
            name.push(key);
            val.push(parseInt(opt[key]));
        }
        const result = {noti: ""};
        const rowaffect = await QuyDinh.updateRule(name, val);
        result.noti = `Đã cập nhật ${rowaffect} quy định`;
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
}

module.exports = {RuleChangeRender, RulesRender, PeriodRender, InterestRender,
PeriodAdd, PeriodEdit, PeriodRemove,
InterestUpdate,
RuleUpdate};