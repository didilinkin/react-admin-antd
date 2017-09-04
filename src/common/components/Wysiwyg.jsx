/**
 * Created by 闫晓迪 929213769@qq.com on 2017/8/13.
 * For: 富文本编辑器 组件 —— 通用
 */

import React from 'react'

import { Row, Col, Card } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import { apiPost } from '../../api'
import draftToHtml from 'draftjs-to-html'
// import {convertToRaw } from 'draft-js'
// import htmlToDraft from 'html-to-draftjs'
import { EditorState } from 'draft-js'
// const blocksFromHtml = htmlToDraft()
// const { contentBlocks, entityMap } = blocksFromHtml.contentBlocks
// const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
// const editorState = EditorState.createWithContent(contentState)
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
        editContent: '',
        contentState: rawContentState,
        editorState: EditorState.createEmpty(),
        data: ''
    }

    clearContent = () => {
        this.setState({
            contentState: ''
        })
    }

    onEditorChange = (editorContent) => {
        this.setState({
            editorContent
        })
        console.log(editorContent)
    }

    onContentStateChange = (contentState) => {
        console.log('contentState', contentState)
    }
    onEditorChange = (editContent) =>{
        console.log(draftToHtml(editContent))
        this.setState({
            editContent: editContent
        })
        if (this.props.flag === 2) {
            this.props.handleSave(draftToHtml(editContent))
        }
        if (this.props.flag === 3) {
            this.props.handleRelease(draftToHtml(editContent))
        }
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
        console.log(this.state.editorContent)
        console.log(typeof this.state.editorContent)
    }
    componentDidMount () {
        this.initialRemarks()
    }
    async initialRemarks () {
        // let resulData = await apiPost(
        //     '/complaint/getContent'
        // )

        // console.log(htmlToDraft(resulData) + '1111')
        // this.setState({
        //     data: resulData.data
        // })
        // console.log(this.props.data)
    }
    // 图片上传 回调函数
    imageUploadCallBack = file => new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest() // eslint-disable-line no-undef
            xhr.open('POST', 'http://192.168.5.24:18082/storage/uploader')
<<<<<<< HEAD
            xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca')
=======
>>>>>>> 49f3b916b8b00b703b2b4bde75d529ed9daab877
            const data = new FormData() // eslint-disable-line no-undef
            data.append('file', file)
            xhr.send(data)
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText)
                let imgUrl = `http://192.168.5.24:18082/storage/files/${response.data}`
                console.log(imgUrl)
                resolve(imgUrl)
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
                            <Card title="" bordered={false} >
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
