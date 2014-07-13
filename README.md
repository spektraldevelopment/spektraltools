spektraltools
=============
A JavaScript library for DOM manipulation and other uses. This is the spiritual successor of spektraljs.

---

## DOM

#### 1. addElement(parent, type, attrs)

##### Description
Adds a new element to a parent container.

##### Arguments
container:HTMLElement - The parent you want to add the new element to.

type:String - The type of element you want.

attrs:Object - Any attributes you want to add. Note: To set class, use className instead.

##### Returns
HTMLElement

##### Example

```javascript
var newDiv = Spektral.addElement(parentDiv, 'div', { id: 'newDiv', className: 'div-style'});
```

---


