"use strict";

const test = require("ava");
const Rule = require("../src/rule");
const Engine = require("../src/engine");

test("rule will resolution succeeds", t => {
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

test("rule will resolution fails", t => {
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

test("access rule property succeeds", t => {
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

test("access rule property fails", t => {
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
