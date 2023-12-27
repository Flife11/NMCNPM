

const RulesRender = async (req, res, next) => {
    try {
        res.render('rules');
    }
    catch (error) {
        next(error);
    }
}

const RuleChangeRender = async (req, res, next) => {
    try {
        res.render('rules_change');
    }
    catch (error) {
        next(error);
    }
}

const PeriodRender = async (req, res, next) => {
    try {
        res.render('period');
    }
    catch (error) {
        next(error);
    }
}

const InterestRender = async (req, res, next) => {
    try {
        res.render('period');
    }
    catch (error) {
        next(error);
    }
}

module.exports = {RuleChangeRender, RulesRender, PeriodRender, InterestRender};