import Home from '../containers/Home';
import { HomeFilled } from '@ant-design/icons';
import Page404 from '../containers/Page404';
import type { JSX } from 'react';
import My from '../containers/My';

interface IRoute {
  path: string;
  name: string;
  element: () => JSX.Element;
  key: string;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
}

export const ROUTE_KEY = {
  HOME: 'home',
  MY: 'my',
  PAGE_404: '404',
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: '/',
    name: '首页',
    element: () => <Home />,
    key: 'home',
    icon: <HomeFilled />,
  },
  [ROUTE_KEY.MY]: {
    path: 'my',
    name: '我的',
    element: () => <My />,
    key: 'my',
    // icon: <UserOutlined />,
  },

  [ROUTE_KEY.PAGE_404]: {
    path: '*',
    name: '404',
    element: () => <Page404 />,
    key: '404',
    hideInMenu: true,
  },
};

export const routes = Object.values(ROUTE_CONFIG);

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
