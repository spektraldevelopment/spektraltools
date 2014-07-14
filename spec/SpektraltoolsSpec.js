describe('SpektralTools: ', function() {

    initHelper(document);
    var testContainer = createTestContainer();

    it('Spektraltools is defined.', function() {
       expect(Spektral).toBeDefined();
    });

    describe('addElement', function() {

        var createdDiv;

        it('creates an element.', function() {
            createdDiv = Spektral.addElement(testContainer, 'div', { id: 'newDiv', className: 'new-style', style: 'border: 1px solid #cecece' });
            expect(createdDiv).toBeDefined();
        });

        it('created element has id of newDiv.', function() {
           expect(createdDiv.id).toMatch('newDiv');
        });

        it('created element has className of new-style.', function(){
            expect(createdDiv.class).toMatch('new-style');
        });

        it('created element has a style of border: 1px solid #cecece.', function(){
            expect(createdDiv.getAttribute('style')).toMatch('border: 1px solid #cecece');
        });

        it('created element was added to parent.', function() {
            expect(testContainer.children[0].nodeName.toLowerCase()).toMatch('div');
            expect(testContainer.children[0].id).toMatch('newDiv');
        });

        clearTestContainer(testContainer);
    });

    describe('removeElement', function(){
        var divToRemove = createTestElement(testContainer, 'div', { id: 'divToRemove'});
        Spektral.removeElement(divToRemove);

        it('removed test div.', function(){
           expect(document.querySelector('#divToRemove')).toBeNull();
        });
    });

});
