/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { isEmpty } from 'lodash'

import displayValue from '../../../utils/display-value'
import abbrNumberFormatter from '../../../utils/abbr-number-formatter'

import Icon from '../../common/icon'

import styles from './subtitle.module.scss'

const generateSubtitleIcon = (dataIcon, unit) => {
  return dataIcon.map((item, index) => (
    <span key={item.name}>
      <span className={styles.wrapper}>
        <span className={styles.highlight}>
          <Icon icon={item.iconCode} />
        </span>
        {item.main.value}
        {unit}
      </span>
      {index !== dataIcon.length - 1 && <span className={styles.seperatorSubtitle}>|</span>}
    </span>
  ))
}

export const SubtitleTemplate = ({
  isStack,
  multipleLine,
  stackSubtitleValue,
  subtitleUnit,
  title,
  unit,
  value,
}) => (
  <h4 className={cx(styles.subtitle, multipleLine && styles.multipleLine)}>
    <span className={styles.highlight}>
      {title}
      {subtitleUnit && ` ${unit}`}
    </span>
    {(!isStack || stackSubtitleValue) && <span>{value}</span>}
  </h4>
)

export const SubtitleHighestRefValue = ({
  highestTitle,
  highestValue,
  mainRefTitle,
  mainRefValue,
}) => (
  <>
    <span className={styles.subtitle}>
      <span className={styles.highlight}>{mainRefTitle}</span>
      {mainRefValue}
    </span>
    <span className={styles.seperatorSubtitle}>|</span>
    <span className={styles.subtitle}>
      <span className={styles.highlight}>{highestTitle}</span>
      {highestValue}
    </span>
  </>
)

export const SubtitleIcon = ({ customIcons, data, unit }) => {
  const dataIcon = data.map(item => ({
    ...item,
    iconCode: customIcons.find(element => element.label === item.name).icon_code,
  }))

  return <span className={styles.subtitle}>{generateSubtitleIcon(dataIcon, unit)}</span>
}

export const SubtitleWithTotalValue = ({ title, value, total }) => (
  <>
    <span className={styles.subtitle}>
      <span className={styles.highlight}>{title}</span>
      {`${value} of ${total}`}
    </span>
  </>
)

const Subtitle = ({
  compare,
  customIcons,
  data,
  highestValue,
  inputKeys,
  isStack,
  numeric,
  possibleValues,
  stackSubtitleValue,
  subtitleField,
  subtitleMainRef,
  subtitleTotal,
  subtitleType,
  subtitleUnit,
  unit,
}) => {
  const highest = {}
  inputKeys.forEach(key => {
    const keyOfHighest = Object.keys(highestValue).filter(list => list.includes(key))
    highest[key] = keyOfHighest.reduce(
      (accu, cur) => (highestValue[cur].value > accu.value ? highestValue[cur] : accu),
      { name: '', value: 0 }
    )
    if (stackSubtitleValue) highest[key].value /= possibleValues.length
  })
  if (isEmpty(highest)) return false
  switch (true) {
    case compare: {
      return (
        <div className={styles.compareSubtitle}>
          <SubtitleTemplate
            isStack={isStack}
            multipleLine
            title={highest.main.name}
            value={displayValue(highest.main.value, numeric)}
          />
          <SubtitleTemplate
            isStack={isStack}
            multipleLine
            title={highest.compare.name}
            value={displayValue(highest.compare.value, numeric)}
          />
        </div>
      )
    }
    case subtitleType === 'metric_value': {
      return (
        <SubtitleTemplate
          isStack={isStack}
          title={subtitleField.label}
          value={displayValue(subtitleField.value, numeric, 2)}
        />
      )
    }
    case subtitleType === 'ref_and_highest': {
      return (
        <SubtitleHighestRefValue
          highestTitle={highest.main.name}
          highestValue={displayValue((highest.main.value / subtitleTotal) * 100, 'percentage')}
          mainRefTitle={subtitleMainRef.name}
          mainRefValue={displayValue(
            (subtitleMainRef.main.value / subtitleTotal) * 100,
            'percentage'
          )}
        />
      )
    }
    case subtitleType === 'available_and_capacity': {
      return (
        <SubtitleWithTotalValue
          title={subtitleField.label}
          value={abbrNumberFormatter(subtitleField.value)}
          total={abbrNumberFormatter(subtitleTotal)}
        />
      )
    }
    case subtitleType === 'icon': {
      return <SubtitleIcon customIcons={customIcons} data={data} unit={unit} />
    }
    default:
      return (
        <SubtitleTemplate
          isStack={isStack}
          stackSubtitleValue={stackSubtitleValue}
          subtitleUnit={subtitleUnit}
          title={highest.main.name}
          unit={unit}
          value={
            subtitleTotal !== null
              ? displayValue((highest.main.value / subtitleTotal) * 100, 'percentage')
              : displayValue(highest.main.value, numeric)
          }
        />
      )
  }
}

Subtitle.propTypes = {
  compare: PropTypes.bool.isRequired,
  highestValue: PropTypes.object.isRequired,
  numeric: PropTypes.string.isRequired,

  customIcons: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  inputKeys: PropTypes.array,
  isStack: PropTypes.bool,
  possibleValues: PropTypes.arrayOf(PropTypes.string),
  stackSubtitleValue: PropTypes.bool,
  subtitleField: PropTypes.object,
  subtitleMainRef: PropTypes.object,
  subtitleTotal: PropTypes.number,
  subtitleType: PropTypes.string,
  subtitleUnit: PropTypes.bool,
  unit: PropTypes.string,
}

Subtitle.defaultProps = {
  customIcons: null,
  data: null,
  inputKeys: ['main'],
  isStack: false,
  possibleValues: [],
  stackSubtitleValue: false,
  subtitleField: null,
  subtitleMainRef: null,
  subtitleTotal: null,
  subtitleType: '',
  subtitleUnit: false,
  unit: '',
}

SubtitleTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,

  isStack: PropTypes.bool,
  multipleLine: PropTypes.bool,
  stackSubtitleValue: PropTypes.bool,
  subtitleUnit: PropTypes.bool,
  unit: PropTypes.string,
}

SubtitleTemplate.defaultProps = {
  isStack: false,
  multipleLine: false,
  stackSubtitleValue: false,
  subtitleUnit: false,
  unit: '',
}

SubtitleIcon.propTypes = {
  customIcons: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  unit: PropTypes.string,
}

SubtitleIcon.defaultProps = {
  customIcons: null,
  data: null,
  unit: '',
}

SubtitleWithTotalValue.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

export default Subtitle
