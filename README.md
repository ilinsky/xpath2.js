xpath2.js - DOM-agnostic implementation of XPath 2 parser and evaluator in JavaScript
---

## About
xpath2.js is a DOM-agnostic open-source [XPath 2.0](https://www.w3.org/TR/xpath20/) implementation in JavaScript.
Execution engine operates using XML Schema 1.1 data types as prescribed by specification.

## Features
- Full [XPath 2.0](https://www.w3.org/TR/xpath20/) language support
- Arbitrary tree structure querying with XPath 2.0 language via custom DOMAdapter
- Custom collation support (using [StaticContext](lib/classes/StaticContext.js))
- Custom function support (using [StaticContext](lib/classes/StaticContext.js))
- Variable injection (using [DynamicContext](lib/classes/DynamicContext.js))

## Installation

```bash
npm install xpath2.js
```

## Usage

The simple API implementation `lib/index.js` provided for reference. 
Its primary purpose is to demonstrate implementation classes wiring and a simple usable solution.

### Basic scenarious with *evaluate* function

```js
xpath.evaluate(expression, evaluationContext, staticContext, initialScope, DOMAdapter)
```

#### Parameters list

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `expression` | String | *Required* | xpath expression |
| `evaluationContext` | Variant | Optional | evaluation context (document, for example) |
| `staticContext`| [StaticContext](lib/classes/StaticContext.js) or Function | Optional | compilation context or namespace resolver |
| `initialScope` | Object | Optional | JavaScript variable values map |
| `DOMAdapter` | [DOMAdapter](lib/classes/DOMAdapter.js) | Optional | document object model adapter |

#### Query without a context
```js
const xpath = require("xpath2.js");
const result = xpath.evaluate("1 to 5");
console.log(result); // prints [ 1, 2, 3, 4, 5 ]
```

#### Query a document not specifying namespaces
```js
const xpath = require("xpath2.js");
const xmldom = require("xmldom"); // You are free to use any DOM implementation
const document = new xmldom.DOMParser().parseFromString('<test>content</test>');

const result = xpath.evaluate("fn:string(/test/text())", document);
console.log(result); // prints [ 'content' ]
```

#### Query a document with namespace resolver
Evaluating expressions over documents that specify namespaces requires *namespace resolver* to be provided with the query. 
Take a note that namespace resolver is there to resolve prefixes found in XPath expressions, 
thus making use of prefixes in expressions scoped to the query, and not to the document.

> A namespace resolver is a function that takes single argument String *prefix* and returns a namespace uri for it. 

Exception `XPST0081` will be thrown, should any of the prefixes used in expression are left unresolved.
```js
const xpath = require("xpath2.js");
const xmldom = require("xmldom");
const document = new xmldom.DOMParser().parseFromString('<foo><a:bar xmlns:a="http://a">content</a:bar></foo>');
const namespaceResolver = function(prefix) {
    if (prefix == "b")
        return "http://a";
    return null;
};

const result = xpath.evaluate("fn:string(//b:bar/text())", document, namespaceResolver);
console.log(result); // prints [ 'content' ]
```

#### Passing a JavaScript variable to the evaluation context
```js
const xpath = require("xpath2.js");

const result = xpath.evaluate("$a + 0.2", null, null, {a: 0.1});
console.log(result); // prints [ 0.3 ]
```

### More challenging scenarious

#### Using *execute* function and managing contexts
```js
const xpath = require("xpath2.js");
const xmldom = require("xmldom");
const document = new xmldom.DOMParser().parseFromString('<foo><a:bar xmlns:a="http://a">content</a:bar></foo>');
const namespaceResolver = function(prefix) {
    if (prefix == "b")
        return "http://a";
    return null;
};
const staticContext = xpath.createStaticContext(namespaceResolver);
// Set default function namespace to the one of XPath functions, so "fn" prefix can be dropped in queries
staticContext.defaultFunctionNamespace = "http://www.w3.org/2005/xpath-functions";
const dynamicContext = xpath.createDynamicContext(staticContext, document);
const expression = xpath.compile("string(//b:bar/text())", staticContext);

const result = xpath.execute(expression, dynamicContext);
console.log(result); // prints [ 'content' ]
```

> Note! Dynamic context carries date/time obtained during its creation