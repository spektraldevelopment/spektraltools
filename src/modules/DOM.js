
    //DOM - ADD ELEMENT
    Spektral.addElement = function(parent, type, attrs) {
        var
            newElement = document.createElement(type),
            key, dataCheck, dataAttr;
        for (key in attrs) {
            dataCheck = Spektral.hasPattern(key, 'data');
            if (key === 'className') {
                newElement.className = attrs[key];
            } else if (key === 'innerHTML') {
                newElement.innerHTML = attrs[key];
            } else if (dataCheck.match === true) {
                dataAttr = Spektral.stripString(key, 'data').toLowerCase();
                newElement.setAttribute('data-' + dataAttr, attrs[key]);
            }
            else {
                newElement.setAttribute(key, attrs[key]);
            }
        }
        parent.appendChild(newElement);
        return newElement;
    };

    //DOM - REMOVE ELEMENT
    Spektral.removeElement = function (element) {
        try {
            element.remove();
        } catch (err) {
            element.parentNode.removeChild(element);
        }
    };

    //DOM - SET ATTRIBUTES
    Spektral.setAttributes = function(element, attrs) {
        var k, dataCheck, dataAttr;
        for (k in attrs) {
            dataCheck = Spektral.hasPattern(k, 'data');
            if (k === 'className') {
                element.setAttribute('class', attrs[k]);
            } else if (dataCheck.match === true) {
                dataAttr = Spektral.stripString(k, 'data').toLowerCase();
                element.setAttribute('data-' + dataAttr, attrs[k]);
            } else {
                element.setAttribute(k, attrs[k]);
            }
        }
    };

    //DOM - GET ATTRIBUTES
    Spektral.getAttributes = function (element) {
        var attributes = element.attributes, attrObj = {}, i;
        if (attributes.length >= 1) {
            for (i = 0; i < attributes.length; i += 1) {
                if (attributes.item(i).nodeName === 'class') {
                    attrObj['className'] = attributes.item(i).value;
                } else {
                    attrObj[attributes.item(i).nodeName] = attributes.item(i).value;
                }
            }
        }
        return attrObj;
    };

    //DOM - DESTROY ATTRIBUTE
    Spektral.destroyAttribute = function (element, attribute) {
        if (element.hasAttribute(attribute)) {
            element.removeAttribute(attribute);
        } else {
            Spektral.log('destroyAttribute: element does not have attribute ' + attribute + ' set.', 'warn');
        }
    };

    //DOM - MOVE TO AFTER
    Spektral.moveToAfter = function (element, targetElement) {
        element.parentNode.insertBefore(element, targetElement.nextSibling);
    };

    //DOM - MOVE TO BEFORE
    Spektral.moveToBefore = function (element, targetElement) {
        element.parentNode.insertBefore(element, targetElement);
    };

    //DOM - CLEAR CHILDREN
    Spektral.clearChildren = function (parent) {
        parent.innerHTML = '';
    };

    //DOM - GET INNER TEXT
    Spektral.getInnerText = function(element) {
        var content = element.textContent;
        if (content === undefined) {
            content = element.innerText;
        }
        return content;
    };

    //DOM - SET INNER TEXT
    Spektral.setInnerText = function (element, textContent, options) {
        var
            currentContent = Spektral.getInnerText(element),
            newContent, append = Spektral.getParameter(options, 'append', false);
        if(append === true) {
            newContent = currentContent + textContent;
            element.innerHTML = newContent;
        } else {
            element.innerHTML = textContent;
        }
    };

    //DOM - IS ELEMENT
    Spektral.isElement = function (possibleElement) {
        var isAnElement = false, type = possibleElement.nodeType;
        if(type === 1) {
            isAnElement = true;
        }
        return isAnElement;
    };