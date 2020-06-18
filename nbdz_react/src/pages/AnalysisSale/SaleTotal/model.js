import {
  GetPage
} from '@/services/analysis';
import {
  notification
} from 'antd';
const SalesTotalModel = {
  namespace: 'SalesTotal',
  state: {
    listData: [],
    pageData: {},
  },
  effects: {
    * fetchList({
      payload
    }, {
      call,
      put
    }) {
      const response = yield call(GetPage, payload);
      if (response.code == 200) {
        response.data.forEach((item, index) => {
          item.key = index;
        });
        let pageData = {
          total: response.count,
        };
        let res = {
          data: response.data,
          pageData: pageData,
        };
        yield put({
          type: 'loadData',
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
    loadData(state, action) {
      return {
        ...state,
        listData: action.payload.data || [],
        listPage: action.payload.pageData || {},
      };
    },
  },
};
export default SalesTotalModel;
