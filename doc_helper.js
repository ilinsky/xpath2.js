/*
 * XPath2 for NodeJS
 * Some utility functions and xmldom DOMAdapter
 */

if(typeof(global)!="undefined")
  global.window=global;

function parentChain(a) {
  var r=[];
  while(a.parentNode||a.ownerElement) r=[a=(a.parentNode||a.ownerElement)].concat(r);
  return r;
}

function commonAncestor(a,b) {
  if (b.length<a.length) return commonAncestor(b,a);
  var c=null;
  for(var n in a)
    if (a[n]===b[n]) c=a[n]; else return c;
  return c;
}

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

function docGUID(doc) {
   if (!doc.guid) doc.guid=guid();
   return doc.guid;
}

var DOCUMENT_POSITION_DISCONNECTED=1;
var DOCUMENT_POSITION_PRECEDING=2;
var DOCUMENT_POSITION_FOLLOWING=4;
var DOCUMENT_POSITION_CONTAINS=8;
var DOCUMENT_POSITION_CONTAINED_BY=16;
var DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC=32;

function compareDocumentPosition(a,b) {
  var vars={};
  if (a===b) return 0;
  if (a.ownerDocument!==b.ownerDocument) 
    return DOCUMENT_POSITION_DISCONNECTED|DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
      |(docGUID(a.ownerDocument)>docGUID(b.ownerDocument)?DOCUMENT_POSITION_FOLLOWING:DOCUMENT_POSITION_PRECEDING);
  vars.aa=parentChain(a);
  vars.ab=parentChain(b);
  if (vars.aa.indexOf(b)>=0) return DOCUMENT_POSITION_CONTAINS;
  if (vars.ab.indexOf(a)>=0) return DOCUMENT_POSITION_CONTAINED_BY;
  vars.ca=commonAncestor(vars.aa,vars.ab);
  /*if (!vars.ca)
    throw new Error("BUG!");*/
  //console.log("compare order on common ancestor");
  for(var n in vars.ca.childNodes) {
    vars.n=vars.ca.childNodes[n];
    //console.log("compare self");
    //strange... this seems to be swapped, but otherwise nodes come out of order
    if (vars.n===a) return DOCUMENT_POSITION_FOLLOWING;
    if (vars.n===b) return DOCUMENT_POSITION_PRECEDING;
    //console.log("compare chain");
    if (vars.aa.indexOf(vars.n)>=0) return DOCUMENT_POSITION_FOLLOWING;
    if (vars.ab.indexOf(vars.n)>=0) return DOCUMENT_POSITION_PRECEDING;
  };
  //throw new Error("BUG!");
};
