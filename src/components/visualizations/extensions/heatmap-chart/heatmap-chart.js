import React from 'react'
import PropTypes from 'prop-types'
import { XAxis, YAxis, HeatmapSeries, Hint, Voronoi, FlexibleXYPlot } from 'react-vis'
import { isEmpty, sortBy } from 'lodash'
import { scaleLinear } from 'd3-scale'

import Subtitle from '../../subtitle'

import abbrNumberFormatter from '../../../../utils/abbr-number-formatter'

import styles from './heatmap-chart.module.scss'

class Heatmap extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      containerWidth: null,
      data: {},
      fixedData: {},
      value: {},
    }
  }

  componentDidMount = () => {
    const data = this.dataPreparation()

    this.setState({
      containerWidth: this.content.offsetWidth,
      data,
      fixedData: data,
    })
  }

  dataPreparation = () => {
    const { data, customs } = this.props
    const { groups: xAxis, groupLabel: yAxis } = customs

    const prepData = yAxis.map((yAxisItem, yAxisIndex) => {
      const row = data.find(element => element.name === yAxisItem)
      const prepRow = Object.entries(row.main).map(xAxisItem => ({
        color: xAxisItem[1],
        label: xAxisItem[0],
        style: { stroke: 'white', strokeWidth: '2px' },
        x: xAxis.findIndex(el => el === xAxisItem[0]) + 1,
        y: yAxisIndex,
      }))

      return prepRow
    })
    const sortedData = sortBy(prepData.flat(), ['x', 'y'])

    return sortedData
  }

  handleOnHover = node => {
    const { fixedData } = this.state
    const currentCell = {
      ...fixedData.find(element => element.x === node.x && element.y === node.y),
      style: { stroke: 'white', strokeWidth: '4px' },
    }

    this.setState({
      data: [
        ...fixedData.filter(element => element.x !== node.x || element.y !== node.y),
        currentCell,
      ],
      value: fixedData.find(
        element =>
          element.x === node.x &&
          Math.abs(element.y - (this.props.customs.groupLabel.length - 1)) === node.y
      ),
    })
  }

  generateSubtitle = () => {
    const { compare, customs, numeric } = this.props
    const highestValue = this.getHighestValue()

    if (!customs.subtitle) return null

    return <Subtitle compare={compare} highestValue={highestValue} numeric={numeric} />
  }

  generateVoronoi = (defaultMargin, height) => {
    const { containerWidth, data, fixedData } = this.state
    const { top, left, right, bottom } = defaultMargin

    if (isEmpty(fixedData)) return null

    const xScale = scaleLinear()
      .domain(this.getDomain(fixedData, 'x'))
      .range([left + 13, containerWidth - right - 13])

    const yScale = scaleLinear()
      .domain(this.getDomain(fixedData, 'y'))
      .range([height - bottom - 10, top + 10])

    return (
      <Voronoi
        extent={[
          [left, right],
          [containerWidth - right, height - bottom],
        ]}
        nodes={sortBy(data, ['x', 'y'])}
        onBlur={() => {
          this.setState({ data: fixedData, value: {} })
        }}
        onHover={this.handleOnHover}
        x={element => xScale(element.x)}
        y={element => yScale(element.y)}
      />
    )
  }

  generateTooltip = () => {
    const { value } = this.state

    if (isEmpty(value)) return null

    return (
      <Hint className={styles.tooltip} value={value}>
        <div className={styles.content}>
          <div className={styles.label}>{value.label}</div>
          <div>{abbrNumberFormatter(value.color)}</div>
        </div>
      </Hint>
    )
  }

  getDomain = (data, key) => {
    const { min, max } = data.reduce(
      (acc, row) => ({
        min: Math.min(acc.min, row[key]),
        max: Math.max(acc.max, row[key]),
      }),
      { min: Infinity, max: 0 }
    )

    return [min, max]
  }

  getHighestValue = () => {
    const result = { main: { name: '', value: 0 } }
    this.props.data.map(item => {
      let highestRowValue = 0
      let highestRowName = ''
      Object.entries(item.main).forEach(lst => {
        if (lst[1] > highestRowValue) [highestRowName, highestRowValue] = lst
      })
      if (highestRowValue > result.main.value) {
        result.main.name = `${item.name} ${highestRowName}`
        result.main.value = highestRowValue
      }
    })

    return result
  }

  render() {
    const { customs } = this.props
    const { groupLabel: yAxis, virtualGroup } = customs
    const { fixedData } = this.state
    const height = 180
    const defaultMargin = { left: 35, right: 10, top: 10, bottom: 30 }

    const virtualXAxis = virtualGroup.map(item => Object.values(item)).flat()
    const xAxis = [...virtualXAxis, virtualXAxis[0]]
    const xAxisLength = xAxis.map((item, index) => index + 0.5)
    const yAxisLength = yAxis.map((item, index) => index)

    return (
      <>
        {this.generateSubtitle()}
        <div
          className={styles.container}
          ref={el => {
            this.content = el
          }}
          style={{ height }}
        >
          {!isEmpty(fixedData) && (
            <FlexibleXYPlot
              className={styles.wrapper}
              margin={defaultMargin}
              yDomain={[yAxis.length, -1]}
            >
              <XAxis
                tickFormat={(item, index) => {
                  if (item % 1 !== 0) return xAxis[index]
                }}
                tickValues={xAxisLength}
              />
              <YAxis tickFormat={item => yAxis[item]} tickValues={yAxisLength} />
              <HeatmapSeries colorRange={['#d4daf3', '#425ede']} data={fixedData} />
              {this.generateVoronoi(defaultMargin, height)}
              {this.generateTooltip()}
            </FlexibleXYPlot>
          )}
        </div>
      </>
    )
  }
}

Heatmap.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      main: PropTypes.object.isRequired,
      name: PropTypes.string.isRequired,
      secondary: PropTypes.object,
    })
  ).isRequired,

  compare: PropTypes.bool,
  customs: PropTypes.object,
  numeric: PropTypes.string,
}

Heatmap.defaultProps = {
  compare: false,
  customs: null,
  numeric: 'absolute',
}

export default Heatmap
