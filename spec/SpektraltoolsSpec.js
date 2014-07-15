describe('SpektralTools: ', function() {

    initHelper(document);

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

        it('added id attribute named testDiv.', function(){
            expect(test.id).toMatch('testDiv');
        });

        it('added class attribute named test-class.', function(){
            expect(test.className).toMatch('test-class');
        });

        it('added data attribute named data-test.', function(){
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
    });

});
