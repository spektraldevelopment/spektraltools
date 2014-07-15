
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