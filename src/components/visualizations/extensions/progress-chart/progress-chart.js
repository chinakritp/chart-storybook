import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

import abbrNumberFormatter from '../../../../utils/abbr-number-formatter'

import styles from './progress-chart.module.scss'

const subtitleTemplate = (title, value1, value2) => {
  return (
    <div className={styles.subtitle}>
      <div className={styles.main}>
        <h4 className={styles.label}>{title}</h4>
        <p className={styles.value}>
          {`${abbrNumberFormatter(value1)} of ${abbrNumberFormatter(value2)}`}
        </p>
      </div>
    </div>
  )
}

const ProgressChart = ({ customs, data }) => {
  const { reversedBar, footer, unit, additionals, mainField } = customs
  const { customTooltipLabel, totalCapacity } = additionals

  const numeratorData = data.find(item => item.name === mainField)
  const denominatorData = data.find(item => item.name === totalCapacity)
  const totalValue = (numeratorData.main.value / denominatorData.main.value) * 100
  const barWidth = reversedBar ? 100 - totalValue : totalValue

  const tooltipData = reversedBar
    ? {
        name: customTooltipLabel,
        main: { value: denominatorData.main.value - numeratorData.main.value },
      }
    : numeratorData

  return (
    <>
      {subtitleTemplate(numeratorData.name, numeratorData.main.value, denominatorData.main.value)}
      <div className="context-wrapper">
        <div className="progress-context">
          <span className="text-value">{abbrNumberFormatter(numeratorData.main.value)}</span>
          <span className="text-unit">{unit}</span>
        </div>
        <div data-tip data-for="progress-bar" className="progress-wrapper">
          <div className="progress-bar-cell" style={{ width: `${barWidth}%` }} />
        </div>
        {footer && <div className="percentage-footer">{barWidth.toFixed(1)}%</div>}
        <ReactTooltip className="tooltip-progress" effect="float" id="progress-bar" type="light">
          <span className="tooltip-label">{tooltipData.name}</span>
          <span>{` ${abbrNumberFormatter(tooltipData.main.value)}`}</span>
        </ReactTooltip>
      </div>
    </>
  )
}

ProgressChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      main: PropTypes.object.isRequired,
      name: PropTypes.string.isRequired,
      secondary: PropTypes.object,
    })
  ).isRequired,

  customs: PropTypes.object,
}

ProgressChart.defaultProps = {
  customs: null,
}

export default ProgressChart
