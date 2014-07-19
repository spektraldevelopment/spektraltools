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

10. Spektral.isElement(possibleElement);
------

#### Description
Checks if something is an element.

#### Arguments
possibleElement: `Various` - The possible element you want to check.

##### Returns
`Boolean`

##### Example

```javascript
Spektral.isElement(testDiv);
//Retrurns true
Spektral.isElement(testObject);
//Returns false
```
---

## NUMBER

1. Spektral.roundNum(num, type);
------

#### Description
Rounds a number. Also has the option to round up and down.

#### Arguments
num: `Number` - The number you want to round
type: `String default:regular` - Also accepts params: 'up', and 'down'

##### Returns
`Number`

##### Example

```javascript
Spektral.roundNum(4.56);
//Returns 5
Spektral.roundNum(3.4, 'up');
//Returns 4
Spektral.roundNum(8.8, 'down');
//Returns 8
```
---

## STRING

1. Spektral.hasPattern(request, pattern);
------

#### Description
Checks a string for a pattern and returns an object containing the keys 'match' and 'amount'

#### Arguments
request: `String` - The string you want to check
pattern: `String default:regular` - The pattern you want to check for

##### Returns
`Object`

##### Example

```javascript
var testPattern = Spektral.hasPattern('This foobar string has foobar in it twice.', 'foobar');
//testPattern.match = true;
//testPattern.amount = 2;
```

2. Spektral.stripString(request, character, mode)
------

#### Description
Strips a requested character from a string

#### Arguments
request: `String` - The string you want to strip
character: `String` - The character you want to remove
mode: `String or Number default:all` - If set to 'all', will remove character from entire string, 
if set to 'first', will on remove only the first instance of the character, if set to a number, will remove
the character specifically at it's index (note: won't work with RegEx special characters such as * yet)

##### Returns
`String`

##### Example

```javascript
Spektral.stripString('These #hashtags wi#ll be rem#oved.', '#');
//Returns: These hashtags will be removed.
Spektral.stripString('@foobar@', '@', 'first');
//Returns: foobar@
Spektral.stripString('#foo#ba#r#', '#', 2);
//Returns: #foo#bar#
```

3. Spektral.splitString(request, character);
------

#### Description
Splits a string that uses a common character for separation, and returns an array of each individual value. Ex. 'This, string, has, lots, of, commas'

#### Arguments
request: `String` - The string you want to split
character: `String default:,` - The character you want to split the string with, default is comma.

##### Returns
`Array`

##### Example

```javascript
Spektral.splitString('Split, on, these, commas');
Returns: ['Split', 'on', 'these', 'commas']
Spektral.splitString('Split#on#these#hashtags');
Returns: ['Split', 'on', 'these', 'hashtags']
```
---

## UTILS

1. Spektral.getType(obj);
------

#### Description
Gets the type of various objects, and returns the type in a lower case string. ex. string, number, object, div, etc.

#### Arguments
obj: `Various` - The object you want to check

##### Returns
`String`

##### Example

```javascript
Spektral.getType(23);
//Returns 'number'
Spektral.getType(testDiv);
//Returns 'div'
```

2. Spektral.getInfo(obj);
------

#### Description
Stringifies an object.

#### Arguments
obj: `Various` - The object you want to stringify.

##### Returns
`String`

##### Example

```javascript
Spektral.getInfo(testObj);
```

3. Spektral.isMatch(itemA, itemB, useType);
------

#### Description
Compares two values and returns a boolean, can also compare the type of two values as well.

#### Arguments
itemA: `Various` - The value or item you want to compare.
itemB: `Various` - The value or item you want to compare against itemA.
useType `Boolean default:false` - If set to true, will compare variables type, instead of value.

##### Returns
`Boolean`

##### Example

```javascript
var testNumOne = 4, testNumTwo = 8;
Spektral.isMatch(testNumOne, testNumTwo);
//Will return false
Spektral.isMatch(testNumOne, testNumTwo, true);
//Will return true because both values are numbers
```

---


