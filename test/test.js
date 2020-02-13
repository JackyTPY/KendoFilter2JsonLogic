const Kendo2JsonLogic = require('../index.js')
const fs = require('fs')
const jsonLogic = require('json-logic-js')

var testRule = [
  { field: "name", operator: "eq", value: "Tea" },
  { field: "name", operator: "eq", value: "Food" },
  { field: "name", operator: "neq", value: "Tea" },
  { field: "name", operator: "neq", value: "Food" },
  { field: "name", operator: "isnull"},
  { field: "name", operator: "isnotnull"},
  { field: "price", operator: "lt", value: 10},
  { field: "price", operator: "lte", value: 10},
  { field: "price", operator: "gt", value: 10},
  { field: "price", operator: "gte", value: 10},
  { field: "category", operator: "startswith", value: "B" },
  { field: "category", operator: "doesnotstartwith", value: "B" },
  { field: "category", operator: "endswith", value: "s" },
  { field: "category", operator: "doesnotendwith", value: "s" },
  { field: "category", operator: "contains", value: "ver" },
  { field: "category", operator: "doesnotcontain", value: "ver" },
  { field: "category", operator: "isempty"},
  { field: "category", operator: "isnotempty"}
]

var data = { name: "Tea", category: "Beverages", price: 10 }

var result = []
testRule.forEach(e => {
  let tmp = Kendo2JsonLogic(e)
  result.push(tmp);
  console.log(e, jsonLogic.apply(tmp, data))
})

fs.writeFile('./test/result.json', JSON.stringify(result), e => console.log('finish'))