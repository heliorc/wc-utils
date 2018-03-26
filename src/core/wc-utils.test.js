import {capitalizeString, renderLiteral, template} from './wc-utils.js';

describe('capitalizeString()', () => {
  it("should be capitalized", () => {
    expect(capitalizeString('foo'))
      .toBe('Foo');
  })
});
describe('renderLiteral()', () => {
  xit("should process a template literal passed as a regular string", () => {
    expect(renderLiteral('hello ${this.name}!', {name: 'caroline'}))
      .toBe('hello caroline!');
  })
});
describe('template()', () => {
  it("should process string replacement formatted like ES6 template literals.", () => {
    expect(template('hello ${name}!', {name: 'bobby'}))
      .toBe('hello bobby!');
  });

  xit("should detect the presence of 'this.' in a string and process is with renderTemplate instead", () => {
    expect(template('hello ${this.gulname}!', {name: 'horace'}))
      .toBe('hello horace!');
  })
});