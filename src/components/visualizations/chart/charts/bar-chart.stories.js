import React from 'react'
import { number, boolean } from '@storybook/addon-knobs'
import mdx from './bar-chart.mdx'

import BarChart from './bar-chart'

export default {
  title: 'Chart/Bar',
  parameters: {
    component: BarChart,
    componentSubtitle: 'Subtitle',
    docs: {
      page: mdx,
    },
  },
}

export const Basic = () => (
  <BarChart
    id="bar"
    subtitle={boolean('Subtitle', false, 'General option')}
    size={{ height: 200 }}
    data={[
      {
        name: 'Column1',
        main: { value: number('Column1', 5406, {}, 'Value') },
      },
      {
        name: 'Column2',
        main: { value: number('Column2', 3999, {}, 'Value') },
      },
      {
        name: 'Column3',
        main: { value: number('Column3', 6155, {}, 'Value') },
      },
      {
        name: 'Column4',
        main: { value: number('Column4', 862, {}, 'Value') },
      },
      {
        name: 'Column5',
        main: { value: number('Column5', 3866, {}, 'Value') },
      },
    ]}
  />
)

export const SortByValues = () => (
  <BarChart
    id="barSortByValue"
    subtitle={boolean('Subtitle', false, 'General option')}
    customs={{ sortByValues: true }}
    size={{ height: 200 }}
    data={[
      {
        name: 'Column1',
        main: { value: number('Column1', 5406, {}, 'Value') },
      },
      {
        name: 'Column2',
        main: { value: number('Column2', 3999, {}, 'Value') },
      },
      {
        name: 'Column3',
        main: { value: number('Column3', 6155, {}, 'Value') },
      },
      {
        name: 'Column4',
        main: { value: number('Column4', 862, {}, 'Value') },
      },
      {
        name: 'Column5',
        main: { value: number('Column5', 3866, {}, 'Value') },
      },
    ]}
  />
)

export const Horizontal = () => (
  <BarChart
    id="hbar"
    axisRotate
    subtitle={boolean('Subtitle', true, 'General option')}
    customs={{ sortByValues: false }}
    size={{ height: 200 }}
    data={[
      {
        name: 'Column1',
        main: { value: number('Column1', 5406, {}, 'Value') },
      },
      {
        name: 'Column2',
        main: { value: number('Column2', 3999, {}, 'Value') },
      },
      {
        name: 'Column3',
        main: { value: number('Column3', 6155, {}, 'Value') },
      },
      {
        name: 'Column4',
        main: { value: number('Column4', 862, {}, 'Value') },
      },
      {
        name: 'Column5',
        main: { value: number('Column5', 3866, {}, 'Value') },
      },
    ]}
  />
)

export const HorizontalWithSortByValues = () => (
  <BarChart
    id="hbarSortByValue"
    axisRotate
    subtitle={boolean('Subtitle', true, 'General option')}
    customs={{ sortByValues: true }}
    size={{ height: 200 }}
    data={[
      {
        name: 'Column1',
        main: { value: number('Column1', 5406, {}, 'Value') },
      },
      {
        name: 'Column2',
        main: { value: number('Column2', 3999, {}, 'Value') },
      },
      {
        name: 'Column3',
        main: { value: number('Column3', 6155, {}, 'Value') },
      },
      {
        name: 'Column4',
        main: { value: number('Column4', 862, {}, 'Value') },
      },
      {
        name: 'Column5',
        main: { value: number('Column5', 3866, {}, 'Value') },
      },
    ]}
  />
)

export const Stacked = () => (
  <BarChart
    id="barStacked"
    subtitle={boolean('Subtitle', true, 'General option')}
    customs={{
      stack: true,
      stackSubtitleValue: true,
      groups: ['group1', 'group2'],
    }}
    size={{ height: 200 }}
    data={[
      {
        name: 'Column1',
        main: {
          group1: number('Column1', 132198, {}, 'Group1 Value'),
          group2: number('Column1', 122560, {}, 'Group2 Value'),
        },
      },
      {
        name: 'Column2',
        main: {
          group1: number('Column2', 191420, {}, 'Group1 Value'),
          group2: number('Column2', 237877, {}, 'Group2 Value'),
        },
      },
      {
        name: 'Column3',
        main: {
          group1: number('Column3', 143751, {}, 'Group1 Value'),
          group2: number('Column3', 169354, {}, 'Group2 Value'),
        },
      },
      {
        name: 'Column4',
        main: {
          group1: number('Column4', 170597, {}, 'Group1 Value'),
          group2: number('Column4', 188582, {}, 'Group2 Value'),
        },
      },
      {
        name: 'Column5',
        main: {
          group1: number('Column5', 91170, {}, 'Group1 Value'),
          group2: number('Column5', 81477, {}, 'Group2 Value'),
        },
      },
    ]}
  />
)

export const Compare = () => (
  <BarChart
    id="barCompare"
    compare
    size={{ height: 180 }}
    data={[
      {
        name: 'Column1',
        main: { value: number('Column1', 617, {}, 'Main Value') },
        compare: { value: number('Column1', 557, {}, 'Compare Value') },
      },
      {
        name: 'Column2',
        main: { value: number('Column2', 2424, {}, 'Main Value') },
        compare: { value: number('Column2', 2387, {}, 'Compare Value') },
      },
      {
        name: 'Column3',
        main: { value: number('Column3', 3024, {}, 'Main Value') },
        compare: { value: number('Column3', 2798, {}, 'Compare Value') },
      },
      {
        name: 'Column4',
        main: { value: number('Column4', 2433, {}, 'Main Value') },
        compare: { value: number('Column4', 2557, {}, 'Compare Value') },
      },
      {
        name: 'Column5',
        main: { value: number('Column5', 1662, {}, 'Main Value') },
        compare: { value: number('Column5', 1401, {}, 'Compare Value') },
      },
    ]}
  />
)

export const HorizontalCompare = () => (
  <BarChart
    id="hbarCompare"
    axisRotate
    compare
    size={{ height: 160 }}
    data={[
      {
        name: 'Column1',
        main: { value: number('Column1', 617, {}, 'Main Value') },
        compare: { value: number('Column1', 557, {}, 'Compare Value') },
      },
      {
        name: 'Column2',
        main: { value: number('Column2', 2424, {}, 'Main Value') },
        compare: { value: number('Column2', 2387, {}, 'Compare Value') },
      },
      {
        name: 'Column3',
        main: { value: number('Column3', 3024, {}, 'Main Value') },
        compare: { value: number('Column3', 2798, {}, 'Compare Value') },
      },
      {
        name: 'Column4',
        main: { value: number('Column4', 2433, {}, 'Main Value') },
        compare: { value: number('Column4', 2557, {}, 'Compare Value') },
      },
      {
        name: 'Column5',
        main: { value: number('Column5', 1662, {}, 'Main Value') },
        compare: { value: number('Column5', 1401, {}, 'Compare Value') },
      },
    ]}
  />
)
