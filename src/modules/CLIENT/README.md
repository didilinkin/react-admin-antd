# 模块 - 客户管理

## 结构
```bash
├── index.js                        # 模块 导出根文件
├── configDir.js                    # 模块 结构配置文件
│                                   |
├—— containers /                    # 容器组件(业务组件 - 纯逻辑)
│   |                               |
│   ├── Repair /                    |   # 客户报修
|   │   ├── ClientRepair.jsx        |   |   # 客户报修
|   │   ├── ReturnVisit.jsx         |   |   # 客户回访
|   │   └── MaintenanceFees.jsx     |   |   # 维修费设置
│   |                               |
│   ├── AccessCard /                |   # 门禁卡管理
|   │   ├── Management.jsx          |   |   # 门禁卡管理
|   │   └── Deposit.jsx             |   |   # 门禁卡押金
│   |                               |
│   ├── Information.jsx             |   # 客户资料
│   ├── Notice.jsx                  |   # 整改通知
│   ├── SecondaryDecoration.jsx     |   # 二次装修
│   └── Margin.jsx                  |   # 保证金管理
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
