import { useGoTo } from '../../hooks';
import { ROUTE_KEY } from '../../routes';
import { connect, useUserContext } from '../../utils/userHook';
import { Button } from 'antd';

/**
 *
 */
const Home = ({}) => {
  const { store } = useUserContext();
  const { go } = useGoTo();
  console.log('🚀 ~ file: index.tsx ~ line 12 ~ ', store);
  return (
    <div style={{ color: '#000', height: '400px' }}>
      <Button type="primary" onClick={() => go(ROUTE_KEY.MY)}>
        去个人中心
      </Button>
    </div>
  );
};

export default Home;
