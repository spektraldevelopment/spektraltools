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