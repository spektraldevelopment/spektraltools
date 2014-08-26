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