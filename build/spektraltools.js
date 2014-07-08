/**
* spektraltools - v0.0.1
*
* Build Created: 2014-07-07
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
    }

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