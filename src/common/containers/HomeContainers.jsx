// 首页内容
import React from 'react'
import '../../common/style/test.less'
import HomeRentChart from '../components/HomeRentChart'
import HomeCollectFeeChart from '../components/HomeCollectFeeChart'
import HomeHouseNowChart from '../components/HomeHouseNowChart'
import HomeRepairedInfoChart from '../components/HomeRepairedInfoChart'
import {apiPost} from '../../api/api.dev'
import HomeBottomCard from '../components/HomeBottomCard'
import HomeOtherFee from '../components/HomeOtherFee'

class HomeContainers extends React.Component {
    state= {
        rent: [],
        buildingNow: [],
        collectFee: {},
        repairStatistics: [],
        appraise: [],
        otherFees: {},
        cashDepositSurplus: {}
    }
    componentDidMount () {
        this.loadData()
    }
    loadData = async () => {
        let indexData = await apiPost(
            '/index'
        )
        console.log(indexData.data)
        this.setState({
            rent: indexData.data.rent,
            buildingNow: indexData.data.buildingNow,
            collectFee: indexData.data.collectFee,
            repairStatistics: indexData.data.repairStatistics,
            appraise: indexData.data.appraise,
            otherFees: indexData.data.otherFees,
            cashDepositSurplus: indexData.data.cashDepositSurplus
        })
    }
    render () {
        return (
            <div className="home-main-div" >
                <div className="home-main-box" >
                    <div className="charts-row">
                        <HomeRentChart rent={this.state.rent} />
                        <HomeHouseNowChart buildingNow={this.state.buildingNow} />
                    </div>
                    <div className="charts-row">
                        <HomeCollectFeeChart collectFee={this.state.collectFee} />
                        <HomeRepairedInfoChart repairStatistics={this.state.repairStatistics} appraise={this.state.appraise} />
                    </div>
                    <HomeOtherFee otherFees={this.state.otherFees} />
                    <HomeBottomCard cashDepositSurplus={this.state.cashDepositSurplus} />
                </div>
            </div>
        )
    }
}

export default HomeContainers


