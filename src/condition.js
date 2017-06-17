const Rule = require('./rule');

module.exports = function Condition({ conditional, rules }) {
	this.conditional = conditional.toLowerCase();
	this.rules = rules;
	this.listOfFailedRules = [];
	this.status = false;

	let count_of_true_resolutions = 0;

	if (!this.conditional) {
		throw new Error('conditional is required');
	}

	if (!this.rules) {
		throw new Error('rules are required');
	}

	const _resolveRules = data => {
		this.rules = this.rules.map(rule => {
			if (rule.conditional && rule.rules) {
				rule = new Condition(rule)(data);
			} else {
				rule = new Rule(rule);
				rule.resolution = rule.resolveRule(data);
			}
			return rule;
		});
	};

	const _resolveConditionStatus = () => {
		this.rules.forEach(rule => {
			const { failedRule, listOfFailedRules } = rule;
			let { status } = rule;

			if (this.conditional === 'or' && status) {
				status = true;
			} else if (this.conditional === 'and' && status) {
				count_of_true_resolutions++;
			} else if (failedRule && !status) {
				this.listOfFailedRules.push(failedRule);
			}

			if (listOfFailedRules) {
				this.listOfFailedRules = this.listOfFailedRules.concat(listOfFailedRules);
			}
		});
		this.status = count_of_true_resolutions === this.rules.length;
	};

	const _resolveCondition = data => {
		_resolveRules(data);
		_resolveConditionStatus();
		return { status: this.status, listOfFailedRules: this.listOfFailedRules };
	};

	return data => _resolveCondition(data);
};
