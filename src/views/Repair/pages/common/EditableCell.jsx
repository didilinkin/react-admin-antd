import { Icon, Input, DatePicker } from 'antd'
import React from 'react'
import moment from 'moment'
import { apiPost } from '../../../../api/index'
class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: false
    }
    handleChange = (e) => {
        const value = e.target.value
        this.setState({ value })
    }
    handleChangeDate = (date, dateStrings) => {
        this.setState({ value: dateStrings })
    }
    check = async () => {
        let json = this.props.record
        json[this.props.name] = this.state.value
        console.log(json)
        console.log(this.props.name + ':' + this.state.value)
        let data = await apiPost(
            '/contract/updateRentContractInfo',
            json
        )
        this.setState({ editable: false })
        if (this.props.onChange) {
            this.props.onChange(this.state.value)
        }
        console.log(data.data)
    }
    edit = () => {
        this.setState({ editable: true })
    }
    render () {
        const { value, editable } = this.state
        return (
            <div className="editable-cell">
                {
                    editable ?
                        <div className="editable-cell-input-wrapper">
                            { this.props.type.toString() === 'Input' &&
                                <Input
                                    value={value}
                                    style={this.props.style}
                                    onChange={this.handleChange}
                                    onPressEnter={this.check}
                                />
                            }
                            { this.props.type.toString() === 'DatePicker' &&
                                <DatePicker
                                    value={moment(value)}
                                    style={this.props.style}
                                    onChange={this.handleChangeDate}
                                    onPressEnter={this.check}
                                />
                            }
                            <Icon
                                type="check"
                                className="editable-cell-icon-check"
                                onClick={this.check}
                            />
                        </div> :
                        <div className="editable-cell-text-wrapper">
                            {value || ' '}
                            <Icon
                                type="edit"
                                className="editable-cell-icon"
                                onClick={this.edit}
                            />
                        </div>
                }
            </div>
        )
    }
}
export default EditableCell
