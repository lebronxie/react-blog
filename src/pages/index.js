import asyncComponent from '../utils/AsyncComponent'
const Home = asyncComponent(() => import("./Home"))
const Blog = asyncComponent(() => import("./Blog"))
const Archive = asyncComponent(() => import("./Archive"))
const TagBlog = asyncComponent(() => import("./TagBlog"))
const NotFound = asyncComponent(() => import("./NotFound"))

export {
  Home,
  Blog,
  Archive,
  TagBlog,
  NotFound
}