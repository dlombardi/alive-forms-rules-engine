const test = require("ava");
const Rule = require("../src/rule");

test("equal operator", t => {
    let true_data = {
        name: "foo"
    };

    let false_data = {
        name: "foo"
    };

    let true_rule = new Rule({
        fact: "name",
        operator: "=",
        value: "foo"
    });

    true_rule.resolveRule(true_data);

    let false_rule = new Rule({
        fact: "name",
        operator: "=",
        value: "bar"
    });

    false_rule.resolveRule(false_data);

    t.true(true_rule.status);
    t.false(false_rule.status);
    t.pass();
});

test("not equal operator", t => {
    let true_data = {
        name: "foo"
    };

    let false_data = {
        name: "foo"
    };

    let true_rule = new Rule({
        fact: "name",
        operator: "!=",
        value: "bar"
    });

    true_rule.resolveRule(true_data);

    let false_rule = new Rule({
        fact: "name",
        operator: "!=",
        value: "foo"
    });

    false_rule.resolveRule(false_data);

    t.true(true_rule.status);
    t.false(false_rule.status);
    t.pass();
});
