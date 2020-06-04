import {
  GetUserPermissions,
  UserAdd,
  UserDelete,
  UserGetList,
  UserGet,
  UserEdit,
  RoleGetPage,
  ResourceGetPage,
  ScheduleGetPage,
} from '@/services/baseSet';
import {
  notification
} from 'antd';
const BaseSetModel = {
  namespace: 'BaseSet',
  state: {
    roleListData: [],
    rolePage: {},
    resourceListData: [],
    resourcePage: {},
    taskListData: [],
    taskPage: {},
  },
  effects: {
    * RoleList({
      payload
    }, {
      call,
      put
    }) {
      const response = yield call(RoleGetPage, payload);
      if (response.code == 200) {
        let pageData = {
          total: response.count,
        };
        let res = {
          data: response.data,
          pageData: pageData,
        };
        yield put({
          type: 'roleLoad',
          payload: res,
        });
      } else {
        notification.error({
          message: `请求错误`,
          description: response.data.msg,
        });
      }
    },
    * ResourceList({
      payload
    }, {
      call,
      put
    }) {
      const response = yield call(ResourceGetPage, payload);
      if (response.code == 200) {
        let pageData = {
          total: response.count,
        };
        let res = {
          data: response.data,
          pageData: pageData,
        };
        yield put({
          type: 'resourceLoad',
          payload: res,
        });
      } else {
        notification.error({
          message: `请求错误`,
          description: response.data.msg,
        });
      }
    },
    * TaskList({
      payload
    }, {
      call,
      put
    }) {
      const response = yield call(ScheduleGetPage, payload);
      if (response.code == 200) {
        let pageData = {
          total: response.count,
        };
        let res = {
          data: response.data,
          pageData: pageData,
        };
        yield put({
          type: 'taskLoad',
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
    roleLoad(state, action) {
      return {
        ...state,
        roleListData: action.payload.data || [],
        rolePage: action.payload.pageData || {},
      };
    },
    resourceLoad(state, action) {
      return {
        ...state,
        resourceListData: action.payload.data || [],
        resourcePage: action.payload.pageData || {},
      };
    },
    taskLoad(state, action) {
      return {
        ...state,
        taskListData: action.payload.data || [],
        taskPage: action.payload.pageData || {},
      };
    },
  },
};
export default BaseSetModel;
