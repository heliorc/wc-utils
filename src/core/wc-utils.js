/**
 *
 * Returns wether or not the string or Array is empty or undefined/null
 * @param {String|Array} val
 */

const isEmpty = (val) => {
  return !val || !val.length;
};

/**
 *
 * Use this method to mark deprecated methods in libraries so they show up in the console.
 * @param {String} method
 * @param {String} otherMethod
 */
const deprecated = (method, otherMethod) => console.warn(`${method} is deprecated. please use ${otherMethod} instead.`);


/**
 * Converts an Object of String/Value pairs to a query string for URL parameters prepended with the "base" character.
 * Encodes unsafe url characters to url safe encodings.
 * @param {Object} options
 * @param {String} base
 *
 * @example <caption>convert object to query string</caption>
 *
 * import {toQueryString} from '@helio/utils';
 * let queryString = toQueryString({
 *  foo: 'bar',
 *  hello: ['world', 'array'],
 *  unsafe: 'I am an unsafe string'
 * 
 * }, '#');
 *
 * queryString == '#?foo=bar&hello=world&hello=array&unsafe=I%20am%20an%20unsafe%20string';
 */
const toQueryString = (options, base) => {
  const filtered = Object.entries(options).filter(ent => !!ent[1]);
  base = (base || '#');
  const hashBase = filtered.length > 0 ? base + '?' : base;
  return encodeURI(`${hashBase}${filtered.map(ent => {
    if (Array.isArray(ent[1])) {
      return ent[1].map(val => [ent[0], val].join('=')).join('&');
    } else {
      return ent.join('=');
    }
  }).join('&')}`);
};

/**
 * Converts URL parameters to a Object collection of key/value pairs
 * Decodes encoded url characters to back to normal strings.
 * @param {String} str
 *
 * @example <caption>convert query string to object:</caption>
 * import {toParams} from '@helio/utils';
 * let paramsObject = toParams('#?foo=bar&hello=world&hello=array&unsafe=I%20am%20an%20unsafe%20string');
 *
 * paramsObject == {
 *  foo: 'bar',
 *  hello: ['world', 'array'],
 *  unsafe: 'I am an unsafe string'
 * 
 * };
 */
const toParams = (str) => {
  const tempstr = str.split('#', 2);
  if(tempstr[1]){
    str = tempstr[1];
  }
  const parts = str.split('?');
  const queryString = parts[1] || '';
  const params = {};
  queryString.split('&').forEach(val => {
    const innerParts = val.split('=');
    if (innerParts.length !== 2) return;
    const paramKey = decodeURIComponent(innerParts[0]);
    const paramVal = decodeURIComponent(innerParts[1]);
    let current = params[paramKey];
    if (current) {
      if (!Array.isArray(current)) {
        current = [current];
      }
      current.push(paramVal);
    } else {
      current = paramVal;
    }
    params[paramKey] = current;
  });
  return params;
};


/**
 * Returns the value of an object via the path as a string
 * @param {String} path
 * @param {Object} obj Object to find the property in
 * @param {String} fb Fallback string when not found
 *
 * @example
 * let result = getFromObj('hello.foo', {
 *  hello: {
 *    foo: 'bar'
 *  }
 * });
 * result == 'bar';
 */
const getFromObj = (path, obj, fb = `$\{${path}}`) => {
  return path.split('.').reduce((res, key) => res[key] != null ? res[key] : fb, obj);
};

/**
 * Processes a string formatted like an ES6 template against an object
 * @param {String} template the string template
 * @param {Object} map Key/Value pairs to process the string against
 * @param {String} fallback they string fallback when the value is missing.
 *
 * @example
 * let result = template('I am a string literal formatted ${message.label}.', {
 *  message: {
 *    label: 'to look like an ES6 template'
 *  }
 * });
 *
 * result == 'I am a string literal formatted to look like an ES6 template.';
 */
const template = (tmpl, map, fallback) => {
  const root = Object.assign({this: map}, map);
  // if (tmpl.match(/\$\{\s*this\s*\./gm)) {
  //   // cant enable this until we drop IE support. for now we can only do substitutions.
  //   // return renderLiteral(tmpl, map);
  // }
  return tmpl && tmpl.replace(/\$\{.+?}/g, (match) => {
    const path = match.substr(2, match.length - 3).trim();
    return getFromObj(path, root, fallback);
  });
};

const renderLiteral = (tmpl, obj) => {
  return new Function(`return \`${tmpl}\`;`).apply(obj);
};

/**
 * Capitalizes the first letter of a string
 * @param {String} str
 *
 * @example
 * let cap = capitalizeString("foo");
 *
 * cap == 'Foo';
 */
const capitalizeString = (str) => {
  return str && str.charAt(0).toUpperCase() + str.slice(1);
};

const splitDelimeters = /[_\-.]/g;

const camelCaseString = (str) => {
  const parts = str.split(splitDelimeters);
  let newStr = '';
  const cc = (part) => part.charAt(0)[`to${newStr ? 'Upper' : 'Lower'}Case`]() + part.slice(1);
  while (parts.length) {
    newStr += cc(parts.shift());
  }
  return newStr;
};

const getLocaleCurrencyFormat = (number, languageCode, countryCode, currencyCode) => {
  const currencyLocale = languageCode + '-' + countryCode;

  return parseFloat(number)
    .toLocaleString(currencyLocale, { style: 'currency', currency: currencyCode, minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const checkForZeroValue = (num, languageCode, countryCode, currencyCode) => {
  return num && num != 0 ? getLocaleCurrencyFormat(
    num,
    languageCode,
    countryCode,
    currencyCode) : 0;
}

export {
  isEmpty,
  deprecated,
  toQueryString,
  toParams,
  template,
  renderLiteral,
  capitalizeString,
  camelCaseString,
  getFromObj,
  getLocaleCurrencyFormat,
  checkForZeroValue
};