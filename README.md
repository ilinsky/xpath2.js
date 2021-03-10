xpath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
---

## About

xpath.js is a DOM-agnostic open-source [XPath 2.0](https://www.w3.org/TR/xpath20/) implementation in JavaScript.
Execution engine operates using XML Schema 1.1 data types as prescribed by specification.

## Features
- Full [XPath 2.0](https://www.w3.org/TR/xpath20/) language support
- Arbitrary tree structure querying with XPath 2.0 language via custom DOMAdapter
- Custom namespace resolver support (using [StaticContext](./src/classes/StaticContext.js))
- Custom collation support (using [StaticContext](./src/classes/StaticContext.js))
- Custom function support (using [StaticContext](./src/classes/StaticContext.js))
- Variable injection (using [DynamicContext](./src/classes/DynamicContext.js))

## Install

```bash
npm install xpath.js
```

## Usage

The simple api implementation `src/index.js` provided for reference.

```js
xpath.evaluate(expression, context, staticContext, initialScope, DOMAdapter)
```

#### Parameters list

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `expression` | String | *Required* | xpath expression |
| `context` | Variant | Optional | evaluation context |
| `staticContext`| [StaticContext](./src/classes/StaticContext.js) | Function | Optional | compilation context or namespace resolved |
| `initialScope` | Object | Optional | variable values |
| `DOMAdapter` | [DOMAdapter](./src/classes/DOMAdapter.js) | Optional | object model adapter |

### Query without a context
```js
const xpath = require("xpath.js");
const result = xpath.evaluate("1 to 5");
console.log(result); // prints [ 1, 2, 3, 4, 5 ]
```

### Query with a context
```js
const xpath = require("xpath.js");
const xmldom = require("xmldom"); // You are free to use any DOM implementation
const document = new xmldom.DOMParser().parseFromString('<test>content</test>');
const result = xpath.evaluate("fn:string(/test/text())", document);
console.log(result); // prints [ 'content' ]
```

### Passing a variable to the evaluation context
```js
const xpath = require("xpath.js");
const result = xpath.evaluate("$a + 0.2", null, null, { a: 0.1});
console.log(result); // prints [ 0.3 ]
```