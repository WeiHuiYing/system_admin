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
    component: () => import("@/views/login/login.vue")
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
        component: () => import("@/views/single-page/home")
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
        component: () => import("@/views/login/changePwd.vue")
      }
    ]
  },
  {
    path: "/Order",
    name: "Order",
    meta: {
      icon: "logo-buffer",
      title: "订单相关",
      access: ["report_client_orderdepartment"]
    },
    component: Main,
    children: [
      {
        path: "baseSet",
        name: "OrderBaseSet",
        meta: {
          title: "基础设置",
          access: ["report_client_orderdepartment_basicmaintenance"]
        },
        children: [
          {
            path: "NewProducts",
            name: "NewProducts",
            meta: {
              title: "新品导入功能",
              access: [
                "report_client_orderdepartment_basicmaintenance:new_product_introduction"
              ]
            },
            component: () =>
              import("@/views/Order/BaseSet/NewProducts/List.vue")
          },
          {
            path: "logisticsConfig",
            name: "logisticsConfig",
            meta: {
              title: "物流信息配置",
              access: [
                "report_client_orderdepartment_basicmaintenance:logistics"
              ]
            },
            component: () =>
              import("@/views/Order/BaseSet/logisticsConfig/configList.vue")
          }
        ]
      },
      {
        path: "Sales",
        name: "OrderSales",
        meta: {
          title: "销售相关",
          access: ["report_client_orderdepartment_sale"]
        },
        children: [
          {
            path: "SalesTotal",
            name: "SalesTotal",
            meta: {
              title: "销售汇总报表",
              access: ["report_client_orderdepartment_sale:sales_summary"]
            },
            component: () =>
              import("@/views/Order/Sales/SalesTotalAnalysis/List.vue")
          },
          {
            path: "WeavingBlock",
            name: "WeavingBlock",
            meta: {
              title: "发帘发块分产品尺寸销售占比",
              access: ["report_client_orderdepartment_sale:product_size_sales"]
            },
            component: () => import("@/views/Order/Sales/WeavingBlock/List.vue")
          },
          {
            path: "GetDensity",
            name: "GetDensity",
            meta: {
              title: "头套产品销售明细",
              access: [
                "report_client_orderdepartment_sale:headgear_product_sales_details"
              ]
            },
            component: () => import("@/views/Order/Sales/GetDensity/List.vue")
          },
          {
            path: "OrderRatio",
            name: "OrderRatio",
            meta: {
              title: "发帘发块单条和多条订单对比",
              access: ["report_client_orderdepartment_sale:order_comparison"]
            },
            component: () => import("@/views/Order/Sales/OrderRatio/List.vue")
          },
          {
            path: "ChannelLevelSalesCount",
            name: "ChannelLevelSalesCount",
            meta: {
              title: "各店铺各等级产品销量汇总",
              access: [
                "report_client_orderdepartment_sale:product_sales_summary"
              ]
            },
            component: () =>
              import("@/views/Order/Sales/ChannelLevelSalesCount/List.vue")
          },
          {
            path: "HairWeftStyleSale",
            name: "HairWeftStyleSale",
            meta: {
              title: "发帘发块分款式销量占比",
              access: ["report_client_orderdepartment_sale:proportion_of_sales"]
            },
            component: () =>
              import("@/views/Order/Sales/HairWeftStyleSale/List.vue")
          },
          {
            path: "HairWeftBlockSale",
            name: "HairWeftBlockSale",
            meta: {
              title: "发帘发块销量报表",
              access: [
                "report_client_orderdepartment_sale:wet_hair_block_sales"
              ]
            },
            component: () =>
              import("@/views/Order/Sales/HairWeftBlockSale/List.vue")
          },
          {
            path: "DeliveryTimeList",
            name: "DeliveryTimeList",
            meta: {
              title: "发货时效报表",
              access: ["report_client_orderdepartment_sale:delivery_time"]
            },
            component: () => import("@/views/Order/Sales/DeliveryTime/List.vue")
          },
          {
            path: "QueryInOut",
            name: "QueryInOut",
            meta: {
              title: "国内海外仓发货占比",
              access: [
                "report_client_orderdepartment_sale:proportion_of_warehouse_shipments"
              ]
            },
            component: () => import("@/views/Order/Sales/QueryInOut/List.vue")
          },
          {
            path: "SkuSaleQuery",
            name: "SkuSaleQuery",
            meta: {
              title: "sku销售明细",
              access: ["report_client_orderdepartment_sale:sku_sales_details"]
            },
            component: () => import("@/views/Order/Sales/SkuSaleQuery/List.vue")
          },
          {
            path: "NewProductsReport",
            name: "NewProductsReport",
            meta: {
              title: "新品追踪报表",
              access: [
                "report_client_orderdepartment_sale:new_product_tracking"
              ]
            },
            component: () =>
              import("@/views/Order/Sales/NewProducts/Report.vue")
          },
          {
            path: "omsList",
            name: "omsAnsList_page",
            meta: {
              title: "oms入库单",
              access: ["report_client_orderdepartment_sale:warehouse_receipt"]
            },
            component: () => import("@/views/Order/Sales/OmsAnsList/List.vue")
          }
        ]
      },
      {
        path: "Stock",
        name: "OrderStock",
        meta: {
          title: "库存相关",
          access: ["report_client_orderdepartment_instock"]
        },
        children: [
          {
            path: "BnsUsBaseInventory",
            name: "BnsUsBaseInventory_page",
            meta: {
              title: "unice期初库存维护",
              access: [
                "report_client_orderdepartment_instock:unicebeginning_inventory_maintenance"
              ]
            },
            component: () =>
              import("@/views/Order/Stock/BnsUsBaseInventory/List.vue")
          },
          {
            path: "StockLess",
            name: "StockLess",
            meta: {
              title: "库存不足4周",
              access: [
                "report_client_orderdepartment_instock:less_than_four_weeks_in_stock"
              ]
            },
            component: () => import("@/views/Order/Stock/StockLess/List.vue")
          },
          {
            path: "CountBatch",
            name: "CountBatch",
            meta: {
              title: "大货报备报表",
              access: [
                "report_client_orderdepartment_instock:bulk_cargo_filing"
              ]
            },
            component: () => import("@/views/Order/Stock/CountBatch/List.vue")
          },
          {
            path: "UsUiceNomalSkuQty",
            name: "UsUiceNomalSkuQty_page",
            meta: {
              title: "unice和通用剩余库存报表",
              access: [
                "report_client_orderdepartment_instock:remaining_inventory"
              ]
            },
            component: () =>
              import("@/views/Order/Stock/UsUiceNomalSkuQty/List.vue")
          }
        ]
      },
      {
        path: "Other",
        name: "OrderOther",
        meta: {
          title: "其他",
          access: ["report_client_orderdepartment_other"]
        },
        children: [
          {
            path: "OrderToCodeList",
            name: "OrderToCodeList",
            meta: {
              title: "订单转条码",
              access: ["report_client_orderdepartment_other:order_to_barcode"]
            },
            component: () => import("@/views/Order/Other/OrderToCode/List.vue")
          }
        ]
      }
    ]
  },
  {
    path: "/Customer",
    name: "Customer",
    meta: {
      icon: "logo-buffer",
      title: "客户中心",
      access: ["report_client_customercenter"]
    },
    component: Main,
    children: [
      {
        path: "CustomerCenter",
        name: "CustomerCenter",
        meta: {
          title: "客户中心订单情况查询",
          access: ["report_client_customercenter:order"]
        },
        component: () => import("@/views/Customer/CustomerCenter/List.vue")
      }
    ]
  },
  {
    path: "/Finance",
    name: "Finance",
    meta: {
      icon: "logo-buffer",
      title: "财务相关",
      access: ["report_client_financedepartment"]
    },
    component: Main,
    children: [
      {
        path: "Sales",
        name: "FinanceSales",
        meta: {
          title: "销售相关",
          access: ["report_client_financedepartment_sale"]
        },
        children: [
          {
            path: "OrderTotalReprot",
            name: "OrderTotalReprot",
            meta: {
              title: "仓库发货占比报表",
              access: [
                "report_client_financedepartment_sale:proportion_of_warehouse_shipments"
              ]
            },
            component: () =>
              import("@/views/Finance/Sales/OrderTotalReprot/List.vue")
          },
          {
            path: "FinancialSummaryList",
            name: "FinancialSummaryList",
            meta: {
              title: "财务汇总报表",
              access: ["report_client_financedepartment_sale:financial_summary"]
            },
            component: () =>
              import("@/views/Finance/Sales/FinancialSummary/List.vue")
          },
          {
            path: "FinanceTotal",
            name: "FinanceTotal",
            meta: {
              title: "财务合计报表",
              access: ["report_client_financedepartment_sale:order_total"]
            },
            component: () =>
              import("@/views/Finance/Sales/FinanceTotal/List.vue")
          },
          {
            path: "MarketingOrder",
            name: "MarketingOrder",
            meta: {
              title: "营销订单统计报表",
              access: [
                "report_client_financedepartment_sale:marketing_order_statistics"
              ]
            },
            component: () =>
              import("@/views/Finance/Sales/MarketingOrder/List.vue")
          },
          {
            path: "ImportOrderAmount",
            name: "ImportOrderAmount",
            meta: {
              title: "导入速卖通销售明细",
              access: [
                "report_client_financedepartment_sale:aliexpress_order_details"
              ]
            },
            component: () =>
              import("@/views/Finance/Sales/ImportOrderAmount/List.vue")
          },
          {
            path: "SkuSaleReport",
            name: "SkuSaleReport",
            meta: {
              title: "产品销售分析",
              access: [
                "report_client_financedepartment_sale:export_product_sales_details"
              ]
            },
            component: () =>
              import("@/views/Finance/Sales/SkuSaleReport/List.vue")
          }
        ]
      },
      {
        path: "Cost",
        name: "FinanceCost",
        meta: {
          title: "费用相关",
          access: ["report_client_financedepartment_cost"]
        },
        children: [
          {
            path: "AmazonList",
            name: "AmazonList",
            meta: {
              title: "亚马逊交易记录",
              access: [
                "report_client_financedepartment_cost：amazon_transaction_records"
              ]
            },
            component: () => import("@/views/Finance/Cost/Amazon/List.vue")
          },
          {
            path: "FreightReport",
            name: "FreightReport",
            meta: {
              title: "运费报表",
              access: ["report_client_financedepartment_cost:shipping"]
            },
            component: () =>
              import("@/views/Finance/Cost/FreightReport/List.vue")
          },
          {
            path: "WagesShipFee",
            name: "WagesShipFee",
            meta: {
              title: "算工资运费报表",
              access: [
                "report_client_financedepartment_cost:calculate_salary_and_freight"
              ]
            },
            component: () =>
              import("@/views/Finance/Cost/WagesShipFee/List.vue")
          },
          {
            path: "ShipFeeList",
            name: "ShipFeeList",
            meta: {
              title: "运费对账分析报表",
              access: [
                "report_client_financedepartment_cost:freight_reconciliation_analysis"
              ]
            },
            component: () => import("@/views/Finance/Cost/ShipFeeList/List.vue")
          },
          {
            path: "PayPalList",
            name: "PayPalList",
            meta: {
              title: "PayPal交易记录",
              access: [
                "report_client_financedepartment_cost:paypal_transaction_Record"
              ]
            },
            component: () => import("@/views/Finance/Cost/PayPal/List.vue")
          }
        ]
      },
      {
        path: "BaseSet",
        name: "FinanceBaseSet",
        meta: {
          title: "基础维护",
          access: ["report_client_financedepartment_basicmaintenance"]
        },
        children: [
          {
            path: "currencyManage",
            name: "currencyManage",
            meta: {
              icon: "logo-usd",
              title: "汇率管理",
              access: [
                "report_client_financedepartment_basicmaintenance:exchange_rate_management"
              ]
            },
            component: () =>
              import("@/views/Finance/BaseSet/currencyManage/List.vue")
          },
          {
            path: "EAccountManage",
            name: "EAccountManage",
            meta: {
              icon: "ios-people",
              title: "E账户管理",
              access: [
                "report_client_financedepartment_basicmaintenance:e_account_management"
              ]
            },
            component: () =>
              import("@/views/Finance/BaseSet/EAccountManage/List.vue")
          },
          {
            path: "shopManage",
            name: "shopManage",
            meta: {
              icon: "ios-archive",
              title: "店铺管理",
              access: [
                "report_client_financedepartment_basicmaintenance:store_management"
              ]
            },
            component: () =>
              import("@/views/Finance/BaseSet/shopManage/List.vue")
          },
          {
            path: "RepeatPurchaseList",
            name: "RepeatPurchaseList",
            meta: {
              title: "复购列表",
              access: [
                "report_client_financedepartment_basicmaintenance:repurchase_list"
              ]
            },
            component: () =>
              import("@/views/Finance/BaseSet/RepeatPurchase/List.vue")
          },
          {
            path: "AliexpressList",
            name: "AliexpressList",
            meta: {
              title: "速卖通放款信息",
              access: [
                "report_client_financedepartment_basicmaintenance:aliexpress_loan_information"
              ]
            },
            component: () =>
              import("@/views/Finance/BaseSet/Aliexpress/List.vue")
          },
          {
            path: "DongHengList",
            name: "DongHengList",
            meta: {
              title: "导入东恒成本价",
              access: [
                "report_client_financedepartment_basicmaintenance:cost_price"
              ]
            },
            component: () => import("@/views/Finance/BaseSet/DongHeng/List.vue")
          },
          {
            path: "ImportOrderAmount",
            name: "ImportOrderAmount",
            meta: {
              title: "导入速卖通销售明细",
              access: [
                "report_client_financedepartment_basicmaintenance:aliexpress_sales_details"
              ]
            },
            component: () =>
              import("@/views/Finance/BaseSet/ImportOrderAmount/List.vue")
          },
          {
            path: "TransportationList",
            name: "TransportationList",
            meta: {
              title: "订单物流上传",
              access: [
                "report_client_financedepartment_basicmaintenance:order_shipping_upload"
              ]
            },
            component: () =>
              import("@/views/Finance/BaseSet/Transportation/List.vue")
          },
          {
            path: "TransportationListNew",
            name: "TransportationListNew",
            meta: {
              title: "订单物流上传(新)",
              access: [
                "report_client_financedepartment_basicmaintenance:order_shipping_upload_new"
              ]
            },
            component: () =>
              import("@/views/Finance/BaseSet/TransportationNew/List.vue")
          }
        ]
      },
      {
        path: "FinalCost",
        name: "FinanceFinalCost",
        meta: {
          title: "成本相关",
          access: ["report_client_financedepartment_money"]
        },
        children: [
          {
            path: "PeriodCost",
            name: "PeriodCost",
            meta: {
              title: "期间成本",
              access: ["report_client_financedepartment_money:cost"]
            },
            component: () =>
              import("@/views/Finance/FinalCost/PeriodCost/List.vue")
          },
          {
            path: "PeriodSkuCost",
            name: "PeriodSkuCost",
            meta: {
              title: "期间sku成本",
              access: ["report_client_financedepartment_money:skucost"]
            },
            component: () =>
              import("@/views/Finance/FinalCost/PeriodSkuCost/List.vue")
          },
          {
            path: "ProductCost",
            name: "ProductCost",
            meta: {
              title: "产品成本列表",
              access: ["report_client_financedepartment_money:list"]
            },
            component: () =>
              import("@/views/Finance/FinalCost/ProductCost/List.vue")
          }
        ]
      }
    ]
  },
  {
    path: "/Amazon",
    name: "Amazon",
    meta: {
      icon: "logo-buffer",
      title: "亚马逊报表",
      access: ["report_client_amazondepartment"]
    },
    component: Main,
    children: [
      {
        path: "Sales",
        name: "AmazonSales",
        meta: {
          title: "销售相关",
          access: ["report_client_amazondepartment_sale"]
        },
        children: [
          {
            path: "AmazonSellerRate",
            name: "AmazonSellerRate",
            meta: {
              title: "亚马逊人员销售占比",
              access: ["report_client_amazondepartment_sale:sale"]
            },
            component: () =>
              import("@/views/Amazon/Sales/AmazonSellerRate/List.vue")
          },
          {
            path: "AmaOrder",
            name: "AmaOrder",
            meta: {
              title: "三方订单明细报表",
              access: ["report_client_amazondepartment_sale:order_details"]
            },
            component: () => import("@/views/Amazon/Sales/AmaOrder/List.vue")
          },
          {
            path: "AmazonClaim",
            name: "AmazonClaim",
            meta: {
              title: "亚马逊索赔报表",
              access: ["report_client_amazondepartment_sale:tripartite_claim"]
            },
            component: () => import("@/views/Amazon/Sales/AmazonClaim/List.vue")
          }
        ]
      },
      {
        path: "BaseSet",
        name: "AmazonBaseSet",
        meta: {
          title: "基础维护",
          access: ["report_client_amazondepartment_basicmaintenance"]
        },
        children: [
          {
            path: "amazonAsin",
            name: "amazonAsin",
            meta: {
              icon: "ios-archive",
              title: "FBA Asin与销售员对应",
              access: ["report_client_amazondepartment_basicmaintenance:asin"]
            },
            component: () =>
              import("@/views/Amazon/BaseSet/amazonAsin/List.vue")
          }
        ]
      }
    ]
  },
  {
    path: "/Magento",
    name: "Magento",
    meta: {
      icon: "logo-buffer",
      title: "综合站报表",
      access: ["report_client_compre"]
    },
    component: Main,
    children: [
      {
        path: "Sales",
        name: "MagentoSales",
        meta: {
          title: "销售相关",
          access: ["report_client_comprehensive_station_sale"]
        },
        children: [
          {
            path: "ClothingPeriod",
            name: "ClothingPeriod",
            meta: {
              title: "服装期间库存查询",
              access: [
                "report_client_comprehensive_station_sale:inventory_during_clothing"
              ]
            },
            component: () =>
              import("@/views/Magento/Sales/ClothingPeriod/List.vue")
          },
          {
            path: "OrderTurnoverRate",
            name: "OrderTurnoverRate",
            meta: {
              title: "服装动销率",
              access: [
                "report_client_comprehensive_station_sale:active_sales_rate"
              ]
            },
            component: () =>
              import("@/views/Magento/Sales/OrderTurnoverRate/List.vue")
          },
          {
            path: "JurllysheShipping",
            name: "JurllysheShipping",
            meta: {
              title: "Jurllyshe7天未发货订单",
              access: [
                "report_client_comprehensive_station_sale:7days_not_shipped"
              ]
            },
            component: () =>
              import("@/views/Magento/Sales/JurllysheShipping/List.vue")
          }
        ]
      },
      {
        path: "Other",
        name: "MagentoOther",
        meta: {
          title: "其他",
          access: ["report_client_comprehensive_station_other"]
        },
        children: [
          {
            path: "ProductImage_page",
            name: "ProductImage_page",
            meta: {
              title: "导出产品图片",
              access: ["report_client_comprehensive_station_other:picture"]
            },
            component: () =>
              import("@/views/Magento/Other/ProductImage/List.vue")
          }
        ]
      }
    ]
  },
  {
    path: "/Factory",
    name: "Factory",
    meta: {
      icon: "logo-buffer",
      title: "工厂相关",
      access: ["report_client_factory"]
    },
    component: Main,
    children: [
      {
        path: "SkuFactoryWeight",
        name: "SkuFactoryWeight",
        meta: {
          title: "工厂sku重量维护",
          access: ["report_client_factory:maintain"]
        },
        component: () => import("@/views/Factory/SkuFactoryWeight/List.vue")
      },
      {
        path: "SkuSysWeight",
        name: "SkuSysWeight",
        meta: {
          title: "系统sku重量查询",
          access: ["report_client_factory:Inquire"]
        },
        component: () => import("@/views/Factory/SkuSysWeight/List.vue")
      }
    ]
  },
  {
    path: "/Common",
    name: "Common",
    meta: {
      icon: "logo-buffer",
      title: "公共报表",
      access: ["report_client_public"]
    },
    component: Main,
    children: [
      {
        path: "baseSet",
        name: "baseSet",
        meta: {
          title: "基础",
          access: ["report_client_public_basicmaintenance"]
        },
        children: [
          {
            path: "TrackingCode",
            name: "TrackingCode",
            meta: {
              title: "物流方式",
              access: ["report_client_public_basicmaintenance:shipping"]
            },
            component: () =>
              import("@/views/Common/BaseSet/trackingCode/List.vue")
          },
          {
            path: "CodeManage",
            name: "CodeManage",
            meta: {
              title: "海关编码维护",
              access: ["report_client_public_basicmaintenance:customs_code"]
            },
            component: () =>
              import("@/views/Common/BaseSet/CodeManage/List.vue")
          },
          {
            path: "ProductCodeManage",
            name: "ProductCodeManage",
            meta: {
              title: "商品海关编码维护",
              access: [
                "report_client_public_basicmaintenance:customs_code_maintain"
              ]
            },
            component: () =>
              import("@/views/Common/BaseSet/ProductCodeManage/List.vue")
          }
        ]
      },
      {
        path: "Sales",
        name: "Sales",
        meta: {
          title: "销售相关",
          access: ["report_client_public_sale"]
        },
        children: [
          // {
          //   path: "SkuSaleReport",
          //   name: "SkuSaleReport",
          //   meta: {
          //     title: "产品销售分析",
          //     access: ["report_client_public_sale:product_sales_analysis"]
          //   },
          //   component: () =>
          //     import("@/views/Common/Sales/SkuSaleReport/List.vue")
          // },
          {
            path: "CancelOrderList",
            name: "CancelOrderList",
            meta: {
              title: "作废订单报表",
              access: ["report_client_public_sale:void_order"]
            },
            component: () => import("@/views/Common/Sales/CancelOrder/List.vue")
          },
          {
            path: "ECShipOrder",
            name: "ECShipOrder",
            meta: {
              title: "头程出货单",
              access: ["report_client_public_sale:first_shipment"]
            },
            component: () => import("@/views/Common/Sales/ECShipOrder/List.vue")
          },
          {
            path: "ECSaleOrder",
            name: "ECSaleOrder",
            meta: {
              title: "销售订单",
              access: ["report_client_public_sale:sales_order"]
            },
            component: () => import("@/views/Common/Sales/ECSaleOrder/List.vue")
          },
          {
            path: "ComplexDeliveryTime",
            name: "ComplexDeliveryTime",
            meta: {
              title: "综合站发货时效",
              access: ["report_client_public_sale:delivery_time"]
            },
            component: () =>
              import("@/views/Common/Sales/ComplexDeliveryTime/List.vue")
          },
          {
            path: "WeeklyDelivery",
            name: "WeeklyDelivery",
            meta: {
              title: "周发货时效报表",
              access: ["report_client_public_sale:week_delivery_time"]
            },
            component: () =>
              import("@/views/Common/Sales/WeeklyDelivery/List.vue")
          }
        ]
      },
      {
        path: "Declare",
        name: "Declare",
        meta: {
          title: "报关相关",
          access: ["report_client_public_customsdeclaration"]
        },
        children: [
          {
            path: "ECShipBatch",
            name: "ECShipBatch_page",
            meta: {
              title: "E贸易头程",
              access: ["report_client_public_customsdeclaration:first_pass"]
            },
            component: () =>
              import("@/views/Common/Declare/ECShipBatch/List.vue")
          },
          {
            path: "ESaleOrder",
            name: "ESaleOrder",
            meta: {
              title: "E贸易订单",
              access: ["report_client_public_customsdeclaration:order"]
            },
            component: () =>
              import("@/views/Common/Declare/ESaleOrder/List.vue")
          },
          {
            path: "EC9610",
            name: "EC9610",
            meta: {
              title: "E贸易9610",
              access: ["report_client_public_customsdeclaration:9610"]
            },
            component: () => import("@/views/Common/Declare/EC9610/List.vue")
          }
        ]
      },
      {
        path: "Logistics",
        name: "Logistics",
        meta: {
          title: "物流相关",
          access: ["report_client_public_logistics"]
        },
        children: [
          {
            path: "OrderTracking",
            name: "OrderTracking",
            meta: {
              title: "订单物流明细查询",
              access: ["report_client_public_logistics:logistics_details"]
            },
            component: () => import("@/views/Common/Logistics/order/List.vue")
          },
          {
            path: "AgingReport",
            name: "AgingReport",
            meta: {
              title: "物流时效报表",
              access: ["report_client_public_logistics:logistics_timeliness"]
            },
            component: () =>
              import("@/views/Common/Logistics/agingReport/List.vue")
          },
          {
            path: "LogisticsEfficiency",
            name: "LogisticsEfficiency",
            meta: {
              title: "物流到达情况表",
              access: ["report_client_public_logistics:logistics_arrival"]
            },
            component: () =>
              import("@/views/Common/Logistics/LogisticsEfficiency/List.vue")
          },
          {
            path: "BatchOrderTracking",
            name: "BatchOrderTracking",
            meta: {
              title: "批量查询物流状态",
              access: ["report_client_public_logistics:logistics_status"]
            },
            component: () =>
              import("@/views/Common/Logistics/batchOrder/List.vue")
          }
        ]
      },
      {
        path: "Stock",
        name: "Stock",
        meta: {
          title: "库存相关",
          access: ["report_client_public_instock"]
        },
        children: [
          {
            path: "AmazonInventory",
            name: "AmazonInventory",
            meta: {
              title: "亚马逊库存报表",
              access: ["report_client_public_instock:report"]
            },
            component: () =>
              import("@/views/Common/Stock/AmazonInventory/List.vue")
          },
          {
            path: "OutStockList",
            name: "OutStockList",
            meta: {
              title: "出库报表",
              access: ["report_inventory:outstock"]
            },
            component: () => import("@/views/Common/Stock/OutStock/List.vue")
          }
        ]
      },
      {
        path: "Cost",
        name: "Cost",
        meta: {
          title: "费用相关",
          access: ["report_client_public_cost"]
        },
        children: [
          {
            path: "ThreeWareSkuQuery",
            name: "ThreeWareSkuQuery",
            meta: {
              title: "三方仓库外部SKU成本计算",
              access: ["report_client_public_cost:outsku_cost"]
            },
            component: () =>
              import("@/views/Common/Cost/ThreeWareSkuQuery/List.vue")
          }
        ]
      }
    ]
  }
];
