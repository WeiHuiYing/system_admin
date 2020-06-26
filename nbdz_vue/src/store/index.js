import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orderStatus: [{
        label: "2",
        value: "待发货审核"
      },
      {
        label: "3",
        value: "待发货"
      },
      {
        label: "4",
        value: "已发货"
      },
      {
        label: "5",
        value: "冻结中"
      },
      {
        label: "6",
        value: "缺货"
      },
      {
        label: "7",
        value: "问题件"
      },
      {
        label: "8",
        value: "未付款"
      },
    ]
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
  }
})
