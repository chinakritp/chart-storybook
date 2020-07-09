import abbrNumberFormatter from './abbr-number-formatter'

const displayValue = (value, numeric, decimal = 0) => {
  const fixed = value.toFixed(decimal)
  if (numeric === 'absolute') return abbrNumberFormatter(fixed)

  const result = fixed < 1 && value > 0 ? '< 1' : fixed
  return `${result}%`
}

export default displayValue
