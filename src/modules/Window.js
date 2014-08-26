
    //WINDOW - getURLPath
    Spektral.getURLPath = function () {
        var
            protocol = location.protocol, hostName = location.hostname,
            pathName = location.pathname, pathArray = Spektral.splitString(pathName, { character: "/" }),
            queryString = location.search, hashTag = location.hash,
            fullPath = "", fullURL, urlObj = {}, i;

        for(i = 0; i < pathArray.length; i += 1) {
            fullPath += "/" + pathArray[i];
        }

        fullURL = protocol + "//" + hostName + fullPath + queryString + hashTag;

        urlObj["protocol"] = Spektral.stripString(protocol, { character: ":" });
        urlObj["host"] = hostName;
        urlObj["path"] = fullPath;
        urlObj["pathArray"] = pathArray;
        urlObj["fileType"] = fullPath.split(".").pop();
        urlObj["queryString"] = queryString;
        urlObj["hash"] = hashTag;
        urlObj["fullURL"] = fullURL;

        return urlObj;
    };


    //WINDOW - getQueryString
    Spektral.getQueryString = function () {
        var
            queryParams = {},
            query = location.search,
            queryString, valArray, i, value;
        if(query === "") {
            Spektral.log("getQueryString: No query string was found.", "warn");
        } else {
            queryString = query.split("?").pop();
            valArray = Spektral.splitString(queryString, { character: "&" });
            for (i = 0; i < valArray.length; i += 1) {
                value = Spektral.splitString(valArray[i], { character: "=" });
                queryParams[value[0]] = value[1];
            }
        }
        return queryParams;
    };

    //WINDOW - setQueryString
    Spektral.setQueryString = function(obj, options) {
        var
            append = Spektral.getParameter(options, 'append', false),
            queryString = '', currentURL = Spektral.getURLPath(),
            newQueryObj, i, j;
        if (append === false) {
            for (i in obj) {
                queryString += i + "=" + obj[i] + "&";
            }
        } else {
            newQueryObj = Spektral.getQueryString();
            for (i in obj) {
                newQueryObj[i] = obj[i];
            }
            for (j in newQueryObj) {
                queryString += j + "=" + newQueryObj[j] + "&";
            }
        }
        queryString = "?" + queryString.substr(0, queryString.length - 1);
        window.location.href = currentURL.protocol + "://" + currentURL.host + currentURL.path + queryString + currentURL.hash;
        return queryString;
    };

    //WINDOW - getHash
    Spektral.getHash = function() {
        var hashtag = window.location.hash;
        if(hashtag === "") {
            Spektral.log("getHash. No hash found!", "warn");
        }
        return hashtag;
    };

    //WINDOW - setHash
    Spektral.setHash = function(hashtag) {
        window.location.hash = hashtag;
    };

    //WINDOW - navigateToUrl
    Spektral.navigateToURL = function (url, options) {
        //Still have to test this, also I might allow for multiple window names:
        //ex. _self, _parent etc.
        var
            newWindow = Spektral.getParameter(options, 'newWindow', false),
            focusOnNew = Spektral.getParameter(options, 'focusOnNew', false);
        if(newWindow === false) {
            try {
                window.location = url;
            } catch (e) {
                window.location.href = url;
            }
        } else {
            if(focusOnNew === false) {
                window.open(url, "_blank");
            } else {
                window.open(url, "_blank");
                window.focus();
            }
        }
    };
