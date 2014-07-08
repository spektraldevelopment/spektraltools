
    //DOM - ADD ELEMENT
    Spektral.addElement = function(parent, type, attrs) {
        var newElement = document.createElement(type), key;
        for (key in attrs) {
            if (key === 'className') {
                newElement.class = attrs[key];
            } else if (key === 'innerHTML') {
                newElement.innerHTML = attrs[key];
            } else {
                newElement.setAttribute(key, attrs[key]);
            }
        }
        parent.appendChild(newElement);
        return newElement;
    }