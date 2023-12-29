const LoaiTietKiem = require("../models/LoaiTietKiem.m");
const QuyDinh = require("../models/QuyDinh.m");

const RulesRender = async (req, res, next) => {
    try {
        res.render('rules', {
            title: () => "rules",
            pcss: () => "css/rules_css",
            title: 'Change Rules Selection'
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
            data: () => data,
            title: 'Rules Change'
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
            pcss: () => "css/empty_css",
            title: 'Change Period'
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
            data: () => data    ,
            title: 'Change Interest Rate'    
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
                if (LaiSuat=='') result.err3="Lãi suất không được để trống";
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
        if(rowaffect==undefined) result.noti = `Không thể xóa loại kỳ hạn này (đang có sổ tiết kiệm thuộc loại này)`;
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
            if (parseFloat(interest[key])<0) {
                return res.status(400).json({"error": "Lãi suất tồn tại giá trị không hợp lệ"})
            }
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

function checkRules(name, val) {
    //console.log(name);
    //b = name;
    name = String(name.replace(/\s+/g, ""))  
    switch(name) {        
        case String('Tiền gửi tối thiểu'.replace(/\s+/g, "")): {
            if (parseInt(val)<0) return "Số tiền gửi tối thiểu không được âm";
            break;
        }
        case String('Thời gian gửi tối thiểu'.replace(/\s+/g, "")): {
            console.log(val, parseInt(val)<0);
            if (parseInt(val)<=0) return "Thời gian gửi tối thiểu phải lớn hơn 0";
            break;
        }        
    }
    return 1;
}

const RuleUpdate = async (req, res, next) => {
    try {        
        const opt = req.body;
        const name = [];
        const val = [];
        for (var key in opt) {
            var error = checkRules(key, opt[key]);            
            if (error!=1) {
                return res.status(400).json({"error": error});
            }
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