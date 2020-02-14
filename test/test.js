const Kendo2JsonLogic = require('../index.js')
const fs = require('fs')
const jsonLogic = require('json-logic-js')

var rules = fs.readFileSync('./test/nest.json', 'utf-8');
rules = JSON.parse(rules)

var data = fs.readFileSync('./test/menu.json', 'utf-8');
data = JSON.parse(data)

var result = Kendo2JsonLogic(rules)

var temp = {
  "filter": [
    { "var": "" },
    result
  ]
}

var tempr = jsonLogic.apply(temp, data)


console.log(tempr)
console.log('---- ' + tempr.length + ' items ----')

fs.writeFile('./test/result.json', JSON.stringify(result), e => console.log('finish'))