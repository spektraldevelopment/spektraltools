//MOUSE
var
    mouse = require("mouse").create(casper),
    colorizer = require('colorizer').create('Colorizer');

//Available color names are black, red, green, yellow, blue, magenta, cyan and white

//EVENTS
casper.on('remote.message', function(msg) {
    this.echoRemote(msg);
});

casper.on('remote.alert', function(msg) {
    this.echo('Remote alert: ' + msg, 'ERROR');
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

casper.echoObject = function(obj){
    var objString = 'Object: ' + this.getInfo(this.getVar(obj));
    this.colourEcho(objString, 'white', 'black', false);
};

casper.echoRemote = function(msg) {
    var remoteString = 'Remote: ' + msg;
    this.colourEcho(remoteString, 'blue', 'cyan');
};

casper.colourEcho = function(obj, bgColour, fgColour, bold){
    bold = bold || true;
    this.echo(colorizer.format(obj, {
        bg:   bgColour,
        fg:   fgColour,
        bold: bold
    }));
};

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

casper.getElementStyle = function(id, prop) {
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

casper.hasStyleProp = function(id, prop) {
    return this.evaluate(function(i, p){
        var 
            hasStyle = false,
            el = document.querySelector(i),
            style = document.defaultView.getComputedStyle(el, null).getPropertyValue(p);

        if(style !== '' && style !== null) {
            hasStyle = true;
        }
        
        return hasStyle;
    }, id, prop);
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

casper.getHostURL = function(){
    return utils.decodeUrl(this.evaluate(function _evaluate() {
        var docLoc = document.location;
        return docLoc.protocol + "//" + docLoc.host + docLoc.pathname;
    }));
};