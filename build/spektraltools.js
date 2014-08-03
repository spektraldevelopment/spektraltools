/**
* spektraltools - v0.0.1
*
* Build Created: 2014-08-03
* Copyright (c) 2013 - 2014 spektraldevelopment.com, David Boyle.
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
* 
* This notice shall be included in all copies or substantial portions of the Software.
**/
(function (window) {
	'use strict';

    var
        Spektral = {},
        debug = false,
        mouseEvents = ["click", "dblclick", "mousedown", "mousemove", "mouseup", "mouseover", "mouseout"];

    //GLOBAL - ping
    Spektral.ping = function(){
       return 'Spektral: Hello!';
    };

    //GLOBAL - debugMode
    Spektral.debugMode = function(){
        return debug;
    };

    //GLOBAL - debug
    Spektral.debug = function() {
        debug = true;
    };

    //GLOBAL - query
    Spektral.query = function(el) {
        var isClass = Spektral.detectCharacter(el, '.'), theElement, i;
        if (isClass === true) {
            theElement = document.querySelectorAll(el);

            if(theElement.length === 1) {
              theElement = theElement[0];
            }
        } else {
            theElement = document.querySelector(el);
        }
        if (theElement === null) {
            Spektral.log('query: element not found.', 'warn');
        }
        return theElement;
    };

    //DOM - ADD ELEMENT
    Spektral.addElement = function(parent, type, attrs) {
        var
            newElement = document.createElement(type),
            key, dataCheck, dataAttr;
        for (key in attrs) {
            dataCheck = Spektral.hasPattern(key, 'data');
            if (key === 'className') {
                newElement.className = attrs[key];
            } else if (key === 'innerHTML') {
                newElement.innerHTML = attrs[key];
            } else if (dataCheck.match === true) {
                dataAttr = Spektral.stripString(key, 'data').toLowerCase();
                newElement.setAttribute('data-' + dataAttr, attrs[key]);
            }
            else {
                newElement.setAttribute(key, attrs[key]);
            }
        }
        parent.appendChild(newElement);
        return newElement;
    };

    //DOM - REMOVE ELEMENT
    Spektral.removeElement = function (element) {
        try {
            element.remove();
        } catch (err) {
            element.parentNode.removeChild(element);
        }
    };

    //DOM - SET ATTRIBUTES
    Spektral.setAttributes = function(element, attrs) {
        var k, dataCheck, dataAttr;
        for (k in attrs) {
            dataCheck = Spektral.hasPattern(k, 'data');
            if (k === 'className') {
                element.setAttribute('class', attrs[k]);
            } else if (dataCheck.match === true) {
                dataAttr = Spektral.stripString(k, 'data').toLowerCase();
                element.setAttribute('data-' + dataAttr, attrs[k]);
            } else {
                element.setAttribute(k, attrs[k]);
            }
        }
    };

    //DOM - GET ATTRIBUTES
    Spektral.getAttributes = function (element) {
        var attributes = element.attributes, attrObj = {}, i;
        if (attributes.length >= 1) {
            for (i = 0; i < attributes.length; i += 1) {
                if (attributes.item(i).nodeName === 'class') {
                    attrObj['className'] = attributes.item(i).value;
                } else {
                    attrObj[attributes.item(i).nodeName] = attributes.item(i).value;
                }
            }
        }
        return attrObj;
    };

    //DOM - DESTROY ATTRIBUTE
    Spektral.destroyAttribute = function (element, attribute) {
        if (element.hasAttribute(attribute)) {
            element.removeAttribute(attribute);
        } else {
            Spektral.log('destroyAttribute: element does not have attribute ' + attribute + ' set.', 'warn');
        }
    };

    //DOM - MOVE TO AFTER
    Spektral.moveToAfter = function (element, targetElement) {
        element.parentNode.insertBefore(element, targetElement.nextSibling);
    };

    //DOM - MOVE TO BEFORE
    Spektral.moveToBefore = function (element, targetElement) {
        element.parentNode.insertBefore(element, targetElement);
    };

    //DOM - CLEAR CHILDREN
    Spektral.clearChildren = function (parent) {
        parent.innerHTML = '';
    };

    //DOM - GET INNER TEXT
    Spektral.getInnerText = function(element) {
        var content = element.textContent;
        if (content === undefined) {
            content = element.innerText;
        }
        return content;
    };

    //DOM - SET INNER TEXT
    Spektral.setInnerText = function (element, textContent, options) {
        var
            currentContent = Spektral.getInnerText(element),
            newContent, append = Spektral.getParameter(options, 'append', false);
        if(append === true) {
            newContent = currentContent + textContent;
            element.innerHTML = newContent;
        } else {
            element.innerHTML = textContent;
        }
    };

    //DOM - IS ELEMENT
    Spektral.isElement = function (possibleElement) {
        var isAnElement = false, type = possibleElement.nodeType;
        if(type === 1) {
            isAnElement = true;
        }
        return isAnElement;
    };

    //EVENT - ATTACH EVENT LISTENER
    Spektral.attachEventListener = function (eventTarget, eventType, eventHandler) {
        if (eventTarget.addEventListener) {
            eventTarget.addEventListener(eventType, eventHandler, false);
        } else if (eventTarget.attachEvent) {
            eventType = "on" + eventType;
            eventTarget.attachEvent(eventType, eventHandler);
        } else {
            eventTarget["on" + eventType] = eventHandler;
        }
    };

    //EVENT - DETACH EVENT LISTENER
    Spektral.detachEventListener = function (eventTarget, eventType, eventHandler) {
        if (eventTarget.removeEventListener) {
            eventTarget.removeEventListener(eventType, eventHandler, false);
        } else if (eventTarget.detachEvent) {
            eventType = "on" + eventType;
            eventTarget.detachEvent(eventType, eventHandler);
        } else {
            eventTarget["on" + eventType] = null;
        }
    };

    //EVENT - CREATE EVENT
    Spektral.createEvent = function (eventName, options) {
        var
            detail = Spektral.getParameter(options, 'detail', null),
            eventBubbles = Spektral.getParameter(options, 'bubbles', true),
            eventCancelable = Spektral.getParameter(options, 'cancelable', true),
            evt = new CustomEvent(eventName, { detail: detail, bubbles: eventBubbles, cancelable: eventCancelable });
        if(evt === undefined) {
            Spektral.log("createEvent: CustomEvent not available. Using Event instead.")
            evt = new Event(eventName);
        }
        return evt;
    };

    //EVENT - TRIGGER EVENT
    Spektral.triggerEvent = function (obj, evt) {
        var newEvent, evtType = Spektral.getType(evt);
        if(evtType === "event" || evtType === "customevent") {
            obj.dispatchEvent(evt);
        } else if (evtType === "string") {
            newEvent = Spektral.createEvent(evt);
            obj.dispatchEvent(newEvent);
        }
    };

    //EVENT - GET TARGET
    Spektral.getTarget = function (evt) {
        return evt.relatedTarget || evt.fromElement || evt.target;
    };

    //EVENT - GET TARGET ID
    Spektral.getTargetID = function (evt) {
        return evt.target.id;
    };

    //EVENT - CANCEL EVENT
    Spektral.cancelEvent = function (evt) {
        if (evt.preventDefault) {
            evt.preventDefault();
        } else {
            evt.returnValue = false;
        }
    };

    //EVENT - CANCEL PROPAGATION
    Spektral.cancelPropagation = function (evt) {
        if (evt.stopPropagation) {
            evt.stopPropagation();
        } else {
            evt.cancelBubble = true;
        }
    };

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

    //STRING - HAS PATTERN
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

    //STRING - STRIP STRING
    Spektral.stripString = function (request, character, options) {
        var
            rex, newString = "", mode = Spektral.getParameter(options, 'mode', 'all'),
            characterFound = 0, letter, i;

        if(mode === "all") {
            rex = new RegExp(character, "g");
            newString = request.replace(rex, "");
        } else if (mode === "first") {
            rex = new RegExp(character, "");
            newString = request.replace(rex, "");
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

    //STRING - SPLIT STRING
    Spektral.splitString = function (request, options) {
        var
            splitArray = [], split, character = Spektral.getParameter(options, 'character', ','),
            i, detectChar, stripped;

        detectChar = Spektral.detectCharacter(request, character)

        if(detectChar === false && character !== " ") {

            log("splitString: Could not split string because character [" + character + "] was not in string.", "warn");
        } else {
            if(character !== " ") {
                split = request.split(character);
            } else {
                split = request.split(/[ ,]+/);
            }
        }

        for (i = 0; i < split.length; i += 1) {
            if(split[i] !== "") {
                stripped = Spektral.stripWhiteSpace(split[i]);
                splitArray.push(stripped);
            }
        }
        return splitArray;
    };

    //STRING - CONVERT TO CAMEL
    Spektral.convertToCamel = function (request, options) {
        var
            character = Spektral.getParameter(options, 'character', '-'),
            splitRequest = Spektral.splitString(request, { character: character }),
            newString, stringToConvert, i;

        newString = splitRequest[0];
        for (i = 0; i < splitRequest.length; i += 1) {
            if (i !== 0) {
                stringToConvert = splitRequest[i].charAt(0).toUpperCase() + splitRequest[i].slice(1);
                newString += stringToConvert;
            }
        }
        return newString;
    };

    //STRING - DETECT CHARACTER
    Spektral.detectCharacter = function (request, character) {
        character = '\\' + character;
        var detected = false, regEx = new RegExp(character, 'g'), test = request.match(regEx);
        if(test !== null) {
            detected = true;
        }
        return detected;
    };

    //STRING - STRIP WHITE SPACE
    Spektral.stripWhiteSpace = function (request, options) {
        var newString, stripAll = Spektral.getParameter(options, 'stripAll', false);
        if(stripAll !== false) {
            newString = request.replace(/\s+/g, '');
        } else {
            newString = request.replace(/(^\s+|\s+$)/g,'');
        }
        return newString;
    };

    //STRING - STRIP BRACKETS
    Spektral.stripBrackets = function (request) {
        var value;
        //[]
        try {
            value = request.match(/\[(.*?)\]/)[1];
        } catch(e){}
        //()
        try {
            value = request.match(/\((.*?)\)/)[1];
        } catch(e){}
        //{}
        try {
            value = request.match(/\{(.*?)\}/)[1];
        } catch(e){}
        return value;
    };

    //STRING - CONVERT CASE
    Spektral.convertCase = function (request, options) {
        var newString, newCase = Spektral.getParameter(options, 'newCase', 'lower');
        if (newCase === "lower") {
            newString = request.toLowerCase();
        } else if (newCase === "upper") {
            newString =  request.toUpperCase();
        } else if (newCase === "first") {
            newString = request.charAt(0).toUpperCase() + request.slice(1);
        }
        return newString;
    };

    //STRING - TRIM STRING
    Spektral.trimString = function (request, start, end) {
        return request.substring(start, end);
    };


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
            targetX = Spektral.getPos(target).elX,
            targetY = Spektral.getPos(target).elY,
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

    //UTILS - GET POS
    Spektral.getPos = function (element) {

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
        pos["elX"] = elLeft;
        pos["elY"] = elTop;

        pos["elTop"] = elTop;
        pos["elRight"] = elRight;
        pos["elBottom"] = elBottom;
        pos["elLeft"] = elLeft;

        //Relative to document
        pos["dX"] = dLeft;
        pos["dY"] = dTop;

        pos["dTop"] = dTop;
        pos["dRight"] = dRight;
        pos["dBottom"] = dBottom;
        pos["dLeft"] = dLeft;

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



    //DEBUG - LOG
    Spektral.log = function(msg, type, obj) {
        if (debug === true) {
            if (type === 'warn') {
                console.warn(msg)
            } else if (type === 'error') {
                console.error(msg);
            } else if (type === 'dir') {
                console.group(msg);
                console.dir(obj);
                console.groupEnd();
            } else {
                console.log(msg)
            }
        }
    }

    //DEBUG - LOG GROUP
    Spektral.logGroup = function(groupName, obj, type) {
        type = type || 'nodes';
        var k;
        if (debug === true) {
            console.group(groupName);
            for (k in obj) {
                console.log(k + ' : ' + obj[k]);
            }
            console.groupEnd();
        }
    }

	window.Spektral = Spektral;

}(window));