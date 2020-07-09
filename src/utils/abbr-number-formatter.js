const ranges = [
  { divider: 1e3, suffix: 'k' },
  { divider: 1e6, suffix: 'M' },
]

const abbrNumberFormatter = (number, decimalLength = 1) => {
  let result = number.toString()
  const absoluteDecimal = result.match(/^[0-9]+\.0+$/) || !result.includes('.') ? 0 : decimalLength
  result = parseFloat(result).toFixed(absoluteDecimal)

  ranges.forEach(item => {
    if (number >= item.divider) {
      result = (number / item.divider).toFixed(decimalLength).toString()
      if (result.split('.')[1].match(/^0+$/)) {
        result = (number / item.divider).toFixed(0).toString()
      }
      result += item.suffix
    }
  })

  return result
}

export default abbrNumberFormatter
