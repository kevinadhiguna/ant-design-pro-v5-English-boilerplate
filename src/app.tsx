import React from 'react';
import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { notification } from 'antd';
import { history, RequestConfig } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { ResponseError } from 'umi-request';
import { queryCurrent } from './services/user';
import defaultSettings from '../config/defaultSettings';

export async function getInitialState(): Promise<{
  settings?: LayoutSettings;
  currentUser?: API.CurrentUser;
  fetchUserInfo: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await queryCurrent();
      return currentUser;
    } catch (error) {
      history.push('/user/login');
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login') {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings; currentUser?: API.CurrentUser };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { currentUser } = initialState;
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!currentUser && location.pathname !== '/user/login') {
        history.push('/user/login');
      }
    },
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};

const codeMessage = {
  200: 'The Server successfully retrieved the requested data.', // OK
  201: 'Successfully created new data.', // Created
  202: 'A request has been received.', // Accepted
  204: 'The data was deleted successfully.', // No Content
  400: 'An error occured in the sent request，the server did not create or modify data.', // Bad Request
  401: 'The user does not have permission（token, username, and password are wrong）.', // Unauthorized
  403: 'The user is authorized，but access is forbidden.', // Forbidden
  404: 'The sent request was for a record that did not exist，hence the server did not operate.', // Not Found
  405: 'The request method is not allowed.', // Method not Allowed
  406: 'The request format is not available.', // Not Acceptable
  410: 'The requested source is permanently deleted and will nolonger be available.', // Gone
  422: 'A validation error occured when creating an object.', 
  500: 'An error occured in the server, please check the server', // Internal Server Error
  502: 'Gateway error.', // Bad Gateway
  503: 'The service is unavailable.', // Service Unavailable
  504: 'The gateway timed out', // Gateway Timeout
};

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `Request Error ${status}: ${url}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: 'You can not connect to the server, please check your network',
      message: 'Network Anomaly',
    });
  }
  throw error;
};

export const request: RequestConfig = {
  errorHandler,
};
