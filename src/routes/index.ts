import Login from '../containers/Login'
import Home from '../containers/Home'
import Register from '../containers/Register'

export const ROUTE_CONFIG = [
    { path: '/login', title: '登录', element: Login, key: 'login' },
    { path: '/', title: '首页', element: Home, key: 'home' },
    {path:'/register',title:'注册',element:Register,key:'register'}
]