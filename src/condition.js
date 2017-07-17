const Rule = require("./rule");

/**
 * Condition
 * @constructor
 * @return - and instance of Condition
 */
module.exports = function Condition({
    condition: { conditional, rules },
    event
}) {
    this.conditional = String(conditional.toLowerCase());
    this.rules = rules;
    this.listOfFailedRules = [];
    this.status = false;
    if (event) {
        this.event = event;
    }

    this.method =
        this.conditional === "and"
            ? Array.prototype.every
            : Array.prototype.some;

    this.rulesToEvalArray = [];

    if (!this.conditional) {
        throw new Error("conditional is required");
    }

    if (this.conditional !== "and" && this.conditional !== "or") {
        throw new Error("conditional must be 'and' or 'or'");
    }

    if (!this.rules) {
        throw new Error("rules are required");
    }

    const _resolveConditionStatus = data => {
        _parseConditionRules(data);
        this.status = _evaluateConditionRules(data);
    };

    const _parseConditionRules = data => {
        this.rules.forEach(rule => {
            if (rule.conditional && rule.rules) {
                const condition = new Condition({ condition: rule });
                condition.setEngine(this.engine);
                condition.resolve(data);
            } else {
                rule = new Rule(rule);
                rule.setEngine(this.engine);
                this.rulesToEvalArray.push(rule);
            }
        });
    };

    const _evaluateConditionRules = data => {
        if (this.rulesToEvalArray.length === 0) {
            return true;
        }
        let flattenedRulesStatuses = Promise.all(
            this.rulesToEvalArray.map(rule => {
                rule.resolve(data);
                _logFailedRule(rule);
                return rule.status;
            })
        );

        return this.method.call(
            flattenedRulesStatuses,
            ruleStatus => ruleStatus === true
        );
    };

    const _logFailedRule = rule => {
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
    };

    this.setEngine = engine => {
        this.engine = engine;
    };

    this.resolve = data => {
        _resolveConditionStatus(data);
        return {
            status: this.status,
            listOfFailedRules: this.listOfFailedRules,
            event: this.event ? this.event : null
        };
    };
};
