
    //STRING - HAS PATTERN
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

    //STRING - STRIP STRING
    Spektral.stripString = function (request, character, options) {
        var
            rex, newString = "", mode = Spektral.getParameter(options, 'mode', 'all'),
            characterFound = 0, letter, i;

        if(mode === "all") {
            rex = new RegExp(character, "g");
            newString = request.replace(rex, "");
        } else if (mode === "first") {
            rex = new RegExp(character, "");
            newString = request.replace(rex, "");
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

    //STRING - SPLIT STRING
    Spektral.splitString = function (request, options) {
        var
            splitArray = [], split, character = Spektral.getParameter(options, 'character', ','),
            i, detectChar, stripped;

        detectChar = Spektral.detectCharacter(request, character)

        if(detectChar === false && character !== " ") {

            Spektral.log("splitString: Could not split string because character [" + character + "] was not in string.", "warn");
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

    //STRING - CONVERT TO CAMEL
    Spektral.convertToCamel = function (request, options) {
        var
            character = Spektral.getParameter(options, 'character', '-'),
            splitRequest = Spektral.splitString(request, { character: character }),
            newString, stringToConvert, i;

        newString = splitRequest[0];
        for (i = 0; i < splitRequest.length; i += 1) {
            if (i !== 0) {
                stringToConvert = splitRequest[i].charAt(0).toUpperCase() + splitRequest[i].slice(1);
                newString += stringToConvert;
            }
        }
        return newString;
    };

    //STRING - CONVERT CAMEL
    Spektral.convertCamel = function (request, options) {
        var spacer = Spektral.getParameter(options, 'character', '-');
        return Spektral.convertCase(request.replace( /([A-Z])/g, spacer + "$1" ));
    };

    //STRING - DETECT CHARACTER
    Spektral.detectCharacter = function (request, character) {
        character = '\\' + character;
        var detected = false, regEx = new RegExp(character, 'g'), test = request.match(regEx);
        if(test !== null) {
            detected = true;
        }
        return detected;
    };

    //STRING - STRIP WHITE SPACE
    Spektral.stripWhiteSpace = function (request, options) {
        var newString, stripAll = Spektral.getParameter(options, 'stripAll', false);
        if(stripAll !== false) {
            newString = request.replace(/\s+/g, '');
        } else {
            newString = request.replace(/(^\s+|\s+$)/g,'');
        }
        return newString;
    };

    //STRING - STRIP BRACKETS
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

    //STRING - CONVERT CASE
    Spektral.convertCase = function (request, options) {
        var newString, newCase = Spektral.getParameter(options, 'newCase', 'lower');
        if (newCase === "lower") {
            newString = request.toLowerCase();
        } else if (newCase === "upper") {
            newString =  request.toUpperCase();
        } else if (newCase === "first") {
            newString = request.charAt(0).toUpperCase() + request.slice(1);
        }
        return newString;
    };

    //STRING - TRIM STRING
    Spektral.trimString = function (request, start, end) {
        return request.substring(start, end);
    };
