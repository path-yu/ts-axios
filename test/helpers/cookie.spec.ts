import cookie from '../../src/helpers/cookie'

describe('helpers:cookie', () => {
    test('should read cookies', () => {
        document.cookie = 'foo=baz'
        expect(cookie.read('foo')).toBe('baz')
    })

    test('should return null if cookie name is exist', () => {
        document.cookie = 'foo=baz'
        expect(cookie.read('bar')).toBeNull();
        expect(cookie.read('foo')).not.toBeNull();
    })
})
