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
        this.evaluate(function(){
            queryIDTest = Spektral.query('#idTest');
        });

        this.methodHeader('GLOBAL - query');

        this.test.assertEqual(this.getType(this.getVar('queryIDTest')), 'div', 'query returned element by Id.');
        this.test.assertEqual(this.getVar('queryIDTest').id, 'idTest', 'element id is correct.');
    });

    casper.then(function(){
        this.evaluate(function(){
            queryClassTest = Spektral.query('.classTest');
        });
        this.test.assertEqual(this.getType(this.getVar('queryClassTest')), 'div', 'query returned element by class.');
        this.test.assertEqual(this.getVar('queryClassTest').className, 'classTest', 'element class name is correct.')
    });

//Will come back to this, apparently evaluate() does not work for
//    casper.then(function(){
//        this.evaluate(function(){
//            queryMultiTest = Spektral.query('.multiTest');
//        });
//
//        this.test.assertEqual(this.getVar('queryMultiTest').length, 2, 'query returned two elements.');
//
//        this.test.assertEqual(this.getType(this.getVar('queryMultiTest')[0]), 'div', 'the first element is a div.');
//        this.test.assertEqual(this.getVar('queryMultiTest')[0].className, 'multiTest', 'the first element class name is correct.');
//
//        //this.test.assertEqual(this.getType(this.getVar('queryMultiTest')[1]), 'div', 'the second element is a div.');
//        //this.test.assertEqual(this.getVar('queryMultiTest')[1].className, 'multiTest', 'the first element class name is correct.');
//    });

    casper.then(function(){
        this.evaluate(function(){
            var tb = document.querySelector('#aelButton');
            Spektral.attachEventListener(tb, 'click', onTestButtonClick);

            function onTestButtonClick (evt){
                eventTest.testTarget = Spektral.getTarget(evt);
                eventTest.testTargetID = Spektral.getTargetID(evt);
                eventTest.testButtonClicked = true;
            }
        });

        this.click('#aelButton');

        this.methodHeader('EVENT - attachEventListener');
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

    casper.then(function(){
        this.evaluate(function(){
            var testDiv = document.querySelector('#ceDiv');
            testDiv.addEventListener('click', onTestClick);

            function onTestClick(evt) {
                cancelEventTest.eventCanceled = false;
                Spektral.cancelEvent(evt);
            }

            testDiv.dispatchEvent('click');
        });

        this.methodHeader('EVENT - cancelEvent');
        this.test.assert(this.getVar('cancelEventTest').eventCanceled, 'event was cancelled.')
    });

    casper.then(function(){
        this.evaluate(function(){
            var
                parent = document.querySelector('#mainContent'),
                testDiv = document.querySelector('#cpDiv'),
                custEvent = Spektral.createEvent('testEvent');

            parent.addEventListener('testEvent', onTestEvent);
            testDiv.addEventListener('testEvent', onTestEvent);

            function onTestEvent(evt) {
                cancelPropTest.callCount += 1;
                Spektral.cancelPropagation(evt);
            }

            testDiv.dispatchEvent(custEvent);
        });

        this.methodHeader('EVENT - cancelPropagation');
        this.test.assertEqual(this.getVar('cancelPropTest').callCount, 1, 'event was only called once.');
    });

    casper.then(function(){
        this.methodHeader('UTILS - getKey');
        this.echo('Alpha Numeric', 'INFO');
        this.evaluate(function(){
            try {
                var testInput = document.querySelector('#alphaNumericInput');

                testInput.onkeydown = function(evt){
                    var keyEntry = {};
                    keyEntry['returnedCode'] = evt.keyCode;
                    keyEntry['returnedKey'] = Spektral.getKey(evt);
                    alphaNumericMapTest.push(keyEntry);
                }
            } catch(err) {
                logToConsole('onkeydown error!');
            }
        });

        //Note: only works for keydown and keyup, not keypress
        var
            alphaNumericArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], i;

        for (i = 0; i < alphaNumericArray.length; i += 1){
            this.sendKeys('#alphaNumericInput', alphaNumericArray[i]);
            var kMap = this.getVar('alphaNumericMapTest');
            kMap[i]['testKey'] = alphaNumericArray[i];
            this.test.assertEqual(kMap[i].returnedKey, alphaNumericArray[i], alphaNumericArray[i] + ' returned key was correct.');
        }
    });

    casper.then(function(){
        this.echo('Characters', 'INFO');
        this.evaluate(function(){
            try {
                var testInput = document.querySelector('#characterInput');

                testInput.onkeydown = function(evt){
                    var keyEntry = {};
                    keyEntry['returnedCode'] = evt.keyCode;
                    keyEntry['returnedKey'] = Spektral.getKey(evt);
                    characterMapTest.push(keyEntry);
                }
            } catch(err) {
                logToConsole('onkeydown error!');
            }
        });

        var characterArray = [
            ['`', 'BACK_TICK'],
            ['[', 'OPEN_SQUARE_BRACKET'],
            [']', 'CLOSE_SQUARE_BRACKET'],
            ['\\', 'BACK_SLASH'],
            [';', 'SEMI_COLON'],
            ['\'', 'SINGLE_QUOTE'],
            [',', 'COMMA'],
            ['.', 'PERIOD'],
            ['/', 'FORWARD_SLASH']
        ], i;

        for (i = 0; i < characterArray.length; i += 1){
            this.sendKeys('#characterInput', characterArray[i][0]);
            var kMap = this.getVar('characterMapTest');
            kMap[i]['testKey'] = characterArray[i][0];
            this.test.assertEqual(kMap[i].returnedKey, characterArray[i][1], characterArray[i][1] + ' returned key was correct.');
        }
    });

    casper.then(function(){
        this.echo('Characters + Shift', 'INFO');
        this.evaluate(function(){
            try {
                var testInput = document.querySelector('#characterShiftInput');

                testInput.onkeydown = function(evt){
                    var keyEntry = {};
                    keyEntry['returnedCode'] = evt.keyCode;
                    keyEntry['returnedKey'] = Spektral.getKey(evt);
                    characterShiftMapTest.push(keyEntry);
                }
            } catch(err) {
                logToConsole('onkeydown error!');
            }
        });

        var characterShiftArray = [
            ['`', 'TILDA'],
            ['1', 'EXCLAMATION_POINT'],
            ['2', 'AT_SIGN'],
            ['3', 'HASHTAG'],
            ['4', 'DOLLAR_SIGN'],
            ['5', 'PERCENT'],
            ['6', 'CARET'],
            ['7', 'AMPERSAND'],
            ['8', 'ASTERISK'],
            ['9', 'OPEN_BRACKET'],
            ['0', 'CLOSE_BRACKET'],
            ['-', 'UNDERSCORE'],
            ['=', 'PLUS_SIGN'],
            ['[', 'OPEN_CURLY_BRACKET'],
            [']', 'CLOSE_CURLY_BRACKET'],
            ['\\', 'VERTICAL_BAR'],
            [';', 'COLON'],
            ['\'', 'QUOTATION_MARK'],
            [',', 'LESS_THAN_SIGN'],
            ['.', 'GREATER_THAN_SIGN'],
            ['/', 'QUESTION_MARK']
        ], i;

        for (i = 0; i < characterShiftArray.length; i += 1) {
            this.sendKeys('#characterShiftInput', characterShiftArray[i][0], { modifiers: 'shift'});
            var kMap = this.getVar('characterShiftMapTest');
            kMap[i]['testKey'] = characterShiftArray[i][0];
            this.test.assertEqual(kMap[i].returnedKey, characterShiftArray[i][1], characterShiftArray[i][1] + ' returned key was correct.');
        }
    });

    casper.then(function(){
        this.echo('Command + Modifiers', 'INFO');
        this.evaluate(function(){
            try {
                var testInput = document.querySelector('#commandInput');

                testInput.onkeydown = function(evt){
                    var keyEntry = {};
                    keyEntry['returnedCode'] = evt.keyCode;
                    keyEntry['returnedKey'] = Spektral.getKey(evt);
                    commandMapTest.push(keyEntry);
                }
            } catch(err) {
                logToConsole('onkeydown error!');
            }
        });

        var commandArray = [
            [casper.page.event.key.Escape, 'ESCAPE'],
            [casper.page.event.key.F1, 'F1'],
            [casper.page.event.key.F2, 'F2'],
            [casper.page.event.key.F3, 'F3'],
            [casper.page.event.key.F4, 'F4'],
            [casper.page.event.key.F5, 'F5'],
            [casper.page.event.key.F6, 'F6'],
            [casper.page.event.key.F7, 'F7'],
            [casper.page.event.key.F8, 'F8'],
            [casper.page.event.key.F9, 'F9'],
            [casper.page.event.key.F10, 'F10'],
            [casper.page.event.key.F11, 'F11'],
            [casper.page.event.key.F12, 'F12'],
            [casper.page.event.key.Delete, 'DELETE'],
            [casper.page.event.key.Tab, 'TAB'],
            [casper.page.event.key.CapsLock, 'CAPS_LOCK'],
            [casper.page.event.key.Enter, 'ENTER'],
            [casper.page.event.key.Shift, 'SHIFT'],
            [casper.page.event.key.Control, 'CTRL'],
            [casper.page.event.key.Alt, 'ALT'],
            [casper.page.event.key.Up, 'UP'],
            [casper.page.event.key.Left, 'LEFT'],
            [casper.page.event.key.Down, 'DOWN'],
            [casper.page.event.key.Right, 'RIGHT'],
        ], i;

        for (i = 0; i < commandArray.length; i += 1) {
            this.sendKeys('#commandInput', commandArray[i][0], { keepFocus: true });
            var kMap = this.getVar('commandMapTest');
            kMap[i]['testKey'] = commandArray[i][0];
            this.test.assertEqual(kMap[i].returnedKey, commandArray[i][1], commandArray[i][1] + ' returned key was correct.');
        }
    });

    casper.then(function(){
        this.methodHeader('UTILS - getMousePos');
        this.evaluate(function(){
            try {
                var mouseTestArea = document.querySelector('#mouseTestArea'), mousePos;
                mouseTestArea.onmousemove = function(evt){
                    mousePos = Spektral.getMousePos(evt);
                    mousePosTest.push(mousePos);
                };
            } catch (err) {
                logToConsole('getMousePos Error');
            }
        });
    });

    casper.then(function(){
        this.echo('Mouse: x:100 y:50', 'INFO');
        this.mouse.move(100, 50);
        //this.echo('Mouse Test Area Bounds: ' + this.getInfo(this.getElementBounds('#mouseTestArea')));
    });

    casper.then(function(){
        this.wait(1000, function(){

            //Mouse Test Area: top: 25px, left: 10px
            var leftPos = 10, topPos = 25, xPos = 90, yPos = 25;
            this.echo('New Mouse Pos 0: ' + this.getInfo(this.getVar('mousePosTest')[0]));

            this.test.assertEqual(this.getVar('mousePosTest')[0].innerX, xPos, ' innerX was correct.');
            this.test.assertEqual(this.getVar('mousePosTest')[0].innerY, yPos, ' innerY was correct.');
            this.test.assertEqual(this.getVar('mousePosTest')[0].offsetX, 0, ' offsetX was correct.');
            this.test.assertEqual(this.getVar('mousePosTest')[0].offsetY, 0, ' offsetY was correct.');
            this.test.assertEqual(this.getVar('mousePosTest')[0].pageX, xPos + leftPos, ' pageX was correct.');
            this.test.assertEqual(this.getVar('mousePosTest')[0].pageY, yPos + topPos, ' pageY was correct.');
            this.test.assertEqual(this.getVar('mousePosTest')[0].viewportX, xPos + leftPos, ' viewportX was correct.');
            this.test.assertEqual(this.getVar('mousePosTest')[0].viewportY, yPos + topPos, ' viewportY was correct.');

        });
    });

    casper.then(function(){
        this.echo('Mouse: x:150 y:100', 'INFO');
        this.mouse.move(150, 100);
        //this.echo('Mouse Test Area Bounds: ' + this.getInfo(this.getElementBounds('#mouseTestArea')));
    });

    casper.then(function(){
        this.wait(1000, function(){

            //Mouse Test Area: top: 25px, left: 10px
            var leftPos = 10, topPos = 25, xPos = 140, yPos = 75;
            this.echo('New Mouse Pos 0: ' + this.getInfo(this.getVar('mousePosTest')[0]));

            this.test.assertEqual(this.getVar('mousePosTest')[1].innerX, xPos, ' innerX was correct.');
            this.test.assertEqual(this.getVar('mousePosTest')[1].innerY, yPos, ' innerY was correct.');
            this.test.assertEqual(this.getVar('mousePosTest')[1].offsetX, 0, ' offsetX was correct.');
            this.test.assertEqual(this.getVar('mousePosTest')[1].offsetY, 0, ' offsetY was correct.');
            this.test.assertEqual(this.getVar('mousePosTest')[1].pageX, xPos + leftPos, ' pageX was correct.');
            this.test.assertEqual(this.getVar('mousePosTest')[1].pageY, yPos + topPos, ' pageY was correct.');
            this.test.assertEqual(this.getVar('mousePosTest')[1].viewportX, xPos + leftPos, ' viewportX was correct.');
            this.test.assertEqual(this.getVar('mousePosTest')[1].viewportY, yPos + topPos, ' viewportY was correct.');

        });
    });

    casper.then(function(){
        this.methodHeader('UTILS - getViewportSize');
        this.evaluate(function(){
            viewportSizeTest = Spektral.getViewportSize();
        });
        this.test.assertEqual(this.getVar('viewportSizeTest').width, 400, ' returned width was correct.');
        this.test.assertEqual(this.getVar('viewportSizeTest').height, 300, ' returned height was correct.');
    });

    casper.run(function() {
        this.echo(' ');
        test.done();
    });
});