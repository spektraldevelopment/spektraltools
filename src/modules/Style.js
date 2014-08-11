
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
            propString = "", i;
        if (pType === 'object') {
            console.log('INLINE STYLE: ' + currentStyle);
            if (currentStyle === false) {
                //No style set yet
                for (i in props) {
                    propString += i + ':' + props[i] + '; ';        
                }
                propString = propString.substr(0, propString.length - 1);
            } else {
                console.log('currentStyle: ' + JSON.stringify(currentStyle));
                //Style property already set
                for (i in props) {
                    
                }
            }
        } else {
            Spektral.log("setStyle: Property must be a string or array.", "warn");
        }
        Spektral.setAttributes(element, { style: propString });
    };

    //STYLE - GET INLINE STYLE
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
