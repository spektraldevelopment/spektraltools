//JASMINE HELPER FILE

var document, body;

////////////////////
////INIT HELPER
////////////////////
function initHelper (doc) {
    document = doc;
    body = doc.body;
}

////////////////////
////CREATE TEST CONTAINER
////////////////////
function createTestContainer(parent, attrs) {
    parent = parent || body;
    var tc = document.createElement('div');
    tc.id = getParameter(attrs, 'id', 'testContainer');
    parent.appendChild(tc);
    return tc;
}

////////////////////
////CREATE TEST ELEMENT
////////////////////
function createTestElement(parent, type, attrs) {
    type = type || 'div';
    var newElement = document.createElement(type), key;
    for (key in attrs) {
        if (key === 'className') {
            newElement.className = attrs[key];
        } else if (key === 'innerHTML') {
            newElement.innerHTML = attrs[key];
        } else {
            newElement.setAttribute(key, attrs[key]);
        }
    }
    parent.appendChild(newElement);
    return newElement;
}

function destroyTestContainer(element) {
    try {
        element.remove();
    } catch (err) {
        element.parentNode.removeChild(element);
    }
}

////////////////////
////GET PARAMETER
////////////////////
function getParameter(obj, val, defaultParam) {
    var retrievedParam;
    if (obj !== undefined) {
        if (obj[val] === undefined) {
            retrievedParam = defaultParam;
            //console.log("getParameter: val was not found, setting to default.")
        } else {
            retrievedParam = obj[val];
            //console.log("getParameter: val found.")
        }
    } else {
        retrievedParam = defaultParam;
        //console.log("getParameter: object was not defined, setting val to default.")
    }
    return retrievedParam;
}

//////////////////
////GET CHILD NODES
/////////////////
function getChildNodes(parent) {
    var
        children = parent.childNodes,
        childArr = [], i, isElement;
    console.log(parent.id + ' children: ');
    for (i = 0; i < children.length; i += 1) {
        isElement = isAnElement(children[i]);
        if(isElement === true) {
            childArr.push(children[i]);
            console.log('child: ' + children[i]);
        }
    }
    return childArr;
}

//////////////////
////IS ELEMENT
/////////////////
function isAnElement(possibleElement) {
    var isEl = false, type = possibleElement.nodeType;
    if(type === 1) {
        isEl = true;
    }
    return isEl;
}

//////////////////
////GET TYPE
/////////////////
function getType (obj) {
    var type;
    if(obj.nodeName !== undefined) {
        //element
        type = (obj.nodeName);
    } else {
        //everything else
        type = ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1]
    }
    type = type.toLowerCase();
    return type;
}

////////////////////
////LOG OBJECT
////////////////////
function logObject(obj, id) {
    var k;
    if (id !== undefined) {
        console.log('Object: ' + id);
    }
    for (k in obj) {
        console.log('key: ' + k + ' value: ' + obj[k]);
    }
}

////////////////////
////LOG ARRAY
////////////////////
function logArray(arr, id) {
    var i;
    if (id !== undefined) {
        console.log('Array: ' + id);
    }
    for (i = 0; i < arr.length; i += 1) {
        console.log(arr[i]);
    }
}