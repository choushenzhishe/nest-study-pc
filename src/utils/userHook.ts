import { useQuery } from '@apollo/client';
import { connectFactory, useAppContext } from './contextFactory';
import { GET_USER } from '../graphql/user';
import { useLocation, useNavigate } from 'react-router-dom';

const KEY = 'userInfo';
const DEFAULT_VALUE = {};
export const useUserContext = () => useAppContext(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

export const useGetUserInfo = () => {
  const { store, setStore } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, refetch } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
    onCompleted: (data) => {
      if (data.getUserInfo) {
        const { id, account, tel } = data.getUserInfo;
        setStore({ id, account, tel });
        if (location.pathname.startsWith('/login')) {
          navigate('/');
        }
        return;
      }
      setStore({ refreshHandler: refetch });
      if (location.pathname !== '/login') {
        navigate(`/login?orgPath=${location.pathname}`);
      }

      console.log(data);
    },
    onError: () => {
      setStore({ refreshHandler: refetch });
      if (location.pathname !== '/login') {
        navigate(`/login?orgPath=${location.pathname}`);
      }
    },
  });

  return { loading, refetch };
};
