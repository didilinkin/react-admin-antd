// 测试Antd
/* exported React */
import React, { Component } from 'react'
import { Button } from 'antd'

console.log(React)

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Button type='primary'>Button</Button>
        <h1> test </h1>
      </div>
    )
  }
}

export default App
