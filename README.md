# KendoFilter2JsonLogic

An interpreter for KendoFilter to the format of JsonLogic.

## Install

```npm
npm install --save KendoFilter2JsonLogic
```

## Caution

KendoFilter doesn't consider about lower case and upper case, but JsonLogic does. Therefore, I create a new operator 'lc' which means lower case.

```javascript
function toLowerCase(a){
  return a.toLowerCase()
}

jsonLogic.add_operation("lc", toLowerCase)
```

## Usage

```javascript
import KendoFilter2JsonLogic from 'KendoFilter2JsonLogic'

var KendoFilterRules = { field: "name", value: "salad", operator: "contains"}

var jsonLogicRules = KendoFilter2JsonLogic(KendoFilterRules)
// { "in": [{"lc": "salad" , { "lc": { "var": "name"}}]}
```

## Advanced Usage

```javascript
import KendoFilter2JsonLogic from 'KendoFilter2JsonLogic'

var KendoFilterRules = {
    logic: "and",
    filters: [
        {
            logic: "or",
            filters: [
                {
                    field: "name",
                    value: "salad",
                    operator: "contains"
                },
                {
                    field: "name",
                    value: "sushi",
                    operator: "contains"
                }
            ]
        },
        {
            field: "price",
            value: 10,
            operator: "gt"
        },
        {
            field: "price",
            value: 25,
            operator: "lte"
        }
    ]
}


var jsonLogicRules = KendoFilter2JsonLogic(KendoFilterRules)

// {
//   "and": [
//     {
//       "or": [
//         {
//           "in": [
//             {
//               "lc": "salad"
//             },
//             {
//               "lc": {
//                 "var": "name"
//               }
//             }
//           ]
//         },
//         {
//           "in": [
//             {
//               "lc": "sushi"
//             },
//             {
//               "lc": {
//                 "var": "name"
//               }
//             }
//           ]
//         }
//       ]
//     },
//     {
//       ">": [
//         {
//           "var": "price"
//         },
//         10
//       ]
//     },
//     {
//       "<=": [
//         {
//           "var": "price"
//         },
//         25
//       ]
//     }
//   ]
// }
```