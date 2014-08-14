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

casper.echoHTML = function(el) {
    this.echo(this.getHTML(el, true));
}

casper.getVar = function(variable) {
    return this.evaluate(function(v){
        return window[v];
    }, variable);
};

casper.getElement = function(id) {
  return this.evaluate(function(i){
      return document.querySelector(i);
  }, id);
};

casper.getElementStyle = function(id, prop){
    return this.evaluate(function(i, p){
        return document.querySelector(i).style[p];
    }, id, prop);
};

casper.getElementAttr = function(id, attr) {
  return this.evaluate(function(i, a){
      var e = document.querySelector(i);
      return e.getAttribute(a);
  }, id, attr);
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