import { selectAll } from 'd3'
import { orderBy } from 'lodash'

import Chart from '../chart'

// TODO: Replace with total value from api
const mockTotalData = 10000

class ScaleChart extends Chart {
  getAxis() {
    const defaultAxis = {
      // TODO: Replace mockTotalData
      max: mockTotalData,
      padding: 0,
      show: false,
    }

    return { x: defaultAxis, y: defaultAxis }
  }

  getTransition() {
    return {
      duration: 0,
    }
  }

  getColorPattern() {
    const {
      customs: { customColors },
      data,
    } = this.props
    let colorPattern = ['#425ede', '#32d164', '#fec430']
    colorPattern = colorPattern.slice(0, data.length)

    // assign custom color if any
    const sortedData = orderBy(data, ['main.value'], ['desc'])
    if (customColors) {
      sortedData.forEach(({ name }, index) => {
        colorPattern[index] = customColors.find(({ label }) => label === name).color_code
      })
    }

    return {
      pattern: colorPattern,
    }
  }

  getDataColor() {
    return false
  }

  getTooltip() {
    return {
      format: {
        name: v => {
          return `${v}`
        },
        value: v => {
          return `${this.getDisplayValue(v)}${this.props.customs.unit}`
        },
        title: () => {
          return null
        },
      },
    }
  }

  getGrid() {
    const linesX = []
    const linesY = []
    const offset = 20
    const numOfGrid = 6

    for (let index = 0; index <= numOfGrid; index += 1) {
      // TODO: Replace mockTotalData
      linesX.push({ value: ((mockTotalData - offset) / numOfGrid) * index })
      linesY.push({ value: ((mockTotalData + offset) / numOfGrid) * index })
    }

    return {
      focus: { show: false },
      lines: { front: false },
      x: { lines: linesX },
      y: { lines: linesY },
    }
  }

  setChartType() {
    return 'area-step'
  }

  setSize() {
    return {
      height: 263,
      ...this.props.size,
    }
  }

  handleOnRendered() {
    const dataName = this.props.data.map(element => element.name)
    dataName.forEach(item => {
      const areaHolder = selectAll(` .c3-area-${item}`)
      const [start, length, end] = areaHolder.attr('d').split(',')
      const startX = start.replace('M', '')
      const startY = length.replace('L0', '')
      const endY = end.replace('Z', '')
      const endX = (endY - startY) * 1.14
      const stretchedPath = `M ${startX} ${startY}L ${endX} ${startY}L ${endX} ${endY}L  ${startX} ${endY}Z`
      // Stretch the grid according to its value compare to its height
      areaHolder.style('opacity', '1').attr('d', stretchedPath)
    })
  }

  getLegend() {
    return {
      show: true,
    }
  }

  getDataLabels() {
    // Check if the space between area is greater than 10%, thus icon should not overlap
    const isIconSpaceEnough =
      Math.abs(
        this.props.data
          .map(item => ({ name: item.name, value: (item.main.value / mockTotalData) * 100 }))
          .reduce((acc, cur) => acc.value - cur.value)
      ) > 10

    return {
      format: (value, id, index) => {
        const curIcon = this.props.customs.customIcons.find(item => item.label === id)
        if (index === 0 && isIconSpaceEnough && value / mockTotalData > 0.1) {
          return curIcon.hex_code
        }
      },
    }
  }

  getDataKeys() {
    const sortedData = orderBy(this.props.data, ['main.value'], ['desc'])
    const value = sortedData.map(item => item.name)

    return { value }
  }

  dataPrep(data) {
    const prepForScale = {}
    data.forEach(list => {
      prepForScale[list.name] = list.main.value
    })

    return [prepForScale]
  }
}

export default ScaleChart
