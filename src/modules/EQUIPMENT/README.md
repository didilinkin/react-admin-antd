# 模块 - 设备管理

## 结构
```bash
├── index.js                        # 模块 导出根文件
├── configDir.js                    # 模块 结构配置文件
│                                   |
├—— containers /                    # 容器组件(业务组件 - 纯逻辑)
|   |                               |
│   ├── maintain /                  |   # 设备维护
|   │   ├── MaintenancePlan.jsx     |   |   # 保养记录
|   │   └── RepairRecord.jsx        |   |   # 维护记录
|   |                               |
│   ├── Account.jsx                 |   # 设备台账
│   ├── ComputerRoomManagement.jsx  |   # 机房管理
│   └── Inspection.jsx              |   # 设备巡检
│                                   |
├—— components /                    # 视图组件(表现组件 - 展现逻辑内容, 不操作数据)
|                                   |
├── store /                         # Redux 模块状态管理(非必需)
│   ├── actions /                   |   # Actions(业务逻辑)
│   ├── reducers /                  |   # Reducers(纯函数)
│   ├── getters /                   |   # Get State方法
│   |── ActionTypes.js              |   # 常量配置
|   └── index.js                    |   # 模块 状态根文件
```
