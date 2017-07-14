"use strict";

const test = require("ava");
const Engine = require("../src/engine");

/**
 * engine test 
 */

test("engine works", t => {
    let engine = new Engine();

    const data = {
        "01": "value1",
        "02": "value2",
        "03": "value3",
        "04": {
            number: 3,
            person: {
                name: "Darien"
            }
        }
    };

    const conditionConfig = {
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
                            value: "value3"
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
        event: {}
    };

    engine.addCondition(conditionConfig);
    const result = engine.run(data);
    t.true(result[0].status);
    t.pass();
});
