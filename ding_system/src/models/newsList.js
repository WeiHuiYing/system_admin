import {
  GetTypes,
  GetNews
} from '@/services/newsList';
import {
  notification
} from 'antd';
const NewsModel = {
  namespace: 'NewsModel',
  state: {
    newsListData: [],
    newsPage: '1',
    typeListData: [],
  },
  effects: {
    * newsList({
      payload
    }, {
      call,
      put
    }) {
      const response = yield call(GetNews, payload);
      if (response.code == 200) {
        yield put({
          type: 'newData',
          payload: response,
        });
      } else {
        notification.error({
          message: `请求错误`,
          description: response.data.msg,
        });
      }
    },
    * typeList({
      payload
    }, {
      call,
      put
    }) {
      const response = yield call(GetTypes, payload);
      if (response.code == 200) {
        yield put({
          type: 'typeData',
          payload: response,
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
    newData(state, action) {
      return {
        ...state,
        newsListData: action.payload.data || [],
        newsPage: action.payload.totalCount || 1,
      };
    },
    typeData(state, action) {
      return {
        ...state,
        typeListData: action.payload.data || [],
      };
    },
  },
};
export default NewsModel;
