const Kendo2JsonLogic = require('../index.js')
const fs = require('fs')

var testRule = [
  { field: "name", operator: "startswith", value: "Jane" },
  { field: "category", operator: "eq", value: "Beverages" },
  { field: "name", operator: "neq", value: "Coffee" },
  { field: "category", operator: "eq", value: "Food" },
  { field: "name", operator: "eq", value: "Tea" },
  { field: "name", operator: "startswith", value: "Jane" }
]

var result = []
testRule.forEach(e => {
  result.push(Kendo2JsonLogic(e));
})

fs.writeFile('./result.json', JSON.stringify(result), e => console.log('finish'))