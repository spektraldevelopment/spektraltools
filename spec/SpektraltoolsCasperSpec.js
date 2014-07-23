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
            var tb = document.querySelector('#aelButton');
            Spektral.attachEventListener(tb, 'click', onTestButtonClick);

            function onTestButtonClick (evt){
                eventTestObject.testTarget = Spektral.getTarget(evt);
                eventTestObject.testTargetID = Spektral.getTargetID(evt);
                eventTestObject.testButtonClicked = true;
            }
        });
    });

    casper.then(function(){
        this.click('#aelButton');
        this.test.assert(this.getVar('eventTestObject').testButtonClicked, 'Test button was clicked');

        this.methodHeader('EVENT - getTarget');

        this.test.assertType(this.getVar('eventTestObject').testTarget, 'object', 'target was returned.');

        this.methodHeader('EVENT - getTargetID');

        this.test.assertEqual(this.getVar('eventTestObject').testTargetID, 'aelButton', 'targetID matches.');
    });

    casper.then(function(){
        this.evaluate(function(){
            var tb = document.querySelector('#delButton');
            Spektral.attachEventListener(tb, 'click', onTestButtonClick);
            Spektral.detachEventListener(tb, 'click', onTestButtonClick);

            function onTestButtonClick(evt) {
                eventTestObject.eventDetached = false;
            }
        });

        this.click('#delButton');
        this.methodHeader('EVENT - detachEventListener');
        this.echo(this.getVar('eventTestObject').eventDetached);
        this.test.assert(this.getVar('eventTestObject').eventDetached, 'Event was detached.');
    });

    casper.run(function() {
        this.echo(' ');
        test.done();
    });
});