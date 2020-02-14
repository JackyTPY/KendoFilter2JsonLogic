# KendoFilter2JsonLogic

An interpreter for KendoFilter to the format of JsonLogic.

## How to Get Filter Data Form Kendo ?

Assume this is the container of KendoFilter.

```html
<div id="filter"></div>
```

You may apply filter like this

```javascript
$("#filter").kendoFilter({
    dataSource: dataSource,
    expressionPreview: true,
    applyButton: true,
    fields: [
        { name: "name", type: "string", label: "Name" },
        { name: "price", type: "number", label: "Price" },
        { name: "description", type: "string", label: "Description" }
    ],
    expression: {
        logic: "or",
        filters: [
            { field: "price", value: 5, operator: "gte" },
            { field: "name", value: "salad", operator: "contains" }
        ]
    }
}).data("kendoFilter").applyFilter();
```

So the method to get filter data is 

```javascript
$("#filter").data("kendoFilter").filterModel

//{
//    logic: "or",
//    filters: [
//        { field: "price", value: 5, operator: "gte" },
//        { field: "name", value: "salad", operator: "contains" }
//    ]
//}
```



## Usage

```javascript
import KendoFilter2JsonLogic from './KendoFilter2JsonLogic.js'

var KendoFilterRules = { field: "name", value: "salad", operator: "contains"}

var jsonLogicRules = KendoFilter2JsonLogic(KendoFilterRules)
// { "in": ["salad" , { "var": "name"}]}
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
//             "salad",
//             {
//                 "var": "name"
//             }
//           ]
//         },
//         {
//           "in": [
//             "sushi",
//             {
//                 "var": "name"
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

## Caution

KendoFilter doesn't consider about upper case and lower case, but JsonFilter Does.