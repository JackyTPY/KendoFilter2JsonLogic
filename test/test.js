const Kendo2JsonLogic = require('../index.js')
const fs = require('fs')
const jsonLogic = require('json-logic-js')

var rules = fs.readFileSync('./test/nest.json', 'utf-8');
rules = JSON.parse(rules)

var data = fs.readFileSync('./test/menu.json', 'utf-8');
data = JSON.parse(data)

var result = Kendo2JsonLogic(rules)

var filter = {
  "filter": [
    { "var": "" },
    result
  ]
}

var filterResult = jsonLogic.apply(filter, data)

fs.writeFile('./test/result.json', JSON.stringify(result), e => {
  console.log(filterResult)
  console.log('---- ' + filterResult.length + ' items ----')
})