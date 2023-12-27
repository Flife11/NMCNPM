

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
        res.render('interest_rate',{
            pcss: () => "css/empty_css"
        });
    }
    catch (error) {
        next(error);
    }
}

const RulesRemove = async (req, res, next) => {
    try {
        console.log(req.body["kyhan_xoa"]);
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