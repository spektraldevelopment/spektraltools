    var
        Spektral = {},
        debug = false,
        mouseEvents = ["click", "dblclick", "mousedown", "mousemove", "mouseup", "mouseover", "mouseout"];

    //GLOBAL - debugMode
    Spektral.debugMode = function(){
        return debug;
    };

    //GLOBAL - debug
    Spektral.debug = function() {
        debug = true;
    };

    //GLOBAL - query
    Spektral.queryEl = function(el) {
        var isClass = Spektral.detectCharacter(el, '.'), theElement;

        if (isClass === true) {
            theElement = document.querySelectorAll(el);
        } else {
            theElement = document.querySelector(el);
        }

        if (theElement === null) {
            Spektral.log('query: element not found.', 'warn');
        } else {
            return theElement;
        }
    };