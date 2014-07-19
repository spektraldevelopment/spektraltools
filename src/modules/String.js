
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