import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orderStatus: [{
        label: "0",
        value: "已废弃"
      }, {
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
    ],
    companyList: ["许昌伊洛电子商务有限公司",
      "许昌久美发制品有限公司",
      "郑州蒂莫西商贸有限公司",
      "许昌龙祁电子商务有限公司",
      "许昌娜嘟啦发制品有限公司",
      "许昌客莱依贸易有限公司",
      "许昌茜茜商贸有限公司",
      "许昌优妮丝发制品有限公司"
    ],
    amazonStore: ["Amazon BF",
      "Amazon Chifave",
      "Amazon Ali Julia",
      "Amazon Donmily",
      "Amazon Jolia",
      "Amazon KLAIYI",
      "Amazon Nadula",
      "Amazon Sunber",
      "Amazon lq美",
      "Amazon Sviuse",
      "Amazon Unice",
      "Amazon Yiroo",
      "Amazon Zevrez",
      "Amazon VOVLucky",
      "Amazon FairyShe",
      "Amazon Talever",
      "Amazon Famitile",
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
