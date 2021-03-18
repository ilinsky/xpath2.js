function createDocument() {
    return {
        nodeType: 9,
        nodeName: '#document',
//        childNodes: [],
        all: {},
        getElementById: function(id) {
            return Object.hasOwnProperty.call(this.all, id) ? this.all[id] : null;
        }
    };
}

function createElement(name) {
    return {
        nodeType: 1,
        nodeName: name,
        localName: name,
//        childNodes: [],
        attributes: []
    };
}

function createComment(value) {
    return {
        nodeType: 8,
        nodeName: '#comment',
//        nodeValue: value,
        data: value
    };
}

function createText(value) {
    return {
        nodeType: 3,
        nodeName: '#text',
//        nodeValue: value,
        data: value
    };
}

function createCDATASection(value) {
    return {
        nodeType: 4,
        nodeName: '#cdata-section',
//        nodeValue: value,
        data: value
    };
}

function createProcessingInstruction(target, value) {
    return {
        nodeType: 7,
        nodeName: target,
//        nodeValue: value,
        data: value
    };
}

function createAttribute(name, value) {
    return {
        nodeType: 2,
        nodeName: name,
        localName: name,
//        nodeValue: value,
        value: value
    };
}

function addAttribute(element, attribute) {
    element.attributes.push(attribute);
    attribute.ownerElement = element;

    //
    if (element.ownerDocument && attribute.nodeName == "id") {
        element.ownerDocument.all[attribute.value] = element;
    }
}

function addChild(parent, node) {
    node.parentNode = parent;
    var last = parent.lastChild;
	if (last) {
        node.previousSibling = last;
        last.nextSibling = node;
    }
    else
        parent.firstChild	= node;
	parent.lastChild	= node;

    node.ownerDocument = parent.nodeType == 9 ? parent: parent.ownerDocument;

    if (parent.nodeType == 9) {
        parent.documentElement = node;
    }

//	parent.childNodes.push(node);
}

module.exports = {
    createDocument: createDocument,
    createElement: createElement,
    createComment: createComment,
    createText: createText,
    createAttribute: createAttribute,
    createProcessingInstruction: createProcessingInstruction,
    addAttribute: addAttribute,
    addChild: addChild
};