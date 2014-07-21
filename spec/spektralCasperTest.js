casper.start('http://localhost/spektraltools/CasperTest.html', function() {
    this.echo(this.getTitle());
//    this.echo(this.getHTML());
});

casper.then(function(){
    this.waitForResource('build/spektraltools.js', function() {
        this.echo('spektraltools loaded');
    });
});

casper.then(function(){
    this.evaluate(function(){
        var mainContent = document.querySelector('#mainContent');
        Spektral.addElement(mainContent, 'div', { id: 'newDiv' });
    });
});

casper.then(function(){
    this.echo(this.getHTML());
    this.test.assertExists('#newDiv');
});

casper.run();