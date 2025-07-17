import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { message, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import style from './index.module.scss';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../graphql/auth';

interface RegisterUser {
  username: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
   const [register] = useMutation(REGISTER);
    
  const registerHandler = async (values: RegisterUser) => {
    if (values.password !== values.confirmPassword) {
      messageApi.error('两次密码输入不一致');
      return;
    }
      const { confirmPassword, ...sendData } = values;
      
      const res = await register({
        variables: {
         params:sendData
        }})
      
    if(res.data.createUserByPassword.code !== 200) {
      messageApi.error(res.data.createUserByPassword.message || '注册失败');
      return;
    } 
    messageApi.success('注册成功');
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className={style.container}>
      <div className={style.registerBox}>
        <LoginForm
          logo="https://chou-nest-study.oss-cn-shenzhen.aliyuncs.com/user-dirhenglogo%402x.png"
          title="注册"
          subTitle="欢迎加入"
          onFinish={registerHandler}
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
        >
          {contextHolder}
          <ProFormText
            name="account"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder="请输入账号"
            rules={[
              { required: true, message: '请输入账号!' },
              { pattern: /^[A-Za-z]{6,}$/, message: '账号需为英文且不少于6位' },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder="请输入密码"
            rules={[
              { required: true, message: '请输入密码!' },
              { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, message: '密码需为英文和数字组合且不少于6位' },
            ]}
          />
          <ProFormText.Password
            name="confirmPassword"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder="请确认密码"
            rules={[{ required: true, message: '请确认密码!' }]}
          />
          <div style={{ marginTop: 16, textAlign: 'right' }}>
            <a onClick={() => navigate('/login')}>已有账号？去登录</a>
          </div>
        </LoginForm>
      </div>
    </div>
  );
};

export default Register;