# 模块 - 仓库管理

## 结构
```bash
├── index.js                        # 模块 导出根文件
├── configDir.js                    # 模块 结构配置文件
│                                   |
├—— containers /                    # 容器组件(业务组件 - 纯逻辑)
│   ├── InventoryManage.jsx         |   # 库存管理
│   ├── ReceiveStatistics.jsx       |   # 领用统计
│   └── MeterialManagement.jsx      |   # 材料管理
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
