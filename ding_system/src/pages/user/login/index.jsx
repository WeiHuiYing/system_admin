import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import LoginFrom from './components/Login';
import styles from './style.less';
const { UserName, Password, Submit } = LoginFrom;
//  Mobile, Captcha Tab,
const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = props => {
  const { userLogin = {}, submitting } = props;
  const { status } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const handleSubmit = values => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };

  return (
    <div className={styles.main}>
      <LoginFrom onSubmit={handleSubmit}>
        {status === 'error' && !submitting && <LoginMessage content="账户或密码错误" />}
        <UserName
          name="name"
          placeholder="请输入用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <Password
          name="password"
          placeholder="请输入密码"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <div>
          <Checkbox checked={autoLogin} onChange={e => setAutoLogin(e.target.checked)}>
            自动登录
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
        <Submit loading={submitting}>登录</Submit>
      </LoginFrom>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
