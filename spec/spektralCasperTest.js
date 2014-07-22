casper.test.begin('SPEKTRALTOOLS test', 3, function suite(test) {
    casper.start('http://localhost/spektraltools/CasperTest.html', function() {
        this.echo(this.getTitle(), 'GREEN_BAR');
    });

    casper.then(function(){
        this.waitForResource('build/spektraltools.js', function() {
            this.echo('spektraltools loaded', 'INFO');
            this.echo(' ');
        });
    });

    casper.then(function(){
        this.echo('EVENT - attachEventListener', 'GREEN_BAR');
        this.evaluate(function(){
            var tb = document.querySelector('#testButton');
            Spektral.attachEventListener(tb, 'click', onTestButtonClick);

            function onTestButtonClick (evt){
                eventTestObject.testTarget = Spektral.getTarget(evt);
                eventTestObject.testTargetID = Spektral.getTargetID(evt);
                eventTestObject.testButtonClicked = true;
            }
        });
    });

    casper.then(function(){
        this.click('#testButton');

        this.test.assert(this.evaluate(function(){
            return eventTestObject.testButtonClicked;
        }), 'Test button was clicked');

        this.echo(' ');
        this.echo('EVENT - getTarget', 'GREEN_BAR');

        this.test.assertType(this.evaluate(function(){
            return eventTestObject.testTarget;
        }), 'object', 'target was returned.');

        this.echo(' ');
        this.echo('EVENT - getTargetID', 'GREEN_BAR');

        this.test.assertEqual(this.evaluate(function(){
           return eventTestObject.testTargetID;
        }), 'testButton', 'targetID matches.');
    });

    casper.run(function() {
        this.echo(' ');
        test.done();
    });
});