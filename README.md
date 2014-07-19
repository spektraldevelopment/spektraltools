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
4. Spektral.convertCamel(request, character);
------

#### Description
Converts a string separated by hyphens to camel case.

#### Arguments
request: `String` - The string you want to convert to camel case
character: `String default:-` - The character you want to target, you can use another character optionally

##### Returns
`String`

##### Example

```javascript
Spektral.convertToCamel('camel-case');
Returns: camelCase
```

5. Spektral.detectCharacter(request, character);
------

#### Description
Detects a character in a string, good for detecting hashtags

#### Arguments
request: `String` - The string you want to check
character: `String` - The character you want to check for

##### Returns
`Boolean`

##### Example

```javascript
Spektral.detectCharacter('$#@!', '#');
//Returns: true
Spektral.detectCharacter('$#@!', '*');
//Returns: false
```
6. Spektral.stripWhiteSpace(request, removeAll);
------

#### Description
Strips a string of extra white space at the beginning and end of the string, can also remove all white space if needed

#### Arguments
request: `String` - The string you want to strip
removeAll: `Boolean default:false` - If set to true, removes all white space from string

##### Returns
`String`

##### Example

```javascript
Spektral.stripWhiteSpace(' foo bar ');
//Returns: 'foo bar';
Spektral.stripWhiteSpace(' foo bar ');
//Returns: 'foobar'
```

7. Spektral.stripBrackets(request);
------

#### Description
Strips a string of all brackets

#### Arguments
request: `String` - The string you want to strip

##### Returns
`String`

##### Example

```javascript
Spektral.stripBrackets('({[foobar]})');
//Returns: foobar
```

8. Spektral.convertCase(request, newCase);
------

#### Description
Converts a string to upper or lower case, also capitalizes the first letter in a string

#### Arguments
request: `String` - The string you want to change case
newCase: `String default:lower` - The new case you want, you can also use 'upper' or 'first'

##### Returns
`String`

##### Example

```javascript
Spektral.convertCase('FOOBAR'));
//Returns: foobar
Spektral.convertCase('foobar', 'upper');
//Returns: FOOBAR
Spektral.convertCase('foobar', 'first');
//Returns: Foobar
```

9. Spektral.trimString(request, start, end);
------

#### Description
Trims a string based on the start and end index set

#### Arguments
request: `String` - The string you want to trim
start: `Number` - The start index
end: `Number` - The end index

##### Returns
`String`

##### Example

```javascript
Spektral.trimString('foobar', 1, 5);
//Returns: ooba
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

4. Spektral.stringToNum(request);
------

#### Description
Converts a number in a string into a `Number`

#### Arguments
request: `String` - The string you want to convert, if string contains non-numerical characters, they will be stripped out.

##### Returns
`Number`

##### Example

```javascript
Spektral.stringToNum('15');
//Returns: 15
Spektral.stringToNum('15foo45bar');
/Returns: 1545
```

5. Spektral.isObjectEmpty(obj);
------

#### Description
Checks when an object has keys and returns the result in a boolean

#### Arguments
obj: `Object` - The object you want to check

##### Returns
`Boolean`

##### Example

```javascript
Spektral.isObjectEmpty({test:'foobar'});
//Returns: false
Spektral.isObjectEmpty({});
//Returns: true
```

6. Spektral.arrayHasValue(array, value);
------

#### Description
Checks an array for a stored value and returns the result as a boolean

#### Arguments
array: `Array` - The array you want to check
value: `Various` - The value you want to find

##### Returns
`Boolean`

##### Example

```javascript
Spektral.arrayHasValue(['one', 'two'], 'two');
//Returns: true
Spektral.arrayHasValue([1,2,3], 4);
//Returns: false
```
---


