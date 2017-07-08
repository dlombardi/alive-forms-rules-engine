const Rule = require("./rule");

module.exports = function Condition({ conditional, rules }) {
    this.conditional = String(conditional.toLowerCase());
    this.rules = rules;
    this.listOfFailedRules = [];
    this.status = false;

    this.method =
        this.conditional === "and"
            ? Array.prototype.every
            : Array.prototype.some;

    let count_of_true_resolutions = 0;
    this.ruleArray = [];

    if (!this.conditional) {
        throw new Error("conditional is required");
    }

    if (this.conditional !== "and" && this.conditional !== "or") {
        throw new Error("conditional must be 'and' or 'or'");
    }

    if (!this.rules) {
        throw new Error("rules are required");
    }

    const _parseConditionRules = data => {
        this.rules.forEach(rule => {
            if (rule.conditional && rule.rules) {
                const condition = new Condition(rule);
                condition.setEngine(this.engine);
                condition.resolve(data);
            } else {
                rule = new Rule(rule);
                rule.setEngine(this.engine);
                this.ruleArray.push(rule);
            }
        });
    };

    const _resolveConditionStatus = data => {
        this.status = _evaluateConditionRules(data);

        this.ruleArray.forEach(rule => {
            const { failedRule, listOfFailedRules } = rule;
            let { status } = rule;

            if (failedRule && !status) {
                this.listOfFailedRules.push(failedRule);
            }

            if (listOfFailedRules) {
                this.listOfFailedRules = this.listOfFailedRules.concat(
                    listOfFailedRules
                );
            }
        });
    };

    let _evaluateConditionRules = data => {
        if (this.ruleArray.length === 0) {
            return true;
        }
        let flattenedRulesStatuses = this.ruleArray.map(rule => {
            rule.resolve(data);
            return rule.status;
        });

        return this.method.call(
            flattenedRulesStatuses,
            ruleStatus => ruleStatus === true
        );
    };

    this.setEngine = engine => {
        this.engine = engine;
    };

    this.resolve = data => {
        _parseConditionRules(data);
        _resolveConditionStatus(data);
        return {
            status: this.status,
            listOfFailedRules: this.listOfFailedRules
        };
    };
};
