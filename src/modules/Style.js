
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
    Spektral.setStyle = function (element, prop, options) {
        var
            append = Spektral.getParameter(options, 'append', false),
            pType = Spektral.getType(prop), propString = "", i;
        if(pType === 'string') {
            if (append === false) {
                propString = prop;
            } else {
                //Working on this
            }
        } else if(pType === 'object'){
            for (i in prop) {
                console.log('setStyle: ' + i + ' : ' + prop[i]);
                propString += i + ':' + prop[i] + '; ';
            }
            propString = propString.substr(0, propString.length - 1);
        } else {
            Spektral.log("setStyle: Property must be a string or array.", "warn");
        }
        Spektral.setAttributes(element, { style: propString });
    };

    //STYLE - getInlineStyle
    Spektral.getInlineStyle = function (element) {
        var
            inlineStyle = element.style.cssText,
            properties,
            property, key, val, i,
            styleObject = {};
        if(inlineStyle === "") {
            styleObject = false;
            //Spektral.log("getInlineStyle: No inline style set.");
        } else {
            properties = Spektral.splitString(inlineStyle, ";");
            for (i = 0; i < properties.length; i += 1) {
                property = Spektral.splitString(properties[i], ":");
                key = property[0];
                val = property[1];
                styleObject[key] = val;
            }
        }
        return styleObject;
    };
