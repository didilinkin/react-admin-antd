import React from 'react'
import styles from './OperationBar.less'

const OperationBar = ({ children }) => {
  return (
    <div className={styles.tableHeader}>
      {children}
    </div>
  )
}

export default OperationBar