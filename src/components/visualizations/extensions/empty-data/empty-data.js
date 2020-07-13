import React from 'react'

import styles from './empty-data.module.scss'

const EmptyDataTemplate = () => (
  <div className={styles.mainContent}>
    <div className={styles.iconDisplay}>
      <i className={styles.iconBox} />
    </div>
    <h3 className={styles.chartContext}>
      Selected area doesn&apos;t have enough information to display
    </h3>
  </div>
)

export default EmptyDataTemplate
