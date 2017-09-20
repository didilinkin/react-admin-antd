/**
 * @author 闫晓迪
 * @email 929213769@qq.com
 * @create date 2017-09-15 05:49:24
 * @modify date 2017-09-15 05:49:24
 * @desc 富文本编辑器 - 组件(基于 draft 封装)
*/
import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { Row, Col, Card } from 'antd'

import { EditorState, ContentState } from 'draft-js'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import draftToHtml from 'draftjs-to-html' // 编辑器 传输 JSON格式; 显示 '已编辑完'信息时, 使用此方法
import htmlToDraft from 'html-to-draftjs' // 将 传输格式(html) 转换为 draftjs格式

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

class EditorConvertToHTML extends React.Component {
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

        console.dir(this.state) // { contentState: {}, editorContent: {}, editorState: {} }

        let objToHtml = draftToHtml(this.state.editorContent)
        console.dir(objToHtml)
    }

    // 将 html格式数据设置到 state中
    setVal = () => {
        console.log('将 html格式数据设置到 state中')

        let strHtml = '<p> 测试数据 - html数据设置到 state </p>'

        let objToDraft = htmlToDraft(strHtml) // Object: { contentBlock: [], entityMap: {} }

        // const { ContentBlock, entityMap } = objToDraft.contentBlocks // 将 转换完成的 对象中 两个属性值取出

        const contentBlocks = objToDraft.contentBlocks // 取出 contentBlocks
        const entityMap = objToDraft.entityMap // 取出 entityMap


        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap) // 使用 取出的两个属性值, 使用 Draft方法转换 => contentState
        const editorState = EditorState.createWithContent(contentState)

        console.log('contentState')
        console.dir(contentState)

        console.log('editorState')
        console.dir(editorState)
    }

    // 检查 this
    setThis = () => {
        console.log('查看 this.state')
        console.dir(this.state)
    }

    render () {
        const { editorContent, editorState } = this.state
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
                                7</pre>
                        </Card>
                    </Col>

                    <Col className="gutter-row" md={ 6 } style={{ marginBottom: '1rem' }}>
                        <div onClick={ () => this.postVal() }>
                            <h1 style={{ cursor: 'pointer' }}> 将 state 中数据提交 </h1>
                        </div>
                    </Col>

                    <Col className="gutter-row" md={ 6 } style={{ marginBottom: '1rem' }}>
                        <div onClick={() => this.setVal()}>
                            <h1 style={{ cursor: 'pointer' }}> 将 html格式数据设置到 state中 </h1>
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

export default EditorConvertToHTML
