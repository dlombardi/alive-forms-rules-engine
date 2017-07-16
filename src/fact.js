"use strict";

/**
 * Fact
 * @constructor
 */
module.exports = function Fact(data) {
    this.cache = null;
    this.data = data;

    this.setCache = cache => {
        this.cache = cache;
    };

    this.resolveFact = id => {
        let factValue = this.cache.getFactValue(id);
    };
};
