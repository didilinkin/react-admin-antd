import {Modal} from 'antd'
import React from 'react'
class QrCode extends React.Component {
    state = {
        visible: false,
        isFirst: true,
        imgUrl: ''
    }
    async initialRemarks (nextProps) {
        this.setState({
            visible: nextProps.visible,
            imgUrl: nextProps.imgUrl,
            isFirst: false
        })
    }
    componentWillReceiveProps (nextProps) {
        this.initialRemarks(nextProps)
    }
    handleCancel = (e) => {
        this.setState({ visible: false,
            isFirst: true})
    }
    render () {
        return (
            <Modal maskClosable={false}
                title={this.props.title}
                style={{top: 20}}
                width={450}
                visible={this.state.visible}
                onCancel={this.handleCancel}
            >
                <img src={this.state.imgUrl} alt="" />
            </Modal>
        )
    }
}
export default QrCode
