
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
        } else { evt.returnValue = false; }
    };