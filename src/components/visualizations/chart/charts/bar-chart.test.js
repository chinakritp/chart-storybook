import React from 'react'
import { shallow } from 'enzyme'

import BarChart from './bar-chart'

jest.mock('c3', () => ({
  c3: jest.fn(),
}))

const defaultProps = {
  customs: {
    customColors: [
      { color_code: '#00ADF2', label: 'Apple' },
      { color_code: '#84D10A', label: 'Samsung' },
      { color_code: '#0070BF', label: 'Huawei' },
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
  numeric: 'percentile',
  totalRecord: { main: 11529 },
  disableGridLines: true,
  axisRotate: false,
  axisType: 'category',
  axisYVisible: false,
  padding: {},
  size: {},
  subtitle: true,
}

const wrapper = shallow(<BarChart {...defaultProps} />)

describe('<BarChart />', () => {
  it('should render Bar chart without crashing', () => {
    expect(wrapper).toBeDefined()
  })

  it('should render Bar chart group', () => {
    const props = {
      ...defaultProps,
      customs: {
        subtitle: true,
        flipable: true,
        stack: true,
        groups: ['Active', 'Inactive', 'Quality'],
      },
      data: [
        { name: 'True', main: { Active: 3129, Inactive: 37262, Quality: 3149 } },
        { name: 'Non-True', main: { Active: 2329, Inactive: 62445, Quality: 2395 } },
        { name: 'Rejected', main: { Active: 181, Inactive: 2450, Quality: 189 } },
      ],
    }

    wrapper.setProps(props)

    expect(wrapper).toBeDefined()
  })
})
