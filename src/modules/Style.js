
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
                    propString += Spektral.concatCamel(i) + ':' + props[i] + '; ';
                }
                propString = propString.substr(0, propString.length - 1);
            } else {
                //Style property already set
                for (i in props) {
                    currentStyle[Spektral.concatCamel(i)] = props[i];
                }
                for (j in currentStyle) {
                    propString += Spektral.concatCamel(j) + ':' + currentStyle[j] + '; ';
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

    //STYLE - CLEAR INLINE STYLE
    Spektral.clearInlineStyle = function (element) {
        Spektral.destroyAttribute(element, "style");
    };

    //STYLE - GET STYLE
    Spektral.getStyleValue = function (element, styleProperty) {
        var style, isEqual, pT, pR, pB, pL, mT, mR, mB, mL;
        try {
            if (styleProperty === 'padding') {
                pT = document.defaultView.getComputedStyle(element, null).getPropertyValue('padding-top');
                pR = document.defaultView.getComputedStyle(element, null).getPropertyValue('padding-right');
                pB = document.defaultView.getComputedStyle(element, null).getPropertyValue('padding-bottom');
                pL = document.defaultView.getComputedStyle(element, null).getPropertyValue('padding-left');

                isEqual = Spektral.allAreSame([pT, pR, pB, pL]);

                if (isEqual === true) {
                    style = document.defaultView.getComputedStyle(element, null).getPropertyValue('padding-top');
                } else {
                    style = pT + ' ' + pR + ' ' + pB + ' ' + pL;
                }
            } else if (styleProperty === 'margin') {
                mT = document.defaultView.getComputedStyle(element, null).getPropertyValue('margin-top');
                mR = document.defaultView.getComputedStyle(element, null).getPropertyValue('margin-right');
                mB = document.defaultView.getComputedStyle(element, null).getPropertyValue('margin-bottom');
                mL = document.defaultView.getComputedStyle(element, null).getPropertyValue('margin-left');

                isEqual = Spektral.allAreSame([mT, mR, mB, mL]);

                if (isEqual === true) {
                    style = document.defaultView.getComputedStyle(element, null).getPropertyValue('margin-top');
                } else {
                    style = mT + ' ' + mR + ' ' + mB + ' ' + mL;
                }
            } else {
                style = document.defaultView.getComputedStyle(element, null).getPropertyValue(styleProperty);
            }
        } catch (err) {
            style = element.currentStyle[styleProperty];
        }
        return style;
    };

    //STYLE - USE HAND CURSOR
    Spektral.useHandCursor = function (element, options) {
        var
            cursorType = Spektral.getParameter(options, 'cursorType', 'pointer'),
            elemType = Spektral.getType(element);
        if(elemType !== "input") {
            //input elements have the hand cursor by default,
            //there might be others so I will keep an eye out
            Spektral.setStyle(element, { cursor: cursorType }, { append: true });
        }
    };

    //STYLE - USE DEFAULT CURSOR
    Spektral.useDefaultCursor = function (element) {
        Spektral.setStyle(element, { cursor: 'default' });
    };

    //STYLE - HIDE ELEMENT
    Spektral.hideElement = function (element, options) {
        var
            useDisplay = Spektral.getParameter(options, 'useDisplay', false),
            currentVState = Spektral.getStyleValue(element, "visibility"),
            currentDState = Spektral.getStyleValue(element, "display");
        if(currentVState !== "hidden" || currentDState !== "none") {
            if(useDisplay === true) {
                //set display to none
                Spektral.setStyle(element, { display: 'none' });
            } else {
                //set visibility to hidden
                Spektral.setStyle(element, { visibility: 'hidden' });
            }
        } else {
            ////Spektral.log(element + " is already hidden.");
        }
    };

    //STYLE - SHOW ELEMENT
    Spektral.showElement = function (element, options) {
        var
            displayType = Spektral.getParameter(options, 'displayType', 'block'),
            currentVState = Spektral.getStyleValue(element, "visibility"),
            currentDState = Spektral.getStyleValue(element, "display");
        if(currentVState !== 'visible' || currentDState === 'none') {
            Spektral.setStyle(element, { 
                display: displayType,
                visibility: 'visible' 
            });
        } else {
            //Element is already seen, don't do anything
            //Spektral.log(element + " is already visible.");
        }
    };

    //STYLE - TOGGLE VISIBILITY
    Spektral.toggleVisibility = function (element) {
        var currentVState = Spektral.getStyleValue(element, "visibility");
        if(currentVState === "visible") {
            Spektral.setStyle(element, { visibility: 'hidden'});
            //Spektral.log("Visible, hiding.");
        } else {
            Spektral.setStyle(element, { visibility: 'visible'});
            //Spektral.log("Hidden, showing.");
        }
    };

    //STYLE - TOGGLE DISPLAY
    Spektral.toggleDisplay = function (element, options) {
        var
            displayType = Spektral.getParameter(options, 'displayType', 'block'),
            currentDState = Spektral.getStyleValue(element, "display");

        if(currentDState === "block" || currentDState === "inline" || currentDState === "inline-block" || currentDState === "inherit") {
            Spektral.setStyle(element, { display: 'none' });
            //Spektral.log("toggleDisplay: Visible, hiding.");
        } else {
            Spektral.setStyle(element, { display: displayType, visibility: 'visible' });
            //Spektral.log("toggleDisplay: Hiding, showing: " + displayString);
        }
    };

    //STYLE - MATCH HEIGHT
    Spektral.matchHeight = function(reference, target, options) {
        var
            type = Spektral.getParameter(options, 'type', 'normal'),
            refDim = Spektral.getDimensions(reference), refHeight;
        if(type === "normal") {
            refHeight = refDim.height;
        } else if (type === "inner") {
            refHeight = refDim.innerHeight;
        } else if (type === "total") {
            refHeight = refDim.totalHeight;
        }
        Spektral.setStyle(target, { height: refHeight + "px" });
    };

