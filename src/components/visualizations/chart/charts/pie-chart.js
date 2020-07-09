import Chart from '../chart'

class PieChart extends Chart {
  getColorPattern() {
    const {
      customs: { customColors, displayNoProperty },
      data,
    } = this.props
    let colorPattern = ['#3c9900', '#95cc05', '#f9eb0d', '#fec430', '#ff9f7a', '#ffa6a3', '#ffccd4']
    colorPattern = colorPattern.slice(0, data.length)

    // assign custom color if any
    if (customColors) {
      data.forEach(({ name }, index) => {
        colorPattern[index] = customColors.find(({ label }) => label === name).color_code
      })
    }

    // Add No value color
    if (displayNoProperty) colorPattern[colorPattern.length - 1] = '#f55d5d'

    return {
      pattern: colorPattern,
    }
  }

  getDataKeys() {
    return false
  }

  getLegend() {
    return { position: 'right' }
  }

  getTooltip() {
    const { percentWithAbsolute } = this.props.customs

    return {
      order: (t1, t2) => t1.id > t2.id,
      contents: (d, defaultTitleFormat, defaultValueFormat, color) => {
        const percentage = `${(d[0].ratio * 100).toFixed(0)}%`
        const result = `<table class="c3-tooltip">
          <tbody>
            <tr><th colspan="2">${d[0].id}</th></tr>
            <tr class="c3-tooltip-name-${d[0].id}">
              <td class="name" valign="top" style="padding-right: 0">
                <span style="background-color:${color(d[0].id)}"></span>
              </td>
              <td class="value" style="padding-left: 0; text-align: left;">
                ${percentWithAbsolute ? `${percentage} - ` : ''}
                ${this.getDisplayValue(d[0].value)}
              </td>
            </tr>
          </tbody>
        </table>`
        return result
      },
    }
  }

  setChartType() {
    return 'pie'
  }

  setPadding() {
    return {
      top: 10,
      bottom: 10,
      ...this.props.padding,
    }
  }

  setPie() {
    return {
      label: { show: false },
    }
  }

  setSize() {
    return {
      height: 160,
      ...this.props.size,
    }
  }

  dataPrep(data) {
    const prepForPie = {}
    data.forEach(list => {
      prepForPie[list.name] = Object.values(list.main)
    })

    return prepForPie
  }
}

export default PieChart
