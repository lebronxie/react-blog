import {
  Home,
  Blog,
  Archive,
  TagBlog,
  NotFound
} from './pages'

export default [
  {
    title: '首页',
    component: Home,
    path: '/home',
    exact: true
  },
  {
    title: '博客',
    component: Blog,
    path: '/blog/:number',
    exact: true
  },
  {
    title: '归档',
    component: Archive,
    path: '/archive',
    exact: true
  },
  {
    title: '标签分类',
    component: TagBlog,
    path: '/tagblog/:name',
    exact: true
  },
  {
    title: '404',
    component: NotFound,
    path: '/404',
    exact: true
  }
]