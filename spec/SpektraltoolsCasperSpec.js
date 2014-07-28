casper.test.begin('SPEKTRALTOOLS test', 0, function suite(test) {

    casper.start('CasperTest.html', function() {
        this.echo(this.getTitle(), 'GREEN_BAR');
    });

    casper.then(function(){
        this.waitForResource('build/spektraltools.js', function() {
            this.echo('spektraltools loaded', 'GREEN_BAR');
        });
    });

    casper.then(function(){
        this.methodHeader('EVENT - attachEventListener');
        this.evaluate(function(){
            var tb = document.querySelector('#aelButton');
            Spektral.attachEventListener(tb, 'click', onTestButtonClick);

            function onTestButtonClick (evt){
                eventTest.testTarget = Spektral.getTarget(evt);
                eventTest.testTargetID = Spektral.getTargetID(evt);
                eventTest.testButtonClicked = true;
            }
        });
    });

    casper.then(function(){
        this.click('#aelButton');
        this.test.assert(this.getVar('eventTest').testButtonClicked, 'test button was clicked');
        this.methodHeader('EVENT - getTarget');
        this.test.assertType(this.getVar('eventTest').testTarget, 'object', 'target was returned.');
        this.methodHeader('EVENT - getTargetID');
        this.test.assertEqual(this.getVar('eventTest').testTargetID, 'aelButton', 'targetID matches.');
    });

    casper.then(function(){
        this.evaluate(function(){
            var tb = document.querySelector('#delButton');
            Spektral.attachEventListener(tb, 'click', onTestButtonClick);
            Spektral.detachEventListener(tb, 'click', onTestButtonClick);

            function onTestButtonClick(evt) {
                eventTest.eventDetached = false;
            }
        });
        this.click('#delButton');
        this.methodHeader('EVENT - detachEventListener');
        this.test.assert(this.getVar('eventTest').eventDetached, 'event was detached.');
    });

    casper.then(function(){

        this.evaluate(function(){
            var
                tb = document.querySelector('#ceButton'),
                testEvent = Spektral.createEvent('testEvent', { detail: {foo: 'bar', spektral: 'tools'} });

            Spektral.attachEventListener(tb, 'testEvent', onTestEvent);

            function onTestEvent(evt) {
                customEventTest.eventExists = true;
                customEventTest.fooIs = evt.detail.foo;
                customEventTest.spektralIs = evt.detail.spektral;
            }

            Spektral.triggerEvent(tb, testEvent);
        });

        this.methodHeader('EVENT - createEvent');
        this.test.assert(this.getVar('customEventTest').eventExists, 'custom event was created and triggered.');
        this.test.assertEqual(this.getVar('customEventTest').fooIs, 'bar', 'foo equals bar in detail object.');
        this.test.assertEqual(this.getVar('customEventTest').spektralIs, 'tools', 'spektral equals tools in detail object.')
    });

    casper.then(function(){
        this.evaluate(function(){
            var testDiv = document.querySelector('#teDiv');

            testDiv.addEventListener('click', onTestClick);

            function onTestClick(evt){
                triggerEventTest.eventTriggered = true;
            }

            Spektral.triggerEvent(testDiv, 'click');
        });

        this.methodHeader('EVENT - triggerEvent');
        this.test.assert(this.getVar('triggerEventTest').eventTriggered, 'event was triggered.');
    });

    casper.run(function() {
        this.echo(' ');
        test.done();
    });
});