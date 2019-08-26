import React, { Component } from 'react'
import './index.less'
import { Row, Card, Tooltip, Icon, Tag } from 'antd'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { TimesFun } from '../../utils'

const { Meta } = Card
const mapStateToProps = state => {
    return {
        issues: state.issues.allIssues,
    }
}

@withRouter
@connect(mapStateToProps)
export default class RightNav extends Component {
    constructor() {
        super()
        this.state = {
            taglist: [],
            // 开始时间
            sysTime: TimesFun('2019-04-01 00:00:00')
        }
    }

    componentDidMount() {
        const { issues } = this.props
        this.noRepeat(issues)
        this.timer = setInterval(() => {
            // 显示时间
            let sysTime = TimesFun('2019-04-01 00:00:00')
            this.setState({
                sysTime
            })
        }, 60000)
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.issues !== nextProps.issues) {
            this.noRepeat(nextProps.issues)
        }
    }
    // 标签去重
    noRepeat = (data) => {
        if (data.length === 0) return []
        const tempAry = []
        // 遍历 issues 取出带有标签的 item 放进 ary
        data.map((item) => {
            if (item.labels && item.labels.length) {
                // 深层次遍历 每个labels中有多个标签
                item.labels.map((vitem) => {
                    tempAry.push(vitem)
                })
            }
        })
        // 通过对象属性不重名 遍历tempAry 通过id去重
        let hash = {}
        const taglist = tempAry.reduce((preVal, curVal) => {
            // 不存在hash对象中 的id 就 让该id为key 值为true   此时三目运算符的返回值为 hash[curVal.id] = true 为真 进行数组push操作
            // hash对象中id存在 返回空字符串 不进行后面的数组push操作
            hash[curVal.id] ? '' : (hash[curVal.id] = true) && preVal.push(curVal)
            return preVal
        }, [])
        // 最后拿到的taglist 就是不带有重名的标签数组
        this.setState({
            taglist
        })
    }
    toGitIndex = () => {
        window.open('https://github.com/lebronxie')
    }
    render() {
        const { taglist, sysTime } = this.state
        const { issues } = this.props
        return (
            <Row>
                <Card bordered={false} hoverable={true} className="card" cover={<img src={require('../../assets/imgs/headbg.jpeg')} />}>
                    <div className="authorImg">
                        <img src={require('../../assets/imgs/avatar.png')} alt="Hi" />
                    </div>
                    <Meta
                        title={
                            <div>
                                <span className="card-title">lebron</span>
                            </div>
                        }
                        description={
                            <div>
                                <p className="abstract">STAY HUANGRY,STAY FOOLISH</p>
                                <p className="abstract">
                                    <span>文章 - {issues ? issues.length : 0}</span>
                                </p>
                                <p className="abstract">博客已上线：{sysTime}</p>
                                <p className="abstract">其他项目：</p>
                                <p>暂无</p>
                            </div>
                        }
                    />
                </Card>
                <Card title="FOLLOW ME" hoverable={true} className="card">
                    <div className="icon-git-wrp">
                        <div className="call">
                            <Tooltip title="个人简历">
                                <Icon type="solution" style={{ fontSize: 30 }} />
                            </Tooltip>
                            <Tooltip title="github">
                                <Icon type="github" style={{ fontSize: 30 }} onClick={() => this.toGitIndex()} />
                            </Tooltip>
                            <Tooltip
                                title="微信">
                                <Icon type="wechat" style={{ fontSize: 30 }} />
                            </Tooltip>
                        </div>
                    </div>
                </Card>
                <Card title="标签" hoverable={true} className="card">
                    {
                        taglist && taglist.length ? (
                            taglist.map(item => {
                                return (
                                    // 点击每个标签跳转到/tagblog/名称 页面
                                    <Link to={`/tagblog/${item.name}`} key={item.name}>
                                        <Tag color={`#${item.color}`} className="tag" >
                                            {item.name}
                                        </Tag>
                                    </Link>
                                )
                            })
                        ) : '暂无标签'
                    }
                </Card>
                <Card
                    title={<span>最新文章</span>}
                    hoverable={true}
                    className="card"
                >
                    <ul>
                        {issues && issues.length ?
                            issues.map((item, index) => {
                                // 显示最新6条数据
                                if (index < 6) {
                                    return (
                                        <li key={index} className="tag">
                                            <Link to={`/blog/${item.number}`}>{item.title}</Link>
                                        </li>
                                    )
                                }
                            }) : null
                        }
                    </ul>
                </Card>
            </Row>
        )
    }
}

