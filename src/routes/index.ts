import Login from '../containers/Login'
import Home from '../containers/Home'

export const ROUTE_CONFIG = [
    { path: '/login', title: '登录', element: Login, key: 'login' },
    { path: '/', title: '首页', element: Home, key: 'home' },
    // {path:'/register',title:'注册'}
]