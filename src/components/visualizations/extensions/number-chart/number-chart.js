import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty, includes } from 'lodash'

import abbrNumberFormatter from '../../../../utils/abbr-number-formatter'
import Icon from '../../../common/icon'

const NumberChartTemplate = ({ customs, data }) => {
  const percentageItem = !isEmpty(customs.subNumeric)
    ? customs.subNumeric.filter(item => item.numeric_option === 'percentage').map(lst => lst.label)
    : []

  return (
    <div className="main-context">
      <div className="column-wrapper">
        {data.map(item => (
          <div className="column" key={`key_${item.name}`}>
            {customs.metricLabel && (
              <div className="text-label">
                {includes(customs.iconLabel, item.name) ? (
                  <Icon color="#4662cd" icon={item.name} size={16} />
                ) : (
                  item.name
                )}
              </div>
            )}
            <div className="text-value">
              {includes(percentageItem, item.name)
                ? `${item.main.value.toFixed()}%`
                : abbrNumberFormatter(item.main.value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

NumberChartTemplate.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      main: PropTypes.object.isRequired,
      name: PropTypes.string.isRequired,
      secondary: PropTypes.object,
    })
  ).isRequired,

  customs: PropTypes.object,
}

NumberChartTemplate.defaultProps = {
  customs: null,
}

export default NumberChartTemplate
