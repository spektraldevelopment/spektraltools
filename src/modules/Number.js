
    //NUMBER - roundNum
    Spektral.roundNum = function (num, options) {
        var roundedNum = 0, roundType = Spektral.getParameter(options, 'roundType', 'regular');
        if (roundType === "regular") {
            roundedNum = Math.round(num);
        } else if (roundType === "up") {
            roundedNum = Math.ceil(num)
        } else if (roundType === "down") {
            roundedNum = Math.floor(num);
        }
        return roundedNum;
    };

    //NUMBER - allAreEqualTo
    Spektral.allAreEqualTo = function(val, arr) {
        var i, areEqual = true;
        for (i = 0; i < arr.length; i += 1) {
            if(arr[i] !== val) {
                areEqual = false;
            }
        }
        return areEqual;
    };