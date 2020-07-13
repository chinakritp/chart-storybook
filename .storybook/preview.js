import { addDecorator } from '@storybook/react'
import { addParameters } from '@storybook/client-api'

import { withKnobs } from '@storybook/addon-knobs'

import '../src/scss/style.scss'

const customViewports = {
  geoPulse: {
    name: 'GeoPulse Card',
    styles: {
      width: '282.5px',
      height: '260px',
    },
  },
}

addDecorator(withKnobs)

addParameters({
  viewport: {
    viewports: customViewports,
    defaultViewport: 'geoPulse',
  },
})