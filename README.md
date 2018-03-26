## Functions

<dl>
<dt><a href="#isEmpty">isEmpty(val)</a></dt>
<dd><p>Returns wether or not the string or Array is empty or undefined/null</p>
</dd>
<dt><a href="#deprecated">deprecated(method, otherMethod)</a></dt>
<dd><p>Use this method to mark deprecated methods in libraries so they show up in the console.</p>
</dd>
<dt><a href="#toQueryString">toQueryString(options, base)</a></dt>
<dd><p>Converts an Object of String/Value pairs to a query string for URL parameters prepended with the &quot;base&quot; character.
Encodes unsafe url characters to url safe encodings.</p>
</dd>
<dt><a href="#toParams">toParams(str)</a></dt>
<dd><p>Converts URL parameters to a Object collection of key/value pairs
Decodes encoded url characters to back to normal strings.</p>
</dd>
<dt><a href="#getFromObj">getFromObj(path, obj, fb)</a></dt>
<dd><p>Returns the value of an object via the path as a string</p>
</dd>
<dt><a href="#template">template(template, map, fallback)</a></dt>
<dd><p>Processes a string formatted like an ES6 template against an object</p>
</dd>
</dl>

<a name="isEmpty"></a>

## isEmpty(val)
Returns wether or not the string or Array is empty or undefined/null

**Kind**: global function  

| Param | Type |
| --- | --- |
| val | <code>String</code> \| <code>Array</code> | 

<a name="deprecated"></a>

## deprecated(method, otherMethod)
Use this method to mark deprecated methods in libraries so they show up in the console.

**Kind**: global function  

| Param | Type |
| --- | --- |
| method | <code>String</code> | 
| otherMethod | <code>String</code> | 

<a name="toQueryString"></a>

## toQueryString(options, base)
Converts an Object of String/Value pairs to a query string for URL parameters prepended with the "base" character.
Encodes unsafe url characters to url safe encodings.

**Kind**: global function  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 
| base | <code>String</code> | 

**Example** *(convert object to query string)*  
```js

import {toQueryString} from '@helio/utils';
let queryString = toQueryString({
 foo: 'bar',
 hello: ['world', 'array'],
 unsafe: 'I am an unsafe string'

}, '#');

queryString == '#?foo=bar&hello=world&hello=array&unsafe=I%20am%20an%20unsafe%20string';
```
<a name="toParams"></a>

## toParams(str)
Converts URL parameters to a Object collection of key/value pairs
Decodes encoded url characters to back to normal strings.

**Kind**: global function  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

**Example** *(convert query string to object:)*  
```js
import {toParams} from '@helio/utils';
let paramsObject = toParams('#?foo=bar&hello=world&hello=array&unsafe=I%20am%20an%20unsafe%20string');

paramsObject == {
 foo: 'bar',
 hello: ['world', 'array'],
 unsafe: 'I am an unsafe string'

};
```
<a name="getFromObj"></a>

## getFromObj(path, obj, fb)
Returns the value of an object via the path as a string

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> |  |
| obj | <code>Object</code> | Object to find the property in |
| fb | <code>String</code> | Fallback string when not found |

**Example**  
```js
let result = getFromObj('hello.foo', {
 hello: {
   foo: 'bar'
 }
});
result == 'bar';
```
<a name="template"></a>

## template(template, map, fallback)
Processes a string formatted like an ES6 template against an object

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| template | <code>String</code> | the string template |
| map | <code>Object</code> | Key/Value pairs to process the string against |
| fallback | <code>String</code> | they string fallback when the value is missing. |

**Example**  
```js
let result = template('I am a string literal formatted ${message.label}.', {
 message: {
   label: 'to look like an ES6 template'
 }
});

result == 'I am a string literal formatted to look like an ES6 template.';
```
