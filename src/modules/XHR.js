
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
    Spektral.xmlToJSON = function (xml, options) {
        var
            node = Spektral.getParameter(options, 'node', xml.firstChild.nodeName),
            index = Spektral.getParameter(options, 'index', 0),
            parentNode = xml.getElementsByTagName(node)[index],
            child, type, xmlObject = {}, rootArray = [], rootObj;
        for (child = parentNode.firstChild; child !== null; child = child.nextSibling) {
            type = Spektral.getType(child);
            //console.log('TYPE IS: ' + type);
            if (type !== '#text') {
                if (child.childNodes.length === 1) {
                    //If node is a immediate child of xml.firstChild

                    //NOTE: make sure this can handle multiple attributes

                    rootObj = {};
                    rootArray.push(Spektral.createNodeObject(child));
                    rootObj[child.tagName] = rootArray;
                    xmlObject['root'] = rootObj;
                } else {
                    xmlObject[child.tagName] = Spektral.createArray(child.childNodes);
                }
            }
        }
        return xmlObject;
    };

    Spektral.createNodeObject = function(node) {
        var nodeObj = {}, attributes, attrLength, i;
        nodeObj['inner'] = Spektral.getInnerText(node.childNodes[0]);
        attributes = node.attributes;
        attrLength = attributes.length;
        if (attrLength >= 1) {
            for (i = 0; i < attributes.length; i += 1) {
                nodeObj[attributes.item(i).name] = attributes.item(i).value;
            }
        }
        return nodeObj;
    };

    //XHR - CREATE ARRAY
    Spektral.createArray = function (list) {
        var
            child, type, listArray = [],
            listObject, attributes, attrLength,
            hasChildren, length, i, j;

        for (i = 0; i < list.length; i++) {
            child = list[i];
            type = Spektral.getType(child);
            if (type !== "#text") {
                hasChildren = child.hasChildNodes();
                length = child.childNodes.length;
                //Element
                listObject = {};
                attributes = child.attributes;
                attrLength = attributes.length;
                if (attrLength >= 1) {
                    for (j = 0; j < attributes.length; j += 1) {
                        listObject[attributes.item(j).name] = attributes.item(j).value;
                    }
                }
                listObject[child.tagName] = Spektral.getInnerText(child);
                if (hasChildren && length > 1) {
                    listObject[child.tagName] = Spektral.createArray(child.childNodes);
                }
                listArray.push(listObject);
            }
        }
        return listArray;
    };