const SoTietKiem = require("../models/SoTietKiem.m");
const LoaiTietKiem = require("../models/LoaiTietKiem.m");

const viewRender = async (req, res, next) => {
    try {
        const sotietkiem = await SoTietKiem.selectbyAttr();
        const result = [];
        for (var stk of sotietkiem) {
            const ltt = await LoaiTietKiem.selectbyID(stk.MaLoaiTietKiem);
            //console.log(ltt);
            //console.log(ltt.MoTa);
            stk.MaLoaiTietKiem = ltt.MoTa;
            result.push(stk);
        }
        //console.log(result);
        res.render('viewPassbook', {
            data: () => result,
            title: 'View Passbook'
        });
    } catch (error) {
        next(error);
    }
}

function checkValid(attr, val) {
    const name = String(attr.replace(/\s+/g, ""));
    switch(name) {        
        case String('MaSoTietKiem'.replace(/\s+/g, "")): {
            if (isNaN(parseInt(val))) return 0;
            break;
        }        
    }
    return 1;
}

const viewSearch = async (req, res, next) => {
    try {
        var {attribute, searchValue} = req.body;     
        const error = checkValid(attribute, searchValue);
        if (error==0) {
            return res.status(400).json({"error": "Mã sổ tiết kiệm không hợp lệ"});
        }
        if (attribute=='MaLoaiTietKiem') {
            var IDltt = await LoaiTietKiem.selectbyName(searchValue);
            searchValue = IDltt.MaLoaiTietKiem;
        }
        const sotietkiem = await SoTietKiem.selectbyAttr(attribute, searchValue);
        const result = [];
        for (var stk of sotietkiem) {
            const ltt = await LoaiTietKiem.selectbyID(stk.MaLoaiTietKiem);
            //console.log(ltt);
            //console.log(ltt.MoTa);
            stk.MaLoaiTietKiem = ltt.MoTa;
            result.push(stk);
        }
        if (result.length==0) {
            return res.status(400).json({"error": "Không tìm thấy danh sách thỏa yêu cầu"});
        }
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {viewSearch, viewRender}