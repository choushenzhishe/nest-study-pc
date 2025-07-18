import Login from '../containers/Login';
import Home from '../containers/Home';
import Register from '../containers/Register';
import { HomeFilled } from '@ant-design/icons';
import Page404 from '../containers/Page404';

export const ROUTE_CONFIG = [
  // {
  //   path: '/login',
  //   name: '登录',
  //   element: Login,
  //   key: 'login',
  //   hideInMenu: true,
  // },
  {
    path: '/',
    name: '首页',
    element: Home,
    key: 'home',
    icon: <HomeFilled />,
  },
  // {
  //   path: '/register',
  //   name: '注册',
  //   element: Register,
  //   key: 'register',
  //   hideInMenu: true,
  // },
  {
    path: '*',
    name: '404',
    element: Page404,
    key: '404',
    hideInMenu: true,
  },
];
