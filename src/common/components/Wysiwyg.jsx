/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-09-15 05:49:24
 * @modify date 2017-09-15 05:49:24
 * @desc 富文本编辑器 - 组件(基于 draft 封装)
*/
import React from 'react'
import localStore from 'store'
// import cloneDeep from 'lodash/cloneDeep'
import { Editor } from 'react-draft-wysiwyg'
import { Row, Col, Card } from 'antd'

// import { EditorState, ContentState } from 'draft-js'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import draftToHtml from 'draftjs-to-html' // 编辑器 传输 JSON格式; 显示 '已编辑完'信息时, 使用此方法
// import htmlToDraft from 'html-to-draftjs' // 将 传输格式(html) 转换为 draftjs格式

const rawContentState = {
    'entityMap': {
        '0': {
            'type': 'IMAGE',
            'mutability': 'MUTABLE',
            'data': {
                'src': 'http://i.imgur.com/aMtBIep.png',
                'height': 'auto',
                'width': '100%'
            }
        }
    },
    'blocks': [
        {
            'key': '9unl6',
            'text': '',
            'type': 'unstyled',
            'depth': 0,
            'inlineStyleRanges': [],
            'entityRanges': [],
            'data': {}
        }, {
            'key': '95kn',
            'text': ' ',
            'type': 'atomic',
            'depth': 0,
            'inlineStyleRanges': [],
            'entityRanges': [
                {
                    'offset': 0,
                    'length': 1,
                    'key': 0
                }
            ],
            'data': {}
        }, {
            'key': '7rjes',
            'text': '',
            'type': 'unstyled',
            'depth': 0,
            'inlineStyleRanges': [],
            'entityRanges': [],
            'data': {}
        }
    ]
}

class Wysiwyg extends React.Component {
    state = {
        editorContent: undefined,
        contentState: rawContentState,
        editorState: ''
    }

    onEditorChange = (editorContent) => {
        this.setState({ editorContent })
    }

    clearContent = () => {
        this.setState({ contentState: '' })
    }

    onContentStateChange = (contentState) => {
        console.log('contentState', contentState)
    }

    onEditorStateChange = (editorState) => {
        this.setState({ editorState })
    }

    imageUploadCallBack = file => new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest() // eslint-disable-line no-undef
            xhr.open('POST', 'https://api.imgur.com/3/image')
            xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca')
            const data = new FormData() // eslint-disable-line no-undef
            data.append('image', file)
            xhr.send(data)
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText)
                resolve(response)
            })
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText)
                reject(error)
            })
        }
    )

    // 提交 state中数据
    postVal = () => {
        console.log('提交 state中数据')

        // console.dir(this.state) // { contentState: {}, editorContent: {}, editorState: {} }

        // let objToHtml = draftToHtml(this.state.editorContent) // 暂不需 转换为 HTML
        // console.dir(objToHtml)

        localStore.remove('Wysiwyg') // 清空 Wysiwyg(富文本数据)

        localStore.set('Wysiwyg', {
            jsonObj: this.state.editorContent
        })
    }

    // 将 html格式数据设置到 state中
    setVal = () => {
        console.log('将 LS数据取出, 然后深拷贝')

        const lsValue = localStore.get('Wysiwyg').jsonObj

        console.log('检查 数据')
        console.dir(lsValue)

        this.setState({ editorContent: lsValue }, () => {
            console.log('setState 完成')
            console.log(this.state)
        }) // 效果完成; 但是没有触发再次的 render; 考虑使用 Redux 通过 nextProps来触发再次渲染
    }

    // 检查 this
    setThis = () => {
        console.log('查看 this.state')
        console.dir(this.state)
    }

    render () {
        const { editorContent, editorState } = this.state
        console.log('渲染次数')

        return (
            <div className="gutter-example button-demo">
                <Row gutter={16}>
                    <Col className="gutter-row" md={ 24 } style={{ marginBottom: '1rem' }}>
                        <div className="gutter-box">
                            <Card title="富文本编辑器" bordered={false} >
                                <Editor
                                    editorState={editorState}
                                    toolbarClassName="home-toolbar"
                                    wrapperClassName="home-wrapper"
                                    editorClassName="home-editor"
                                    onEditorStateChange={this.onEditorStateChange}
                                    toolbar={{
                                        history: { inDropdown: true },
                                        inline: { inDropdown: false },
                                        list: { inDropdown: true },
                                        textAlign: { inDropdown: true },
                                        image: { uploadCallback: this.imageUploadCallBack }
                                    }}
                                    onContentStateChange={this.onEditorChange}
                                    placeholder="请输入正文~~尝试@哦，有惊喜"
                                    spellCheck
                                    onFocus={() => {
                                        console.log('focus')
                                    }}
                                    onBlur={() => {
                                        console.log('blur')
                                    }}
                                    onTab={() => {
                                        return true
                                    }}
                                    localization={{
                                        locale: 'zh',
                                        translations: {
                                            'generic.add': 'Test-Add'
                                        }
                                    }}
                                    mention={{
                                        separator: ' ',
                                        trigger: '@',
                                        caseSensitive: true,
                                        suggestions: [
                                            {
                                                text: 'A',
                                                value: 'AB',
                                                url: 'href-a'
                                            }, {
                                                text: 'AB',
                                                value: 'ABC',
                                                url: 'href-ab'
                                            }, {
                                                text: 'ABC',
                                                value: 'ABCD',
                                                url: 'href-abc'
                                            }, {
                                                text: 'ABCD',
                                                value: 'ABCDDDD',
                                                url: 'href-abcd'
                                            }, {
                                                text: 'ABCDE',
                                                value: 'ABCDE',
                                                url: 'href-abcde'
                                            }, {
                                                text: 'ABCDEF',
                                                value: 'ABCDEF',
                                                url: 'href-abcdef'
                                            }, {
                                                text: 'ABCDEFG',
                                                value: 'ABCDEFG',
                                                url: 'href-abcdefg'
                                            }
                                        ]
                                    }}
                                />

                                <style>
                                    {`
                                        .home-editor {
                                            min-height: 300px
                                        }
                                    `}
                                </style>
                            </Card>
                        </div>
                    </Col>

                    <Col className="gutter-row" md={ 12 } style={{ marginBottom: '1rem' }}>
                        <Card title="同步转换HTML" bordered={false}>
                            <pre>{ draftToHtml(editorContent) }</pre>
                        </Card>
                    </Col>

                    <Col className="gutter-row" md={ 12 } style={{ marginBottom: '1rem' }}>
                        <Card title="同步转换JSON" bordered={false}>
                            <pre style={{ whiteSpace: 'normal' }}>
                                { JSON.stringify(editorContent) }
                            </pre>
                        </Card>
                    </Col>

                    <Col className="gutter-row" md={ 6 } style={{ marginBottom: '1rem' }}>
                        <div onClick={ () => this.postVal() }>
                            <h1 style={{ cursor: 'pointer' }}> 将 state 中数据保存到LS </h1>
                        </div>
                    </Col>

                    <Col className="gutter-row" md={ 6 } style={{ marginBottom: '1rem' }}>
                        <div onClick={() => this.setVal()}>
                            <h1 style={{ cursor: 'pointer' }}> 将 LS取出数据, 设置到 state中 </h1>
                        </div>
                    </Col>

                    <Col className="gutter-row" md={6} style={{ marginBottom: '1rem' }}>
                        <div onClick={() => this.setThis()}>
                            <h1 style={{ cursor: 'pointer' }}> 查看 this </h1>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Wysiwyg
