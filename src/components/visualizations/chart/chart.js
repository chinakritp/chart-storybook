import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty, orderBy, sum } from 'lodash'
import cx from 'classnames'

import EmptyDataTemplate from '../extensions/empty-data'

import C3 from './c3'
import Subtitle from '../subtitle'
import abbrNumberFormatter from '../../../utils/abbr-number-formatter'
import displayValue from '../../../utils/display-value'

import './c3.scss'
import styles from './chart.module.scss'

class Chart extends React.Component {
  constructor(props) {
    super(props)

    this.inputKeys = []
    this.initialPositionLeft = null
    this.possibleValues = []

    this.state = {
      configProps: {},
      data: [],
      highestValue: {},
    }
  }

  componentDidMount() {
    const { compare, data } = this.props
    this.inputKeys = ['main', ...(compare ? ['compare'] : [])]
    this.possibleValues = Object.keys(data[0][this.inputKeys[0]])

    this.needsUpdate()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) this.needsUpdate()
  }

  getAxis() {
    const { axisRotate, axisType, axisYVisible } = this.props
    return {
      rotated: axisRotate,
      x: {
        type: axisType,
      },
      y: {
        show: axisYVisible,
      },
    }
  }

  getColorPattern() {
    const { compare } = this.props
    return {
      pattern: compare ? ['#425ede', '#f06300'] : ['#425ede', '#32d164', '#fec430'],
    }
  }

  getDataColor() {
    const { customColors } = this.props.customs
    if (!customColors) return false

    const { data } = this.state
    return (color, { index }) => {
      if (index !== undefined) {
        return customColors.find(({ label }) => label === data[index].name).color_code
      }
      return color
    }
  }

  getDataGroups() {
    const { groups } = this.props.customs
    if (!groups) return false

    const result = []
    this.inputKeys.forEach(list => {
      result.push(groups.map(group => `${list}.${group}`))
    })

    return result
  }

  getDataKeys() {
    const { compare } = this.props
    const dataField = {}
    this.inputKeys.forEach(key => {
      dataField[key] = this.possibleValues.map(list => `${key}.${list}`)
    })
    return {
      x: 'name',
      value: [...dataField.main, ...(compare ? [...dataField.compare] : [])],
    }
  }

  getDataLabels() {
    return false
  }

  getDataNames() {
    const { compare } = this.props
    const result = {}
    this.inputKeys.forEach(key => {
      this.possibleValues.forEach(list => {
        result[`${key}.${list}`] = `${list}${compare ? ` (${key})` : ''}`
      })
    })
    return result
  }

  getDisplayValue(value, decimal = 0) {
    const { numeric } = this.props
    return displayValue(value, numeric, decimal)
  }

  getGrid() {
    return {
      focus: {
        show: false,
      },
    }
  }

  getLegend() {
    return {
      ...(this.possibleValues.length < 2 && { show: false }),
    }
  }

  getTransition() {
    return {
      // C3 default value
      duration: 350,
    }
  }

  getTooltip() {
    const { customs, data: origin } = this.props
    const { data } = this.state
    const {
      customColors,
      customTooltip,
      tooltipUnit,
      unit,
      tooltipAdditionalValues,
      percentWithAbsolute,
    } = customs

    return {
      format: {
        name: () => '',
        title: x => {
          const formatTitle = !tooltipUnit ? data[x].name : `${data[x].name} ${unit}`
          return formatTitle
        },
        value: v => this.getDisplayValue(v),
      },
      order: (t1, t2) => t1.id > t2.id,
      ...(customTooltip && {
        contents: (d, defaultTitleFormat, defaultValueFormat, color) => {
          const categoryIndex = d[0].x
          const title = defaultTitleFormat(categoryIndex)
          const formatTitle = !tooltipUnit ? title : `${title} ${unit}`

          return `<table class="c3-tooltip">
            <tbody>
              <tr><th colspan="2">${formatTitle}</th></tr>
              ${d
                .map(elem => {
                  const [key, list] = elem.id.split('.')
                  const absoluteValue = origin.find(el => el.name === data[elem.x].name)[key][list]
                  const displayColor = customColors
                    ? customColors.find(({ label }) => label === title).color_code
                    : color(elem.id)

                  return `<tr class="c3-tooltip-name-${elem.id}">
                    <td class="name"><span style="background-color:${displayColor}"></span></td>
                    <td class="value">
                    ${this.addTooltipFieldUnit(title, this.getDisplayValue(elem.value))}
                    ${percentWithAbsolute ? ` - ${displayValue(absoluteValue, 'absolute')}` : ''}
                    ${tooltipAdditionalValues ? this.generateAdditionalContent(title) : ''}
                    </td>
                  </tr>`
                })
                .join('')}
            </tbody>
          </table>`
        },
      }),
    }
  }

  setBar() {
    return false
  }

  setChartType() {
    return 'line'
  }

  setDataOrder() {
    return null
  }

  setDonut() {
    return false
  }

  setPadding() {
    return this.props.padding
  }

  setPie() {
    return false
  }

  setSize() {
    return {
      height: 320,
      ...this.props.size,
    }
  }

  handleOnRendered() {
    return null
  }

  chartDecoration() {
    return false
  }

  highestValue(data) {
    // skip reference value
    const { mainField } = this.props.customs
    const skipingValue = ['No', mainField]

    const result = {}
    this.inputKeys.forEach(key => {
      result[key] = data
        .filter(({ name }) => !skipingValue.includes(name))
        .reduce(
          (accu, cur) =>
            sum(Object.values(cur[key])) > accu.value
              ? { name: cur.name, value: sum(Object.values(cur[key])) }
              : accu,
          { name: '', value: 0 }
        )
    })
    return result
  }

  addTooltipFieldUnit(label, value) {
    const { customMultipleTooltipUnits, multipleTooltipUnits } = this.props.customs

    if (!multipleTooltipUnits) return value

    return `${value} ${customMultipleTooltipUnits.find(item => item.label === label).unit}`
  }

  needsUpdate() {
    const newData = this.dataConvert()
    const highestValue = this.highestValue(newData)
    const prepData = this.dataPrep(newData)
    this.setState({ data: prepData, highestValue }, () => {
      const configData = {
        json: prepData,
        color: this.getDataColor(),
        groups: this.getDataGroups(),
        keys: this.getDataKeys(),
        labels: this.getDataLabels(),
        names: this.getDataNames(),
        type: this.setChartType(),
        order: this.setDataOrder(),
      }
      const configProps = {
        data: configData,
        axis: this.getAxis(),
        color: this.getColorPattern(),
        grid: this.getGrid(),
        legend: this.getLegend(),
        padding: this.setPadding(),
        tooltip: this.getTooltip(),
        transition: this.getTransition(),
        size: this.setSize(),
        ...(this.setBar() && { bar: this.setBar() }),
        ...(this.setDonut() && { donut: this.setDonut() }),
        ...(this.setPie() && { pie: this.setPie() }),
        onrendered: () => this.handleOnRendered(),
      }
      this.setState({ configProps }, () => this.chartDecoration())
    })
  }

  dataConvertForm(data, baseValue) {
    const result = data.map((d, i) => ({
      ...data[i],
      ...Object.assign(
        {},
        ...this.inputKeys.map(key => ({
          [key]: Object.assign(
            {},
            ...this.possibleValues.map(list => ({
              [list]: (d[key][list] / baseValue[`${key}.${list}`]) * 100,
            }))
          ),
        }))
      ),
    }))
    return result
  }

  dataConvert() {
    const { customs, data, numeric, totalRecord } = this.props
    const isDisplayNoValue = customs.displayNoProperty || false
    let newData = data

    // Add no value
    if (isDisplayNoValue) {
      const noValue = { name: 'No' }
      this.inputKeys.forEach(key => {
        noValue[key] = {}
        this.possibleValues.forEach(column => {
          noValue[key][column] = totalRecord[key] - sum(data.map(list => list[key][column]))
        })
      })
      newData.push(noValue)
    }

    switch (numeric) {
      case 'percentage': {
        const sumValues = {}
        this.inputKeys.forEach(key => {
          this.possibleValues.forEach(list => {
            sumValues[`${key}.${list}`] = data.reduce((accu, cur) => accu + cur[key][list], 0)
          })
        })
        newData = this.dataConvertForm(newData, sumValues)
        break
      }
      case 'percentile': {
        const totalValues = {}
        this.inputKeys.forEach(key => {
          this.possibleValues.forEach(list => {
            totalValues[`${key}.${list}`] = totalRecord[key]
          })
        })
        newData = this.dataConvertForm(newData, totalValues)
        break
      }
      case 'absolute':
      default:
        break
    }

    return newData
  }

  dataSort(data) {
    const sorted = orderBy(data, [list => sum(Object.values(list.main))], ['desc'])
    sorted.find(({ name }, index) => {
      if (name === 'No') sorted.push(sorted.splice(index, 1)[0])
    })
    return sorted
  }

  dataPrep(data) {
    const { customs } = this.props
    const isSortByValues = customs.sortByValues || false

    const newData = isSortByValues ? this.dataSort(data) : data

    return newData
  }

  subtitle() {
    const { inputKeys, possibleValues } = this
    const { compare, numeric, customs, data } = this.props
    const {
      customIcons,
      mainField,
      stack,
      stackSubtitleValue,
      subtitleType,
      subtitleField,
      subtitleTotal,
      subtitleUnit,
      unit,
    } = customs
    const { highestValue } = this.state
    const isStack = stack || false
    const subtitleMainRef = data.find(item => item.name === mainField)
    const subtitleProps = {
      compare,
      customIcons,
      data,
      highestValue,
      inputKeys,
      isStack,
      numeric,
      possibleValues,
      stackSubtitleValue,
      subtitleField,
      subtitleMainRef,
      subtitleTotal,
      subtitleType,
      subtitleUnit,
      unit,
    }
    return <Subtitle {...subtitleProps} />
  }

  filterAdditionalValues(label) {
    const { tooltipAdditionalValues } = this.props.customs

    if (isEmpty(tooltipAdditionalValues)) return []

    return tooltipAdditionalValues.filter(item => item.label === label)
  }

  generateAdditionalContentForEachItem({ unit, value }) {
    return `<br />${abbrNumberFormatter(value)}&nbsp;${unit}`
  }

  generateAdditionalContent(title) {
    const filteredValues = this.filterAdditionalValues(title)
    const additionalContent = filteredValues
      .map(item => this.generateAdditionalContentForEachItem(item))
      .join('')

    return additionalContent
  }

  generateRemarks(item) {
    return (
      <div className={styles.remark} key={item.title}>
        <span className={styles.title}>{item.title}:</span>
        <span className={styles.value}>
          {item.value.toFixed(1)}
          {item.unit}
        </span>
      </div>
    )
  }

  remarks() {
    const { customs } = this.props
    const { remarks } = customs
    return remarks.map(item => this.generateRemarks(item))
  }

  render() {
    const { configProps } = this.state
    const { compare, id, subtitle, customs } = this.props
    const size = this.setSize()

    return !isEmpty(configProps) ? (
      <div className={cx(styles.wrapper, !compare && styles.singleView)}>
        {(compare || subtitle) && this.subtitle()}
        <div style={{ height: size.height }}>
          <C3
            ref={node => {
              this.chartRef = node && node.chart
            }}
            className={cx(styles.chart, id)}
            {...configProps}
          />
        </div>
        {customs.remarks && this.remarks()}
      </div>
    ) : (
      <EmptyDataTemplate />
    )
  }
}

Chart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      main: PropTypes.object.isRequired,
      secondary: PropTypes.object,
    })
  ).isRequired,
  id: PropTypes.string.isRequired,

  axisRotate: PropTypes.bool,
  axisType: PropTypes.string,
  axisYVisible: PropTypes.bool,
  compare: PropTypes.bool,
  customs: PropTypes.object,
  disableGridLines: PropTypes.bool,
  numeric: PropTypes.string,
  padding: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
  }),
  totalRecord: PropTypes.shape({
    main: PropTypes.number,
    seconday: PropTypes.number,
  }),
  size: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  subtitle: PropTypes.bool,
}

Chart.defaultProps = {
  axisRotate: false,
  axisType: 'category',
  axisYVisible: false,
  compare: false,
  customs: {},
  disableGridLines: false,
  numeric: 'absolute',
  padding: {},
  totalRecord: {
    main: 1,
    secondary: 1,
  },
  size: {},
  subtitle: true,
}

export default Chart
