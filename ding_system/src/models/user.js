import {
  GetAccess
} from '@/services/login';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {

    * fetchCurrent(_, {
      call,
      put
    }) {
      const response = yield call(GetAccess);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {}
      };
    },

  },
};
export default UserModel;
