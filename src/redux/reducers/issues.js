/**
 * 数据处理
 */
import type from '../store/types'
const initialState = {
    allIssues: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case type.ISSUES_LIST:
            return {
                ...state,
                allIssues: action.payload
            }
        case type.GET_ISSUES_BY_NUMBER:
            const issuesInfo = state.allIssues.find((item) => {
                return item.number === action.payload
            })
            return {
                ...state,
                issuesInfo
            }
        default:
            return { ...state }
    }
}