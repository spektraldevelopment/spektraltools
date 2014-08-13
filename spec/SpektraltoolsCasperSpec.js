casper.test.begin('SPEKTRALTOOLS test', 0, function suite(test) {

    casper.start('CasperTest.html', function() {
        this.viewport(800, 600);
        this.echo(this.getTitle(), 'GREEN_BAR');

        var js = this.evaluate(function() {
            return document;
        });
        //this.echo(js.all[0].outerHTML);
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
            //this.echo('New Mouse Pos 0: ' + this.getInfo(this.getVar('mousePosTest')[0]));

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
            //this.echo('New Mouse Pos 0: ' + this.getInfo(this.getVar('mousePosTest')[0]));

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
        this.test.assertEqual(this.getVar('viewportSizeTest').width, 800, ' returned width was correct.');
        this.test.assertEqual(this.getVar('viewportSizeTest').height, 600, ' returned height was correct.');
    });

    casper.then(function(){
        this.methodHeader('UTILS - getPos');
        this.evaluate(function(){
            var posTestDiv = document.querySelector('#getPosTest');
            positionTest = Spektral.getPosition(posTestDiv);
            //logToConsole('Position: ' + JSON.stringify(positionTest));
        });

        var posObj = this.getVar('positionTest');

        this.capture('captures/getPosTest.jpg');

        this.test.assertEqual(posObj.x , 125, ' x was correct.');
        this.test.assertEqual(posObj.y , 475, ' y was correct.');

        this.test.assertEqual(posObj.top , 475, ' top was correct.');
        this.test.assertEqual(posObj.right , 475, ' right was correct.');
        this.test.assertEqual(posObj.bottom , -75, ' bottom was correct.');
        this.test.assertEqual(posObj.left , 125, ' left was correct.');

        this.test.assertEqual(posObj.boundX , 125, ' boundX was correct.');
        this.test.assertEqual(posObj.boundY , 475, ' boundY was correct.');

        this.test.assertEqual(posObj.boundTop , 475, ' boundTop was correct.');
        this.test.assertEqual(posObj.boundRight , 325, ' boundRight was correct.');
        this.test.assertEqual(posObj.boundBottom , 675, ' boundBottom was correct.');
        this.test.assertEqual(posObj.boundLeft , 125, ' boundLeft was correct.');

        this.test.assertEqual(posObj.docX , 125, ' docX was correct.');
        this.test.assertEqual(posObj.docY , 475, ' docY was correct.');

        this.test.assertEqual(posObj.docTop , 475, ' docTop was correct.');
        this.test.assertEqual(posObj.docRight , 475, ' docRight was correct.');
        this.test.assertEqual(posObj.docBottom , -75, ' docBottom was correct.');
        this.test.assertEqual(posObj.docLeft , 125, ' docLeft was correct.');

    });

    casper.then(function(){
        this.methodHeader('UTILS - getDimensions');
        this.evaluate(function(){
            var getDimTest = document.querySelector('#getDimTest');
            dimensionTest = Spektral.getDimensions(getDimTest);
            //logToConsole('Dimensions: ' + JSON.stringify(dimensionTest));
        });

        var dObj = this.getVar('dimensionTest');

        this.test.assertEqual(dObj.width, 125, ' the returned width was correct.');
        this.test.assertEqual(dObj.height, 90, ' the returned height was correct.');

        this.test.assertEqual(dObj.innerWidth, 155, ' the returned innerWidth was correct.');
        this.test.assertEqual(dObj.innerHeight, 110, ' the returned innerHeight was correct.');

        this.test.assertEqual(dObj.borderWidth, 159, ' the returned borderWidth was correct.');
        this.test.assertEqual(dObj.borderHeight, 114, ' the returned borderHeight was correct.');

        this.test.assertEqual(dObj.totalWidth, 194, ' the returned totalWidth was correct.');
        this.test.assertEqual(dObj.totalHeight, 129, ' the returned totalHeight was correct.');

        this.test.assertEqual(dObj.paddingTop, 5, ' the returned paddingTop was correct.');
        this.test.assertEqual(dObj.paddingRight, 10, ' the returned paddingRight was correct.');
        this.test.assertEqual(dObj.paddingBottom, 15, ' the returned paddingBottom was correct.');
        this.test.assertEqual(dObj.paddingLeft, 20, ' the returned paddingLeft was correct.');

        this.test.assertEqual(dObj.borderTop, 2, ' the returned borderTop was correct.');
        this.test.assertEqual(dObj.borderRight, 2, ' the returned borderRight was correct.');
        this.test.assertEqual(dObj.borderBottom, 2, ' the returned borderBottom was correct.');
        this.test.assertEqual(dObj.borderLeft, 2, ' the returned borderLeft was correct.');

        this.test.assertEqual(dObj.marginTop, 10, ' the returned marginTop was correct.');
        this.test.assertEqual(dObj.marginRight, 20, ' the returned marginRight was correct.');
        this.test.assertEqual(dObj.marginBottom, 5, ' the returned marginBottom was correct.');
        this.test.assertEqual(dObj.marginLeft, 15, ' the returned marginLeft was correct.');
    });

    casper.then(function(){
        this.evaluate(function(){
            var padMarginDiv = document.querySelector('#marginPaddingTest');
            padMarginTest = Spektral.getDimensions(padMarginDiv);
            //logToConsole('Dimensions: ' + JSON.stringify(padMarginTest));
        });
        var pmTest = this.getVar('padMarginTest');

        this.test.assertEqual(pmTest.padding, 6, ' the returned padding was correct.');
        this.test.assertEqual(pmTest.margin, 8, ' the returned margin was correct.');
    });

    casper.then(function(){
        this.methodHeader('UTILS - getDocDimensions');
        this.evaluate(function(){
            docDimTest = Spektral.getDocDimensions();
        });

        this.test.assertEqual(this.getVar('docDimTest').width, 800, ' returned width was correct.');
        this.test.assertEqual(this.getVar('docDimTest').height, 675, ' returned height was correct.');
    });

//    casper.then(function(){
//        this.methodHeader('UTILS - createTimer');
//        this.evaluate(function(){
//            var newTimer = Spektral.createTimer(1, function(){
//               timerTest += 1;
//
//               if (timerTest >= 5){
//                   Spektral.stopTimer(newTimer);
//               }
//            });
//        });
//
//        this.wait(5000, function(){
//            this.test.assertEqual(this.getVar('timerTest'), 5, ' timer was created.');
//        });
//    });
//
//    casper.then(function(){
//        this.methodHeader('UTILS - stopTimer');
//        this.evaluate(function(){
//            var timer = Spektral.createTimer(1, function(){
//               stopTimerTest = false;
//            });
//            Spektral.stopTimer(timer);
//        });
//
//        this.wait(2000, function(){
//            this.test.assert(this.getVar('stopTimerTest'), ' time was stopped.');
//        });
//    });
//
//    casper.then(function(){
//        this.methodHeader('UTILS - createTimeOut');
//        this.evaluate(function(){
//            Spektral.createTimeOut(1, function(){
//                timeoutTest = true;
//            });
//        });
//
//        this.wait(2000, function(){
//            this.test.assert(this.getVar('timeoutTest'), ' timeout was created.');
//        });
//    });
//
//    casper.then(function(){
//        this.methodHeader('UTILS - stopTimeOut');
//        this.evaluate(function(){
//            var timeout = Spektral.createTimeOut(1, function(){
//                stopTimeoutTest = false;
//            });
//            Spektral.stopTimeOut(timeout);
//        });
//        this.test.assert(this.getVar('stopTimeoutTest'), ' timeout was stopped.');
//    });

    casper.then(function(){
        this.methodHeader('STYLE - setStyle');
        this.evaluate(function(){
            var setStyleDiv = document.querySelector('#setStyleDiv');
            Spektral.setStyle(setStyleDiv, { 
                padding: '20px',
                margin: '5px'    
            });
        });

        this.echo('setStyle.', 'INFO');
        this.test.assertEqual(this.getElementStyle('#setStyleDiv', 'padding'), '20px', ' padding was set correctly.');
        this.test.assertEqual(this.getElementStyle('#setStyleDiv', 'margin'), '5px', ' margin was set correctly.');

        //this.echo(this.getHTML('#setStyleDiv', true), 'INFO_BAR');
    });

    casper.then(function(){
        this.echo('setStyle - append.', 'INFO');
        this.evaluate(function(){
            var setStyleDiv = document.querySelector('#setStyleDiv');
            Spektral.setStyle(setStyleDiv, {
                padding: '10px',
                display: 'block'
            }, { append: true });
        });

        this.test.assertEqual(this.getElementStyle('#setStyleDiv', 'padding'), '10px', ' padding was set correctly.');
        this.test.assertEqual(this.getElementStyle('#setStyleDiv', 'margin'), '5px', ' margin was not affected.');
        this.test.assertEqual(this.getElementStyle('#setStyleDiv', 'display'), 'block', ' display was set correctly.');

        //this.echo(this.getHTML('#setStyleDiv', true), 'INFO_BAR');
    });

    casper.then(function(){
        this.echo('setStyle - no append.', 'INFO');
        this.evaluate(function(){
            var setStyleDiv = document.querySelector('#setStyleDiv');
            Spektral.setStyle(setStyleDiv, {
                display: 'inline'
            });
        });

        this.test.assertDoesntExist(this.getElementStyle('#setStyleDiv', 'padding'), ' padding was removed.');
        this.test.assertDoesntExist(this.getElementStyle('#setStyleDiv', 'margin'), ' margin was removed.');
        this.test.assertEqual(this.getElementStyle('#setStyleDiv', 'display'), 'inline', ' display was set correctly.');

        //this.echo(this.getHTML('#setStyleDiv', true), 'INFO_BAR');
    });

    casper.then(function(){
        this.echo('setStyle - single property no semi-colon.', 'INFO');
        this.evaluate(function(){
            var singleStyleDiv = document.querySelector('#singleStyleDiv');
            Spektral.setStyle(singleStyleDiv, {
                margin: '7px'
            }, { append: true });
        });

        //this.echo(this.getHTML('#singleStyleDiv', true), 'INFO_BAR');
        this.test.assertEqual(this.getElementStyle('#singleStyleDiv', 'padding'), '5px', ' padding was set correctly.');
        this.test.assertEqual(this.getElementStyle('#singleStyleDiv', 'margin'), '7px', ' margin was set correctly.');
    });

    casper.then(function(){
        this.echo('setStyle - hyphen property: ex. marginTop -> margin-top.', 'INFO');
        this.evaluate(function(){
            var hyphenStyleDiv = document.querySelector('#hyphenStyleDiv');
                Spektral.setStyle(hyphenStyleDiv, {
                    paddingTop: '7px',
                    margin: '15px'
                }, { append: true });
        });
        //this.echo(this.getHTML('#hyphenStyleDiv', true), 'INFO_BAR');
    });

    casper.then(function(){
        this.methodHeader('STYLE - getInlineStyle');
        this.evaluate(function(){
            var inlineStyleDiv = document.querySelector('#inlineStyleDiv');
            inlineStyleTest = Spektral.getInlineStyle(inlineStyleDiv);
        });

        this.test.assertEqual(this.getVar('inlineStyleTest').display, 'block', ' display was returned.');
        this.test.assertEqual(this.getVar('inlineStyleTest').margin, '10px', ' margin was returned.');
        this.test.assertEqual(this.getVar('inlineStyleTest').padding, '2px', ' padding was returned.');
    });

    casper.run(function() {
        this.echo(' ');
        test.done();
    });
});