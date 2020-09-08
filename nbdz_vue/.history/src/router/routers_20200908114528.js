import Main from '@/components/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [{
      path: '/home',
      name: 'home',
      meta: {
        hideInMenu: true,
        title: '首页',
        notCache: true,
        icon: 'md-home'
      },
      component: () => import('@/view/single-page/home')
    }]
  },
  {
    path: '/baseSet',
    name: 'baseSet',
    meta: {
      icon: 'logo-buffer',
      title: '基础设置'
    },
    component: Main,
    children: [{
        path: 'currencyManage',
        name: 'currencyManage',
        meta: {
          icon: 'logo-usd',
          title: '汇率管理'
        },
        component: () => import('@/view/BaseSet/currencyManage/List.vue')
      },
      {
        path: 'EAccountManage',
        name: 'EAccountManage',
        meta: {
          icon: 'ios-people',
          title: 'E账户管理'
        },
        component: () => import('@/view/BaseSet/EAccountManage/List.vue')
      }
    ]
  },
  {
    path: '/Analysis',
    name: 'Analysis',
    component: Main,
    meta: {
      title: "销售类报表",
      icon: "md-grid"
    },
    children: [{
      path: 'salesAnalysis',
      name: 'salesAnalysis',
      meta: {
        title: '销售报表'
      },
      component: () => import('@/view/Analysis/SalesAnalysis/List.vue')
    }, {
      path: 'SalesTotal',
      name: 'SalesTotal',
      meta: {
        title: '销售汇总报表'
      },
      component: () => import('@/view/Analysis/SalesTotalAnalysis/List.vue')
    }, {
      path: 'WeavingBlock',
      name: 'WeavingBlock',
      meta: {
        title: '发帘发块销售占比'
      },
      component: () => import('@/view/Analysis/WeavingBlock/List.vue')
    }, {
      path: 'GetDensity',
      name: 'GetDensity',
      meta: {
        title: '头套产品销售明细'
      },
      component: () => import('@/view/Analysis/GetDensity/List.vue')
    }, {
      path: 'OrderRatio',
      name: 'OrderRatio',
      meta: {
        title: '单条订单与多条订单对比'
      },
      component: () => import('@/view/Analysis/OrderRatio/List.vue')
    }, {
      path: 'ChannelLevelSalesCount',
      name: 'ChannelLevelSalesCount',
      meta: {
        title: '各店铺各等级产品销量'
      },
      component: () => import('@/view/Analysis/ChannelLevelSalesCount/List.vue')
    }, {
      path: 'HairWeftStyleSale',
      name: 'HairWeftStyleSale',
      meta: {
        title: '发帘发块分款式销售占比报表'
      },
      component: () => import('@/view/Analysis/HairWeftStyleSale/List.vue')
    }, {
      path: 'ProductImage_page',
      name: 'ProductImage_page',
      meta: {
        title: '导出产品图片'
      },
      component: () => import('@/view/Analysis/ProductImage/List.vue')
    }, {
      path: 'HairWeftBlockSale',
      name: 'HairWeftBlockSale',
      meta: {
        title: '发帘发块销量'
      },
      component: () => import('@/view/Analysis/HairWeftBlockSale/List.vue')
    }, {
      path: 'SkuSaleReport',
      name: 'SkuSaleReport',
      meta: {
        title: '产品销售分析'
      },
      component: () => import('@/view/Analysis/SkuSaleReport/List.vue')
    }]
  },
  {
    path: '/Order',
    name: 'Order',
    component: Main,
    meta: {
      title: "订单类相关",
      icon: "md-apps"
    },
    children: [{
      path: 'LogisticsQuery',
      name: 'LogisticsQuery',
      meta: {
        title: '订单物流查询'
      },
      component: () => import('@/view/Order/Logistics/Query.vue')
    }, {
      path: 'PayPalList',
      name: 'PayPalList',
      meta: {
        title: 'PayPal交易记录'
      },
      component: () => import('@/view/Order/PayPal/List.vue')
    }, {
      path: 'AliexpressList',
      name: 'AliexpressList',
      meta: {
        title: '速卖通放款信息'
      },
      component: () => import('@/view/Order/Aliexpress/List.vue')
    }, {
      path: 'AmazonList',
      name: 'AmazonList',
      meta: {
        title: '亚马逊'
      },
      component: () => import('@/view/Order/Amazon/List.vue')
    }, {
      path: 'DongHengList',
      name: 'DongHengList',
      meta: {
        title: '东恒成本价'
      },
      component: () => import('@/view/Order/DongHeng/List.vue')
    }, {
      path: 'RepeatPurchaseList',
      name: 'RepeatPurchaseList',
      meta: {
        title: '复购客户'
      },
      component: () => import('@/view/Order/RepeatPurchase/List.vue')
    }, {
      path: 'FinancialSummaryList',
      name: 'FinancialSummaryList',
      meta: {
        title: '财务汇总报表'
      },
      component: () => import('@/view/Order/FinancialSummary/List.vue')
    }, {
      path: 'FinanceTotal',
      name: 'FinanceTotal',
      meta: {
        title: '财务合计报表'
      },
      component: () => import('@/view/Analysis/FinanceTotal/List.vue')
    }, {
      path: 'SkuSaleQuery',
      name: 'SkuSaleQuery',
      meta: {
        title: 'sku销售明细'
      },
      component: () => import('@/view/Analysis/SkuSaleQuery/List.vue')
    }, {
      path: 'TransportationList',
      name: 'TransportationList',
      meta: {
        title: '订单物流上传'
      },
      component: () => import('@/view/Order/Transportation/List.vue')
    }, {
      path: 'FreightReport',
      name: 'FreightReport',
      meta: {
        title: '运费报表'
      },
      component: () => import('@/view/Analysis/FreightReport/List.vue')
    }, {
      path: 'OrderTotalReprot',
      name: 'OrderTotalReprot',
      meta: {
        title: '订单数量报表'
      },
      component: () => import('@/view/Analysis/OrderTotalReprot/List.vue')
    }, {
      path: 'ReturnRefundReport',
      name: 'ReturnRefundReport',
      meta: {
        title: '退货退款报表'
      },
      component: () => import('@/view/Analysis/ReturnRefundReport/List.vue')
    }, {
      path: 'CancelOrderList',
      name: 'CancelOrderList',
      meta: {
        title: '作废订单报表'
      },
      component: () => import('@/view/Order/CancelOrder/List.vue')
    }, {
      path: 'DeliveryTimeList',
      name: 'DeliveryTimeList',
      meta: {
        title: '发货时效报表'
      },
      component: () => import('@/view/Order/DeliveryTime/List.vue')
    }, {
      path: 'OrderToCodeList',
      name: 'OrderToCodeList',
      meta: {
        title: '订单转条码'
      },
      component: () => import('@/view/Order/OrderToCode/List.vue')
    }, {
      path: 'MarketingOrder',
      name: 'MarketingOrder',
      meta: {
        title: '营销订单统计报表'
      },
      component: () => import('@/view/Order/MarketingOrder/List.vue')
    }, {
      path: 'WagesShipFee',
      name: 'WagesShipFee',
      meta: {
        title: '算运费报表'
      },
      component: () => import('@/view/Order/WagesShipFee/List.vue')
    }, {
      path: 'OrderTurnoverRate',
      name: 'OrderTurnoverRate',
      meta: {
        title: '服装动销率'
      },
      component: () => import('@/view/Order/OrderTurnoverRate/List.vue')
    }, {
      path: 'OrderTransportationLog',
      name: 'OrderTransportationLog',
      meta: {
        title: '运费上传记录'
      },
      component: () => import('@/view/Order/OrderTransportationLog/List.vue')
    }, {
      path: 'ImportOrderAmount',
      name: 'ImportOrderAmount',
      meta: {
        title: '导入速卖通销售明细'
      },
      component: () => import('@/view/Order/ImportOrderAmount/List.vue')
    }]
  },
  {
    path: '/Warehouse',
    name: 'Warehouse',
    component: Main,
    meta: {
      title: "仓库相关",
      icon: "ios-albums"
    },
    children: [{
      path: 'omsList',
      name: 'omsAnsList_page',
      meta: {
        title: 'oms入库单'
      },
      component: () => import('@/view/Analysis/OmsAnsList/List.vue')
    }, {
      path: 'UsTageTypeInventory',
      name: 'UsTagTypeInventory_page',
      meta: {
        title: '美国仓剩余库存报表'
      },
      component: () => import('@/view/Analysis/UsTagTypeInventory/List.vue')
    }, {
      path: 'BnsUsBaseInventory',
      name: 'BnsUsBaseInventory_page',
      meta: {
        title: '美国仓仓底维护'
      },
      component: () => import('@/view/Analysis/BnsUsBaseInventory/List.vue')
    }, {
      path: 'UsUiceNomalSkuQty',
      name: 'UsUiceNomalSkuQty_page',
      meta: {
        title: '美国仓剩余库存报表'
      },
      component: () => import('@/view/Analysis/UsUiceNomalSkuQty/List.vue')
    }, {
      path: 'ECShipOrder',
      name: 'ECShipOrder',
      meta: {
        title: '头程出货单'
      },
      component: () => import('@/view/Analysis/ECShipOrder/List.vue')
    }, {
      path: 'ECShipBatch',
      name: 'ECShipBatch_page',
      meta: {
        title: '头程出库单'
      },
      component: () => import('@/view/Analysis/ECShipBatch/List.vue')
    }, {
      path: 'ESaleOrder',
      name: 'ESaleOrder',
      meta: {
        title: 'E贸易订单'
      },
      component: () => import('@/view/Analysis/ESaleOrder/List.vue')
    }, {
      path: 'AmazonInventory',
      name: 'AmazonInventory',
      meta: {
        title: '亚马逊库存报表'
      },
      component: () => import('@/view/Analysis/AmazonInventory/List.vue')
    }]
  },
  {
    path: '/Logistics',
    name: 'Logistics',
    component: Main,
    meta: {
      title: "物流信息",
      icon: "md-build"
    },
    children: [{
      path: 'OrderTracking',
      name: 'OrderTracking',
      meta: {
        title: '订单物流查询'
      },
      component: () => import('@/view/Logistics/order/List.vue')
    }, {
      path: 'TrackingCode',
      name: 'TrackingCode',
      meta: {
        title: '物流方式'
      },
      component: () => import('@/view/Logistics/trackingCode/List.vue')
    }, {
      path: 'AgingReport',
      name: 'AgingReport',
      meta: {
        title: '物流时效报表'
      },
      component: () => import('@/view/Logistics/agingReport/List.vue')
    }, {
      path: 'logisticsConfig',
      name: 'logisticsConfig',
      meta: {
        title: '物流信息配置'
      },
      component: () => import('@/view/Logistics/logisticsConfig/configList.vue')
    }, {
      path: 'WeeklyDelivery',
      name: 'WeeklyDelivery',
      meta: {
        title: '周发货时效报表'
      },
      component: () => import('@/view/Logistics/WeeklyDelivery/List.vue')
    }, {
      path: 'ComplexDeliveryTime',
      name: 'ComplexDeliveryTime',
      meta: {
        title: '综合站发货时效'
      },
      component: () => import('@/view/Logistics/ComplexDeliveryTime/List.vue')
    }]
  },
  {
    path: '/Stock',
    name: 'Stock',
    component: Main,
    meta: {
      title: "库存查询",
      icon: "md-grid"
    },
    children: [{
      path: 'StockQuery',
      name: 'StockQuery',
      meta: {
        title: '库存查询'
      },
      component: () => import('@/view/Stock/StockQuery/List.vue')
    }, {
      path: 'OutStockList',
      name: 'OutStockList',
      meta: {
        title: '出库报表'
      },
      component: () => import('@/view/Stock/OutStock/List.vue')
    }]
  },
  {
    path: '/Customs',
    name: 'Customs',
    component: Main,
    meta: {
      title: "海关报关",
      icon: "md-grid"
    },
    children: [{
      path: 'CodeManage',
      name: 'CodeManage',
      meta: {
        title: '库存查询'
      },
      component: () => import('@/view/Customs/CodeManage/List.vue')
    }, {
      path: 'ProductCodeManage',
      name: 'ProductCodeManage',
      meta: {
        title: '商品海关编码维护'
      },
      component: () => import('@/view/Customs/ProductCodeManage/List.vue')
    }]
  },
]
