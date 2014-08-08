
    //STYLE - matchHeight
    Spektral.matchHeight = function(reference, target, options) {
        var
            type = Spektral.getParameter(options, type, 'normal'),
            refDim = Spektral.getDimensions(reference), refHeight,
            targetDim = Spektral.getDimensions(target);
        if(type === "normal") {
            refHeight = refDim.height;
        } else if (type === "inner") {
            refHeight = refDim.innerHeight;
        } else if (type === "total") {
            refHeight = refDim.totalHeight;
        }
        Spektral.setStyle(target, "height:" + refHeight + "px");
    };

    //STYLE - setStyle
    Spektral.setStyle = function (element, prop) {
        var pType = Spektral.getType(prop), propString = "", i;
        if(pType === "string") {
            propString = prop;
        } else if (pType === "array") {
            for (i = 0; i < prop.length; i += 1) {
                if (i !== prop.length - 1) {
                    propString += prop[i] + "; ";
                } else {
                    //The extra space at the end causes a problem, so we'll have to remove it
                    propString += prop[i] + ";";
                }
            }
        } else {
            Spektral.log("setStyle: Property must be a string or array.", "warn");
        }
        Spektral.setAttributes(element, "style", propString);
    };
