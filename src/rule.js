"use strict";

module.exports = function Rule({ fact, operator, value }) {
    this.status = false;
    this.failed_rule = {};

    let ruleOperatorHash = {
        "=": {
            resolve: (fact, expectedValue) => fact === expectedValue,
            inverse: "!="
        },
        "!=": {
            resolve: (fact, expectedValue) => fact !== expectedValue,
            inverse: "="
        },
        ">": {
            resolve: (fact, expectedValue) => fact > expectedValue,
            inverse: "<="
        },
        "<": {
            resolve: (fact, expectedValue) => fact < expectedValue,
            inverse: ">="
        },
        ">=": {
            resolve: (fact, expectedValue) => fact < expectedValue,
            inverse: "<"
        },
        "<=": {
            resolve: (fact, expectedValue) => fact < expectedValue,
            inverse: ">"
        }
    };

    this.resolveRule = data => {
        this.status = ruleOperatorHash[operator].resolve(data[fact], value);
        if (!this.status) {
            this.failed_rule = { fact, operator, value };
        }
    };
};
