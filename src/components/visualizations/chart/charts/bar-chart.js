import { select, selectAll } from 'd3'
import { sum } from 'lodash'

import Chart from '../chart'

class BarChart extends Chart {
  getAxis() {
    const { axisRotate, axisType, axisYVisible } = this.props
    return {
      rotated: axisRotate,
      x: {
        type: axisType,
        tick: {
          width: 80,
        },
      },
      y: {
        show: axisYVisible,
      },
    }
  }

  getDataLabels() {
    const { axisRotate, compare, customs, id } = this.props
    const { data, highestValue } = this.state
    const mainField = customs.mainField || ''
    const isStack = (customs.stack && !customs.stackSubtitle) || false
    return {
      format: (v, fieldId, i) => {
        if (!fieldId) return false
        const [key] = fieldId.split('.')

        // Add focus class to all bar elements when 'allFocus' props is true
        if (customs.allFocus) selectAll(`.${id} .c3-bars .c3-bar`).classed('focus', true)

        // Check highest bar element
        if (
          highestValue[key] !== undefined &&
          (highestValue[key].name === data[i].name || data[i].name === mainField)
        ) {
          const focusElement = selectAll(
            `.${id} .c3-bars-${fieldId.replace('.', '\\.')} .c3-bar-${i}`
          )
          const pathValue = focusElement.attr('d')
          focusElement.classed('focus', true)

          // Add subtitle when compare feature was disabled
          const customSubtitle =
            !compare &&
            !axisRotate &&
            !isStack &&
            !customs.disableCustomSubtitle &&
            pathValue !== null

          if (customSubtitle) {
            this._generateCustomSubtitle({ data, fieldId, i, pathValue, v })
          }
        }
      },
    }
  }

  setBar() {
    return {
      width: {
        ratio: 0.8,
      },
    }
  }

  setChartType() {
    return 'bar'
  }

  setPadding() {
    const isStack = (this.props.customs.stack && !this.props.customs.stackSubtitle) || false
    return {
      ...(!isStack && !this.props.axisRotate && !this.props.compare && { top: 15 }),
      ...this.props.padding,
    }
  }

  setSize() {
    const {
      axisRotate,
      compare,
      customs: { stack, stackSubtitle },
      data,
    } = this.props
    const deltaHeight = stack ? 30 : 0
    const defaultHeight = stackSubtitle ? 180 : 150
    const sizeMultiple = compare ? 2 : 1
    return {
      height: axisRotate ? data.length * (sizeMultiple * 25) + deltaHeight : defaultHeight,
      ...this.props.size,
    }
  }

  chartDecoration() {
    const { customs, data, disableGridLines } = this.props
    const { mainField } = customs

    if (!disableGridLines && this.chartRef && mainField) {
      const mainFieldValue = sum(Object.values(data.find(({ name }) => name === mainField).main))

      this.chartRef.ygrids.remove({ class: 'ref-line' })
      setTimeout(() => {
        this.chartRef.ygrids.add({
          class: 'ref-line',
          value: mainFieldValue,
        })
      }, 500)
    }
  }

  _generateCustomSubtitle({ data, fieldId, i, pathValue, v }) {
    const { highestValue } = this.state
    const { customs, id } = this.props
    const { subtitleWithUnit, unit, stackSubtitle } = customs
    const focusSubtitle = select(`.${id} .subtitle.${fieldId.replace('.', '-')}-${i}`)

    if (focusSubtitle.empty()) {
      select(`.${id}`)
        .append('h4')
        .classed('subtitle', true)
        .classed('absolute', true)
        .classed('multiple-line', true)
        .classed(`${fieldId.replace('.', '-')}-${i}`, true)
    }

    const positionLeft = pathValue.split(',')[0].replace('M ', '')
    const value = this.getDisplayValue(
      stackSubtitle ? highestValue.main.value / this.possibleValues.length : v
    )
    // Special case for handling position of stackedbar when toggle legend
    if (this.initialPositionLeft === null) {
      this.initialPositionLeft = positionLeft
    }
    focusSubtitle.style(
      'left',
      `${Math.max(stackSubtitle ? this.initialPositionLeft : positionLeft, 0)}px`
    )
    if (subtitleWithUnit) {
      focusSubtitle.html(`<span class="highlight">${value}</span>${unit}`)
    } else {
      focusSubtitle.html(`<span class="highlight">${data[i].name}</span>${value}`)
    }
  }
}

export default BarChart
