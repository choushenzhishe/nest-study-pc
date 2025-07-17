import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  setAlpha,
} from '@ant-design/pro-components';
import { Space, Tabs, message, theme, Form } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.module.scss'
import { useMutation } from '@apollo/client';
import { LOGIN, SEND_CODE_MESSAGE } from '../../graphql/auth';

type LoginType = 'phone' | 'account';

interface IValues {
  tel: string;
  code: string;
}

export default () => {
  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState<LoginType>('phone');
  const [form] = Form.useForm();
  const navigate = useNavigate();

    const [messageApi,contextHolder] = message.useMessage();

 const [run] =  useMutation(SEND_CODE_MESSAGE)
  const [login] = useMutation(LOGIN)
  
  const iconStyles: CSSProperties = {
    marginInlineStart: '16px',
    color: setAlpha(token.colorTextBase, 0.2),
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };
  const loginHandler = async (values: IValues) => {
      const res = await login({ variables: values });
      if (res.data.login.code === 200) {
        messageApi.success(res.data.login.message);
        navigate('/');
        return;
      }
      messageApi.error(res.data.login.message || '登录失败');
      throw new Error(res.data.login.message || '登录失败');

  };


  return (
    <ProConfigProvider hashed={false}>
       {contextHolder}
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm
          logo="https://chou-nest-study.oss-cn-shenzhen.aliyuncs.com/user-dirhenglogo%402x.png"
          form={form}
          onFinish={loginHandler}
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
          </Tabs>

          {loginType === 'phone' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={'prefixIcon'} />,
                }}
                name="tel"
                placeholder={'手机号'}
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                
                placeholder={'请输入验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'获取验证码'}`;
                  }
                  return '获取验证码';
                }}
                phoneName="tel"
                name="code"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async (tel) => {
                  console.log('🚀 ~ 手机号: ', tel);
                  
             
                    const res = await run({ variables: { tel } });
                    if (res?.data?.sendCodeMsg.code === 200) {
                      messageApi.success(res.data?.sendCodeMsg.message);
                    }
                     else {
                      messageApi.error(res?.data?.sendCodeMsg.message);
                    }
                }}
              />
            </>
          )}
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};