/**
* spektraltools - v0.0.1
*
* Build Created: 2014-07-13
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

    //Debug
    Spektral.debug = function() {
        debug = true;
    }

    //DOM - ADD ELEMENT
    Spektral.addElement = function(parent, type, attrs) {
        var newElement = document.createElement(type), key;
        for (key in attrs) {
            if (key === 'className') {
                newElement.class = attrs[key];
            } else if (key === 'innerHTML') {
                newElement.innerHTML = attrs[key];
            } else {
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
        if(targetType === "string") {
            eventTarget = Spektral.getElement(eventTarget);
        }
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
    Spektral.createEvent = function (eventName, detail, bub, can) {
        detail = detail || null;
        bub = bub || true;
        can = can || true;

        var evt = new CustomEvent(eventName, { detail: detail, bubbles: bub, cancelable: can });
        if(evt === undefined) {
            Spektral.log("createEvent: CustomEvent not available. Using Event instead.")
            evt = new Event(eventName);
        }
        return evt;
    };

    //String - hasPattern
    Spektral.hasPattern = function (request, pattern) {
        var
            regEx = new RegExp(pattern, "g"),
            matches = request.match(regEx),
            hasMatch = false, matchAmount = 0,
            matchObj = {};
        if (matches !== null) {

            hasMatch = true;
            matchAmount = matches.length;
        }
        matchObj['match'] = hasMatch;
        matchObj['amount'] = matchAmount;
        matchObj['array'] = matches;
        return matchObj;
    };

    //String - stripString
    Spektral.stripString = function (request, character, mode) {
        mode = mode || "all";
        var
            first = new RegExp(character, ""),
            all = new RegExp(character, "g"),
            newString = "", characterFound = 0, letter, i;
        if(mode === "all") {
            newString = request.replace(all, "");
        } else if (mode === "first") {
            newString = request.replace(first, "");
        } else {
            //Target index
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

    //DEBUG - LOG
    Spektral.log = function(msg, type) {
        if (type === 'warn') {
            console.warn(msg)
        } else if (type === 'error') {
            console.error(msg);
        } else if (type === 'dir') {
            console.dir(msg);
        } else {
            console.log(msg)
        }
    }

    //DEBUG - LOG GROUP
    Spektral.logGroup = function(groupName, obj) {
        //Will log a custom group
    }

	window.Spektral = Spektral;

}(window));