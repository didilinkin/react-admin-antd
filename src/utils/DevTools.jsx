// Rudex-DevTools 组件 => 如果 调试浏览器 无调试插件. 则使用此组件 页面内部查看 redux调试; 误删
import React from 'react'

import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

export default createDevTools(
    <DockMonitor
        toggleVisibilityKey="ctrl-h"
        changePositionKey="ctrl-q"
    >
        <LogMonitor />
    </DockMonitor>
)
