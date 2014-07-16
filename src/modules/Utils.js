
    //UTILS - GET TYPE
    Spektral.getType = function (obj) {
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
    };

    //UTILS - GET INFO
    Spektral.getInfo = function (obj) {
        var info;
        try {
            info = JSON.stringify(obj);
        } catch (err) {
            Spektral.log("getInfo: could not stringify.", obj, "dir");
        }
        return info;
    };

    //UTILS - GET KEY
    Spektral.getKey = function (code) {
        var key;
        if (code === 38) { key = "UP"; }
        if (code === 40) { key = "DOWN"; }
        if (code === 37) { key = "LEFT"; }
        if (code === 39) { key = "RIGHT"; }
        if (code === 13) { key = "ENTER"; }
        return key;
    };