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

9. Spektral.setInnerText(element, textContent, options);
------

#### Description
Sets the inner text of an element, as well as appends text to exisiting text.

#### Arguments
element: `HTMLElement` - The element you want set the innerHTML of.
textContent: `String` - The text content.
options: `Object` - All optional parameters are passed through this object

#### Available Options
```JavaScript
{
	append: true //Appends new text to the existing text
}
```

##### Returns
`Nothing`

##### Example

```javascript
Spektral.setInnerText(testContainer, 'Here is some text.');
Spektral.setInnerText(testContainer, 'Here is even more text.', { append: true });
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

11. Spektral.getChildNodes(parent);
------

#### Description
Gets all child elements of a parent and returns them in an array.

#### Arguments
parent: `HTMLElement` - The parent element

##### Returns
`Array`

##### Example

```html
<div id="parentDiv">
	<div id="childOne">Child One</div>
	<div id="childTwo">Child Two</div>
</div>
```

```javascript
var 
	pd = document.querySelector('#parentDiv'), 
	nodes = Spektral.getChildNodes(pd);
//Returns: [[object HTMLDivElement],[object HTMLDivElement]]
```
---

## EVENT

1. Spektral.attachEventListener(eventTarget, eventType, eventHandler);
------

##### Description
Attaches an event to an element

##### Arguments
eventTarget: `HTMLElement` - The element you want to attach the event to
eventType: `String` - The name of the event you want to attach (prepending 'on' to the event name is not required)
eventHandler: `Function` - The function you want to call when the event is triggered

##### Returns
`Nothing`

##### Example

```javascript
var tDiv = document.queryElement('#testDiv');
Spektral.attachEventListener(tDiv, 'click', function(){
	console.log('I was clicked!');
});
```

2. Spektral.detachEventListener(eventTarget, eventType, eventHandler);
------

##### Description
Detaches an event from an element

##### Arguments
eventTarget: `HTMLElement` - The element you want to detach the event from
eventType: `String` - The name of the event you want to detach (prepending 'on' to the event name is not required)
eventHandler: `Function` - The function you want detach

##### Returns
`Nothing`

##### Example

```javascript
var tDiv = document.queryElement('#testDiv');
Spektral.detachEventListener(tDiv, 'click', function(){
	console.log('I will never be clicked!');
});
```

3. Spektral.getTarget(evt);
------

##### Description
Used in a function triggered by an event, returns the element that triggered the event

##### Arguments
evt: `Event object` - The event obj that was returned when the event was triggered

##### Returns
`HTMLElement`

##### Example

```javascript
var tDiv = document.queryElement('#testDiv');
tDiv.onclick = function(evt){
	var target = Spektral.getTarget(evt);
	//Returns: tDiv
}
```

4. Spektral.getTargetID(evt);
------

##### Description
Returns the ID of an element via its event object

##### Arguments
evt: `Event object` - The event obj that was returned when the event was triggered

##### Returns
`String`

##### Example

```javascript
var tDiv = document.queryElement('#testDiv');
tDiv.onclick = function(evt){
	var target = Spektral.getTargetID(evt);
	//Returns: testDiv
}
```

5. Spektral.createEvent(eventName, options);
------

##### Description
Creates a custom event

##### Arguments
eventName: `String` - The name of the event you want to create
options: `Object` - All optional parameters are passed through this object

#### Available Options
```JavaScript
{
	detail:{}, //You can pass in values to the function that gets called on firing of custom event
	bubbles:true,//A boolean indicating whether the event bubbles up through the DOM or not, default is true
	cancelable:true//A boolean indicating whether the event is cancelable, default is true
}
```

##### Returns
`Event`

##### Example

```javascript
var 
    testDiv = document.querySelector('#test'),
    testEvent = Spektral.createEvent('testEvent', { detail: {foo: 'bar', spektral: 'tools'} });

Spektral.attachEventListener(testDiv, 'testEvent', onTestEvent);

function onTestEvent(evt) {
    //evt.detail.foo returns 'bar'
    //evt.detail.spektral returns 'tools'
}

Spektral.triggerEvent(testDiv, testEvent);
```

6. Spektral.triggerEvent(obj, evt);
------

##### Description
Triggers an event

##### Arguments
obj: `Object or HTMLElement` - The object or element that has the event attached to it
evt: `Event or String` - The event that you want to trigger, if evt is a string, the event will be created using CustomEvent

##### Returns
`Nothing`

##### Example

```javascript
var testDiv = document.querySelector('#testDiv');
testDiv.addEventListener('click', onTestClick);
function onTestClick(evt){
    console.log('Triggered');
}
Spektral.triggerEvent(testDiv, 'click');
```

7. Spektral.cancelEvent(evt);
------

##### Description
Cancels the event without stopping further propagation

##### Arguments
evt: `Event object` - The event object returned by the triggered function

##### Returns
`Nothing`

##### Example

```javascript
var testDiv = document.querySelector('#ceDiv'), eventCanceled = true;
testDiv.addEventListener('click', onTestClick);

function onTestClick(evt) {
    eventCanceled = false;
    Spektral.cancelEvent(evt);
}

testDiv.dispatchEvent('click');
//eventCanceled still equals true
```

8. Spektral.cancelPropagation(evt);
------

##### Description
Stops the event from bubbling up the event chain

##### Arguments
evt: `Event object` - The event object returned by the triggered function

##### Returns
`Nothing`

##### Example

```javascript
var
    parent = document.querySelector('#parent'),
    child = document.querySelector('#child'),
    custEvent = Spektral.createEvent('testEvent');

parent.addEventListener('testEvent', onTestEvent);
child.addEventListener('testEvent', onTestEvent);

function onTestEvent(evt) {
    Spektral.cancelPropagation(evt);
    //Only called once because event does not bubble up to parent
}

child.dispatchEvent(custEvent);
```
---

## NUMBER

1. Spektral.roundNum(num, options);
------

#### Description
Rounds a number. Also has the option to round up and down.

#### Arguments
num: `Number` - The number you want to round
options: `Object` - All optional parameters are passed through this object

#### Available Options
```JavaScript
{
	roundType: 'up' //Setting 'up' rounds the number up using Math.ceil, 'down' rounds the number down using Math.floor
}
```

##### Returns
`Number`

##### Example

```javascript
Spektral.roundNum(4.56);
//Returns 5
Spektral.roundNum(3.4, { roundType: 'up' });
//Returns 4
Spektral.roundNum(8.8, { roundType: 'down' });
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

2. Spektral.stripString(request, character, options)
------

#### Description
Strips a requested character from a string

#### Arguments
request: `String` - The string you want to strip
character: `String` - The character you want to remove
options: `Object` - All optional parameters are passed through this object

#### Available Options
```JavaScript
{
	mode: 'first' //If set to 'all', will remove character from entire string, if set 
	//to 'first', will on remove only the first instance of the character, if set to a 
	//number, will remove the character specifically at it's index (note: won't work 
	//with RegEx special characters such as * yet)
}
```

##### Returns
`String`

##### Example

```javascript
Spektral.stripString('These #hashtags wi#ll be rem#oved.', '#');
//Returns: These hashtags will be removed.
Spektral.stripString('@foobar@', '@', { mode: 'first'});
//Returns: foobar@
Spektral.stripString('#foo#ba#r#', '#', { mode: 2 });
//Returns: #foo#bar#
```

3. Spektral.splitString(request, options);
------

#### Description
Splits a string that uses a common character for separation, default character is a comma, and returns an array of each individual value. Ex. 'This, string, has, lots, of, commas'

#### Arguments
request: `String` - The string you want to split
options: `Object` - All optional parameters are passed through this object

#### Available Options
```JavaScript
{
	character: '#' //The character you want to split the string with
}
```

##### Returns
`Array`

##### Example

```javascript
Spektral.splitString('Split, on, these, commas');
Returns: ['Split', 'on', 'these', 'commas']
Spektral.splitString('Split#on#these#hashtags', { character: '#'});
Returns: ['Split', 'on', 'these', 'hashtags']
```
4. Spektral.convertCamel(request, options);
------

#### Description
Converts a string separated by hyphens to camel case.

#### Arguments
request: `String` - The string you want to convert to camel case
options: `Object` - All optional parameters are passed through this object

#### Available Options
```JavaScript
{
	character: ',' //Sets separating character to one of your choice
}
```

##### Returns
`String`

##### Example

```javascript
Spektral.convertToCamel('camel-case');
//Returns: camelCase
Spektral.convertToCamel('camel,case', { character: ',' });
//Returns: camelCase
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
6. Spektral.stripWhiteSpace(request, options);
------

#### Description
Strips a string of extra white space at the beginning and end of the string, can also remove all white space if needed

#### Arguments
request: `String` - The string you want to strip
options: `Object` - All optional parameters are passed through this object

#### Available Options
```JavaScript
{
	stripAll: true //Strips string of all white space
}
```

##### Returns
`String`

##### Example

```javascript
Spektral.stripWhiteSpace(' foo bar ');
//Returns: 'foo bar';
Spektral.stripWhiteSpace(' foo bar ', { stripAll: true });
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

10. Spektral.concatCamel(request, options)
------

#### Description
Separates words in a camel case string and returns them concatenated using a hyphen

#### Arguments
request: `String` - The string you want to concatenate
options: `Object` - All optional parameters are passed through this object

#### Available Options
```JavaScript
{
	character: '#' //The character you want to use, default -
}
```

##### Returns
`String`

##### Example

```javascript
var testString = Spektral.concatCamel('fooBar');
//Returns: foo-bar
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

3. Spektral.isMatch(itemA, itemB, options);
------

#### Description
Compares two values and returns a boolean, can also compare the type of two values as well.

#### Arguments
itemA: `Various` - The value or item you want to compare.
itemB: `Various` - The value or item you want to compare against itemA.
options: `Object` - All optional parameters are passed through this object

#### Available Options
```JavaScript
{
	useType: true //If set to true, will compare variables type, instead of their literal value.
}
```

##### Returns
`Boolean`

##### Example

```javascript
var testNumOne = 4, testNumTwo = 8;
Spektral.isMatch(testNumOne, testNumTwo);
//Will return false
Spektral.isMatch(testNumOne, testNumTwo, { useType: true });
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
//Returns: 1545
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

7. Spektral.queryArray(array, value);
------

#### Description
Queries an array and returns the results either in a single value or array depending on how many times the value was found, 
returns false if no instance was found

#### Arguments
array: `Array` - The array you want to check
value: `Various` - The value you want to find

##### Returns
`Various, Array, or Boolean`

##### Example

```javascript
Spektral.queryArray([1,2,3,3,3,3], 1);
//Returns: single value of the number 1
Spektral.queryArray([1,2,3,3,3,3], 3);
//Returns: array with 4 instances of 3
Spektral.queryArray([1,2,3], 4);
//Returns: false
```

8. Spektral.objectHasKey(obj, key)
------

#### Description
Checks an object for a key and returns the result as a boolean

#### Arguments
obj: `Object` - The object you want to check
key: `String` - The key you want to check for

##### Returns
`Boolean`

##### Example

```javascript
Spektral.objectHasKey({ one: 'foo', two: 'bar' }, 'one');
//Returns: true
Spektral.objectHasKey({ one: 'foo', two: 'bar' }, 'three');
//Returns: false
```

9. Spektral.queryObject(obj, key);
------

#### Description
Queries and object for a key and returns the value if found, if not found, returns false

#### Arguments
obj: `Object` - The object you want to check
key: `String` - The key you want to get the value of

##### Returns
`Various or Boolean`

##### Example

```javascript
var testObject = { one: 'foo', two: 'bar'};
Spektral.queryObject(testObject, 'two');
//Returns: bar
Spektral.queryObject(testObject, 'three');
//Returns: false
```

10. Spektral.getElementIds(element);
------

#### Description
Gets the id and class of a node if set

#### Arguments
element: `HTMLElement` - The element you want to get ids from

##### Returns
`Object`

##### Example

```javascript
var testDiv = document.createElement('div');
testDiv.id = 'testID';
testDiv.class = 'test-class';
Spektral.getElementIds(testDiv);
//Returns: id - testID, class - test-class, node - div
```

11. Spektral.getParameter(obj, key, defaultParam);
------

#### Description
Checks an object for a value, if not set, sets a default parameter, helpful for validating passed arguments to a function

#### Arguments
obj: `Object` - The object you want to check
key: `String` - The key you want to check for
defaultParam: `Various` - The default value 

##### Returns
`Various`

##### Example

```javascript
var testObject = { one: 'foo', two: 'bar' };
Spektral.getParameter(testObject, 'one', 'default');
//Returns: foo
Spektral.getParameter(testObject, 'three', 'test');
//Returns: test
```

12. Spektral.getExtension(file);
------

#### Description
Checks a file name, and returns it's extension

#### Arguments
file: `String` - The file name

##### Returns
`String`

##### Example

```javascript
Spektral.getExtension('test.jpg');
//Returns: jpg
```

13. Spektral.getKey(evt);
------

#### Description
Converts the key code recieved from a keydown/keyup event to a human readable string. Note: does not work for keypress events

#### Arguments
evt: `Event object` - The event object returned

##### Returns
`String`

##### Example

```javascript
testInput.onkeydown = function(evt){
	Spektral.getKey(evt);	
}
//If enter key hit, returns: ENTER
//If shift + 4 hit, returns: DOLLAR_SIGN
```

14. Spektral.getMousePos(evt);
------

#### Description
Gets mouse's position via an event object returned by mouseup, mousemove, or mousedown.

#### Arguments
evt: `Event object` - The event object returned

##### Returns
`Object`

##### Keys
`innerX/innerY`: The position of the mouse within the element

`offsetX/offsetY`: The position relative to the scrollLeft/scrollTop position of the page

`pageX/pageY`: The position relative to the page/document

`screenX/screenY`: The position relative to the screen itself

`viewportX/viewportY`: The position in the visible display area of the browser

##### Example

````css
#mouseTestArea {
            position: absolute;
            top: 25px;
            left: 10px;
            padding: 0;
            margin: 0;
            height: 400px;
            width: 400px;
            background-color: #8bbfd1;
        }
````

````html
<div id="mouseTestArea">Mouse Test Area</div>
````

```javascript
var mouseTestArea = document.querySelector('#mouseTestArea'), mousePos;
mouseTestArea.onmousemove = function(evt){
    mousePos = Spektral.getMousePos(evt);
};
//If mouse is moved to left: 100px, top: 50px
//Returns: {"innerX":90,"innerY":25,"offsetX":0,"offsetY":0,"pageX":100,"pageY":50,"screenX":88,"screenY":140,"viewportX":100,"viewportY":50}
```

15. Spektral.getViewportSize();
------

#### Description
Returns an object containing the width and height of the viewport

#### Arguments
None

##### Returns
`Object`

##### Keys
`width/height`: The width and height of the viewport

##### Example

```javascript
var viewportSize = Spektral.getViewportSize();
//For example a viewport of 1024 x 768 would return viewportSize.width of 1024 and viewportSize.height of 768
```

16. Spektral.getPosition(element);
------

#### Description
Returns an object containing the position of the element

#### Arguments
element: `HTMLElement` - The element you want to get the position of

##### Returns
`Object`

##### Keys
`x/y`: The left and top positions relative to the parent element

`top/right/bottom/left`: The top, left, bottom, and right positions relative to the parent element

`boundX/boundY`: The left and top positions returned via the getBoundingClientRect() method

`boundTop/boundRight/boundBottom/boundLeft`: The top, right, bottom, and left positions returned via the getBoundingClientRect() method

`docX/docY`: The left and top positions relative to the document

`docTop/docRight/docBottom/docLeft`: The top, left, bottom, and left positions relative to the document

##### Example

````css
#testDiv {
    position:  absolute;
    top: 475px;
    left: 125px;
}
````

````html
<div id='testDiv'></div>
````

```javascript
var 
	tDiv = document.querySelector('#testDiv'), 
	posObj = Spektral.getPosition(tDiv);
//posObj.x = 125px;
//posObj.y = 475px;
```

17. Spektral.getDimensions(element);
------

#### Description
Returns an object containing the dimensions of the element

#### Arguments
element: `HTMLElement` - The element you want to get the dimensions of

##### Returns
`Object`

##### Keys
`width/height`: The width and height of the element itself without any padding, borders, or margins

`innerWidth/innerHeight`: The width and height of the element itself + padding

`borderWidth/borderHeight`: The width and height of the element itself + padding + border

`totalWidth/totalHeight`: The width and height of the element itself + padding + border + margin

`paddingTop/paddingRight/paddingBottom/paddingLeft`: The padding values for the top, right, bottom, and left of the element

`borderTop/borderRight/borderBottom/borderLeft`: The border values for the top, right, bottom, and left of the element

`marginTop/marginRight/marginBottom/marginLeft`: The margin values for the top, right, bottom, and left of the element

`padding`: Only returned if the padding is the same value for all sides

`margin`: Only returned if the margin is the same value for all sides

##### Example

````css
#testDiv {
    margin: 20px;
    padding: 5px 10px 5px 10px;
}
````

````html
<div id='testDiv'></div>
````

```javascript
var 
	tDiv = document.querySelector('#testDiv'), 
	dimensionsObj = Spektral.getDimensions(tDiv);
//Returns: dimensionsObj.margin = 20
//Returns: dimensionsObj.paddingRight = 10
```

18. Spektral.getDocDimensions();
------

#### Description
Returns an object containing the overall width and height of the document

#### Arguments
None

##### Returns
`Object`

##### Keys
`width/height`: The width and height of the document

##### Example

```javascript
var docDim = Spektral.getDocDimensions();
```

19. Spektral.allAreEqualTo(val, arr);
------

#### Description
Checks an array to see if all values in it match a certain value, and returns a boolean

#### Arguments
val: `String/Number/Boolean` - The value you want to check for
arr: `Array` - The values you want to check against

##### Returns
`Boolean`

##### Example

```javascript
Spektral.allAreEqualTo(5, [5, 5, 5]);
//Returns: true
Spektral.allAreEqualTo('foobar', ['foo', 'bar', 'spektral']);
//Returns: false
```

20. Spektral.createTimer(time, handler);
------

#### Description
Sets and returns a timer 

#### Arguments
time: `Number` - The interval in seconds at which you'd like the handler to fire
handler: `Function` - The function to be called when the timer is fired

##### Returns
`Timer`

##### Example

```javascript
var timer = Spektral.createTimer(2, function(){
	//Will fire every two seconds
});
```

21. Spektral.stopTimer(timer);
------

#### Description
Clears a timer and stops it from firing

#### Arguments
timer: `Timer` - The timer you want to clear

##### Returns
`Nothing`

##### Example

```javascript
var timer = Spektral.createTimer(2, function(){
	//Will fire every two seconds
});
Spektral.stopTimer(timer);
//timer has been stopped
```

22. Spektral.createTimeOut(time, handler);
------

#### Description
Creates a time out

#### Arguments
time: `Number` - The amount of time in seconds you want to wait before triggering the time out
handler: `Function` - The function you want to call when the time out is triggered

##### Returns
`Timeout`

##### Example

```javascript
var timeout = Spektral.createTimeOut(2, function(){
	//Will fire once after two seconds
});
```

23. Spektral.stopTimeOut(timeout);
------

#### Description
Clears a time out before it can fire

#### Arguments
timeout: `Timeout` - The timeout you want to clear

##### Returns
`Nothing`

##### Example

```javascript
var timeout = Spektral.createTimeOut(2, function(){
	//Will fire once after two seconds
});
Spektral.stopTimeOut(timeout);
//timeout has been stopped
```
---

## STYLE

1. Spektral.setStyle(element, props, options);
------

##### Description
Sets the inline style of an element, and appends an existing style.

##### Arguments
element: `HTMLElement` - The element you want to set style of 
props: `Object` - The css properties you want to set
options: `Object` - All optional parameters are passed through this object

#### Available Options
```JavaScript
{
	append: true //Appends new style properties to exisiting style
}
```

##### Returns
`Nothing`

##### Example

```html
<div id='testDiv' style='padding:10px'></div>
```

```javascript
var tDiv = document.querySelector('#testDiv');

Spektral.setStyle(tDiv, { padding: '5px', margin: '10px' }, { append: true });
//Sets: <div id='testDiv' style='padding:5px; margin:10px;'></div>
```

2. Spektral.getInlineStyle(element);
------

#### Description
Gets the inline style of an element, returns each property and value in an object

#### Arguments
element: `HTMLElement` - The element you want to get the inline stlye of

##### Returns
`Object`

##### Example

```html
<div id="testDiv" style="margin:10px; padding:2px; display:block"></div>
```

```javascript
var testDiv = document.querySelector('#testDiv'), inlineStyle;

inlineStyle = Spektral.getInlineStyle(testDiv);
//Returns: {"display":"block","margin":"10px","padding":"2px"}
```

3. Spektral.clearInlineStyle(element);
------

#### Description
Clears the inline style of an element

#### Arguments
element: `HTMLElement` - The element you want to clear the inline style of

##### Returns
`Nothing`

##### Example

```html
<div id="testDiv" style="margin:10px; padding:2px; display:block"></div>
```

```javascript
var testDiv = document.querySelector('#testDiv');

Spektral.clearInlineStyle(testDiv);
//<div id="testDiv"></div>
```

4. Spektral.getStyleValue(element, styleProperty);
------

#### Description
Gets the style property of an element and returns its value

#### Arguments
element: `HTMLElement` - The element you want to target
styleProperty: `String` - The property you want to get the value of

##### Returns
`String`

##### Example

```html
<div id="testDiv" style="margin:2px; padding:5px; display:block"></div>
```

```javascript
var testDiv = document.querySelector('#testDiv');

Spektral.getStyle(testDiv, 'margin');
//Returns: 2px
Spektral.getStyle(testDiv, 'padding');
//Returns: 5px
Spektral.getStyle(testDiv, 'block');
//Returns: block
```

5. Spektral.useHandCursor(element, options);
------

#### Description
Changes cursor style of element to hand(pointer), helpful for letting users know non-input elements are clickable

#### Arguments
element: `HTMLElement` - The element you want to target
options: `Object` - All optional parameters are passed through this object

#### Available Options
```JavaScript
{
	cursorType: 'pointer' //Can be set to any of the accepted cursor styles
}
```

##### Returns
`Nothing`

##### Example

```html
<div id="testDiv"></div>
```

```javascript
var testDiv = document.querySelector('#testDiv');

Spektral.useHandCursor(testDiv);
//testDiv will now have a cursor style of 'pointer'
Spektral.useHandCursor(testDiv, cursorType: 'crosshair');
//testDiv will now have a cursor style of 'crosshair'
```

6. Spektral.useDefaultCursor(element);
------

#### Description
Changes the elements cursor back to the default

#### Arguments
element: `HTMLElement` - The element you want to target

##### Returns
`Nothing`

##### Example

```html
<div id="testDiv" style="cursor:help"></div>
```

```javascript
var testDiv = document.querySelector('#testDiv');

Spektral.useDefaultCursor(testDiv);
//testDiv will now have a cursor style of 'default'
```

7. Spektral.hideElement(element, options);
------

#### Description
Hides an element by setting visibility to 'hidden' by default, or optionally display to 'none'

#### Arguments
element: `HTMLElement` - The element you want to target
options: `Object` - All optional parameters are passed through this object

#### Available Options
```JavaScript
{
	useDisplay: false //If set to true, sets display to 'none'
}
```

##### Returns
`Nothing`

##### Example

```html
<div id="testDiv"></div>
```

```javascript
var testDiv = document.querySelector('#testDiv');

Spektral.hideElement(testDiv);
//Sets: <div id="testDiv" style="visibility:hidden"></div>
Spektral.hideElement(testDiv, { useDisplay: true });
//Sets: <div id="testDiv" style="display:none"></div>
```

8. Spektral.showElement(element, options);
------

#### Description
Shows an element by setting visibility to 'visible' and display to 'block'

#### Arguments
element: `HTMLElement` - The element you want to target
options: `Object` - All optional parameters are passed through this object

#### Available Options
```JavaScript
{
	displayType: 'block' //Accepts other accepted display values
}
```

##### Returns
`Nothing`

##### Example

```html
<div id="testDiv" style="visibility:hidden"></div>
```

```javascript
var testDiv = document.querySelector('#testDiv');

Spektral.showElement(testDiv);
//Sets: <div id="testDiv" style="display:block; visibility:visible;"></div>
Spektral.hideElement(testDiv, { displayType: 'inline' });
//Sets: <div id="testDiv" style="display:inline; visibility:visible;"></div>
```
---

## XHR

1. Spektral.getXHR();
------

##### Description
Returns the XMLHttpRequest object of the browser

##### Returns
`Object`

##### Example

```javascript
var xhr = Spektral.getXHR();
```

2. Spektral.loadFile(file, callback, options);
------

#### Description
Used to load external json, XML, and txt files.

#### Arguments
file: `String` - The path to the file
callback: `Function` - The callback function on a successful load, the loaded file is accessed through the returned event object
options: `Object` - All optional parameters are passed through this object

#### Available Options
```JavaScript
{
	async: true, //Determines whether the file should be loaded synchronously or asynchronously
	onerror: function(){} //The optional function you can call on an error
}
```

##### Returns
`Nothing`

##### Example

```javascript
var txtFile;
Spektral.loadFile('path/to/text.txt', onLoaded, { onerror: function(){
	//An error has occurred
}});

function onLoaded(e){
	txtFile = e;
}
```
---

##Window

1. Spektral.setQueryString(obj, options);
------

#### Description
Sets and/or appends a query string.

#### Arguments
obj: `Object` - The query keys and values
options: `Object` - All optional parameters are passed through this object

#### Available Options
```JavaScript
{
	append: false //If set to true will keep the previous query string and update existing values if needed
}
```

##### Returns
`Nothing`

##### Example

```javascript
Spektral.setQueryString({ foo: 'bar', spektral: 2 });
//Sets: http://host/path?foo=bar&spektral=2

Spektral.setQueryString({ testVal: 'test', spektral: 5 }, { append: true });
//Sets: http://host/path?foo=bar&spektral=5&testVal=test
```


