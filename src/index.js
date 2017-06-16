"use strict";

const Condition = require("./condition");

const data = {
    23424245323: "value1",
    23424224323: "value2",
    23424324323: "value5"
};

let rulesJSON = {
    conditional: "and",
    rules: [
        {
            fact: "23424245323",
            operator: "=",
            value: "value1"
        },
        {
            conditional: "and",
            rules: [
                {
                    fact: "23424224323",
                    operator: "=",
                    value: "value2"
                },
                {
                    fact: "23424324323",
                    operator: "=",
                    value: "value3"
                }
            ]
        }
    ]
};

let evalTo = new Condition(rulesJSON)(data);

module.exports = Condition;
