# 模块 - 财务管理

## 结构
```bash
├── index.js                        # 模块 导出根文件
├── configDir.js                    # 模块 结构配置文件
│                                   |
├—— containers /                    # 容器组件(业务组件 - 纯逻辑)
│   |                               |
│   ├── Finance /                   |   # 财务设置
|   │   ├── Toll.jsx                |   |   # 收费设置
|   │   └── Billing.jsx             |   |   # 开票信息
│   |                               |
│   ├── RentReview.jsx              |   # 租金审核
│   ├── PropertyCosts.jsx           |   # 物业费审核
│   ├── Electricity.jsx             |   # 电费审核
│   ├── WaterFee.jsx                |   # 水费审核
│   ├── LeaseMargin.jsx             |   # 租赁保证金审核
│   ├── HappyDeposit.jsx            |   # 欢乐颂押金审核
│   ├── EnergyDeposit.jsx           |   # 能源管理押金审核
│   └── SecondaryDecoration.jsx     |   # 二次装修审核
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
