const app = require("express");
const router = app.Router();
const SoTietKiem = require("../models/SoTietKiem.m");
const LoaiTietKiem = require("../models/LoaiTietKiem.m");

router.get('/', async (req, res, next) => {
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
});

router.post('/search', async (req, res, next) => {
    try {
        var {attribute, searchValue} = req.body;        
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
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;