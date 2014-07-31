    var
        Spektral = {},
        debug = false,
        mouseEvents = ["click", "dblclick", "mousedown", "mousemove", "mouseup", "mouseover", "mouseout"];

    //GLOBAL - ping
    Spektral.ping = function(){
       return 'Spektral: Hello!';
    };

    //GLOBAL - debugMode
    Spektral.debugMode = function(){
        return debug;
    };

    //GLOBAL - debug
    Spektral.debug = function() {
        debug = true;
    };

    //GLOBAL - query
    Spektral.query = function(el) {
        var isClass = Spektral.detectCharacter(el, '.'), theElement, i;
        if (isClass === true) {
            theElement = document.querySelectorAll(el);

            if(theElement.length === 1) {
              theElement = theElement[0];
            }
        } else {
            theElement = document.querySelector(el);
        }
        if (theElement === null) {
            Spektral.log('query: element not found.', 'warn');
        }
        return theElement;
    };