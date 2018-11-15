"use strict";

const test = require("ava");
const Rule = require("../src/rule");
const Engine = require("../src/engine");

test("if rule will run successfully", t => {
    let engine = new Engine();

    const rule = new Rule({
        factKey: "population",
        operator: "=",
        value: 200,
        valueTypeEquality: true
    });

    rule.setEngine(engine);

    rule.resolve({ population: 200 });
    t.true(rule.status);
});

test("if rule will fail if expected value does not equal fact value", t => {
    let engine = new Engine();

    const rule = new Rule({
        factKey: "population",
        operator: "=",
        value: 200,
        valueTypeEquality: true
    });

    rule.setEngine(engine);

    rule.resolve({ population: 20 });
    t.falsy(rule.status);
    t.deepEqual(rule.failedRule, {
        factKey: "population",
        operator: "=",
        expectedValue: 200
    });
});

test("if a rule accessing a deep property on the data succeeds", t => {
    let engine = new Engine();

    const rule = new Rule({
        factKey: "person",
        operator: "=",
        value: "software developer",
        property: ".occupation.title",
        valueTypeEquality: true
    });

    rule.setEngine(engine);

    rule.resolve({
        person: {
            name: "Darien",
            age: 24,
            occupation: {
                title: "software developer"
            }
        }
    });
    t.true(rule.status);
});

test("if a rule accessing a deep property on the data fails", t => {
    let engine = new Engine();

    const rule = new Rule({
        factKey: "person",
        operator: "=",
        value: "software developer",
        property: ".occupation.name",
        valueTypeEquality: true
    });

    rule.setEngine(engine);

    rule.resolve({
        person: {
            name: "Darien",
            age: 24,
            occupation: {
                title: "software developer"
            }
        }
    });
    t.false(rule.status);
});
