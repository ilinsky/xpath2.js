/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 * NodeJS adapt by Rui Azevedo (Feb2015) ruihfazevedo@gmail.com
 */

/*Object.defineProperty(Object.prototype, "extend", {
    enumerable: false,
    value: function(from) {
        var props = Object.getOwnPropertyNames(from);
        var dest = this;
        props.forEach(function(name) {
            if (name in dest) {
                var destination = Object.getOwnPropertyDescriptor(from, name);
                Object.defineProperty(dest, name, destination);
            }
        });
        return this;
    }
});*/

if(typeof(global)!="undefined")
  global.window=global;

var fs=require("fs");
var vm=require("vm");

// Uri utilities
var hUriCache	= {};
function fGetUriComponents(sUri) {
	var aResult	= hUriCache[sUri] ||(hUriCache[sUri] = sUri.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/));
	return [aResult[1], aResult[3], aResult[5], aResult[6], aResult[8]];
};

function fResolveUri(sUri, sBaseUri) {
	if (sUri == '' || sUri.charAt(0) == '#')
		return sBaseUri;

	var aUri	= fGetUriComponents(sUri);
	if (aUri[0])	// scheme
		return sUri;

	var aBaseUri	= fGetUriComponents(sBaseUri);
	aUri[0]	= aBaseUri[0];	// scheme

	if (!aUri[1]) {
		// authority
		aUri[1]	= aBaseUri[1];

		// path
		if (aUri[2].charAt(0) != '/') {
			var aUriSegments		= aUri[2].split('/'),
				aBaseUriSegments	= aBaseUri[2].split('/');
			aBaseUriSegments.pop();

			var nBaseUriStart	= aBaseUriSegments[0] == '' ? 1 : 0;
			for (var nIndex = 0, nLength = aUriSegments.length; nIndex < nLength; nIndex++) {
				if (aUriSegments[nIndex] == '..') {
					if (aBaseUriSegments.length > nBaseUriStart)
						aBaseUriSegments.pop();
					else {
						aBaseUriSegments.push(aUriSegments[nIndex]);
						nBaseUriStart++;
					}
				}
				else
				if (aUriSegments[nIndex] != '.')
					aBaseUriSegments.push(aUriSegments[nIndex]);
			}
			if (aUriSegments[--nIndex] == '..' || aUriSegments[nIndex] == '.')
				aBaseUriSegments.push('');
			aUri[2]	= aBaseUriSegments.join('/');
		}
	}

	var aResult	= [];
	if (aUri[0])
		aResult.push(aUri[0]);
	if (aUri[1])	// '//'
		aResult.push(aUri[1]);
	if (aUri[2])
		aResult.push(aUri[2]);
	if (aUri[3])	// '?'
		aResult.push(aUri[3]);
	if (aUri[4])	// '#'
		aResult.push(aUri[4]);

	return aResult.join('');
};

function fAssemble(descriptor) {
	var data=fs.readFileSync(descriptor).toString();

	// read files
	var source	= [];
	for (var n = 0, files	= data.split(/\n/g), file; n < files.length; n++) {
		if ((file = files[n].replace(/^\s+/, "").replace(/\s+$/, "")) != '' && file.substr(0, 1) != "#") {
          file	= fResolveUri(file, descriptor);
          if (file.match(/.files$/))
            fAssemble(file);
          else {
            vm.runInThisContext(fs.readFileSync(file, 'utf-8').toString(),{"filename":file}, file);
          }
		}
	}
	return source.join("\n");
};

for(var p in module.paths) {
  var fn=module.paths[p]+"/xpath.js/.files";
  if (fs.existsSync(fn)) {
    fAssemble(fn);
    break;
  }
}

module.exports=function(doc) {
  if (!doc.compareDocumentPosition)
    xpath.classes.DOMAdapter.prototype.compareDocumentPosition=compareDocumentPosition;

  if (!doc.xpath) doc.xpath=function(e) {return xpath.evaluate(e,this);}
  return xpath;
};
