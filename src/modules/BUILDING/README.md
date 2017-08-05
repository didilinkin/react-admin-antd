# 模块 - 楼宇管理

## 结构
```bash
├── index.js                        # 模块 导出根文件
├── configDir.js                    # 模块 结构配置文件
├—— containers /                    # 容器组件(业务组件 - 纯逻辑)
│   ├── editAvailability /          |   # 编辑房源 /
|   │   ├── EditRoom.jsx            |   |    # 编辑房间
|   │   └── EditBuilding.jsx        |   |    # 编辑楼宇
│   ├── BuildingShow.jsx            |   # 楼宇图示
│   └── RegistrationMessage.jsx     |   # 注册信息
├—— components /                    # 视图组件(表现组件 - 展现逻辑内容, 不操作数据)
├── store /                         # Redux 模块状态管理(非必需)
│   ├── actions /                   |   # Actions(业务逻辑)
│   ├── reducers /                  |   # Reducers(纯函数)
│   ├── getters /                   |   # Get State方法
│   |── ActionTypes.js              |   # 常量配置
|   └── index.js                    |   # 模块 状态根文件
```
