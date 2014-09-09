describe('SpektralTools: ', function() {

    initHelper(document);

    it('Spektraltools is defined.', function() {
        expect(Spektral).toBeDefined();
    });

    it('debug mode is set to false.', function(){
        expect(Spektral.debugMode()).toBeFalsy();
    });

    it('debug mode is set to true.', function(){
        Spektral.debug();
        expect(Spektral.debugMode()).toBeTruthy();
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

        Spektral.setInnerText(testContainer, ' And here is even more text.', { append: true });

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

    describe('DOM - getChildNodes', function(){
        var
            childNodesTest = createTestContainer({ id: 'childNodesTest' }),
            childOne = createTestElement(childNodesTest, 'div', { id: 'childOne' }),
            childTwo = createTestElement(childNodesTest, 'div', { id: 'childTwo' }),
            nodes = Spektral.getChildNodes(childNodesTest);

        it('returns an array.', function(){
            expect(getType(nodes)).toEqual('array');
        });

        it('array contains two children.', function(){
           expect(nodes.length).toEqual(2);
        });

        it('array contains child one.', function(){
            expect(nodes[0].id).toEqual('childOne');
        });

        it('array contains child one.', function(){
            expect(nodes[1].id).toEqual('childTwo');
        });
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
            expect(Spektral.roundNum(testNumCeil, { roundType: 'up' })).toEqual(9);
        });

        it('rounds a number down.', function(){
            expect(Spektral.roundNum(testNumFloor, { roundType: 'down' })).toEqual(3);
        });
    });

    describe('NUMBER - getRandomNum', function(){
        it('returns a number.', function(){
            expect(getType(Spektral.getRandomNum(0, 7))).toEqual('number');
        });

        it('returns an rounded number.', function(){
            expect(isInt(Spektral.getRandomNum(4, 9))).toBeTruthy();
        });

        it('returns an un-rounded number.', function(){
            expect(isInt(Spektral.getRandomNum(4, 9, { rounded: false }))).toBeFalsy();
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
            expect(Spektral.stripString('@foobar@', '@', { mode: 'first' })).toMatch('foobar@');
        });

        it('it strips only the third character from string.', function(){
            expect(Spektral.stripString('#foo#ba#r#', '#', { mode: 2 })).toMatch('#foo#bar#');
        });
    });

    describe('STRING - splitString', function(){
        var
            testArray = Spektral.splitString('test-one, test-two, test-three'),
            testArrayColon = Spektral.splitString('testOne:testTwo:testThree', { character: ':' });

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
            expect(Spektral.convertToCamel('test#test#test', { character: '#' })).toMatch('testTestTest');
        });
    });

    describe('STRING - detectCharacter', function(){
        var testString = '@#$G';

        it('returns a boolean.', function(){
            expect(getType(Spektral.detectCharacter(testString, '$'))).toMatch('boolean');
        });

        it('detects a character and returns true.', function(){
            expect(Spektral.detectCharacter(testString, '#')).toBeTruthy();
        });

        it('returns false if character is not detected.', function(){
            expect(Spektral.detectCharacter(testString, '*')).toBeFalsy();
        });

        it('returns false if period is not detected.', function(){
            expect(Spektral.detectCharacter(testString, '.')).toBeFalsy();
        });
    });

    describe('STRING - stripWhiteSpace', function(){
        var testString = ' foo bar  ';

        it('returns a string.', function(){
            expect(getType(Spektral.stripWhiteSpace(testString))).toMatch('string');
        });

        it('strips the white space on either side of string.', function(){
            expect(Spektral.stripWhiteSpace(testString)).toMatch('foo bar');
        });

        it('strips all white space from the string.', function(){
            expect(Spektral.stripWhiteSpace(testString, { stripAll: true })).toMatch('foobar');
        });
    });

    describe('STRING - stripBrackets', function(){
        var testString = '({[foobar]})';

        it('returns a string.', function(){
            expect(getType(Spektral.stripBrackets(testString))).toMatch('string');
        });

        it('return string is stripped of all brackets.', function(){
            expect(Spektral.stripBrackets(testString)).toMatch('foobar');
        });
    });

    describe('STRING - convertCase',function(){
        it('returns a string.', function(){
            expect(getType(Spektral.convertCase('FooBaR'))).toMatch('string');
        });

        it('converts string to lower case.', function(){
            expect(Spektral.convertCase('FOOBAR')).toMatch('foobar');
        });

        it('converts string to upper case.', function(){
            expect(Spektral.convertCase('foobar', { newCase: 'upper' })).toMatch('FOOBAR');
        });

        it('converts first letter only to upper case.', function(){
            expect(Spektral.convertCase('foobar', { newCase: 'first' })).toMatch('Foobar');
        });
    });

    describe('STRING - trimString', function(){
        var testString = Spektral.trimString('foobar', 1, 5);
        it('returns a string.', function(){
            expect(getType(testString)).toMatch('string');
        });

        it('trims the string.', function(){
            expect(testString).toMatch('ooba');
        });
    });

    describe('STRING - concatCamel', function(){
        var
            testString = Spektral.concatCamel('fooBarBar'),
            testStringChar = Spektral.concatCamel('fooBarBar', { character: '#' });

        it('converts a camel case string.', function(){
            expect(testString).toEqual('foo-bar-bar');
        });

        it('converts a camel case string with chosen character.', function(){
            expect(testStringChar).toEqual('foo#bar#bar');
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
            expect(Spektral.isMatch(testNumOne, testNumTwo, { useType: true })).toBeTruthy();
        });

        it('returns false when the type of two items does not match.', function(){
            expect(Spektral.isMatch(testNumTwo, testBoolOne, { useType: true })).toBeFalsy();
        });
    });

    describe('UTILS - stringToNum', function(){

        it('returns a number.', function(){
            expect(getType(Spektral.stringToNum('4'))).toMatch('number');
        });

        it('converts string to a number.', function(){
            expect(Spektral.stringToNum('5')).toEqual(5);
        });

        it('strips string of all non numbers.', function(){
            expect(Spektral.stringToNum('foo3bar5')).toEqual(35);
        });
    });

    describe('UTILS - isObjectEmpty', function(){
        var testObj = { test: 'foo', testTwo: 'bar'}, emptyObj = {};

        it('returns a boolean.', function(){
            expect(getType(Spektral.isObjectEmpty(testObj))).toMatch('boolean');
        });

        it('returns true when object is empty.', function(){
            expect(Spektral.isObjectEmpty(emptyObj)).toBeTruthy();
        });

        it('returns false when object is populated.', function(){
            expect(Spektral.isObjectEmpty(testObj)).toBeFalsy();
        });
    });

    describe('UTILS - arrayHasValue', function(){

        it('returns a boolean.', function(){
            expect(getType(Spektral.arrayHasValue(['one', 'two', 'three'], 'two'))).toMatch('boolean');
        });

        it('returns true when value is in array.', function(){
            expect(Spektral.arrayHasValue(['one', 'two', 'three'], 'two')).toBeTruthy();
        });

        it('returns false when value is not in array.', function(){
            expect(Spektral.arrayHasValue([1, 2, 3], 4)).toBeFalsy();
        });
    });

    describe('UTILS - queryArray', function(){
        var testArray = [0, 1, 2, 3, 3, 3, 3];

        it('returns a single value when only one instance is found.', function(){
            expect(getType(Spektral.queryArray(testArray, 1))).toMatch('number');
        });

        it('returns an array if more than one instance found.', function(){
            expect(getType(Spektral.queryArray(testArray, 3))).toMatch('array');
            expect(Spektral.queryArray(testArray, 3)[0]).toEqual(3);
        });

        it('returns the correct amount of instances.', function(){
            expect(Spektral.queryArray(testArray, 3).length).toEqual(4);
        });

        it('returns false if no instance found.', function(){
            expect(Spektral.queryArray(testArray, 4)).toBeFalsy();
        });
    });

    describe('UTILS - objectHasKey', function(){
        var testObject = { one: 'foo', two: 'bar'};

        it('returns a boolean.', function(){
            expect(getType(Spektral.objectHasKey(testObject, 'one'))).toMatch('boolean');
        });

        it('returns true is object has key.', function(){
            expect(Spektral.objectHasKey(testObject, 'one')).toBeTruthy();
        });

        it('returns false is object does not have key.', function(){
            expect(Spektral.objectHasKey(testObject, 'four')).toBeFalsy();
        });
    });

    describe('UTILS - queryObject', function(){
        var testObject = { one: 'foo', two: 'bar'};

        it('it returns a value.', function(){
            expect(Spektral.queryObject(testObject, 'two')).toMatch('bar');
        });

        it('if no key is found, returns false.', function(){
            expect(Spektral.queryObject(testObject, 'three')).toBeFalsy();
        });
    });

    describe('UTILS - getElementIds', function(){
        var
            testContainer = createTestContainer(),
            testDiv = createTestElement(testContainer, 'div', { id: 'testId', className: 'test-class' }),
            noIdDiv = createTestElement(testContainer, 'div'),
            elIds = Spektral.getElementIds(testDiv);

        it('returns an object.', function(){
            expect(getType(elIds)).toMatch('object');
        });

        it('object has key id.', function(){
            expect(elIds.id).toMatch('testId');
        });

        it('object has key class.', function(){
            expect(elIds.class).toMatch('test-class');
        });

        it('object has key node.', function(){
            expect(elIds.node).toMatch('div');
        });

        it('object returns NOT_SET for keys that could not be found.', function(){
            expect(Spektral.getElementIds(noIdDiv).id).toMatch('NOT_SET');
        });

        destroyTestContainer(testContainer);
    });

    describe('UTILS - getParameter', function(){
        var testObject = { one: 'foo', two: 'bar' };

        it('returns the value if the key is present.', function(){
            expect(Spektral.getParameter(testObject, 'one', 'default')).toMatch('foo');
        });

        it('returns the default param if the key is not found.', function(){
            expect(Spektral.getParameter(testObject, 'three', 'foobar')).toMatch('foobar');
        });
    });

    describe('UTILS - getExtension', function(){
        var
            jpgExt = 'test.jpg', txtExt = 'test.txt',
            mutiplePeriods = 'test.test.png';

        it('returns a string.', function(){
            expect(getType(Spektral.getExtension(jpgExt))).toMatch('string');
        });

        it('returns the correct extension.', function(){
            expect(Spektral.getExtension(txtExt)).toMatch('txt');
        });

        it('if file name has multiple periods, still returns extension correctly.', function(){
            expect(Spektral.getExtension(mutiplePeriods)).toMatch('png');
        });
    });

    describe('UTILS - allAreEqualTo', function(){
        var
            testArrayOne = [5,5,5],
            testArrayTwo = [5,1,5];

        it('returns true if all values in array are equal to requested value.', function(){
            expect(Spektral.allAreEqualTo(5, testArrayOne)).toBeTruthy();
        });

        it('returns false if all values in array are not equal to requested value.', function(){
            expect(Spektral.allAreEqualTo(5, testArrayTwo)).toBeFalsy();
        });
    });

    describe('UTILS - allAreSame', function(){
        var testArrayOne = [4,4,4], testArrayTwo = [9,9,1], testArrayThree = ['10px', '10px'], testArrayFour = ['5px', '10px'];

        it('returns true when all values are the same.', function(){
            expect(Spektral.allAreSame(testArrayOne)).toBeTruthy();
        });

        it('returns false when all values are not the same.', function(){
            expect(Spektral.allAreSame(testArrayTwo)).toBeFalsy();
        });

        it('returns true when all strings are the same.', function(){
            expect(Spektral.allAreSame(testArrayThree)).toBeTruthy();
        });

        it('returns true when all strings are not the same.', function(){
            expect(Spektral.allAreSame(testArrayFour)).toBeFalsy();
        });
    });
});
