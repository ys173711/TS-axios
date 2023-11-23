/**
 * @jest-environment jsdom
 */
import cookie from '../../src/helpers/cookie'

/* 
* cookie test
*/
describe('cookie', () => {
  test('read cookie if it exist', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('foo')).toBe('baz')
  })

  test("read cookie if it doesn't exist", () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('fo')).toBeNull()
  })
})