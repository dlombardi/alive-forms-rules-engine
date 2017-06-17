'use strict';

const Operation = require('./operation');

module.exports = function Rule({ fact, operator, value: expectedValue, valueTypeEquality }) {
	this.status = false;
	this.failedRule = {};

	function _resolveOperation(operationData) {
		const evaluatedOperation = this.evaluate(operationData.factValue, expectedValue);
		return new Operation(this.type, evaluatedOperation, operationData).resolve();
	}

	const operatorDict = {
		'=': {
			resolve(operationData) {
				return _resolveOperation.bind(this)(operationData);
			},
			evaluate: factValue => factValue === expectedValue,
			inverse: '!=',
			type: 'any',
			name: 'equals'
		},
		'!=': {
			resolve(operationData) {
				return _resolveOperation.bind(this)(operationData);
			},
			evaluate: factValue => factValue !== expectedValue,
			inverse: '=',
			type: 'any',
			name: 'does not equal'
		},
		'>': {
			resolve(operationData) {
				return _resolveOperation.bind(this)(operationData);
			},
			evaluate: factValue => factValue > expectedValue,
			inverse: '<=',
			type: 'number',
			name: 'greater than'
		},
		'<': {
			resolve(operationData) {
				return _resolveOperation.bind(this)(operationData);
			},
			evaluate: factValue => factValue < expectedValue,
			inverse: '>=',
			type: 'number',
			name: 'less than'
		},
		'>=': {
			resolve(operationData) {
				return _resolveOperation.bind(this)(operationData);
			},
			evaluate: factValue => factValue >= expectedValue,
			inverse: '<',
			type: 'number',
			name: 'greater than or equal to'
		},
		'<=': {
			resolve(operationData) {
				return _resolveOperation.bind(this)(operationData);
			},
			evaluate: factValue => factValue <= expectedValue,
			inverse: '>',
			type: 'number',
			name: 'less than or equal to'
		}
	};

	this.resolveRule = data => {
		const operationData = {
			factValue: data[fact],
			expectedValue,
			valueTypeEquality,
			failedRule: this.failedRule
		};

		this.status = operatorDict[operator].resolve(operationData);
		if (!this.status) {
			this.failedRule = Object.assign(this.failedRule, { fact, operator, expectedValue });
		}
	};
};
