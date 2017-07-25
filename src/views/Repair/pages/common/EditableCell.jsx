import { Icon } from 'antd'
import React from 'react'
class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: false
    }
    handleChange = (e) => {
        const value = e.target.value
        this.setState({ value })
    }
    check = () => {
        this.setState({ editable: false })
        if (this.props.onChange) {
            this.props.onChange(this.state.value)
        }
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
                            {<this.props.type
                                value={value}
                                style={this.props.style}
                                onChange={this.handleChange}
                                onPressEnter={this.check}
                            />}
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
