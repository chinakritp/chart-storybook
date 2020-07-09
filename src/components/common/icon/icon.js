import React from 'react'
import PropTypes from 'prop-types'
import MaterialIcon from '@material-ui/core/Icon'

import './icon.scss'

const Icon = ({ color, customCSS, icon, size, ...props }) => {
  let output = <i className={customCSS} />

  if (icon)
    output = (
      <MaterialIcon {...props} style={{ color, fontSize: size }}>
        {icon}
      </MaterialIcon>
    )

  return output
}

Icon.propTypes = {
  color: PropTypes.string,
  customCSS: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.number,
}

Icon.defaultProps = {
  color: null,
  customCSS: '',
  icon: '',
  size: null,
}

export default Icon
