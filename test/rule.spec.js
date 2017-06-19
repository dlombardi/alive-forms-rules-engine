const test = require('ava');
const Rule = require('../src/rule');

/**
 * equal operator test 
 */

test('equal operator', t => {
	const true_data = {
		name: 'foo'
	};

	const false_data = {
		name: 'foo'
	};

	const true_rule = new Rule({
		fact: 'name',
		operator: '=',
		value: 'foo'
	});

	true_rule.resolveRule(true_data);

	const false_rule = new Rule({
		fact: 'name',
		operator: '=',
		value: 'bar'
	});

	false_rule.resolveRule(false_data);

	t.true(true_rule.status);
	t.false(false_rule.status);
	t.pass();
});

//===================================

/**
 * not equal operator test
 */

test('not equal operator', t => {
	const true_data = {
		name: 'foo'
	};

	const false_data = {
		name: 'foo'
	};

	const true_rule = new Rule({
		fact: 'name',
		operator: '!=',
		value: 'bar'
	});

	true_rule.resolveRule(true_data);

	const false_rule = new Rule({
		fact: 'name',
		operator: '!=',
		value: 'foo'
	});

	false_rule.resolveRule(false_data);

	t.true(true_rule.status);
	t.false(false_rule.status);
	t.pass();
});

//===================================

/**
 * greater than operator test
 */

test('greater than operator', t => {
	const true_data = {
		value: 1
	};

	const false_data = {
		value: 1
	};

	const true_rule = new Rule({
		fact: 'value',
		operator: '>',
		value: 0
	});

	true_rule.resolveRule(true_data);

	const false_rule = new Rule({
		fact: 'value',
		operator: '>',
		value: 2
	});

	false_rule.resolveRule(false_data);

	t.true(true_rule.status);
	t.false(false_rule.status);
	t.pass();
});

//===================================

/**
 * less than operator test
 */

test('greater than operator', t => {
	const true_data = {
		value: 1
	};

	const false_data = {
		value: 1
	};

	const true_rule = new Rule({
		fact: 'value',
		operator: '<',
		value: 2
	});

	true_rule.resolveRule(true_data);

	const false_rule = new Rule({
		fact: 'value',
		operator: '<',
		value: 0
	});

	false_rule.resolveRule(false_data);

	t.true(true_rule.status);
	t.false(false_rule.status);
	t.pass();
});

//===================================

/**
 * greater than or equal to operator
 */

test('greater than or equal to operator', t => {
	const true_data_1 = {
		value: 1
	};

	const true_data_2 = {
		value: 1
	};

	const false_data_1 = {
		value: 1
	};

	const false_data_2 = {
		value: 1
	};

	const true_rule_1 = new Rule({
		fact: 'value',
		operator: '>=',
		value: 1
	});

	const true_rule_2 = new Rule({
		fact: 'value',
		operator: '>=',
		value: 0
	});

	true_rule_1.resolveRule(true_data_1);
	true_rule_2.resolveRule(true_data_2);

	const false_rule = new Rule({
		fact: 'value',
		operator: '>=',
		value: 3
	});

	false_rule.resolveRule(false_data_1);

	t.true(true_rule_1.status);
	t.true(true_rule_2.status);
	t.false(false_rule.status);
	t.pass();
});

//===================================

/**
 * less than or equal to operator
 */

// test('less than or equal to operator', t => {
// 	const true_data_1 = {
// 		value: 1
// 	};

// 	const true_data_2 = {
// 		value: 1
// 	};

// 	const false_data_1 = {
// 		value: 1
// 	};

// 	const false_data_2 = {
// 		value: 1
// 	};

// 	const true_rule_1 = new Rule({
// 		fact: 'value',
// 		operator: '>=',
// 		value: 1
// 	});

// 	const true_rule_2 = new Rule({
// 		fact: 'value',
// 		operator: '>=',
// 		value: 0
// 	});

// 	true_rule_1.resolveRule(true_data_1);
// 	true_rule_2.resolveRule(true_data_2);

// 	const false_rule = new Rule({
// 		fact: 'value',
// 		operator: '>=',
// 		value: 3
// 	});

// 	false_rule.resolveRule(false_data_1);

// 	t.true(true_rule_1.status);
// 	t.true(true_rule_2.status);
// 	t.false(false_rule.status);
// 	t.pass();
// });
