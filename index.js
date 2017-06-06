'use strict';
// rules object


{
  condition: 'String', //AND || OR;
  status: false,
  rules: [
    {
      fact: `'string' || 'object' || etc...`,
      operator: '=' || '+' etc...,
      value: 'String || Number || etc..'
    },
    {
      condition: 'String', // AND || OR
      rules: [

      ]
    }
  ],
  resolveCondition: function(index) {
    this.rules.forEach(rule => {

    })
  }
}


children

const engine = {
    _flattenedData: [],
    run: (rules, data) => {
        id=""
    },
    flattenData: () => {

    }
};

module.exports = engine;
