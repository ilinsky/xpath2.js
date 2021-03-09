---
XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
------------------------------------
Copyright (c) 2016 Sergey Ilinsky
Dual licensed under the MIT and GPL
---

###About:

  - XPath.js is a DOM-agnostic open-source XPath 2.0 implementation in JavaScript
  - Library can be used to query any tree structure via custom DOMAdapter
  - Internally engine operates using XML Schema 1.1 data types

### Usage

    const xpath = require("xpath.js");
    xpath.evaluate("0.1 + 0.2"); // prints 0.3