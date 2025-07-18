import { useState, useEffect } from 'react';

import style from './index.module.scss';
import { connect, useUserContext } from '../../utils/userHook';

/**
*
*/
const Home = ({}) => {
    const {store} = useUserContext();

    console.log('🚀 ~ file: index.tsx ~ line 12 ~ ', store);
    return <div style={{ color: '#000',height:'400px' }}>{ store?.account}</div>;
};

export default  (Home);
