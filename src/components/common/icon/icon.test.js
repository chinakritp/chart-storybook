import React from 'react'
import { shallow } from 'enzyme'

import Icon from './icon'

const defaultProps = {}

describe('<Icon />', () => {
  describe('Specific cases', () => {
    it('should render custom styles', () => {
      const props = {
        ...defaultProps,
        customCSS: 'custom-style',
      }
      const expected = { class: props.customCSS }

      const wrapper = shallow(<Icon {...props} />)

      expect(wrapper).toHaveClassName(expected.class)
    })
  })
})
