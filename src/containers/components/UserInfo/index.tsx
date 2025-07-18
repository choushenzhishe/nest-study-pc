import { useState, useEffect } from 'react';
import { connect, useGetUserInfo, useUserContext } from '../../../utils/userHook';
import { Spin } from 'antd';


/**
*
*/
const UserInfo = ({children }:IPropChild) => {
    const { loading } = useGetUserInfo()
    
    return <Spin spinning={loading}> <div>{children}</div></Spin>;
};

export default connect(UserInfo) ;
