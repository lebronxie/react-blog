import React from 'react'
import { Row, Card, message, Tag } from 'antd'
import './index.less'
import { getBlogApiInfo } from '../../request'
import { connect } from 'react-redux'
import marked from 'marked'
import hljs from 'highlight.js'

import { TimeUpdate, ScrollToAnchor } from '../../utils'

const { Meta } = Card

const mapStateToProps = state => {
    return {
        issues: state.issues
    }
}

@connect(mapStateToProps)
export default class Blog extends React.Component {

    state = {
        issuesInfo: [],
        loading: false,
        path: '',
        talk: true
    }
    componentDidMount() {
        ScrollToAnchor()
        marked.setOptions({
            highlight: code => hljs.highlightAuto(code).value,
        })
        this.getBlogApiInfo(this.props.match.params.number)
        this.setState({ path: this.props.match.params.number })
    }
    // //  监听路由参数变化
    shouldComponentUpdate(nextProps) {
        ScrollToAnchor()
        if (this.props.match.params.number !== nextProps.match.params.number) {
            this.getBlogApiInfo(nextProps.match.params.number)
            this.setState({ path: nextProps.match.params.number, talk: false })
        }
        return true
    }

    // 通过路由传来的参数去获取文档
    getBlogApiInfo(path) {
        this.setState({ issuesInfo: [], loading: true },
            () => {
                getBlogApiInfo(path)
                    .then((response) => {
                        if (response.status === 200) {
                            // 进行时间格式统一处理
                            const data = response.data
                            this.setState({ issuesInfo: data, loading: false, talk: true })
                        }
                    }).catch(function (error) {
                        message.warning('文章不存在')
                    })
            })
    }

    render() {
        const { issuesInfo, loading, talk } = this.state
        return (
            <Row style={{ color: '#fff', marginBottom: 20 }}>
                <Card
                    style={{ width: '100%' }}
                    loading={loading}
                >
                    <Meta
                        title={
                            issuesInfo && issuesInfo.body ? (
                                <div>
                                    <h2>{issuesInfo.title}</h2>
                                    <div style={{ fontSize: 14 }}>
                                        <span style={{ marginRight: 16 }}>发表于 : {TimeUpdate(issuesInfo.created_at)}</span>
                                        标签 : {
                                            issuesInfo && issuesInfo.labels && issuesInfo.labels.length ? (
                                                issuesInfo.labels.map((item, index) => {
                                                    return (
                                                        <Tag style={{ fontSize: 14 }} key={index} color={`#${item.color}`}>{item.name}</Tag>
                                                    )
                                                })
                                            ) : '暂无标签'
                                        }
                                    </div>
                                </div>
                            ) : null
                        }
                        description={
                            issuesInfo && issuesInfo.body ? (
                                <div className='article-detail' dangerouslySetInnerHTML={{ __html: marked(issuesInfo.body) }} />
                            ) : '暂无内容...'
                        }
                    />
                </Card>

            </Row>
        )
    }
}


