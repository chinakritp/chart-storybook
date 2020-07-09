import React from 'react'
import { shallow } from 'enzyme'

import PieChart from './pie-chart'

jest.mock('c3', () => ({
  c3: jest.fn(),
}))

const defaultProps = {
  customs: {
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

const wrapper = shallow(<PieChart {...defaultProps} />)

describe('<PieChart />', () => {
  it('should render Pie chart without crashing', () => {
    expect(wrapper).toBeDefined()
  })
})
