
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

    //XHR - XML TO JSON
    Spektral.xmlToJSON = function(xml){
        var 
            root = xml.getElementsByTagName(xml.firstChild.nodeName)[0],
            type, i, j, group, jsonObject = {}, nodeArray = [];
        for (i = 0; i < root.childNodes.length; i += 1) {
            if (Spektral.isElement(root.childNodes[i]) === true) {
                group = xml.getElementsByTagName(root.childNodes[i].nodeName);
                if (group.length === 1) {
                    //Only one instance of element
                    jsonObject[group[0].nodeName] = Spektral.createNodeObject(group[0]);
                } else {
                    //Multiple instances of element
                    nodeArray.push(Spektral.createNodeObject(group[0]));
                    jsonObject[group[0].nodeName] = nodeArray;
                }
            } 
        }
        return jsonObject;
    };

    Spektral.createNodeObject = function(node) {
        var nodeObj = {}, hasChildren, i, j, group, nodeArray = [];
        if (node.attributes.length > 0) {
            for (j = 0; j < node.attributes.length; j += 1) {
                nodeObj[node.attributes[j].name] = node.attributes[j].value;
            }
        }    
        if (node.childNodes.length === 1) {
            nodeObj['content'] = Spektral.getInnerText(node);
        } else {

            for (i = 0; i < node.childNodes.length; i += 1) {
                if (Spektral.isElement(node.childNodes[i]) === true) {
                    group = node.getElementsByTagName(node.childNodes[i].nodeName);
                    if (group.length === 1) {
                        nodeObj[group[0].nodeName] = Spektral.createNodeObject(group[0]);
                    } else {
                        nodeArray.push(Spektral.createNodeObject(node.childNodes[i]));
                        nodeObj[group[0].nodeName] = nodeArray;
                    }
                }
            }
        }
        return nodeObj;
    };