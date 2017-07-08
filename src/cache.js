'use strict';

module.exports = function Almanac(factMap) {
	this.factMap = new Map(factMap);
	this.factResultsCache = new Map(); // { cacheKey:  Promise<factValue> }
};
