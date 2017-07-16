"use strict";

const defaultOperators = require("./default-operators");
const Operator = require("./operator");
const Condition = require("./condition");

/**
 * Rule Engine
 * @constructor
 */
module.exports = function Engine() {
    this.conditionList = [];
    this.operators = defaultOperators; // Map()
    this.facts = new Map();
    this.status = "READY";

    /**
     * Add Operator to engine.
     * @param {string} name - The name string of the operator.
     * @param {string} descriptor - The plain language representation of the operator.
     * @param {object} options - The operator's options.
     * @param {string} options.inverse - inverse operator's name string.
     * @param {string} options.type - expected type of value used in operation.
     * @param {Requester~requestCallback} evaluateCb - The callback that evaluates truth condition.
     * 
     * @return {object} this - engine context
     */
    this.addOperator = ({ name, descriptor, options, evaluateCb }) => {
        if (!name || !evaluateCb) {
            throw new Error("Engine: addOperator requires name and evaluateCb");
        }

        if (this.operators.get(name)) {
            return;
        } else {
            this.operators.set(
                name,
                new Operator(name, descriptor, options, evaluateCb)
            );
        }
        return this;
    };

    /**
     * Add condition to engine.
     * @param {object} params - either params is an instance 
     * of Condition constructor or is a plain object with key of condition
     * @param {object} params.condition - object containing condition config
     * to be consumed by Condition constructor
     * 
     * @return {object} this - engine context
     */
    this.addCondition = params => {
        if (!params) {
            throw new Error("Engine: addCondition() requires parameters");
        }
        if (!params.hasOwnProperty("condition")) {
            throw new Error(
                'Engine: addCondition() argument requires "condition" property'
            );
        }
        if (!params.hasOwnProperty("event")) {
            throw new Error(
                'Engine: addCondition() argument requires "event" property'
            );
        }

        let condition = null;
        if (params.condition instanceof Condition) {
            condition = params.condition;
        } else {
            condition = new Condition(params.condition);
        }
        condition.setEngine(this);
        this.conditionList.push(condition);
        return this;
    };

    this.addFact = (id, valueOrMethod, options) => {
        let factId = id;
        let fact;
        if (id instanceof Fact) {
            factId = id.id;
            fact = id;
        } else {
            fact = new Fact(id, valueOrMethod, options);
        }
        this.facts.set(factId, fact);
        return this;
    };

    this.run = data =>
        this.conditionList.map(condition => {
            condition = condition.resolve(data);
            return condition;
        });
};
