// 基础表格 - 展示
import React from 'react'
import { Row, Col, Card } from 'antd'

import BasicTable         from './BasicTable'
import SelectTable        from './SelectTable'

const BasicTables = () => (
    <div className="gutter-example">
        <Row gutter={16}>
            <Col className="gutter-row" span={24}>
                <div className="gutter-box">
                    <Card title="基础表格" bordered={false}>
                        <BasicTable />
                    </Card>
                </div>
            </Col>
        </Row>

        <Row gutter={16}>
            <Col className="gutter-row" span={24}>
                <div className="gutter-box">
                    <Card title="基础表格" bordered={false}>
                        <SelectTable />
                    </Card>
                </div>
            </Col>
        </Row>
    </div>
)

export default BasicTables
