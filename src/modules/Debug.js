
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