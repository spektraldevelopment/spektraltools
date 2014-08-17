
    //XHR - GET XHR
    Spektral.getXHR = function () {
        var result, versions, i;
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            result = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            versions = ["MSXML2.XmlHttp.5.0",
                "MSXML2.XmlHttp.4.0",
                "MSXML2.XmlHttp.3.0",
                "MSXML2.XmlHttp.2.0",
                "Microsoft.XmlHttp",
                "Microsoft.XMLHTTP"];
            for (i = 0; i < versions.length; i++) {
                try {
                    result = new ActiveXObject(versions[i]);
                    return result;
                } catch (err) {
                    Spektral.log("getXHR: Couldn't find the proper XMLHttp version.", "warn");
                }
            }
        }
        return result;
    };

    //XHR - LOAD FILE
    Spektral.loadFile = function (file, callback, options) {
        var
            async = Spektral.getParameter(options, 'async', true),
            onerror = Spektral.getParameter(options, 'onerror', null),
            ext = Spektral.getExtension(file), xhr = Spektral.getXHR();

        if (ext === "json") {
            xhr.overrideMimeType("application/json");
        }
        function checkIfReady() {
            if (xhr.status === 404) {
                onerror(xhr.status);
                xhr.abort();
            }
            if (xhr.readyState < 4) {
                return;
            }
            if (xhr.status !== 200) {
                return;
            }
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response;
                if (ext === "json") {
                    response = JSON.parse(xhr.responseText);
                } else if (ext === "xml") {
                    response = xhr.responseXML;
                } else {
                    response = xhr.responseText;
                }
                callback(response);
            }
        }
        function onLoadError(e) {
            if ( onerror !== null ) {
                onerror(e);
            }
            Spektral.log("loadFile: loadError: There was a load error: " + e, "warn");
            xhr.abort();
        }
        Spektral.attachEventListener(xhr, 'readystatechange', checkIfReady);
        Spektral.attachEventListener(xhr, 'error', onLoadError);

        xhr.open("GET", file, async);
        xhr.send();
    };

    Spektral.getChildNodes = function (parent) {
        var
            children = parent.childNodes,
            childArr = [], i, isElement;
        for (i = 0; i < children.length; i += 1) {
            isElement = Spektral.isElement(children[i]);
            if(isElement === true) {
                childArr.push(children[i]);
            }
        }
        return childArr;
    }