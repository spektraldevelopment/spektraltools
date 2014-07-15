
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

    //DOM - GET PARENT
    Spektral.getParent = function (element) {
        return element.parentNode;
    }