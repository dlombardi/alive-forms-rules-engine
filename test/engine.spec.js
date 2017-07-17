"use strict";

const test = require("ava");
const Engine = require("../src/engine");

/**
 * engine test 
 */

let data = {
    "01": "value1",
    "02": "value2",
    "03": "value3",
    "04": {
        number: 3,
        person: {
            name: "Darien"
        }
    },
    "05": 2
};

let conditionConfig = {
    condition: {
        conditional: "and",
        rules: [
            {
                factKey: "01",
                operator: "=",
                value: "value1"
            },
            {
                conditional: "or",
                rules: [
                    {
                        factKey: "03",
                        operator: "=",
                        value: "value2"
                    },
                    {
                        factKey: "03",
                        operator: "=",
                        valueTypeEquality: true,
                        value: "value131"
                    },
                    {
                        factKey: "04",
                        property: ".person.name",
                        operator: "=",
                        valueTypeEquality: true,
                        value: "Darien"
                    }
                ]
            }
        ]
    },
    event: {
        type: "condition true",
        params: {
            message: "this evaluated to true"
        }
    }
};

test("engine works", t => {
    let engine = new Engine();
    engine.addCondition(conditionConfig);
    engine.run(data, results => {
        results.passingConditions.forEach(passingCondition => {
            t.is(
                passingCondition.event.params.message,
                "this evaluated to true"
            );
            t.pass();
        });
    });
});

test("custom operator works", t => {
    let engine = new Engine();

    conditionConfig.condition.rules.push({
        factKey: "05",
        operator: "in",
        valueTypeEquality: false,
        value: [1, 3, 5, 7]
    });

    let operator = {
        name: "in",
        descriptor: "within array",
        options: {
            inverse: "not in",
            type: "any"
        },
        evaluateCb: (factValue, expectedValue) =>
            expectedValue.includes(factValue)
    };

    engine.addOperator(operator);
    engine.addCondition(conditionConfig);
    engine.run(data, results => {
        results.passingConditions.forEach(passingCondition => {
            t.is(
                passingCondition.event.params.message,
                "this evaluated to true"
            );
            t.pass();
        });
    });
});
