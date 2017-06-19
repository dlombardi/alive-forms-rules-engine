'use strict';

module.exports = function Rule({
	fact,
	operator,
	value: expectedValue,
	valueTypeEquality,
	property
}) {
	this.status = false;
	this.failedRule = {};

	this.setEngine = engine => {
		this.engine = engine;
	};

	this.resolveRule = data => {
		let factValue = data[fact];
		if (property) {
			const propertyList = property.split('.');
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

		this.status = this.engine.operators.get(operator).resolve(operationData);
		if (!this.status) {
			this.failedRule = Object.assign(this.failedRule, {
				fact,
				operator,
				expectedValue
			});
		}
	};
};
