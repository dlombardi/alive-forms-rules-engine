"use strict";

var hash = require("object-hash");

/**
 * Cache
 * @constructor
 */
module.exports = function Cache() {
    this.factMap = new Map();
    this.factResultsCache = new Map(); // { cacheKey:  Promise<factValue> }

    this.setFactValue = () => {};

    this.getFactValue = () => {};
};
