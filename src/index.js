'use strict';

const Engine = require('./engine');

const engine = new Engine();

const data = {
	23424245323: 'value1',
	23424224323: 'value2',
	23424324323: 'value3',
	23424324522: {
		number: 3,
		person: {
			name: 'Darien'
		}
	}
};

const conditionConfig = {
	condition: {
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
					},
					{
						fact: '23424324522',
						property: '.person.name',
						operator: '=',
						valueTypeEquality: true,
						value: 'Darien'
					}
				]
			}
		]
	},
	event: {}
};

engine.addCondition(conditionConfig);
const results = engine.run(data);

console.log(results);
