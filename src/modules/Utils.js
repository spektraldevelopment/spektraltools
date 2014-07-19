
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

    //UTILS - IS MATCH
    Spektral.isMatch = function (itemA, itemB, useType) {
        useType = useType || false;
        var
            isMatch = false,
            itemAType = Spektral.getType(itemA),
            itemBType = Spektral.getType(itemB);
        if(useType === true) {
            if(itemAType === itemBType) {
                isMatch = true;
            }
        } else {
            if (itemA === itemB) {
                isMatch = true;
            }
        }
        return isMatch;
    };

    //UTILS - STRING TO NUM
    Spektral.stringToNum = function(request) {
        return parseInt(request.replace(/[^0-9.]/g, ""), 10);
    };

    //UTILS - IS OBJECT EMPTY
    Spektral.isObjectEmpty = function (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    };

    //UTILS - ARRAY HAS VALUE
    Spektral.arrayHasValue = function (array, value) {
        var i, found = false;
        for(i = 0; i < array.length; i += 1) {
            if(array[i] === value) {
                found = true;
            }
        }
        return found;
    };
