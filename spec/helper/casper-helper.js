//MOUSE
var mouse = require("mouse").create(casper);

//EVENTS
casper.on('remote.message', function(msg) {
    this.echo('Remote message: ' + msg);
});

casper.on('remote.alert', function(msg) {
    this.echo('Remote alert: ' + msg);
});

casper.on('resource.received', function(resource) {
    var status = resource.status;
    if(status >= 400) {
        casper.log('Resource ' + resource.url + ' failed to load (' + status + ')', 'error');

        resourceErrors.push({
            url: resource.url,
            status: resource.status
        });
    }

});

//HELPER METHODS
casper.header = function(msg, type){
    type = type || 'INFO'
    this.echo(msg, type);
    this.echo(' ');
};

casper.methodHeader = function(msg){
    this.echo(' ');
    this.echo(msg, 'GREEN_BAR')
};


casper.getVar = function(variable) {
    return this.evaluate(function(v){
        return window[v];
    }, variable);
};

casper.getInfo = function(obj) {
    return this.evaluate(function(o){
        return JSON.stringify(o);
    }, obj);
};

casper.getType = function(obj){
    var type;
    if(obj.nodeName !== undefined) {
        //element
        type = (obj.nodeName);
    } else {
        //everything else
        type = ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1]
    }
    return type.toLowerCase();
};