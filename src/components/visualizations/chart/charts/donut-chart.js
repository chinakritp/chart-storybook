import { select } from 'd3'
import { flattenDeep, sum } from 'lodash'
import PieChart from './pie-chart'
import abbrNumberFormatter from '../../../../utils/abbr-number-formatter'

class DonutChart extends PieChart {
  setChartType() {
    return 'donut'
  }

  setDonut() {
    const { data } = this.state
    const { donut_title_compute } = this.props.customs.additionals
    let title = ''

    if (donut_title_compute === 'sum') {
      const sumValue = sum(flattenDeep(Object.values(data)))
      title = abbrNumberFormatter(sumValue)
    }

    return {
      title,
      label: { show: false },
      width: 15,
    }
  }

  chartDecoration() {
    const { donut_title_unit } = this.props.customs.additionals
    const titleValue = abbrNumberFormatter(sum(flattenDeep(Object.values(this.state.data))))

    if (this.chartRef && donut_title_unit) {
      const donutTitle = select(this.chartRef.element).select('.c3-chart-arcs-title')

      // Update donut title when data is updated
      if (this.props.customs.dropDown) {
        donutTitle.node().innerHTML = titleValue
      }
      if (donutTitle.select('.unit').empty()) {
        donutTitle.attr('dy', -5)
        donutTitle
          .append('tspan')
          .attr('dy', 12)
          .attr('x', 0)
          .classed('unit', true)
          .text(donut_title_unit)
      }
    }
  }
}

export default DonutChart
