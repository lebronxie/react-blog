import React, { Component } from 'react'
import { Row, Col, BackTop } from 'antd'
import './index.less'
import Header from '../Header'
import Footer from '../Footer'
import Music from '../Music'
import RightNav from '../RightNav'
import { connect } from 'react-redux'
import { issuesListAsync } from '../../redux/action'
@connect(null, { issuesListAsync })
export default class Frame extends Component {
  constructor(props) {
    super(props)
    props.issuesListAsync()
  }
  render() {
    return (
      <div className='web' >
        {/* 用于顶部元素显示在浏览器可视窗口内 即返回到页面顶部 */}
        <div id='to-header'></div>
        {/* 返回顶部 */}
        <BackTop />
        {/* 头部组件 */}
        <Header />
        {/* 音乐组件 */}
        {/* <Music /> */}
        <Row className='bg'>
          {/* 内容区域 */}
          <Row style={{ marginTop: 20 }}>
            <Col xs={1} xm={1} md={1} lg={1} xl={3} xxl={4}></Col>
            <Col xs={22} sm={22} md={22} lg={20} xl={18} xxl={16}>
              <Row>
                <Col xs={24} sm={24} md={24} lg={17} xl={17} xxl={17}>
                  {/* 根据路由渲染不容的内容 */}
                  {this.props.children}
                </Col>
                <Col xs={24} sm={24} md={24} lg={{ span: 6, offset: 1 }} xl={{ span: 6, offset: 1 }} xxl={{ span: 6, offset: 1 }}>
                  <RightNav />
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>
        {/* 底部组件 */}
        <Footer />
      </div>
    )
  }
}

