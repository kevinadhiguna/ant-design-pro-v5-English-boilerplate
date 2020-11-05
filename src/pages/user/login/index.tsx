import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Alert, Checkbox, message } from 'antd';
import React, { useState } from 'react';
import { Link, SelectLang, useModel, history, History } from 'umi';
import logo from '@/assets/logo.svg';
import { LoginParamsType, fakeAccountLogin } from '@/services/login';
import Footer from '@/components/Footer';
import LoginFrom from './components/Login';
import styles from './style.less';

const { Tab, Username, Password, Mobile, Captcha, Submit } = LoginFrom;

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
const replaceGoto = () => {
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    if (!redirect) {
      history.replace('/');
      return;
    }
    (history as History).replace(redirect);
  }, 10);
};

const Login: React.FC<{}> = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginStateType>({});
  const [submitting, setSubmitting] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');
  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await fakeAccountLogin({ ...values, type });
      if (msg.status === 'ok' && initialState) {
        message.success('Login Successful！');
        const currentUser = await initialState?.fetchUserInfo();
        setInitialState({
          ...initialState,
          currentUser,
        });
        replaceGoto();
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      message.error('Login failed，Please Try Again！');
    }
    setSubmitting(false);
  };

  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.lang}>
        <SelectLang />
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>Ant Design</span>
            </Link>
          </div>
          <div className={styles.desc}>
            Ant Design is the most influential Web design specification in Xihu District
          </div>
        </div>

        <div className={styles.main}>
          <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
            <Tab key="account" tab="Account Login">
              {status === 'error' && loginType === 'account' && !submitting && (
                <LoginMessage content="Incorrect username/password（admin/ant.design）" />
              )}

              <Username
                name="username"
                placeholder="Username: admin or user"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Username !',
                  },
                ]}
              />
              <Password
                name="password"
                placeholder="Password: ant.design"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Password！',
                  },
                ]}
              />
            </Tab>
            <Tab key="mobile" tab="Mobile Number Login">
              {status === 'error' && loginType === 'mobile' && !submitting && (
                <LoginMessage content="Verification Code Error" />
              )}
              <Mobile
                name="mobile"
                placeholder="Phone Number"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Phone Number',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: 'Invalid Phone Number!',
                  },
                ]}
              />
              <Captcha
                name="captcha"
                placeholder="Verification Code"
                countDown={120}
                getCaptchaButtonText=""
                getCaptchaSecondText="second(s)"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Verification Code！',
                  },
                ]}
              />
            </Tab>
            <div>
              <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
                Auto Login
              </Checkbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                Forgot Password
              </a>
            </div>
            <Submit loading={submitting}>Login</Submit>
            <div className={styles.other}>
              Other Login Methods
              <AlipayCircleOutlined className={styles.icon} />
              <TaobaoCircleOutlined className={styles.icon} />
              <WeiboCircleOutlined className={styles.icon} />
              <Link className={styles.register} to="/user/register">
                Register Account
              </Link>
            </div>
          </LoginFrom>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
