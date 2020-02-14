const jsonLogic = require('json-logic-js')

const Kendo2JsonLogic = function (rule) {
  let result = analyzeLogic(rule)
  return result
}

function analyzeLogic(rule) {
  let result = []

  switch (rule.logic) {
    case 'and':
      rule.filters.forEach(e => {
        result.push(analyzeLogic(e))
      })
      return { 'and': result }

    case 'or':
      rule.filters.forEach(e => {
        result.push(analyzeLogic(e))
      })
      return { 'or': result }

    default:
      return analyzeOperator(rule)
  }
}

function analyzeOperator(rule) {
  switch (rule.operator) {
    case 'eq':
      return { '==': [{ 'var': rule.field }, rule.value] }

    case 'neq':
      return { '!=': [{ 'var': rule.field }, rule.value] }

    case 'lt':
      return { '<': [{ 'var': rule.field }, rule.value] }

    case 'lte':
      return { '<=': [{ 'var': rule.field }, rule.value] }

    case 'gt':
      return { '>': [{ 'var': rule.field }, rule.value] }

    case 'gte':
      return { '>=': [{ 'var': rule.field }, rule.value] }

    case 'contains':
      return { 'in': [ {'lc': rule.value}, {'lc': { 'var': rule.field }}] }

    case 'doesnotcontain':
      return { '!': [{ 'in': [ {'lc': rule.value}, {'lc': { 'var': rule.field }}] }] }

    case 'isnull':
      return { '==': [{ 'var': rule.field }, null] }

    case 'isnotnull':
      return { '!=': [{ 'var': rule.field }, null] }

    case 'startswith':
      return { '==': [{'lc': rule.value}, {'lc': { 'substr': [{ 'var': rule.field }, 0, rule.value.length] }}] }

    case 'doesnotstartwith':
      return { '!=': [{'lc': rule.value}, {'lc': { 'substr': [{ 'var': rule.field }, 0, rule.value.length] }}] }

    case 'endswith':
      return { '==': [{'lc': rule.value}, {'lc': { 'substr': [{ 'var': rule.field }, -rule.value.length] }}] }

    case 'doesnotendwith':
      return { '!=': [{'lc': rule.value}, {'lc': { 'substr': [{ 'var': rule.field }, -rule.value.length] }}] }

    case 'isempty':
      return { '!': [{ 'var': rule.field }] }

    case 'isnotempty':
      return { '!!': [{ 'var': rule.field }] }
  }
}

function toLowerCase(a){
  return a.toLowerCase()
}

jsonLogic.add_operation("lc", toLowerCase);

module.exports = Kendo2JsonLogic