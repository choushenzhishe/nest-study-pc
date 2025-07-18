import { useState, useEffect } from 'react';

import styles from './index.module.scss';
import {
  PageContainer,
  ProLayout,
  type MenuDataItem,
} from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import { useUserContext } from '../utils/userHook';
import { ROUTE_CONFIG, routes } from '../routes';
import { AUTH_TOKEN } from '../utils/constants';

const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => {
  return <Link to={item.path || '/'}>{dom}</Link>;
};

const Layout = () => {
  const outLet = useOutlet();
  const { store } = useUserContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    sessionStorage.removeItem(AUTH_TOKEN);
    navigate('/login');
  };

  return (
    <ProLayout
      className={styles.container}
      layout="mix"
      avatarProps={{
        src: '@/assets/react.svg',
        title: store.account,
        size: 'small',
        onClick: logout,
      }}
      logo={<img src="@/assets/react.svg" />}
      title={false}
      route={{ path: '/', routes }}
      siderWidth={130}
      menuItemRender={menuItemRender}
      onMenuHeaderClick={() => navigate('/')}
    >
      <PageContainer>{outLet}</PageContainer>
    </ProLayout>
  );
};

export default Layout;
