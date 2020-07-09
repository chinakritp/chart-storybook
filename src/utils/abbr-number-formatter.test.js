import abbrNumberFormatter from './abbr-number-formatter'

const testcases = [
  [123, 0, '123'],
  [123.12456, 1, '123.1'],
  [1234, 1, '1.2k'],
  [12345, 2, '12.35k'],
  [123456, 3, '123.456k'],
  [1234567, 4, '1.2346M'],
  [12345678, 5, '12.34568M'],

  // Exponential Numbers
  [123e1, 1, '1.2k'],
  [1234e2, 1, '123.4k'],
  [12345e3, 1, '12.3M'],
  [123456e4, 1, '1234.6M'],
  [1234567e5, 1, '123456.7M'],
  [12345678e6, 1, '12345678M'],
  [0.12345678e7, 1, '1.2M'],
]

describe('abbrNumberFormatter function', () => {
  testcases.forEach(([number, decimalLength, expected]) => {
    it('should return correct number', () => {
      const result = abbrNumberFormatter(number, decimalLength)

      expect(result).toBe(expected)
    })
  })
})
