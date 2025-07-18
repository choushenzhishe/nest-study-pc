import { useEffect, useMemo } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { getRouteByKey, routes } from '../routes';

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, []);
};

// 通用页面跳转
export const useGoTo = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);

  const go = (
    pathKey: string,
    params: Record<string, string | number> = {},
  ) => {
    if (!pathKey) return navigate('/');

    const route = getRouteByKey(pathKey);
    if (route && route.path) {
      // 替换路径参数
      let url = route.path.replace(/:(\w+)/g, (_, key) => {
        return params[key] !== undefined ? String(params[key]) : '';
      });

      // 移除多余的连续斜杠
      url = url.replace(/\/+/g, '/').replace(/\/$/, '') || '/';

      navigate(url);
    }
  };

  return { back, go };
};

//  获取当前匹配的路由
export const useMatchedRoute = () => {
  const r = useLocation();

  const route = useMemo(
    () => routes.find((route) => matchPath(route.path, r.pathname)),
    [r.pathname],
  );
  return route;
};
