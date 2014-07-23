casper.test.begin('SPEKTRALTOOLS test', 0, function suite(test) {
    casper.start('CasperTest.html', function() {
        this.echo(this.getTitle(), 'GREEN_BAR');
    });

    casper.then(function(){
        this.waitForResource('build/spektraltools.js', function() {
            this.header('spektraltools loaded');
        });
    });

    casper.then(function(){

        this.methodHeader('EVENT - attachEventListener');
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
        this.test.assert(this.getVar('eventTestObject').testButtonClicked, 'Test button was clicked');

        this.methodHeader('EVENT - getTarget');

        this.test.assertType(this.getVar('eventTestObject').testTarget, 'object', 'target was returned.');

        this.methodHeader('EVENT - getTargetID');

        this.test.assertEqual(this.getVar('eventTestObject').testTargetID, 'testButton', 'targetID matches.');
    });

    casper.run(function() {
        this.echo(' ');
        test.done();
    });
});