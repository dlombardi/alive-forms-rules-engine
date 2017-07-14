const test = require("ava");
const Rule = require("../src/rule");
const Engine = require("../src/engine");

/**
 * equal operator test 
 */

test("equal operator", t => {
    let engine = new Engine();

    const true_data = {
        name: "foo"
    };

    const false_data = {
        name: "foo"
    };

    const true_rule = new Rule({
        factKey: "name",
        operator: "=",
        value: "foo"
    });

    const false_rule = new Rule({
        factKey: "name",
        operator: "=",
        value: "bar"
    });

    true_rule.setEngine(engine);
    false_rule.setEngine(engine);

    true_rule.resolve(true_data);
    false_rule.resolve(false_data);

    t.true(true_rule.status);
    t.false(false_rule.status);
    t.pass();
});

//===================================

/**
 * not equal operator test
 */

test("not equal operator", t => {
    let engine = new Engine();

    const true_data = {
        name: "foo"
    };

    const false_data = {
        name: "foo"
    };

    const true_rule = new Rule({
        factKey: "name",
        operator: "!=",
        value: "bar"
    });

    const false_rule = new Rule({
        factKey: "name",
        operator: "!=",
        value: "foo"
    });

    true_rule.setEngine(engine);
    false_rule.setEngine(engine);

    true_rule.resolve(true_data);
    false_rule.resolve(false_data);

    t.true(true_rule.status);
    t.false(false_rule.status);
    t.pass();
});

//===================================

/**
 * greater than operator test
 */

test("greater than operator", t => {
    let engine = new Engine();

    const true_data = {
        value: 1
    };

    const false_data = {
        value: 1
    };

    const true_rule = new Rule({
        factKey: "value",
        operator: ">",
        value: 0
    });

    const false_rule = new Rule({
        factKey: "value",
        operator: ">",
        value: 2
    });

    true_rule.setEngine(engine);
    false_rule.setEngine(engine);

    true_rule.resolve(true_data);
    false_rule.resolve(false_data);

    t.true(true_rule.status);
    t.false(false_rule.status);
    t.pass();
});

//===================================

/**
 * less than operator test
 */

test("less than operator", t => {
    let engine = new Engine();

    const true_data = {
        value: 1
    };

    const false_data = {
        value: 1
    };

    const true_rule = new Rule({
        factKey: "value",
        operator: "<",
        value: 2
    });

    const false_rule = new Rule({
        factKey: "value",
        operator: "<",
        value: 0
    });

    true_rule.setEngine(engine);
    false_rule.setEngine(engine);

    true_rule.resolve(true_data);
    false_rule.resolve(false_data);

    t.true(true_rule.status);
    t.false(false_rule.status);
    t.pass();
});

//===================================

/**
 * greater than or equal to operator
 */

test("greater than or equal to operator", t => {
    let engine = new Engine();

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
        factKey: "value",
        operator: ">=",
        value: 1
    });

    const true_rule_2 = new Rule({
        factKey: "value",
        operator: ">=",
        value: 0
    });

    const false_rule = new Rule({
        factKey: "value",
        operator: ">=",
        value: 3
    });

    true_rule_1.setEngine(engine);
    true_rule_2.setEngine(engine);
    false_rule.setEngine(engine);

    true_rule_1.resolve(true_data_1);
    true_rule_2.resolve(true_data_2);
    false_rule.resolve(false_data_1);

    t.true(true_rule_1.status);
    t.true(true_rule_2.status);
    t.false(false_rule.status);
    t.pass();
});

//===================================

/**
 * less than or equal to operator
 */

test("less than or equal to operator", t => {
    let engine = new Engine();

    const true_data_1 = {
        value: 1
    };

    const true_data_2 = {
        value: 1
    };

    const false_data_1 = {
        value: 1
    };

    const true_rule_1 = new Rule({
        factKey: "value",
        operator: "<=",
        value: 2
    });

    const true_rule_2 = new Rule({
        factKey: "value",
        operator: "<=",
        value: 1
    });

    const false_rule = new Rule({
        factKey: "value",
        operator: "<=",
        value: 0
    });

    true_rule_1.setEngine(engine);
    true_rule_2.setEngine(engine);
    false_rule.setEngine(engine);

    true_rule_1.resolve(true_data_1);
    true_rule_2.resolve(true_data_2);
    false_rule.resolve(false_data_1);

    t.true(true_rule_1.status);
    t.true(true_rule_2.status);
    t.false(false_rule.status);
    t.pass();
});
