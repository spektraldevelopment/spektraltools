
    //STRING - hasPattern
    Spektral.hasPattern = function (request, pattern) {
        var
            regEx = new RegExp(pattern, "g"),
            matches = request.match(regEx),
            matchObj = {};
        if (matches !== null) {
            matchObj['match'] = true;
            matchObj['amount'] = matches.length;
        } else {
            matchObj['match'] = false;
        }
        return matchObj;
    };

    //STRING - stripString
    Spektral.stripString = function (request, character, mode) {
        mode = mode || "all";
        var
            first, all, newString = "",
            characterFound = 0, letter, i, re;

        if(mode === "all") {

            all = new RegExp(character, "g");
            newString = request.replace(all, "");
        } else if (mode === "first") {
            first = new RegExp(character, "");
            newString = request.replace(first, "");
        } else {
            //Target index
            //Not working at the moment with special RegEx character, for ex. *
            for(i = 0; i < request.length; i += 1) {
                letter = request[i];
                if(letter === character) {
                    if(characterFound === mode) {
                        letter = letter.replace(character, "");
                    }
                    characterFound ++;
                }
                newString += letter;
            }
        }
        return newString;
    };

    //STRING - splitString
    Spektral.splitString = function (request, character) {
        character = character || ",";
        var
            splitArray = [], split,
            i, detectCharacter = Spektral.detectCharacter(request, character),
            stripped;

        if(detectCharacter === false && character !== " ") {

            log("splitString: Could not split string because character [" + character + "] was not in string.", "warn");
        } else {
            if(character !== " ") {
                split = request.split(character);
            } else {
                split = request.split(/[ ,]+/);
            }
        }

        for (i = 0; i < split.length; i += 1) {
            if(split[i] !== "") {
                stripped = Spektral.stripWhiteSpace(split[i]);
                splitArray.push(stripped);
            }
        }
        return splitArray;
    };

    //STRING - covertToCamel
    Spektral.convertToCamel = function (request, character) {
        character = character || "-";
        var splitRequest = Spektral.splitString(request, character), newString, stringToConvert, i;
        newString = splitRequest[0];
        for (i = 0; i < splitRequest.length; i += 1) {
            if (i !== 0) {
                stringToConvert = splitRequest[i].charAt(0).toUpperCase() + splitRequest[i].slice(1);
                newString += stringToConvert;
            }
        }
        return newString;
    };

    //STRING - detectCharacter
    Spektral.detectCharacter = function (request, character) {
        var detected = false, test = request.match(character);
        if(test !== null) {
            detected = true;
        }
        return detected;
    };

    //STRING - stripWhiteSpace
    Spektral.stripWhiteSpace = function (request, removeAll) {
        removeAll = removeAll || false;
        var newString;
        if(removeAll !== false) {
            newString = request.replace(/\s+/g, '');
        } else {
            newString = request.replace(/(^\s+|\s+$)/g,'');
        }
        return newString;
    };

    //STRING - stripBrackets
    Spektral.stripBrackets = function (request) {
        var value;
        //[]
        try {
            value = request.match(/\[(.*?)\]/)[1];
        } catch(e){}
        //()
        try {
            value = request.match(/\((.*?)\)/)[1];
        } catch(e){}
        //{}
        try {
            value = request.match(/\{(.*?)\}/)[1];
        } catch(e){}
        return value;
    };
