import React from 'react'
import PropTypes from 'prop-types'
import c3 from 'c3'
import { isEqual } from 'lodash'

class C3 extends React.Component {
  componentDidMount() {
    this.updateChart(this.props)
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.data.json, prevProps.data.json)) {
      this.updateChart(this.props)
    }
  }

  componentWillUnmount() {
    this.destroyChart()
  }

  destroyChart() {
    try {
      this.chart = this.chart.destroy()
    } catch (err) {
      throw new Error('Internal C3 error', err)
    }
  }

  generateChart(mountNode, config) {
    const newConfig = { bindto: mountNode, ...config }
    return c3.generate(newConfig)
  }

  loadNewData(data) {
    this.chart.load(data)
  }

  unloadData() {
    this.chart.unload()
  }

  updateChart(config) {
    if (!this.chart) {
      this.chart = this.generateChart(this.node, config)
    }

    if (config.unloadBeforeLoad) {
      this.unloadData()
    }

    this.loadNewData(config.data)
  }

  render() {
    const className = this.props.className ? ` ${this.props.className}` : ''
    const style = this.props.style ? this.props.style : {}
    return (
      <div
        ref={node => {
          this.node = node
        }}
        className={className}
        style={style}
      />
    )
  }
}

C3.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

C3.defaultProps = {
  className: '',
  style: {},
}

export default C3
