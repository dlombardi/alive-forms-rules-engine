"use strict";

// const rp = require("request-promise");

module.exports = function Rule({
    fact,
    operator,
    async,
    resource,
    value: expectedValue,
    valueTypeEquality,
    property
}) {
    this.status = false;
    this.failedRule = {};

    this.setEngine = engine => {
        this.engine = engine;
    };

    this.resolve = data => {
        let factValue = data[fact];

        if (property) {
            const propertyList = property.split(".");
            propertyList.shift();
            propertyList.forEach(prop => {
                factValue = factValue[prop];
            });
        }

        const operationData = {
            factValue,
            expectedValue,
            valueTypeEquality,
            failedRule: this.failedRule
        };

        this.status = this.engine.operators
            .get(operator)
            .resolve(operationData);

        if (!this.status) {
            this.failedRule = Object.assign(this.failedRule, {
                fact,
                operator,
                expectedValue
            });
        }
    };
};
