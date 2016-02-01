import whitelist from 'app/whitelist'
import expect from 'expect'

describe('whitelist', () => {
  it('is a function', () => {
    expect(whitelist).toBeA('function')
  })

  it('returns a function', () => {
    expect(whitelist(new Set([]))).toBeA('function')
  })

  describe('check url', () => {
    it('returns false if the url is not in the whitelist', () => {
      expect(whitelist(new Set([]))('http://www.google.com')).toBe(false)
    })

    it('returns true if the domain is in the whitelist', () => {
      const domains = new Set(['google.com'])
      expect(whitelist(domains)('http://google.com')).toBe(true)
    })

    it('returns true if the domain has a subdomain', () => {
      const domains = new Set(['google.com'])
      expect(whitelist(domains)('http://www.google.com')).toBe(true)
    })

    it('returns true if the domain has multiple subdomains', () => {
      const domains = new Set(['google.com'])
      expect(whitelist(domains)('http://yo.www.google.com')).toBe(true)
    })
  })
})
