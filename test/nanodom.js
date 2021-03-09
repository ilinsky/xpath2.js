function createDocument() {
    return {
        nodeType: 9,
        localName: '#document',
        childNodes: [],
    };
}

function createElement(name) {
    return {
        nodeType: 1,
        nodeName: name,
        localName: name,
        childNodes: [],
        attributes: []
    };
}

function createComment(value) {
    return {
        nodeType: 8,
        nodeName: '#comment',
        nodeValue: value
//        textContent: value
    };
}

function createText(value) {
    return {
        nodeType: 3,
        nodeName: '#text',
        nodeValue: value
    };
}

function createProcessingInstruction(target, value) {
    return {
        nodeType: 7,
        nodeName: target,
        nodeValue: value
//        target: target,
//        textContent: value
    };
}

function createAttribute(name, value) {
    return {
        nodeType: 2,
        nodeName: name,
        localName: name,
        nodeValue: value
    }
}

function addAttribute(element, attribute) {
    element.attributes.push(attribute);
    attribute.ownerElement = element;
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

	parent.childNodes.push(node);
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
}