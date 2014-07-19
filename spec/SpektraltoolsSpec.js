describe('SpektralTools: ', function() {

    initHelper(document);
    Spektral.debug();

    it('Spektraltools is defined.', function() {
       expect(Spektral).toBeDefined();
    });

    describe('DOM - addElement', function() {
        var testContainer = createTestContainer(), createdDiv;

        it('creates an element.', function() {
            createdDiv = Spektral.addElement(testContainer, 'div', { id: 'newDiv', className: 'new-class', style: 'border: 1px solid #cecece', dataTest: 'test' });
            expect(createdDiv).toBeDefined();
        });

        it('created element has id of newDiv.', function() {
            expect(createdDiv.id).toMatch('newDiv');
        });

        it('created element has className of new-style.', function(){
            expect(createdDiv.className).toMatch('new-class');
        });

        it('created element has a style of border: 1px solid #cecece.', function(){
            expect(createdDiv.getAttribute('style')).toMatch('border: 1px solid #cecece');
        });

        it('created element has a data-test attribute with a value of test.', function(){
            expect(createdDiv.dataset.test).toMatch('test');
        });

        it('created element was added to parent.', function() {
            expect(testContainer.children[0].nodeName.toLowerCase()).toMatch('div');
            expect(testContainer.children[0].id).toMatch('newDiv');
        });

        destroyTestContainer(testContainer);
    });

    describe('DOM - removeElement', function(){
        var
            testContainer = createTestContainer(),
            divToRemove = createTestElement(testContainer, 'div', { id: 'divToRemove'});

        Spektral.removeElement(divToRemove);

        it('removed test div.', function(){
           expect(document.querySelector('#divToRemove')).toBeNull();
        });

        destroyTestContainer(testContainer);
    });

    describe('DOM - setAttributes', function(){
        var
            testContainer = createTestContainer(),
            test = createTestElement(testContainer, 'div');
        Spektral.setAttributes(test, { id: 'testDiv', className: 'test-class', dataTest: 'test-data' });

        it('set id attribute named testDiv.', function(){
            expect(test.id).toMatch('testDiv');
        });

        it('set class attribute named test-class.', function(){
            expect(test.className).toMatch('test-class');
        });

        it('set data attribute named data-test.', function(){
            expect(test.dataset.test).toMatch('test-data');
        });

        destroyTestContainer(testContainer);
    });

    describe('DOM - getAttributes', function(){
        var
            testContainer = createTestContainer(),
            testDiv = createTestElement(testContainer, 'div', { id: 'testDiv', className: 'test-class', style: 'color:#fff'}),
            attrs = Spektral.getAttributes(testDiv);

        it('returned object has key id with a value of testDiv.', function(){
            expect(attrs.id).toMatch('testDiv');
        });

        it('returned object has key className with a value of test-class.', function(){
            expect(attrs.className).toMatch('test-class');
        });

        it('returned object has key with a value of color:#fff.', function(){
            expect(attrs.style).toMatch('color:#fff');
        });

        destroyTestContainer(testContainer);
    });

    describe('DOM - destroyAttribute', function(){
        var
           testContainer = createTestContainer(),
           testDiv = createTestElement(testContainer, 'div', { id: 'testDiv', className: 'test-class'});

        Spektral.destroyAttribute(testDiv, 'class');

        it('removes an attribute of class.', function() {
            expect(testDiv.hasAttribute('class')).toBeFalsy();
        });

        destroyTestContainer(testContainer);
    });

    describe('DOM - moveToAfter', function(){
        var
            testContainer = createTestContainer(),
            testElementOne = createTestElement(testContainer, 'div', { id: 'testElementOne' }),
            testElementTwo = createTestElement(testContainer, 'div', { id: 'testElementTwo' });

        Spektral.moveToAfter(testElementOne, testElementTwo);

        it('moves #testElementOne to after #testElementTwo.', function(){
            expect(testContainer.children[1].id).toMatch('testElementOne');
        });
        destroyTestContainer(testContainer);
    });

    describe('DOM - moveToBefore', function(){
        var
            testContainer = createTestContainer(),
            testElementOne = createTestElement(testContainer, 'div', { id: 'testElementOne' }),
            testElementTwo = createTestElement(testContainer, 'div', { id: 'testElementTwo' });

        Spektral.moveToBefore(testElementTwo, testElementOne);

        it('moves #testElementTwo to before #testElementOne.', function(){
            expect(testContainer.children[0].id).toMatch('testElementTwo');
        });
        destroyTestContainer(testContainer);
    });

    describe('DOM - clearChildren', function(){
        var
            testContainer = createTestContainer(),
            testElementOne = createTestElement(testContainer, 'div', { id: 'testElementOne' }),
            testElementTwo = createTestElement(testContainer, 'div', { id: 'testElementTwo' });

        Spektral.clearChildren(testContainer);

        it('clears the parent of all its children.', function(){
            expect(testContainer.children.length).toEqual(0);
        });
        destroyTestContainer(testContainer);
    });

    describe('DOM - getInnerText', function(){
        var testContainer = createTestContainer();

        testContainer.innerHTML = 'Testing';

        it('gets the inner text testContainer.', function(){
           expect(Spektral.getInnerText(testContainer)).toMatch('Testing');
       });
       destroyTestContainer(testContainer);
    });

    describe('DOM - setInnerText', function(){
        var testContainer = createTestContainer();

        Spektral.setInnerText(testContainer, 'Here is some text.');

        it('sets the inner text of testContainer.', function(){
            expect(testContainer.innerHTML).toMatch('Here is some text.');
        });

        Spektral.setInnerText(testContainer, ' And here is even more text.', true);

        it('appends text to the existing inner text of testContainer.', function(){
            expect(testContainer.innerHTML).toMatch('Here is some text. And here is even more text.');
        });

        destroyTestContainer(testContainer);
    });

    describe('DOM - isElement', function(){
        var
            testContainer = createTestContainer(),
            notAnElement = { test: 'foobar' };

        it('returns an element as true.', function(){
            expect(Spektral.isElement(testContainer)).toBeTruthy();
        });

        it('returns a non element as false.', function(){
            expect(Spektral.isElement(notAnElement)).toBeFalsy();
        });

        destroyTestContainer(testContainer);
    });

    describe('NUMBER - roundNum', function(){
        var
            testNum = 6.456,
            testNumCeil = 8.3,
            testNumFloor = 3.7;

        it('rounds a number.', function(){
            expect(Spektral.roundNum(testNum)).toEqual(6);
        });

        it('rounds a number up.', function(){
            expect(Spektral.roundNum(testNumCeil, 'up')).toEqual(9);
        });

        it('rounds a number down.', function(){
            expect(Spektral.roundNum(testNumFloor, 'down')).toEqual(3);
        });
    });

    describe('STRING - hasPattern', function(){
        var
            testString = 'This foobar string has foobar in it two times.',
            matchObject = Spektral.hasPattern(testString, 'foobar');

        it('returns an object.', function(){
            expect(getType(matchObject)).toMatch('object');
        });

        it('match value in object is true.', function(){
            expect(matchObject.match).toBeTruthy();
        });

        it('amount value in object is 2.', function(){
            expect(matchObject.amount).toEqual(2);
        });

        it('if pattern does not match, returns false.', function(){
            expect(Spektral.hasPattern('No match', 'foobar').match).toBeFalsy();
        });

        it('if pattern does not match, do not set amount.', function(){
            expect(Spektral.hasPattern('No match', 'foobar').amount).toBeUndefined();
        });
    });

    describe('STRING - stripString', function(){
        it('strips a string of a set character.', function(){
           expect(Spektral.stripString('These #hashtags wi#ll be rem#oved.', '#')).toMatch('These hashtags will be removed.');
        });

        it('it strips only the first character, when mode is set to \'first\'.', function(){
            expect(Spektral.stripString('@foobar@', '@', 'first')).toMatch('foobar@');
        });

        it('it strips only the third character from string.', function(){
            expect(Spektral.stripString('#foo#ba#r#', '#', 2)).toMatch('#foo#bar#');
        });
    });

    describe('STRING - splitString', function(){
        var
            testArray = Spektral.splitString('test-one, test-two, test-three'),
            testArrayColon = Spektral.splitString('testOne:testTwo:testThree', ':');

        it('returns an array.', function(){
            expect(getType(testArray)).toMatch('array');
        });

        it('array has values that were separated by character.', function(){
            expect(testArray[0]).toMatch('test-one');
            expect(testArray[1]).toMatch('test-two');
            expect(testArray[2]).toMatch('test-three');
        });

        it('allows for other characters to be used.', function(){
            expect(testArrayColon[0]).toMatch('testOne');
            expect(testArrayColon[1]).toMatch('testTwo');
            expect(testArrayColon[2]).toMatch('testThree');
        });
    });

    describe('STRING - convertToCamel', function(){
        var testString = Spektral.convertToCamel('camel-case');

        it('returns a string.', function(){
            expect(getType(testString)).toMatch('string');
        });

        it('converts a string to camel case.', function(){
            expect(testString).toMatch('camelCase');
        });

        it('converts to camel case using a non-hyphen character.', function(){
            expect(Spektral.convertToCamel('test#test#test', '#')).toMatch('testTestTest');
        });
    });

    describe('UTILS - getType', function(){
        var
            testContainer = createTestContainer(),
            testNum = 23,
            testString = 'Test',
            testObj = { test: 'Foobar' };

        it('returns a type of div.', function(){
            expect(Spektral.getType(testContainer)).toMatch('div');
        });

        it('returns a type of number.', function(){
            expect(Spektral.getType(testNum)).toMatch('number');
        });

        it('returns a type of string.', function(){
            expect(Spektral.getType(testString)).toMatch('string');
        });

        it('returns a type of object.', function(){
            expect(Spektral.getType(testObj)).toMatch('object');
        });

        destroyTestContainer(testContainer);
    });

    describe('UTILS - getInfo', function(){
        var
            testObj = { testOne: 'Test one', testTwo: 'Test two'},
            info = Spektral.getInfo(testObj);
        it('returns a string.', function(){
            expect(getType(info)).toMatch('string');
        });
    });

    describe('UTILS - isMatch', function(){
        var
            testStringOne = 'Test',
            testStringTwo = 'Test',
            testNumOne = 4,
            testNumTwo = 6,
            testBoolOne = true;

        it('returns a boolean.', function(){
            expect(getType(Spektral.isMatch(testStringOne, testStringTwo))).toMatch('boolean');
        });

        it('returns true when two items match.', function(){
            expect(Spektral.isMatch(testStringOne, testStringTwo)).toBeTruthy();
        });

        it('returns false when two items do not match.', function(){
            expect(Spektral.isMatch(testNumOne, testNumTwo)).toBeFalsy();
        });

        it('returns true when the type of two items match.', function(){
            expect(Spektral.isMatch(testNumOne, testNumTwo, true)).toBeTruthy();
        });

        it('returns false when the type of two items does not match.', function(){
            expect(Spektral.isMatch(testNumTwo, testBoolOne, true)).toBeFalsy();
        });
    });
});
