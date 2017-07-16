const Operator = require("./operator");

const defaultOperators = new Map();

defaultOperators.set(
    "=",
    new Operator(
        "=",
        "equals",
        {
            inverse: "!=",
            type: "any"
        },
        (a, b) => a === b
    )
);
defaultOperators.set(
    "!=",
    new Operator(
        "!=",
        "does not equal",
        {
            inverse: "=",
            type: "any"
        },
        (a, b) => a !== b
    )
);
defaultOperators.set(
    "<",
    new Operator(
        "<",
        "less than",
        {
            inverse: ">=",
            type: "number"
        },
        (a, b) => a < b
    )
);
defaultOperators.set(
    "<=",
    new Operator(
        "<=",
        "less than or equal to",
        {
            inverse: ">",
            type: "number"
        },
        (a, b) => a <= b
    )
);
defaultOperators.set(
    ">",
    new Operator(
        ">",
        "greater than",
        {
            inverse: "<=",
            type: "number"
        },
        (a, b) => a > b
    )
);
defaultOperators.set(
    ">=",
    new Operator(
        ">=",
        "greater than or equal to",
        {
            inverse: "<",
            type: "number"
        },
        (a, b) => a >= b
    )
);

module.exports = defaultOperators;
