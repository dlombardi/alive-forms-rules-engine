'use strict';

const Condition = require('./condition');

const data = {
	23424245323: 'value1',
	23424224323: 'value2',
	23424324323: 'value3'
};

const rulesJSON = {
	conditional: 'and',
	rules: [
		{
			fact: '23424245323',
			operator: '=',
			value: 'value1'
		},
		{
			conditional: 'and',
			rules: [
				{
					fact: '23424224323',
					operator: '=',
					value: 'value2'
				},
				{
					fact: '23424324323',
					operator: '=',
					valueTypeEquality: true,
					value: 'value3'
				}
			]
		}
	]
};

const evalTo = new Condition(rulesJSON)(data);

console.log(evalTo);

module.exports = Condition;
