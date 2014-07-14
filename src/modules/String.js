
    //String - hasPattern
    Spektral.hasPattern = function (request, pattern) {
        var
            regEx = new RegExp(pattern, "g"),
            matches = request.match(regEx),
            hasMatch = false, matchAmount = 0,
            matchObj = {};
        if (matches !== null) {

            hasMatch = true;
            matchAmount = matches.length;
        }
        matchObj['match'] = hasMatch;
        matchObj['amount'] = matchAmount;
        matchObj['array'] = matches;
        return matchObj;
    };

    //String - stripString
    Spektral.stripString = function (request, character, mode) {
        mode = mode || "all";
        var
            first = new RegExp(character, ""),
            all = new RegExp(character, "g"),
            newString = "", characterFound = 0, letter, i;
        if(mode === "all") {
            newString = request.replace(all, "");
        } else if (mode === "first") {
            newString = request.replace(first, "");
        } else {
            //Target index
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