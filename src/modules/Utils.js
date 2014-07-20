
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

    //UTILS - QUERY ARRAY
    Spektral.queryArray = function(array, value) {
        var result = false, i, resultArray = [];

        for (i = 0; i < array.length; i += 1) {
            if(array[i] === value) {
                resultArray.push(array[i]);
            }
        }

        if(resultArray.length === 1) {
            result = resultArray[0];
        } else if (resultArray.length > 1) {
            result = resultArray;
        }

        return result;
    };

    //UTILS - OBJECT HAS KEY
    Spektral.objectHasKey = function (obj, key) {
        var hasKey = false, k;
        for (k in obj) {
            if (k === key) {
                hasKey = true;
            }
        }
        return hasKey;
    };

    //UTILS - QUERY OBJECT
    Spektral.queryObject = function (obj, key) {
        var value = false, k;
        for (k in obj) {
            if (k === key) {
                value = obj[k];
            }
        }
        return value;
    };

    //UTILS - GET ELEMENT IDS
    Spektral.getElementIds = function (element) {
        var identifiers = {}, nn;
        nn = Spektral.convertCase(element.nodeName);
        if(element.id !== '') {
            identifiers["id"] = element.id;
        } else {
            identifiers["id"] = 'NOT_SET';
        }
        if(element.className !== '') {
            identifiers["class"] = element.className;
        } else {
            identifiers["class"] = 'NOT_SET';
        }
        //using nodeName as the key caused identifiers
        //to return with a type of div instead of object
        identifiers["node"] = nn;
        return identifiers;
    };

    //UTILS - GET PARAMETER
    Spektral.getParameter = function (obj, val, defaultParam) {
        var retrievedParam;
        if (obj !== undefined) {
            if (obj[val] === undefined) {
                retrievedParam = defaultParam;
            } else {
                retrievedParam = obj[val];
            }
        } else {
            retrievedParam = defaultParam;
        }
        return retrievedParam;
    };

    //UTILS - GET EXTENSION
    Spektral.getExtension = function (file) {
        var type = Spektral.getType(file);
        if (file === undefined) {
            Spektral.log("getExtension: file is undefined. Did you pass a file name to this function?", "warn");
        } else if (type !== "string") {
            Spektral.log("getExtension: file needs to be string.", "warn");
        }
        return file.split(".").pop();
    };

