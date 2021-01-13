import Main from "@/components/main";

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

export default [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "Login - 登录",
      hideInMenu: true
    },
    component: () => import("@/view/login/login.vue")
  },
  {
    path: "/",
    name: "_home",
    redirect: "/home",
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          hideInMenu: true,
          title: "首页",
          notCache: true,
          icon: "md-home"
        },
        component: () => import("@/view/single-page/home")
      }
    ]
  },
  {
    path: "/account",
    name: "account",
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: "change_pwd",
        name: "change_pwd",
        meta: {
          title: "修改用户密码"
        },
        component: () => import("@/view/login/changePwd.vue")
      }
    ]
  },
  {
    path: "/baseSet",
    name: "baseSet",
    meta: {
      icon: "logo-buffer",
      title: "基础设置",
      access: ["base"]
    },
    component: Main,
    children: [
      {
        path: "currencyManage",
        name: "currencyManage",
        meta: {
          icon: "logo-usd",
          title: "汇率管理",
          access: ["base", "base:exchangerate"]
        },
        component: () => import("@/view/BaseSet/currencyManage/List.vue")
      },
      {
        path: "EAccountManage",
        name: "EAccountManage",
        meta: {
          icon: "ios-people",
          title: "E账户管理",
          access: ["base", "base:eaccount"]
        },
        component: () => import("@/view/BaseSet/EAccountManage/List.vue")
      },
      {
        path: "shopManage",
        name: "shopManage",
        meta: {
          icon: "ios-archive",
          title: "店铺管理",
          access: ["base", "base:shop"]
        },
        component: () => import("@/view/BaseSet/shopManage/List.vue")
      },
      {
        path: "amazonAsin",
        name: "amazonAsin",
        meta: {
          icon: "ios-archive",
          title: "店铺管理",
          access: ["base", "base:asin"]
        },
        component: () => import("@/view/BaseSet/amazonAsin/List.vue")
      }
    ]
  },
  {
    path: "/Analysis",
    name: "Analysis",
    component: Main,
    meta: {
      title: "销售类报表",
      icon: "md-grid",
      access: ["report_sale"]
    },
    children: [
      /* {
        path: "salesAnalysis",
        name: "salesAnalysis",
        meta: {
          title: "销售报表",
          access: ["report_sale:sale"]
        },
        component: () => import("@/view/Analysis/SalesAnalysis/List.vue")
      }, */
      {
        path: "SalesTotal",
        name: "SalesTotal",
        meta: {
          title: "销售汇总报表",
          access: ["report_sale:saletotal"]
        },
        component: () => import("@/view/Analysis/SalesTotalAnalysis/List.vue")
      },
      {
        path: "WeavingBlock",
        name: "WeavingBlock",
        meta: {
          title: "发帘发块销售占比",
          access: ["report_sale:weavingblock"]
        },
        component: () => import("@/view/Analysis/WeavingBlock/List.vue")
      },
      {
        path: "GetDensity",
        name: "GetDensity",
        meta: {
          title: "头套产品销售明细",
          access: ["report_sale:density"]
        },
        component: () => import("@/view/Analysis/GetDensity/List.vue")
      },
      {
        path: "OrderRatio",
        name: "OrderRatio",
        meta: {
          title: "单条订单与多条订单对比",
          access: ["report_sale:minussale"]
        },
        component: () => import("@/view/Analysis/OrderRatio/List.vue")
      },
      {
        path: "ChannelLevelSalesCount",
        name: "ChannelLevelSalesCount",
        meta: {
          title: "各店铺各等级产品销量",
          access: ["report_sale:levelsales"]
        },
        component: () =>
          import("@/view/Analysis/ChannelLevelSalesCount/List.vue")
      },
      {
        path: "HairWeftStyleSale",
        name: "HairWeftStyleSale",
        meta: {
          title: "发帘发块分款式销售占比报表",
          access: ["report_sale:stylesale"]
        },
        component: () => import("@/view/Analysis/HairWeftStyleSale/List.vue")
      },
      {
        path: "ProductImage_page",
        name: "ProductImage_page",
        meta: {
          title: "导出产品图片",
          access: ["report_sale:producttrans"]
        },
        component: () => import("@/view/Analysis/ProductImage/List.vue")
      },
      {
        path: "HairWeftBlockSale",
        name: "HairWeftBlockSale",
        meta: {
          title: "发帘发块销量",
          access: ["report_sale:hairweftblocksale"]
        },
        component: () => import("@/view/Analysis/HairWeftBlockSale/List.vue")
      },
      {
        path: "SkuSaleReport",
        name: "SkuSaleReport",
        meta: {
          title: "产品销售分析",
          access: ["report_sale:skusaleitem"]
        },
        component: () => import("@/view/Analysis/SkuSaleReport/List.vue")
      },
      {
        path: "ThreeWareSkuQuery",
        name: "ThreeWareSkuQuery",
        meta: {
          title: "三方仓库外部SKU成本计算",
          access: ["report_order:threewaresku"]
        },
        component: () => import("@/view/Analysis/ThreeWareSkuQuery/List.vue")
      },
      {
        path: "QueryInOut",
        name: "QueryInOut",
        meta: {
          title: "国内海外仓发货占比",
          access: ["report_sale:qior"]
        },
        component: () => import("@/view/Analysis/QueryInOut/List.vue")
      },
      {
        path: "AmazonSellerRate",
        name: "AmazonSellerRate",
        meta: {
          title: "亚马逊人员销售占比",
          access: ["report_sale:amazonSellerRate"]
        },
        component: () => import("@/view/Analysis/AmazonSellerRate/List.vue")
      }
    ]
  },
  {
    path: "/Order",
    name: "Order",
    component: Main,
    meta: {
      title: "订单类相关",
      icon: "md-apps",
      access: ["report_order"]
    },
    children: [
      {
        path: "LogisticsQuery",
        name: "LogisticsQuery",
        meta: {
          title: "订单物流查询",
          access: ["report_order:deliver"]
        },
        component: () => import("@/view/Order/Logistics/Query.vue")
      },
      {
        path: "PayPalList",
        name: "PayPalList",
        meta: {
          title: "PayPal交易记录",
          access: ["report_order:paypal"]
        },
        component: () => import("@/view/Order/PayPal/List.vue")
      },
      {
        path: "AliexpressList",
        name: "AliexpressList",
        meta: {
          title: "速卖通放款信息",
          access: ["report_order:aliloanimport"]
        },
        component: () => import("@/view/Order/Aliexpress/List.vue")
      },
      {
        path: "AmazonList",
        name: "AmazonList",
        meta: {
          title: "亚马逊交易记录",
          access: ["report_order:amazon"]
        },
        component: () => import("@/view/Order/Amazon/List.vue")
      },
      {
        path: "DongHengList",
        name: "DongHengList",
        meta: {
          title: "导入东恒成本价",
          access: ["report_order:dhcoustimport", "report_order:dhcoust"]
        },
        component: () => import("@/view/Order/DongHeng/List.vue")
      },
      {
        path: "RepeatPurchaseList",
        name: "RepeatPurchaseList",
        meta: {
          title: "复购客户",
          access: ["report_order:repeatcust", "report_order:repeatcust"]
        },
        component: () => import("@/view/Order/RepeatPurchase/List.vue")
      },
      {
        path: "FinancialSummaryList",
        name: "FinancialSummaryList",
        meta: {
          title: "财务汇总报表",
          access: [
            "report_order:financialstatement",
            "report_order:financialstatement:export"
          ]
        },
        component: () => import("@/view/Order/FinancialSummary/List.vue")
      },
      {
        path: "FinanceTotal",
        name: "FinanceTotal",
        meta: {
          title: "财务合计报表",
          access: [
            "report_order:ordercosttotal",
            "report_order:ordercosttotal:export"
          ]
        },
        component: () => import("@/view/Order/FinanceTotal/List.vue")
      },
      {
        path: "SkuSaleQuery",
        name: "SkuSaleQuery",
        meta: {
          title: "sku销售明细",
          access: [
            "report_order:skusalequery",
            "report_order:skusalequery:export"
          ]
        },
        component: () => import("@/view/Order/SkuSaleQuery/List.vue")
      },
      {
        path: "TransportationList",
        name: "TransportationList",
        meta: {
          title: "订单物流上传",
          access: ["report_order:uploadshipfee"]
        },
        component: () => import("@/view/Order/Transportation/List.vue")
      },
      {
        path: "TransportationListNew",
        name: "TransportationListNew",
        meta: {
          title: "订单物流上传(新)",
          access: ["report_order:shipping"]
        },
        component: () => import("@/view/Order/TransportationNew/List.vue")
      },
      {
        path: "FreightReport",
        name: "FreightReport",
        meta: {
          title: "运费报表",
          access: [
            "report_order:shipfeeorder",
            "report_order:shipfeeorder:export"
          ]
        },
        component: () => import("@/view/Order/FreightReport/List.vue")
      },
      {
        path: "OrderTotalReprot",
        name: "OrderTotalReprot",
        meta: {
          title: "仓库发货占比报表",
          access: ["report_order:salenumber", "report_order:salenumber:export"]
        },
        component: () => import("@/view/Order/OrderTotalReprot/List.vue")
      },
      /* {
        path: "ReturnRefundReport",
        name: "ReturnRefundReport",
        meta: {
          title: "退货退款报表",
          access: [
            "report_order:returnorder",
            "report_order:returnorder:export"
          ]
        },
        component: () => import("@/view/Order/ReturnRefundReport/List.vue")
      }, */
      {
        path: "CancelOrderList",
        name: "CancelOrderList",
        meta: {
          title: "作废订单报表",
          access: [
            "report_order:cancelorder",
            "report_order:cancelorder:export"
          ]
        },
        component: () => import("@/view/Order/CancelOrder/List.vue")
      },
      {
        path: "DeliveryTimeList",
        name: "DeliveryTimeList",
        meta: {
          title: "发货时效报表",
          access: [
            "report_order:deliverytime",
            "report_order:deliverytime:export"
          ]
        },
        component: () => import("@/view/Order/DeliveryTime/List.vue")
      },
      {
        path: "OrderToCodeList",
        name: "OrderToCodeList",
        meta: {
          title: "订单转条码",
          access: ["report_order:ordertrans"]
        },
        component: () => import("@/view/Order/OrderToCode/List.vue")
      },
      {
        path: "MarketingOrder",
        name: "MarketingOrder",
        meta: {
          title: "营销订单统计报表",
          access: [
            "report_order:marketingorder",
            "report_order:marketingorder:export"
          ]
        },
        component: () => import("@/view/Order/MarketingOrder/List.vue")
      },
      {
        path: "WagesShipFee",
        name: "WagesShipFee",
        meta: {
          title: "算运费报表",
          access: ["report_order:wagesship", "report_order:wagesship:export"]
        },
        component: () => import("@/view/Order/WagesShipFee/List.vue")
      },
      {
        path: "OrderTransportationLog",
        name: "OrderTransportationLog",
        meta: {
          title: "运费上传记录",
          access: ["report_order:shipfeelog"]
        },
        component: () => import("@/view/Order/OrderTransportationLog/List.vue")
      },
      {
        path: "ImportOrderAmount",
        name: "ImportOrderAmount",
        meta: {
          title: "导入速卖通销售明细",
          access: ["report_order:amountimport"]
        },
        component: () => import("@/view/Order/ImportOrderAmount/List.vue")
      },
      {
        path: "AmaOrder",
        name: "AmaOrder",
        meta: {
          title: "三方订单明细报表",
          access: ["report_order:amaorder"]
        },
        component: () => import("@/view/Order/AmaOrder/List.vue")
      },
      {
        path: "CustomerCenter",
        name: "CustomerCenter",
        meta: {
          title: "客户中心订单情况查询",
          access: ["report_order:csorder"]
        },
        component: () => import("@/view/Order/CustomerCenter/List.vue")
      },
      {
        path: "NewProducts",
        name: "NewProducts",
        meta: {
          title: "新品导入功能",
          access: ["report_order:newimport"]
        },
        component: () => import("@/view/Order/NewProducts/List.vue")
      },
      {
        path: "NewProductsReport",
        name: "NewProductsReport",
        meta: {
          title: "新品追踪报表",
          access: ["report_order:newtrack"]
        },
        component: () => import("@/view/Order/NewProducts/Report.vue")
      },
      {
        path: "JurllysheShipping",
        name: "JurllysheShipping",
        meta: {
          title: "Jurllyshe7天未发货订单",
          access: ["report_order:sevennotshipped"]
        },
        component: () => import("@/view/Order/JurllysheShipping/List.vue")
      },
      {
        path: "ShipFeeList",
        name: "ShipFeeList",
        meta: {
          title: "运费对账分析报表",
          access: ["report_order:wage_and_freight"]
        },
        component: () => import("@/view/Order/ShipFeeList/List.vue")
      }
    ]
  },
  {
    path: "/Warehouse",
    name: "Warehouse",
    component: Main,
    meta: {
      title: "仓库相关",
      icon: "ios-albums",
      access: ["report_warehourse"]
    },
    children: [
      {
        path: "omsList",
        name: "omsAnsList_page",
        meta: {
          title: "oms入库单",
          access: ["report_warehourse:omsasn"]
        },
        component: () => import("@/view/Analysis/OmsAnsList/List.vue")
      },
      {
        path: "UsTageTypeInventory",
        name: "UsTagTypeInventory_page",
        meta: {
          title: "美国仓类型报表",
          access: ["report_warehourse:ustagtype"]
        },
        component: () => import("@/view/Analysis/UsTagTypeInventory/List.vue")
      },
      {
        path: "BnsUsBaseInventory",
        name: "BnsUsBaseInventory_page",
        meta: {
          title: "unice期初库存维护"
        },
        component: () => import("@/view/Analysis/BnsUsBaseInventory/List.vue")
      },
      {
        path: "UsUiceNomalSkuQty",
        name: "UsUiceNomalSkuQty_page",
        meta: {
          title: "unice和通用剩余库存报表",
          access: ["report_warehourse:usuicesku"]
        },
        component: () => import("@/view/Analysis/UsUiceNomalSkuQty/List.vue")
      },
      {
        path: "ECShipOrder",
        name: "ECShipOrder",
        meta: {
          title: "头程出货单",
          access: ["report_warehourse:headtrip"]
        },
        component: () => import("@/view/Analysis/ECShipOrder/List.vue")
      },
      {
        path: "ECShipBatch",
        name: "ECShipBatch_page",
        meta: {
          title: "E贸易头程",
          access: ["report_warehourse:etradehead"]
        },
        component: () => import("@/view/Analysis/ECShipBatch/List.vue")
      },
      {
        path: "ESaleOrder",
        name: "ESaleOrder",
        meta: {
          title: "E贸易订单",
          access: ["report_warehourse:etradeorder"]
        },
        component: () => import("@/view/Analysis/ESaleOrder/List.vue")
      },
      {
        path: "ECSaleOrder",
        name: "ECSaleOrder",
        meta: {
          title: "销售订单",
          access: ["report_warehourse:sale"]
        },
        component: () => import("@/view/Analysis/ECSaleOrder/List.vue")
      },
      {
        path: "EC9610",
        name: "EC9610",
        meta: {
          title: "E贸易9610",
          access: ["report_warehourse:etrade9610"]
        },
        component: () => import("@/view/Analysis/EC9610/List.vue")
      },
      {
        path: "AmazonInventory",
        name: "AmazonInventory",
        meta: {
          title: "亚马逊库存报表",
          access: ["report_warehourse:amazonir"]
        },
        component: () => import("@/view/Analysis/AmazonInventory/List.vue")
      },
      {
        path: "AmazonClaim",
        name: "AmazonClaim",
        meta: {
          title: "亚马索赔报表",
          access: ["report_warehourse:claim"]
        },
        component: () => import("@/view/Analysis/AmazonClaim/List.vue")
      }
    ]
  },
  {
    path: "/Factory",
    name: "Factory",
    component: Main,
    meta: {
      title: "工厂相关",
      icon: "ios-albums",
      access: ["report_factory"]
    },
    children: [
      {
        path: "SkuFactoryWeight",
        name: "SkuFactoryWeight",
        meta: {
          title: "工厂sku重量维护",
          access: ["report_factory:skuweightmaintenance"]
        },
        component: () => import("@/view/Factory/SkuFactoryWeight/List.vue")
      },
      {
        path: "SkuSysWeight",
        name: "SkuSysWeight",
        meta: {
          title: "系统sku重量查询",
          access: ["report_factory:skuweightsearch"]
        },
        component: () => import("@/view/Factory/SkuSysWeight/List.vue")
      }
    ]
  },
  {
    path: "/Logistics",
    name: "Logistics",
    component: Main,
    meta: {
      title: "物流信息",
      icon: "md-build",
      access: ["report_deliver"]
    },
    children: [
      {
        path: "BatchOrderTracking",
        name: "BatchOrderTracking",
        meta: {
          title: "批量查询物流状态",
          access: ["report_deliver:olq"]
        },
        component: () => import("@/view/Logistics/batchOrder/List.vue")
      },
      {
        path: "OrderTracking",
        name: "OrderTracking",
        meta: {
          title: "订单物流明细查询",
          access: ["report_deliver:olq"]
        },
        component: () => import("@/view/Logistics/order/List.vue")
      },
      {
        path: "TrackingCode",
        name: "TrackingCode",
        meta: {
          title: "物流方式",
          access: ["report_deliver:shippingmethods"]
        },
        component: () => import("@/view/Logistics/trackingCode/List.vue")
      },
      {
        path: "AgingReport",
        name: "AgingReport",
        meta: {
          title: "物流时效报表",
          access: ["report_deliver:ltr"]
        },
        component: () => import("@/view/Logistics/agingReport/List.vue")
      },
      {
        path: "logisticsConfig",
        name: "logisticsConfig",
        meta: {
          title: "物流信息配置",
          access: ["report_deliver:lic"]
        },
        component: () =>
          import("@/view/Logistics/logisticsConfig/configList.vue")
      },
      {
        path: "WeeklyDelivery",
        name: "WeeklyDelivery",
        meta: {
          title: "周发货时效报表",
          access: ["report_deliver:wdtr"]
        },
        component: () => import("@/view/Logistics/WeeklyDelivery/List.vue")
      },
      {
        path: "ComplexDeliveryTime",
        name: "ComplexDeliveryTime",
        meta: {
          title: "综合站发货时效",
          access: ["report_deliver:jurllyshetimelimit"]
        },
        component: () => import("@/view/Logistics/ComplexDeliveryTime/List.vue")
      },
      {
        path: "LogisticsEfficiency",
        name: "LogisticsEfficiency",
        meta: {
          title: "物流到达情况表",
          access: ["report_deliver:arrivals"]
        },
        component: () => import("@/view/Logistics/LogisticsEfficiency/List.vue")
      }
    ]
  },
  {
    path: "/Stock",
    name: "Stock",
    component: Main,
    meta: {
      title: "库存查询",
      icon: "md-grid",
      access: ["report_inventory"]
    },
    children: [
      /* {
        path: "StockQuery",
        name: "StockQuery",
        meta: {
          title: "库存查询",
          access: ["report_inventory:inventorysku"]
        },
        component: () => import("@/view/Stock/StockQuery/List.vue")
      }, */
      {
        path: "OutStockList",
        name: "OutStockList",
        meta: {
          title: "出库报表",
          access: ["report_inventory:outstock"]
        },
        component: () => import("@/view/Stock/OutStock/List.vue")
      },
      {
        path: "ClothingPeriod",
        name: "ClothingPeriod",
        meta: {
          title: "服装期间库存查询",
          access: ["report_sale:clothingperiod"]
        },
        component: () => import("@/view/Stock/ClothingPeriod/List.vue")
      },
      {
        path: "OrderTurnoverRate",
        name: "OrderTurnoverRate",
        meta: {
          title: "服装动销率",
          access: ["report_order:turnoverrate"]
        },
        component: () => import("@/view/Stock/OrderTurnoverRate/List.vue")
      },
      {
        path: "StockLess",
        name: "StockLess",
        meta: {
          title: "库存不足4周",
          access: ["report_inventory:fourweeks"]
        },
        component: () => import("@/view/Stock/StockLess/List.vue")
      },
      {
        path: "CountBatch",
        name: "CountBatch",
        meta: {
          title: "大货报备报表",
          access: ["report_inventory:largecargofiling"]
        },
        component: () => import("@/view/Stock/CountBatch/List.vue")
      }
    ]
  },
  {
    path: "/Customs",
    name: "Customs",
    component: Main,
    meta: {
      title: "海关报关",
      icon: "md-grid",
      access: ["customs"]
    },
    children: [
      {
        path: "CodeManage",
        name: "CodeManage",
        meta: {
          title: "海关编码维护",
          access: ["customs:ccm"]
        },
        component: () => import("@/view/Customs/CodeManage/List.vue")
      },
      {
        path: "ProductCodeManage",
        name: "ProductCodeManage",
        meta: {
          title: "商品海关编码维护",
          access: ["customs:cccm"]
        },
        component: () => import("@/view/Customs/ProductCodeManage/List.vue")
      }
    ]
  }
];
