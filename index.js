const Kendo2JsonLogic = function (rule) {
  let result = analyzeOperator(rule)
  return result
}

function analyzeOperator(rule) {

  if (rule.operator.includes('not')) {
    rule.operator = negativeDictionary[rule.operator]
    return {
      'and': [analyzeOperator(rule), false]
    }
  }

  else {
    switch (rule.operator) {
      case 'eq':
        return { '==': [rule.field, rule.value] }

      case 'neq':
        return { '!=': [rule.field, rule.value] }

      case 'lt':
        return { '<': [rule.field, rule.value] }

      case 'lte':
        return { '<=': [rule.field, rule.value] }

      case 'gt':
        return { '>': [rule.field, rule.value] }

      case 'gte':
        return { '>=': [rule.field, rule.value] }

      case 'contains':
        return { 'in': [rule.value, rule.field] }

      case 'isnull':
        return { '==': [rule.field, null] }

      case 'startswith':
        return { '==': [rule.value, { 'substr': [{ 'var': rule.field }, 0, rule.value.length - 1] }] }

      case 'endswith':
        return { '==': [rule.value, { 'substr': [{ 'var': rule.field }, 1 - rule.value.length] }] }

      case 'isempty':
        return { '==': [rule.field, ''] }
    }
  }
}

var negativeDictionary = {
  "isnotnull": "isnull",
  "doesnotstartwith": "startswith",
  "doesnotendwith": "endswith",
  "doesnotcontain": "contains",
  "isnotempty": "isempty",
}

module.exports = Kendo2JsonLogic