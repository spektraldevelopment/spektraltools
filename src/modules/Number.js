
    //NUMBER - roundNum
    Spektral.roundNum = function (num, type) {
        type = type || "regular";
        var roundedNum = 0;
        if (type === "regular") {
            roundedNum = Math.round(num);
        } else if (type === "up") {
            roundedNum = Math.ceil(num)
        } else if (type === "down") {
            roundedNum = Math.floor(num);
        }
        return roundedNum;
    };