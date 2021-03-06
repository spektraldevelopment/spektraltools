
    //UTILS - GET TYPE
    Spektral.getType = function (obj) {
        var type;
        if(obj.nodeName !== undefined) {
            //element
            type = (obj.nodeName);
        } else {
            //everything else
            type = ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1]
        }
        type = type.toLowerCase();
        return type;
    };

    //UTILS - GET INFO
    Spektral.getInfo = function (obj) {
        var info;
        try {
            info = JSON.stringify(obj);
        } catch (err) {
            Spektral.log("getInfo: could not stringify.", obj, "dir");
        }
        return info;
    };

    //UTILS - IS MATCH
    Spektral.isMatch = function (itemA, itemB, options) {
        var
            isMatch = false, useType = Spektral.getParameter(options, 'useType', false),
            itemAType = Spektral.getType(itemA),
            itemBType = Spektral.getType(itemB);
        if(useType === true) {
            if(itemAType === itemBType) {
                isMatch = true;
            }
        } else {
            if (itemA === itemB) {
                isMatch = true;
            }
        }
        return isMatch;
    };

    //UTILS - STRING TO NUM
    Spektral.stringToNum = function(request) {
        return parseInt(request.replace(/[^0-9.]/g, ""), 10);
    };

    //UTILS - IS OBJECT EMPTY
    Spektral.isObjectEmpty = function (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    };

    //UTILS - ARRAY HAS VALUE
    Spektral.arrayHasValue = function (array, value) {
        var i, found = false;
        for(i = 0; i < array.length; i += 1) {
            if(array[i] === value) {
                found = true;
            }
        }
        return found;
    };

    //UTILS - QUERY ARRAY
    Spektral.queryArray = function(array, value) {
        var result = false, i, resultArray = [];

        for (i = 0; i < array.length; i += 1) {
            if(array[i] === value) {
                resultArray.push(array[i]);
            }
        }

        if(resultArray.length === 1) {
            result = resultArray[0];
        } else if (resultArray.length > 1) {
            result = resultArray;
        }

        return result;
    };

    //UTILS - OBJECT HAS KEY
    Spektral.objectHasKey = function (obj, key) {
        var hasKey = false, k;
        for (k in obj) {
            if (k === key) {
                hasKey = true;
            }
        }
        return hasKey;
    };

    //UTILS - QUERY OBJECT
    Spektral.queryObject = function (obj, key) {
        var value = false, k;
        for (k in obj) {
            if (k === key) {
                value = obj[k];
            }
        }
        return value;
    };

    //UTILS - GET ELEMENT IDS
    Spektral.getElementIds = function (element) {
        var identifiers = {}, nn;
        nn = Spektral.convertCase(element.nodeName);
        if(element.id !== '') {
            identifiers["id"] = element.id;
        } else {
            identifiers["id"] = 'NOT_SET';
        }
        if(element.className !== '') {
            identifiers["class"] = element.className;
        } else {
            identifiers["class"] = 'NOT_SET';
        }
        //using nodeName as the key caused identifiers
        //to return with a type of div instead of object
        identifiers["node"] = nn;
        return identifiers;
    };

    //UTILS - GET PARAMETER
    Spektral.getParameter = function (obj, val, defaultParam) {
        var retrievedParam;
        if (obj !== undefined) {
            if (obj[val] === undefined) {
                retrievedParam = defaultParam;
            } else {
                retrievedParam = obj[val];
            }
        } else {
            retrievedParam = defaultParam;
        }
        return retrievedParam;
    };

    //UTILS - GET EXTENSION
    Spektral.getExtension = function (file) {
        var type = Spektral.getType(file);
        if (file === undefined) {
            Spektral.log("getExtension: file is undefined. Did you pass a file name to this function?", "warn");
        } else if (type !== "string") {
            Spektral.log("getExtension: file needs to be string.", "warn");
        }
        return file.split(".").pop();
    };

    //UTILS - GET KEY
    Spektral.getKey = function(evt) {
        var
            keyName,
            keyMap, code = evt.keyCode,
            isShift = evt.shiftKey ? true : false,
            isCtrl = evt.ctrlKey ? true : false,
            isAlt = evt.altKey ? true : false;

        keyMap = {
            0: 'SINGLE_QUOTE',
            8: 'BACK_SPACE',
            9: 'TAB',
            13: 'ENTER',
            16: 'SHIFT',
            17: 'CTRL',
            18: 'ALT',
            19: 'PAUSE_BREAK',
            20: 'CAPS_LOCK',
            27: 'ESCAPE',
            33: 'PAGE_UP',
            34: 'PAGE_DOWN',
            35: 'END',
            36: 'HOME',
            37: 'LEFT',
            38: 'UP',
            39: 'RIGHT',
            40: 'DOWN',
            45: 'INSERT',
            46: 'DELETE',
            48: '0',
            49: '1',
            50: '2',
            51: '3',
            52: '4',
            53: '5',
            54: '6',
            55: '7',
            56: '8',
            57: '9',
            61: 'EQUALS_SIGN',
            65: 'A',
            66: 'B',
            67: 'C',
            68: 'D',
            69: 'E',
            70: 'F',
            71: 'G',
            72: 'H',
            73: 'I',
            74: 'J',
            75: 'K',
            76: 'L',
            77: 'M',
            78: 'N',
            79: 'O',
            80: 'P',
            81: 'Q',
            82: 'R',
            83: 'S',
            84: 'T',
            85: 'U',
            86: 'V',
            87: 'W',
            88: 'X',
            89: 'Y',
            90: 'Z',
            91: 'LEFT_WINDOW_KEY',
            92: 'RIGHT_WINDOW_KEY',
            93: 'SELECT_KEY',
            96: 'NUMPAD_0',
            97: 'NUMPAD_1',
            98: 'NUMPAD_2',
            99: 'NUMPAD_3',
            100: 'NUMPAD_4',
            101: 'NUMPAD_5',
            102: 'NUMPAD_6',
            103: 'NUMPAD_7',
            104: 'NUMPAD_8',
            105: 'NUMPAD_9',
            106: 'MULTIPLY',
            107: 'ADD',
            109: 'SUBTRACT',
            110: 'DECIMAL_POINT',
            111: 'DIVIDE',
            112: 'F1',
            113: 'F2',
            114: 'F3',
            115: 'F4',
            116: 'F5',
            117: 'F6',
            118: 'F7',
            119: 'F8',
            120: 'F9',
            121: 'F10',
            122: 'F11',
            123: 'F12',
            144: 'NUM_LOCK',
            145: 'SCROLL_LOCK',
            173: 'HYPHEN',
            186: 'SEMI_COLON',
            187: 'EQUALS_SIGN',
            188: 'COMMA',
            189: 'DASH',
            190: 'PERIOD',
            191: 'FORWARD_SLASH',
            192: 'BACK_TICK',
            219: 'OPEN_SQUARE_BRACKET',
            220: 'BACK_SLASH',
            221: 'CLOSE_SQUARE_BRACKET',
            222: 'SINGLE_QUOTE',
            224: 'COMMAND'
        }

        if(code === 192 && isShift === true) {
            keyName = 'TILDA';
        } else if (code === 49 && isShift === true) {
            keyName = 'EXCLAMATION_POINT';
        } else if (code === 50 && isShift === true) {
            keyName = 'AT_SIGN';
        } else if (code === 51 && isShift === true) {
            keyName = 'HASHTAG';
        } else if (code === 52 && isShift === true) {
            keyName = 'DOLLAR_SIGN';
        } else if (code === 53 && isShift === true) {
            keyName = 'PERCENT';
        } else if (code === 54 && isShift === true) {
            keyName = 'CARET';
        } else if (code === 55 && isShift === true) {
            keyName = 'AMPERSAND';
        } else if (code === 56 && isShift === true) {
            keyName = 'ASTERISK';
        } else if (code === 57 && isShift === true) {
            keyName = 'OPEN_BRACKET';
        } else if (code === 48 && isShift === true) {
            keyName = 'CLOSE_BRACKET';
        } else if (code === 173 && isShift === true) {
            keyName = 'UNDERSCORE';
        } else if (code === 189 && isShift === true) {
            keyName = 'UNDERSCORE';
        } else if (code === 61 && isShift === true) {
            keyName = 'PLUS_SIGN';
        } else if (code === 187 && isShift === true) {
            keyName = 'PLUS_SIGN';
        } else if (code === 219 && isShift === true) {
            keyName = 'OPEN_CURLY_BRACKET';
        } else if (code === 221 && isShift === true) {
            keyName = 'CLOSE_CURLY_BRACKET';
        } else if (code === 220 && isShift === true) {
            keyName = 'VERTICAL_BAR';
        } else if (code === 186 && isShift === true) {
            keyName = 'COLON';
        } else if (code === 222 && isShift === true) {
            keyName = 'QUOTATION_MARK';
        } else if (code === 0 && isShift === true) {
            keyName = 'QUOTATION_MARK';
        } else if (code === 188 && isShift === true) {
            keyName = 'LESS_THAN_SIGN';
        } else if (code === 190 && isShift === true) {
            keyName = 'GREATER_THAN_SIGN';
        } else if (code === 191 && isShift === true) {
            keyName = 'QUESTION_MARK';
        } else {
            keyName = keyMap[code];
        }
        return keyName;
    };

    //UTILS - GET MOUSE POS
    Spektral.getMousePos = function (evt) {
        var
            mousePos = {},
            target = Spektral.getTarget(evt),
            targetX = Spektral.getPosition(target).boundX,
            targetY = Spektral.getPosition(target).boundY,
            pageX = evt.pageX, pageY = evt.pageY,
            screenX = evt.screenX, screenY = evt.screenY,
            clientX = evt.clientX, clientY = evt.clientY,
            offsetX, offsetY,
            docElem = document.documentElement;
        try {

            // if documentElement.scrollLeft supported
            if (docElem.scrollLeft) {

                offsetX = docElem.scrollLeft;
                offsetY = docElem.scrollTop;
            } else if (document.body) {

                offsetX = document.body.scrollLeft;
                offsetY = document.body.scrollTop;
            }

            //pageX/Y = documentX/Y
            //screenX/Y = screenX/Y
            //clientX/Y = viewportX/Y

            mousePos["innerX"] = Spektral.roundNum(clientX - targetX);
            mousePos["innerY"] = Spektral.roundNum(clientY - targetY);

            mousePos["pageX"] = Spektral.roundNum(pageX);
            mousePos["pageY"] = Spektral.roundNum(pageY);

            mousePos["screenX"] = Spektral.roundNum(screenX);
            mousePos["screenY"] = Spektral.roundNum(screenY);

            mousePos["viewportX"] = Spektral.roundNum(clientX);
            mousePos["viewportY"] = Spektral.roundNum(clientY);

            mousePos["offsetX"] = Spektral.roundNum(offsetX);
            mousePos["offsetY"] = Spektral.roundNum(offsetY);
        } catch (err) {
            Spektral.log('getMousePos error: ' + err, 'warn')
        }

        return mousePos;
    };

    //UTILS - GET POSITION
    Spektral.getPosition = function (element) {
        var
            pos = {},
            viewport = Spektral.getViewportSize(),
            parent = element.parentNode,
            par = parent.getBoundingClientRect(),
            el = element.getBoundingClientRect(),
            left, top, right, bottom,
            dLeft, dTop, dRight, dBottom,
            elTop, elRight, elBottom, elLeft,
            viewWidth = viewport.width,
            viewHeight = viewport.height;

        //Position relative to parent
        top = (el.top - par.top);
        right = (par.right - el.right);
        bottom = (par.bottom - el.bottom);
        left = (el.left - par.left);

        //The properties returned from getBoundingClientRect
        elTop = el.top;
        elRight = el.right;
        elBottom = el.bottom;
        elLeft = el.left;

        //position relative to document
        dTop = el.top;
        dRight = (viewWidth - el.right);
        dBottom = (viewHeight - el.bottom);
        dLeft = el.left;

        //Relative to parent
        pos["x"] = left;
        pos["y"] = top;

        pos["top"] = top;
        pos["right"] = right;
        pos["bottom"] = bottom;
        pos["left"] = left;

        //getBoundingClientRect
        pos["boundX"] = elLeft;
        pos["boundY"] = elTop;

        pos["boundTop"] = elTop;
        pos["boundRight"] = elRight;
        pos["boundBottom"] = elBottom;
        pos["boundLeft"] = elLeft;

        //Relative to document
        pos["docX"] = dLeft;
        pos["docY"] = dTop;

        pos["docTop"] = dTop;
        pos["docRight"] = dRight;
        pos["docBottom"] = dBottom;
        pos["docLeft"] = dLeft;

        return pos;
    };

    //UTILS - GET VIEWPORT SIZE
    Spektral.getViewportSize = function () {
        var w, h, vPort = {};
        //Width
        if (window.innerWidth) {
            w = window.innerWidth;
        } else if (document.body && document.body.offsetWidth) {
            w = document.body.offsetWidth;
        } else {
            w = null;
        }
        //Height
        if (window.innerHeight) {
            h = window.innerHeight;
        } else if (document.body && document.body.offsetHeight) {
            h = document.body.offsetHeight;
        } else {
            h = null;
        }
        vPort["width"] = w;
        vPort["height"] = h;

        return vPort;
    };

    //UTILS - GET DOC DIMENSIONS
    Spektral.getDocDimensions = function () {
        var docDim = {}, width, height;
        width = Math.max(
            document.body.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.clientWidth,
            document.documentElement.scrollWidth,
            document.documentElement.offsetWidth
        );
        height = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
        docDim["width"] = width;
        docDim["height"] = height;
        return docDim;
    };

    //UTILS - GET DIMENSIONS
    Spektral.getDimensions = function (element) {
        var
            dimensions = {},
            width = Spektral.getStyleValue(element, "width"),
            height = Spektral.getStyleValue(element, "height"),

            padding,
            paddingTop = Spektral.getStyleValue(element, "padding-top"),
            paddingRight = Spektral.getStyleValue(element, "padding-right"),
            paddingBottom = Spektral.getStyleValue(element, "padding-bottom"),
            paddingLeft = Spektral.getStyleValue(element, "padding-left"),

            border = Spektral.getStyleValue(element, "border"),
            borderTop = Spektral.getStyleValue(element, "border-top-width"),
            borderRight = Spektral.getStyleValue(element, "border-right-width"),
            borderBottom = Spektral.getStyleValue(element, "border-bottom-width"),
            borderLeft = Spektral.getStyleValue(element, "border-left-width"),

            margin = Spektral.getStyleValue(element, "margin"),
            marginTop = Spektral.getStyleValue(element, "margin-top"),
            marginRight = Spektral.getStyleValue(element, "margin-right"),
            marginBottom = Spektral.getStyleValue(element, "margin-bottom"),
            marginLeft = Spektral.getStyleValue(element, "margin-left"),
            innerWidth, innerHeight,
            borderWidth, borderHeight,
            totalWidth, totalHeight,
            borderCheck, paddingArr, marginArr;

        //width/height = width/height of element itself, no border/padding/margin
        dimensions["width"] = Spektral.stringToNum(width);
        dimensions["height"] = Spektral.stringToNum(height);

        //innerWidth/innerHeight = element width/height + padding
        innerWidth = Spektral.stringToNum(paddingLeft) +
            Spektral.stringToNum(width) +
            Spektral.stringToNum(paddingRight);

        dimensions["innerWidth"] = innerWidth;

        innerHeight = Spektral.stringToNum(paddingTop) +
            Spektral.stringToNum(height) +
            Spektral.stringToNum(paddingBottom);

        dimensions["innerHeight"] = innerHeight;

        //borderWidth/borderHeight - returns border + padding + width/height
        borderWidth = Spektral.stringToNum(borderLeft) +
            Spektral.stringToNum(paddingLeft) +
            Spektral.stringToNum(width) +
            Spektral.stringToNum(paddingRight) +
            Spektral.stringToNum(borderRight);

        dimensions["borderWidth"] = borderWidth;

        borderHeight = Spektral.stringToNum(borderTop) +
            Spektral.stringToNum(paddingTop) +
            Spektral.stringToNum(height) +
            Spektral.stringToNum(paddingBottom) +
            Spektral.stringToNum(borderBottom);

        dimensions["borderHeight"] = borderHeight;

        dimensions["paddingTop"] = Spektral.stringToNum(paddingTop);
        dimensions["paddingRight"] = Spektral.stringToNum(paddingRight);
        dimensions["paddingBottom"] = Spektral.stringToNum(paddingBottom);
        dimensions["paddingLeft"] = Spektral.stringToNum(paddingLeft);

        //Check if padding is the same all around, and return a padding key with that value
        paddingArr = [dimensions["paddingTop"], dimensions["paddingRight"], dimensions["paddingBottom"], dimensions["paddingLeft"]];
        if (Spektral.allAreEqualTo(dimensions["paddingTop"], paddingArr) === true) {
            dimensions['padding'] = dimensions["paddingTop"];
        }

        //Border
        //If border shorthand isn't being used. ex. border: 1px solid blue
        //Then border returns nothing
        borderCheck = Spektral.hasPattern(border, "px").match;

        if(borderCheck === true) {
            dimensions["border"] = border;
        }

        dimensions["borderTop"] = Spektral.stringToNum(borderTop);
        dimensions["borderRight"] = Spektral.stringToNum(borderRight);
        dimensions["borderBottom"] = Spektral.stringToNum(borderBottom);
        dimensions["borderLeft"] = Spektral.stringToNum(borderLeft);

        dimensions["marginTop"] = Spektral.stringToNum(marginTop);
        dimensions["marginRight"] = Spektral.stringToNum(marginRight);
        dimensions["marginBottom"] = Spektral.stringToNum(marginBottom);
        dimensions["marginLeft"] = Spektral.stringToNum(marginLeft);

        //If margins are same value all around, return margin key with value
        marginArr = [dimensions["marginTop"], dimensions["marginRight"], dimensions["marginBottom"], dimensions["marginLeft"]];
        if (Spektral.allAreEqualTo(dimensions["marginTop"], marginArr)) {
            dimensions['margin'] = dimensions["marginTop"];
        }

        //totalWidth/totalHeight = element width/height + padding + border + margin
        totalWidth = Spektral.stringToNum(marginLeft) +
            Spektral.stringToNum(borderLeft) +
            Spektral.stringToNum(paddingLeft) +
            Spektral.stringToNum(width) +
            Spektral.stringToNum(paddingRight) +
            Spektral.stringToNum(borderRight) +
            Spektral.stringToNum(marginRight);

        totalHeight = Spektral.stringToNum(marginTop) +
            Spektral.stringToNum(borderTop) +
            Spektral.stringToNum(paddingTop) +
            Spektral.stringToNum(height) +
            Spektral.stringToNum(paddingBottom) +
            Spektral.stringToNum(borderBottom) +
            Spektral.stringToNum(marginBottom);

        dimensions["totalWidth"] = totalWidth;
        dimensions["totalHeight"] = totalHeight;

        return dimensions;
    };

    //UTILS - ALL ARE EQUAL TO
    Spektral.allAreEqualTo = function(val, arr) {
        var i, areEqual = true;
        for (i = 0; i < arr.length; i += 1) {
            if(arr[i] !== val) {
                areEqual = false;
            }
        }
        return areEqual;
    };

    //UTILS - ALL ARE SAME
    Spektral.allAreSame = function(arr){
        var sample = arr[0], areSame = true, i;

        for (i = 0; i < arr.length; i+=1) {
           if (sample !== arr[i]) {
               areSame = false;
           }
        }
        return areSame;
    };

    //UTILS - CREATE TIMER
    Spektral.createTimer = function (time, handler) {
        var convertedTime = time * 1000;
        return setInterval(handler, convertedTime);
    };

    //UTILS - STOP TIMER
    Spektral.stopTimer = function (timer) {
        clearInterval(timer);
    };

    //UTILS - CREATE TIME OUT
    Spektral.createTimeOut = function (time, handler) {
        var convertedTime = time * 1000;
        setTimeout(handler, convertedTime);
    };

    //UTILS - STOP TIME OUT
    Spektral.stopTimeOut = function (timeout) {
        clearTimeout(timeout);
    };

    //UTILS - GET SYSTEM INFO
    Spektral.getSystemInfo = function() {
        var
            nav = window.navigator,
            info = {}, possibleBrowsers,
            ua = nav.userAgent, browser, browserMatch, i;
        possibleBrowsers = ["MSIE", "Firefox", "Chrome", "Safari", "Opera"];
        for(i = 0; i < possibleBrowsers.length; i += 1) {
            browserMatch = Spektral.hasPattern(ua, possibleBrowsers[i]);
            if(browserMatch === true) {
                browser = possibleBrowsers[i];
                if(browser === "MSIE") {
                    browser = "IE";
                }
                break;
            }
        }
        info["navigator"] = nav;
        info["appName"] = nav.appName;
        info["userAgent"] = ua;
        info["browser"] = browser;
        Spektral.log("getSystemInfo: nav: ", "dir", nav);
        return info;
    };