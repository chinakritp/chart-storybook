import React from 'react'
import { shallow } from 'enzyme'

import DonutChart from './donut-chart'

jest.mock('c3', () => ({
  c3: jest.fn(),
}))

const defaultProps = {
  customs: {
    additionals: {
      donut_title_unit: 'total ports',
      donut_title_compute: 'sum',
    },
    customColors: [
      { color_code: '#00ADF2', label: 'Apple' },
      { color_code: '#84D10A', label: 'Samsung' },
      { color_code: '#0070BF', label: 'Huawei' },
      { color_code: '#0070BF', label: 'No' },
    ],
    displayNoProperty: true,
    sortByValues: true,
    subtitle: true,
  },
  compare: false,
  data: [
    { name: 'Apple', main: { value: 50 } },
    { name: 'Samsung', main: { value: 25 } },
    { name: 'Huawei', main: { value: 25 } },
  ],
  id: 'CM007',
  numeric: 'percentage',
  totalRecord: { main: 11529 },
  disableGridLines: true,
  axisRotate: false,
  axisType: 'category',
  axisYVisible: false,
  padding: {},
  size: {},
  subtitle: true,
}

const wrapper = shallow(<DonutChart {...defaultProps} />)

describe('<DonutChart />', () => {
  it('should render Donut chart without crashing', () => {
    expect(wrapper).toBeDefined()
  })

  it('should render remarks', () => {
    const props = {
      ...defaultProps,
      customs: {
        ...defaultProps.customs,
        remarks: [
          {
            title: 'Error rate',
            type: 'field',
            unit: '%',
            value: 0.076098,
          },
        ],
      },
    }

    wrapper.setProps(props)

    expect(wrapper.find('.remark')).toHaveText('Error rate:0.1%')
  })
})
