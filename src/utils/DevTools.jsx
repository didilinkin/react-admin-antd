// Rudex-DevTools 组件
import React from 'react'

import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

// 创建 DevTools 组件
const DevTools = createDevTools(
    <DockMonitor
        toggleVisibilityKey="ctrl-h"
        changePositionKey="ctrl-q"
    >
        <LogMonitor theme="tomorrow" />
    </DockMonitor>
)

export default DevTools
