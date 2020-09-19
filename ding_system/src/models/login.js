import {
  stringify
} from 'querystring';
import {
  router
} from 'umi';
import {
  AccountLogin,
  GetAccess
} from '@/services/login';
import {
  setAuthority
} from '@/utils/authority';
import {
  getPageQuery
} from '@/utils/utils';
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {

    * login({
      payload
    }, {
      call,
      put
    }) {

      const data = {
        username: payload.name,
        password: payload.password,
        client_id: 'report_client',
        client_secret: 'longqi.123',
        grant_type: 'password',
        redirect_uri: 'http://218.28.44.115:9000/signin-oidc',
        scope: "roles email openid report_api adminClient_api"
      };
      const response = yield call(AccountLogin, data);
      if (response.access_token) {
        localStorage.setItem('token', "Bearer " + response.access_token);
        let data = {
          token: "Bearer " + response.access_token
        }
        let userInfo = yield call(GetAccess, data);
        localStorage.setItem('userId', userInfo.sub);
        yield put({
          type: 'changeLoginStatus',
          payload: userInfo,
        });
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {
          redirect
        } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/welcome';
            return;
          }
        }

        router.replace(redirect || '/welcome');

      }
    },

    logout() {
      const {
        redirect
      } = getPageQuery(); // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        localStorage.removeItem('token');
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, {
      payload
    }) {
      setAuthority(payload);
      return {
        ...state,
        type: payload.user_code
      };
    },
  },
};
export default Model;
