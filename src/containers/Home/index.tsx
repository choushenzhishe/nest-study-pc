import { useState, useEffect } from 'react';

import style from './index.module.scss';

/**
*
*/
const Home = ({}) => {
    const [state, setState] = useState();
    useEffect(() => {
        console.log(state, setState);
    }, []);


    return <div>首页</div>;
};

export default Home;
