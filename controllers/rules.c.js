const LoaiTietKiem = require("../models/LoaiTietKiem.c");

const RulesRender = async (req, res, next) => {
    try {
        res.render('rules', {
            pcss: () => "css/rules_css"
        });
    }
    catch (error) {
        next(error);
    }
}

const RuleChangeRender = async (req, res, next) => {
    try {
        res.render('rules_change', {
            pcss: () => "css/empty_css"
        });
    }
    catch (error) {
        next(error);
    }
}

const PeriodRender = async (req, res, next) => {
    try {
        res.render('period', {
            pcss: () => "css/empty_css"
        });
    }
    catch (error) {
        next(error);
    }
}

const InterestRender = async (req, res, next) => {
    try {
        res.render('interest_rate',{
            pcss: () => "css/empty_css"
        });
    }
    catch (error) {
        next(error);
    }
}

const RulesAdd = async (req, res, next) => {
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

const RulesRemove = async (req, res, next) => {
    try {
        const MoTa = req.body["kyhan_xoa"]; 
        
        res.status(201).json({code: 1, err4: "err"});
    }
    catch (error) {
        next(error);
    }
}

const RulesEdit = async (req, res, next) => {
    try {
        res.render('interest_rate',{
            pcss: () => "css/empty_css"
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports = {RuleChangeRender, RulesRender, PeriodRender, InterestRender,
RulesAdd, RulesEdit, RulesRemove};