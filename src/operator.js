"use strict";

/**
 * Operator
 * @constructor
 * @return - an instance of Operator
 */
module.exports = function Operator(
    name,
    descriptor,
    { inverse, type },
    evaluateCb
) {
    if (!evaluateCb) {
        throw new Error("Operator: an name must be supplied to a new Operator");
    }

    if (!descriptor) {
        throw new Error(
            "Operator: a descriptor string must be supplied to a new Operator"
        );
    }

    if (!evaluateCb) {
        throw new Error(
            "Operator: an evaluateCb function must be supplied to a new Operator"
        );
    }

    this.descriptor = String(descriptor);
    this.name = String(name);
    this.evaluateCb = evaluateCb;

    if (inverse) {
        this.inverse = String(inverse);
    }

    if (type) {
        this.type = String(type);
    }

    function _resolveOperation({ factValue, expectedValue }) {
        return evaluateCb(factValue, expectedValue);
    }

    const _ensureType = ({
        expectedValue,
        factValue,
        valueTypeEquality,
        failedRule
    }) => {
        if (
            type &&
            type !== "any" &&
            typeof factValue !== type &&
            expectedValue !== type
        ) {
            failedRule.errorMessage = `fact value and/or expected value does not 
            equal valid type ${type}`;
            return false;
        }
        if (valueTypeEquality && typeof factValue !== typeof expectedValue) {
            failedRule.errorMessage = `fact type value (${typeof factValue}) and 
			expected type value (${typeof expectedValue}) do not match`;
            return false;
        }
        return true;
    };

    this.resolve = data => {
        if (!_ensureType(data)) {
            return false;
        }
        return _resolveOperation(data);
    };
};
