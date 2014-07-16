spektraltools
=============
A JavaScript library for DOM manipulation and other uses. This is the spiritual successor of spektraljs.

---

## DOM

1. Spektral.addElement(parent, type, attrs);
------

##### Description
Adds a new element to a parent container.

##### Arguments
container: `HTMLElement` - The parent you want to add the new element to.

type: `String` - The type of element you want.

attrs: `Object` - Any attributes you want to add. 
>Note: To set class, use className to avoid IE compatibility issues.

##### Returns
`HTMLElement`

##### Example

```javascript
var newDiv = Spektral.addElement(parentDiv, 'div', 
	{ 
		id: 'newDiv', 
		className: 'div-style'
	});
```

2. Spektral.removeElement(element);
------

#### Description
Removes an element from the DOM.

#### Arguments
element: `HTMLElement` - The element you want to remove.

##### Returns
`Nothing`

##### Example

```javascript
var divToRemove = document.querySelector('#fooBar');

Spektral.removeElement(divToRemove);
```

3. Spektral.setAttributes(element, attrs);
------

#### Description
Adds attributes to an element.

#### Arguments
element: `HTMLElement` - The element you want to remove.
attrs: `Object` - Contains all the attributes you want to add.
>Note: Some attributes require a modified name to avoid compatibility problems.

>class -> className
>data-type -> dataType

##### Returns
`Nothing`

##### Example

```javascript
var test = document.createElement('div');
	
Spektral.setAttributes(test, 
{ 
	id: 'testDiv', 
	className: 'test-class', 
	dataTest: 'test-data' 
});
```

4. Spektral.destroyAttribute(element, attribute);
------

#### Description
Removes an attribute from an element.

#### Arguments
element: `HTMLElement` - The element you want to target.
attribute: `String` - The attribute you want to remove.

##### Returns
`Nothing`

##### Example

```javascript
Spektral.destroyAttribute(testDiv, 'class');
```

5. Spektral.moveToAfter(element, targetElement)
------

#### Description
Moves an element to after a target element.

#### Arguments
element: `HTMLElement` - The element you want to move.
targetElement: `HTMLElement` - The element you want to place the chosen element after.

##### Returns
`Nothing`

##### Example

```javascript
Spektral.moveToAfter(testElementOne, testElementTwo);
//Results in testElementOne being placed after testElementTwo
```

6. Spektral.moveToBefore(element, targetElement)
------

#### Description
Moves an element to before a target element.

#### Arguments
element: `HTMLElement` - The element you want to move.
targetElement: `HTMLElement` - The element you want to place the chosen element before.

##### Returns
`Nothing`

##### Example

```javascript
Spektral.moveToBefore(testElementTwo, testElementOne);
//Results in testElementTwo being placed before testElementOne
```

7. Spektral.clearChildren(parent)
------

#### Description
Clears a parent of its children.

#### Arguments
parent: `HTMLElement` - The parent you want to clear.

##### Returns
`Nothing`

##### Example

```javascript
Spektral.clearChildren(divWithChildren);
```

8. Spektral.getInnerText(element);
------

#### Description
Gets the inner text of an element.

#### Arguments
element: `HTMLElement` - The element you want to retrieve inner text from.

##### Returns
`String`

##### Example

```javascript
var testDiv = document.createElement('div');
testDiv.innerHTML = 'Testing';
Spektral.getInnerText(testDiv)
//Returns 'Testing'
```

9. Spektral.setInnerText(element, textContent, append);
------

#### Description
Sets the inner text of an element, as well as appends text to exisiting text.

#### Arguments
element: `HTMLElement` - The element you want set the innerHTML of.
textContent: `String` - The text content.
append: `Boolean default:false` - If set to true, will append text to the existing text.

##### Returns
`Nothing`

##### Example

```javascript
Spektral.setInnerText(testContainer, 'Here is some text.');
Spektral.setInnerText(testContainer, 'Here is even more text.', true);
```
---


