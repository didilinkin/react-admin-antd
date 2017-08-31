/**
 * Created by 闫晓迪 929213769@qq.com on 2017/8/13.
 * For: 富文本编辑器 组件 —— 通用
 */

import React from 'react'

import { Row, Col, Card } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

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
        contentState: rawContentState,
        editorState: ''
    }

    clearContent = () => {
        this.setState({
            contentState: ''
        })
    }

    onContentStateChange = (contentState) => {
        console.log('contentState', contentState)
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
    }

    // 图片上传 回调函数
    imageUploadCallBack = file => new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest() // eslint-disable-line no-undef
            xhr.open('POST', 'https://192.168.5.24:18082/storage/uploader')
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

    render () {
        const { editorState } = this.state
        return (
            <div className="gutter-example button-demo">

                {/*
                    <BreadcrumbCustom first="UI" second="富文本" />
                */}

                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
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
                                        console.log('tab')
                                        return true
                                    }}
                                    localization={{
                                        locale: 'zh',
                                        translations: { 'generic.add': 'Test-Add' }
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

                                <style>{`
                                    .home-editor {
                                        min-height: 300px;
                                    }
                                `}</style>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Wysiwyg
