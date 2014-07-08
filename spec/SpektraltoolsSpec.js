describe('SpektralTools: ', function() {

    it('Spektraltools is defined.', function() {
       expect(Spektral).toBeDefined();
    });

    describe('addElement', function() {

        var testContainer, createdDiv;

        testContainer = document.createElement('div');
        testContainer.id = 'testContainer';
        document.body.appendChild(testContainer);

        it('creates an element.', function() {
            createdDiv = Spektral.addElement(testContainer, 'div', { id: 'newDiv', className: 'new-style', style: 'border: 1px solid #cecece' });
            expect(createdDiv).toBeDefined();
        });

        it('created element has id of newDiv.', function() {
           expect(createdDiv.id).toMatch('newDiv');
        });

        it('created element was added to parent.', function() {
            expect(testContainer.children[0].nodeName.toLowerCase()).toMatch('div');
            expect(testContainer.children[0].id).toMatch('newDiv');
        });
    });

});
