const Kendo2JsonLogic = function (rule) {
  let result = analyzeOperator(rule)
  return result
}

function analyzeOperator(rule) {

  if (rule.operator.includes('not')) {
    var logic = {
      ...rule
    }
    logic.operator = negativeDictionary[logic.operator]
    return {
      '!': [analyzeOperator(logic)]
    }
  }

  else {
    switch (rule.operator) {
      case 'eq':
        return { '==': [{'var': rule.field}, rule.value] }

      case 'neq':
        return { '!=': [{'var': rule.field}, rule.value] }

      case 'lt':
        return { '<': [{'var': rule.field}, rule.value] }

      case 'lte':
        return { '<=': [{'var': rule.field}, rule.value] }

      case 'gt':
        return { '>': [{'var': rule.field}, rule.value] }

      case 'gte':
        return { '>=': [{'var': rule.field}, rule.value] }

      case 'contains':
        return { 'in': [rule.value, {'var': rule.field}] }

      case 'isnull':
        return { '==': [{'var': rule.field}, null] }

      case 'startswith':
        return { '==': [rule.value, { 'substr': [{'var': rule.field}, 0, rule.value.length] }] }

      case 'endswith':
        return { '==': [rule.value, { 'substr': [{'var': rule.field}, -rule.value.length] }] }

      case 'isempty':
        return { '==': [{'var': rule.field}, ''] }
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