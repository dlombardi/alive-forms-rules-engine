const Operator = require('./operator');

const default_operators = new Map();

default_operators.set(
	'=',
	new Operator('=', 'equals', (a, b) => a === b, {
		inverse: '!=',
		type: 'any'
	})
);
default_operators.set(
	'!=',
	new Operator('!=', 'does not equal', (a, b) => a !== b, {
		inverse: '=',
		type: 'any'
	})
);
default_operators.set(
	'<',
	new Operator('<', 'less than', (a, b) => a < b, {
		inverse: '>=',
		type: 'number'
	})
);
default_operators.set(
	'<=',
	new Operator('<=', 'less than or equal to', (a, b) => a <= b, {
		inverse: '>',
		type: 'number'
	})
);
default_operators.set(
	'>',
	new Operator('>', 'greater than', (a, b) => a > b, {
		inverse: '<=',
		type: 'number'
	})
);
default_operators.set(
	'>=',
	new Operator('>=', 'greater than or equal to', (a, b) => a >= b, {
		inverse: '<',
		type: 'number'
	})
);

module.exports = default_operators;
