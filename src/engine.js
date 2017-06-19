'use strict';

const default_operators = require('./default-operators');
const Operator = require('./operator');
const Condition = require('./condition');

module.exports = function Engine() {
	this.operators = default_operators;
	this.conditionList = [];

	this.addOperator = (name, descriptor, options, evaluateCb) => {
		if (!this.operators.get(name)) {
			return;
		}
		this.operators.set(name, new Operator(name, descriptor, options, evaluateCb));
	};

	this.addCondition = params => {
		if (!params) {
			throw new Error('Engine: addCondition() requires parameters');
		}
		if (!params.hasOwnProperty('condition')) {
			throw new Error('Engine: addCondition() argument requires "condition" property');
		}
		if (!params.hasOwnProperty('event')) {
			throw new Error('Engine: addCondition() argument requires "event" property');
		}
		let condition = null;
		if (params instanceof Condition) {
			condition = params;
		} else {
			condition = new Condition(params.condition);
		}
		condition.setEngine(this);
		this.conditionList.push(condition);
		return this;
	};

	this.run = data =>
		this.conditionList.map(condition => {
			condition = condition.resolve(data);
			return condition;
		});
};
