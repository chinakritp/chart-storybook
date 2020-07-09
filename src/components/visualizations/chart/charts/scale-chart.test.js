import React from 'react'
import { shallow } from 'enzyme'

import ScaleChart from './scale-chart'

jest.mock('c3', () => ({
  c3: jest.fn(),
}))

const defaultProps = {
  customs: {
    customColors: [
      { color_code: '#00ADF2', label: 'Apple' },
      { color_code: '#84D10A', label: 'Samsung' },
    ],
    sortByValues: true,
    subtitle: true,
  },
  compare: false,
  data: [
    { name: 'Apple', main: { value: 50 } },
    { name: 'Samsung', main: { value: 25 } },
  ],
  id: 'TM001',
  numeric: 'absolute',
  totalRecord: { main: 11529 },
  disableGridLines: true,
  axisRotate: false,
  axisType: 'category',
  axisYVisible: false,
  padding: {},
  size: {},
  subtitle: true,
}

const wrapper = shallow(<ScaleChart {...defaultProps} />)

describe('<ScaleChart />', () => {
  it('should render Scale chart without crashing', () => {
    expect(wrapper).toBeDefined()
  })
})
