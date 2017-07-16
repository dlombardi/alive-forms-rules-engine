"use strict";

/**
 * Operator
 * @constructor
 */
module.exports = function Operator(
    name,
    descriptor,
    { inverse, type },
    evaluateCb
) {
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
