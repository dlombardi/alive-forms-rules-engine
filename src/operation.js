'use strict';

module.exports = function Operation(
	type,
	evaluatedOperation,
	{ factValue, expectedValue, valueTypeEquality, failedRule }
) {
	this.evaluatedOperation = evaluatedOperation;
	this.type = type;
	this.expectedValue = expectedValue;
	this.evaluatedOperation = evaluatedOperation;

	const _ensureType = () => {
		if (type && type !== 'any' && typeof factValue !== type && expectedValue !== type) {
			failedRule.errorMessage = `fact value and/or expected value does not 
            equal valid type ${type}`;
			return false;
		}
		if (valueTypeEquality && typeof factValue !== typeof expectedValue) {
			failedRule.errorMessage = 'fact value and/or expected value types do not match';
			return false;
		}
		return true;
	};

	this.resolve = () => {
		if (!_ensureType()) {
			return false;
		}
		return evaluatedOperation;
	};
};
