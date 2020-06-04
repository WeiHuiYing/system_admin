import {
  GetUserPermissions,
  UserAdd,
  UserGetPage,
  UserDelete,
  UserGetList,
  UserGet,
  UserEdit,
} from '@/services/baseSet';
import {
  notification
} from 'antd';
const userManageModel = {
  namespace: 'userManage',
  state: {
    userListData: [],
    userPage: {},
  },
  effects: {
    * UserList({
      payload
    }, {
      call,
      put
    }) {
      const response = yield call(UserGetPage, payload);
      console.log(response);
      if (response.code == 200) {
        let pageData = {
          total: response.count,
        };
        let res = {
          data: response.data,
          pageData: pageData,
        };
        yield put({
          type: 'userLoad',
          payload: res,
        });
      } else {
        notification.error({
          message: `请求错误`,
          description: response.data.msg,
        });
      }
    },
  },
  reducers: {
    userLoad(state, action) {
      return {
        ...state,
        userListData: action.payload.data || [],
        userPage: action.payload.pageData || {},
      };
    },
  },
};
export default userManageModel;
