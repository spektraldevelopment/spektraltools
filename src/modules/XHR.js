
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
    Spektral.loadFile = function (file, callback, async) {
        async = async || true;
        var ext = Spektral.getExtension(file), xhr = Spektral.getXHR();
        if (ext === "json") {
            xhr.overrideMimeType("application/json");
        }
        function checkIfReady() {
            if (xhr.readyState < 4) {
                return;
            }
            if (xhr.status !== 200) {
                return;
            }
            if (xhr.readyState === 4) {
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
            Spektral.log("loadFile: loadError: There was a load error: " + e, "warn");
        }
        Spektral.attachEventListener(xhr, 'readystatechange', checkIfReady);
        Spektral.attachEventListener(xhr, 'error', onLoadError);
        xhr.open("GET", file, async);
        xhr.send();
    };
