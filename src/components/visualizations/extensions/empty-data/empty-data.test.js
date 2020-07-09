import React from 'react'
import { shallow } from 'enzyme'

import EmptyDataTemplate from './empty-data'

const defaultProps = {
  title: 'Handset Type',
}

describe('<EmptyDataTemplate />', () => {
  it('should render caption', () => {
    const props = { ...defaultProps }
    const expected = {
      text: "Selected area doesn't have enough information to display",
    }

    const wrapper = shallow(<EmptyDataTemplate {...props} />)

    expect(wrapper.find('.chart-context')).toHaveText(expected.text)
  })
})
