
    //NUMBER - ROUND NUM
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

    //NUMBER - GET RANDOM NUM
    Spektral.getRandomNum = function(min, max, options) {
        var randNum, rounded = Spektral.getParameter(options, 'rounded', true);
        if (rounded === false) {
            randNum = Math.random() * (max - min) + min;
        } else {
            randNum = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        return randNum;
    };