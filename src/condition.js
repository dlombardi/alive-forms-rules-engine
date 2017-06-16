"use strict";

const Rule = require("./rule");

module.exports = function Condition({ conditional, rules }) {
    this.conditional = conditional.toLowerCase();
    this.rules = rules;
    this.failed_rules = [];
    this.status = false;

    let count_of_true_resolutions = 0;

    if (!this.conditional) {
        throw new Error("conditional is required");
    }

    if (!this.rules) {
        throw new Error("rules are required");
    }

    let _resolveRules = data => {
        this.rules = this.rules.map(rule => {
            if (rule.conditional && rule.rules) {
                rule = new Condition(rule)(data);
            } else {
                rule = new Rule(rule);
                rule.resolution = rule.resolveRule(data);
            }
            return rule;
        });
    };

    let _resolveConditionStatus = () => {
        this.rules.forEach(rule => {
            let { status, failed_rule, failed_rules } = rule;

            if (this.conditional === "or" && status) {
                status = true;
            } else if (this.conditional === "and" && status) {
                count_of_true_resolutions++;
            } else if (failed_rule && !status) {
                this.failed_rules.push(failed_rule);
            }

            if (failed_rules) {
                this.failed_rules = this.failed_rules.concat(failed_rules);
            }
        });
        this.status = count_of_true_resolutions === this.rules.length;
    };

    let _resolveCondition = data => {
        _resolveRules(data);
        _resolveConditionStatus();
        return { status: this.status, failed_rules: this.failed_rules };
    };

    return data => _resolveCondition(data);
};
