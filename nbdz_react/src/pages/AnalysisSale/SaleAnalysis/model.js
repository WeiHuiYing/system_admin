import {
  SalesGetPage as GetPage
} from '@/services/analysis';
import {
  notification
} from 'antd';
const SalesModel = {
  namespace: 'Sales',
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
        let res = {
          data: response.data,
          pageData: response.count,
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
export default SalesModel;
