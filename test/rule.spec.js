const test = require('ava');
const Rule = require('../src/rule');

/**
 * Equal operator test 
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
	console.log(false_rule);

	t.true(true_rule.status);
	t.false(false_rule.status);
	t.pass();
});

//===================================

/**
 * Not Equal operator test
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
 * Not Equal operator test
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

	// console.log(true_rule);

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
