function Rule(fact, operator, value) {
  this.fact = fact;
  this.operator = operator;
  this.value = value;

  function switchOperator(prop, operator, value) {
    switch(operator) {
      case '=':
        return prop === value;
        break;
      case '!=':
        return prop !== value;
        break;
    }
  }

  this.resolveRule = (data) => switchOperator(data[fact], operator, value);
}

function Condition(conditional, rules) {
  this.conditional = conditional.toLowerCase();
  this.rules = rules;
  this.status = false;
  this.countOfTruth = 0;

  if (!this.conditional) {
    throw new Error("Conditional is required");
  };

  if (!this.rules) {
    throw new Error("rules are required");
  };

  this.resolveCondition = (data) => {
    let _statusResolvedRules = this.rules.map(rule => {
      if(rule.conditional) {
        rule = new Condition(rule.conditional, rule.rules)(data);
      } else {
        rule = new Rule(rule.fact, rule.operator, rule.value);
        rule.status = rule.resolveRule(data);
      }
      return rule;
    });
    _statusResolvedRules.forEach(rule => {
      if (this.conditional === 'or' && rule.status) {
        this.status = true;
      } else if (this.conditional === 'and' && rule.status) {
        countOfTruth++;
      };
    });
    if(countOfTruth === _statusResolvedRules.length) {
      this.status = true;
    }
    return {
      status: this.status,
    };
  }

  return (data) => this.resolveCondition(data);

};


const data = {
  23424245323: 'value1',
  23424224323: 'value2',
  23424324323: 'value3',
}

let evalTo = Condition('and', [
  {
    fact: '23424245323',
    operator: '=',
    value: 'value1'
  },
  {
    conditional: 'or',
    rules: [
      {
        fact: '23424224323',
        operator: '=',
        value: 'value2'
      },
      {
        fact: '23424324323',
        operator: '=',
        value: 'value3'
      }
    ],
  }
])(data).status;

console.log(evalTo);
