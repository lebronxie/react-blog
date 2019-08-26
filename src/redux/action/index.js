/**
 * Action:类型
 */
// 修改github自带时间方法
import { TimeUpdate } from '../../utils'
//  actionType
import type from '../store/types'
// 请求所有issues方法
import {
    getAllIssues
} from '../../request'


// 获取所有issues
const issuesList = (dataList) => {
    return {
        type: type.ISSUES_LIST,
        payload: dataList
    }
}
// 异步action 使用 redux-thunk 第三方插件 异步请求数据后在 dispatch action
export const issuesListAsync = () => {
    return (dispatch) => {
        getAllIssues()
            .then(res => {
                if (res.status === 200) {
                    // 格式化时间 留下年月日
                    const dataList = res.data.map(item => {
                        item.created_at = TimeUpdate(item.created_at)
                        return item
                    })
                    // dispatch 一个 action
                    dispatch(issuesList(dataList))
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }
}

// 通过number获取对应的issue
export const getIssuesByNumber = (number) => {
    return {
        type: type.GET_ISSUES_BY_NUMBER,
        payload: number
    }
}
