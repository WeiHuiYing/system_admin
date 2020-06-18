import {
  GetWeavingBlock as GetPage
} from '@/services/analysis';
import {
  notification
} from 'antd';
const weavingBlockModel = {
  namespace: 'weavingBlock',
  state: {
    listData: [],
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
        let resData = response.data.map((item, index) => {
          item.index = index
          return item
        })
        let res = {
          data: resData,
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
      };
    },
  },
};
export default weavingBlockModel;
