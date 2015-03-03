    ------------------------------------
    XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
    ------------------------------------
    Copyright (c) 2012 Sergey Ilinsky
    Dual licensed under the MIT and GPL
    ------------------------------------


###About:

  - XPath.js is an open-source XPath 2.0 implementation in JavaScript.
  - The core engine is DOM-agnostic, it can be used with any DOM via custom
  - DOMAdapter implementation. Internally engine operates XML Schema data types.

###Structure:

  - api/ - Sample API sources
  - src/ - XPath 2.0 engine sources
  - test/unit/ - unit.js tests (requires [unit.js](https://github.com/ilinsky/unit.js))

###Usage:

  - Running on sources: include xpath.js API file from the root folder.
  - When no Apache/.htaccess/PHP configured, source files will be loaded by JS.
  
###NodeJS:
  using xpath.js on NodeJS:
  ```js
  //using xmldom as target document (https://github.com/jindw/xmldom)
  var xpath=require("xpath2")(xmldom.domClasses.Document.prototype);
  
  var test=xpath.evaluate("2 to 5");
  ```
  
  a more sofisticated example
  ```js
  var xmldom=require("xmldom");
var fs=require("fs");
var DOMParser = xmldom.DOMParser;
var xpath=require("xpath.js")(xmldom.domClasses.Document.prototype);

function nodeName(e) {return e.nodeName;}
function nodeValue(e) {return e.nodeValue;}

var xml = new DOMParser().parseFromString(fs.readFileSync("data.xml").toString());
var xsl = new DOMParser().parseFromString(fs.readFileSync("content.xslt").toString());

xmldom.domClasses.Node.prototype.select=function(e) {
  var oStaticContext=new xpath.classes.StaticContext();
  oStaticContext.namespaceResolver=this.documentElement||this.ownerDocument.documentElement;
  return xpath.evaluate(e,this,oStaticContext);
};

//var templates=xsl.select(""

var repl = require("repl");
var r = repl.start("xpath2> ");

r.context.nodeName=nodeName;
r.context.nodeValue=nodeValue;
r.context.xmldom=xmldom;
r.context.xml=xml;
r.context.xsl=xsl;
r.context.xpath=xpath;
```

