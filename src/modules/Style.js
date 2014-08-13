
    //STYLE - MATCH HEIGHT
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

    //STYLE - SET STYLE
    Spektral.setStyle = function (element, props, options) {
        var
            append = Spektral.getParameter(options, 'append', false),
            pType = Spektral.getType(props), currentStyle = Spektral.getInlineStyle(element), 
            propString = "", i, j;
        if (pType === 'object') {
            //In case append unintentionally set to true when no style exists yet
            if(currentStyle === false) {
                append = false
            }
            if (append === false) {
                //No style set yet
                for (i in props) {
                    propString += Spektral.convertCamel(i) + ':' + props[i] + '; ';
                }
                propString = propString.substr(0, propString.length - 1);
            } else {
                //Style property already set
                for (i in props) {
                    currentStyle[Spektral.convertCamel(i)] = props[i];
                }
                for (j in currentStyle) {
                    propString += Spektral.convertCamel(j) + ':' + currentStyle[j] + '; ';
                }
                propString = propString.substr(0, propString.length - 1);
            }
        } else {
            Spektral.log("setStyle: Property must be a string or array.", "warn");
        }
        Spektral.setAttributes(element, { style: propString });
    };

    //STYLE - GET INLINE STYLE
    Spektral.getInlineStyle = function (element) {
        var
            inlineStyle = element.getAttribute('style'),
            properties, property, key, val, i,
            hasSemi, styleObject = {};
        if(inlineStyle === null) {
            styleObject = false;
            //Spektral.log("getInlineStyle: No inline style set.");
        } else {
            hasSemi = Spektral.detectCharacter(inlineStyle, ';');
            if(hasSemi === true) {
                properties = Spektral.splitString(inlineStyle, { character: ';' });
                for (i = 0; i < properties.length; i += 1) {
                    property = Spektral.splitString(properties[i], { character: ':' });
                    key = Spektral.stripWhiteSpace(property[0]);
                    val = Spektral.stripWhiteSpace(property[1]);
                    styleObject[key] = val;
                }
            } else {
                property = Spektral.splitString(inlineStyle, { character: ':' });
                styleObject[Spektral.stripWhiteSpace(property[0])] = Spektral.stripWhiteSpace(property[1]);
            }
        }
        return styleObject;
    };
