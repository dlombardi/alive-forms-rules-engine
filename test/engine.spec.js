"use strict";

const test = require("ava");
const Engine = require("../src/engine");

/**
 * engine test 
 */

let data;
let conditionDescriptor;

test.beforeEach(t => {
    data = {
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
    
    conditionDescriptor = {
        ruleSet: {
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
});

test("if engine evalues a conditionDescriptor", t => {
    let engine = new Engine();
    engine.addRuleSet(conditionDescriptor);
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

test("if custom sync operator evaluates", t => {
    let engine = new Engine();

    conditionDescriptor.ruleSet.rules.push({
        factKey: "05",
        operator: "in",
        valueTypeEquality: false,
        value: [1, 2, 3, 5, 7]
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
    engine.addRuleSet(conditionDescriptor);
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

// test("if custom async operator evaluates", t => {
//     let engine = new Engine();

//     conditionDescriptor.ruleSet.rules.push({
//         factKey: "05",
//         operator: "in",
//         valueTypeEquality: false,
//         value: [1, 2, 3, 5, 7]
//     });

//     let operator = {
//         name: "in",
//         descriptor: "within array",
//         options: {
//             inverse: "not in",
//             type: "any"
//         },
//         evaluateCb: (factValue, expectedValue) => {
//             return new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     console.log(expectedValue.includes(factValue))
//                     resolve(expectedValue.includes(factValue))
//                 }, 1000)
//             })
//         }
//     };

//     engine.addOperator(operator);
//     engine.addRuleSet(conditionDescriptor);
//     engine.run(data, results => {
//         results.passingConditions.forEach(passingCondition => {
//             t.is(
//                 passingCondition.event.params.message,
//                 "this evaluated to true"
//             );
//             t.pass();
//         });
//     });
// });
