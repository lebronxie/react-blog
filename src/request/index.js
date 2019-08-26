import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const ajax = axios.create({
  baseURL: isDev ? "https://api.github.com/repos/lebronxie/NBAStore/issues" : "https://api.github.com/repos/lebronxie/NBAStore/issues"
})
// github 身份认证 每小时请求速率可以达到5000次 不然每小时60次请求
// X-RateLimit-Limit: 5000
// X-RateLimit-Remaining: 4999
ajax.defaults.headers.common['Authorization'] = 'token c937b5d91d3ac1b5be37c12675f8f7f0f6428ab5'
// 获取所有的博客文章
export const getAllIssues = () => {
  return ajax.get('')
}
// 通过路由传来的参数去获取
export const getBlogApiInfo = (path) => {
  return ajax.get('/' + path)
}
export const getBlogBylabel = (data) => {
  return ajax.get('', {
    params: {
      labels: data,
    },
  })
}
