(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2eb5ff37","chunk-759e066f","chunk-2d0e2664"],{"0187":function(t,a,s){"use strict";var n=s("c28d"),o=s.n(n);o.a},"7f10":function(t,a,s){"use strict";s.r(a),s.d(a,"GetOrderDeliverList",(function(){return o})),s.d(a,"GetPaypalList",(function(){return e})),s.d(a,"GetAmazonList",(function(){return i})),s.d(a,"GetAmazonDetailList",(function(){return r})),s.d(a,"GetShop",(function(){return l})),s.d(a,"GetPlateform",(function(){return f})),s.d(a,"GetDHCostList",(function(){return c})),s.d(a,"GetRepeatCustList",(function(){return u})),s.d(a,"ExportRepeatCust",(function(){return C})),s.d(a,"GetFinancialStatement",(function(){return p})),s.d(a,"ExportFinancialStatement",(function(){return d})),s.d(a,"uploadShippingFee",(function(){return I}));var n=s("66df"),o=function(t){return n["default"].request({url:"api/FinancialStatement/GetOrderDeliverList",method:"POST",data:t})},e=function(t){return n["default"].request({url:"api/FinancialStatement/GetPaypalList",method:"POST",data:t})},i=function(t){return n["default"].request({url:"api/FinancialStatement/GetAmazonList",method:"POST",data:t})},r=function(t){return n["default"].request({url:"api/FinancialStatement/GetAmazonDetailList",method:"POST",data:t})},l=function(t){var a;return a=t?"api/FinancialStatement/GetShop?Plateform="+t:"api/FinancialStatement/GetShop",n["default"].request({url:a,method:"GET"})},f=function(){return n["default"].request({url:"api/FinancialStatement/GetPlateform",method:"GET"})},c=function(t){return n["default"].request({url:"api/FinancialStatement/GetDHCostList",method:"POST",data:t})},u=function(t){return n["default"].request({url:"api/FinancialStatement/GetRepeatCustList",method:"POST",data:t})},C=function(t){return n["default"].request({url:"api/FinancialStatement/ExportRepeatCust",method:"POST",data:t,responseType:"blob"})},p=function(t){return n["default"].request({url:"api/FinancialStatement/GetFinancialStatement",method:"POST",data:t})},d=function(t){return n["default"].request({url:"api/FinancialStatement/ExportFinancialStatement",method:"POST",data:t,responseType:"blob"})},I=function(t){return n["default"].request({url:"api/UploadShippingFee/uploadShippingFee",method:"POST",data:t,responseType:"blob"})}},"9f9a":function(t,a,s){"use strict";s.r(a);var n=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("Tabs",[s("TabPane",{attrs:{label:"详情"}},[s("Row",{staticClass:"info-warp"},[s("Col",{attrs:{span:"11"}},[s("Card",{attrs:{"dis-hover":"",bordered:!1}},[s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("入库单号:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoTransactionId))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("交易参考号:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoPaypalReferenceId))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("交易号状态:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoPaypalReferenceIdType))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("交易类型:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoTransactionEventCode))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("交易开始时间:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoTransactionInitiationDate))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("交易更新时间:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoTransactionUpdatedDate))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("交易币种:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoTransactionAmountCurrencyCode))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("交易总额:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoTransactionAmountValue))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("交易费用币种:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoFeeAmountCurrencyCode))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("交易费用:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoFeeAmountValue))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("营业税币种:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoSalesTaxAmountCurrencyCode))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("营业税:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoSalesTaxAmountValue))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("账户期末余额:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoEndingBalance))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("可用余额:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoAvailableBalance))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("交易状态:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoTransactionStatus))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("原始平台账单号:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoInvoiceId))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("保险费币种:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoInsuranceAmountCurrencyCode))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("保险费用:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoInsuranceAmountVlaue))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("运费金额:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoShippingAmountValue))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("运费折扣币种:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoShippingDiscountAmountCurrencyCode))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("运费折扣费用:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoShippingDiscountAmountValue))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("交易主题:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoTransactionSubject))])],1)],1)],1),s("Col",{attrs:{span:"11",offset:"2"}},[s("Card",{attrs:{"dis-hover":"",bordered:!1}},[s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("交易备注:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoTransactionNote))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("交易自定义范围:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoCustomField))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("交易保护资格:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.transactionInfoProtectionEligibility))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("paypal买家账户Id:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.payerInfoAccountId))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("paypal买家email:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.payerInfoEmailAddress))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("买家手机号国家前缀:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.payerInfoPhoneNumberCountryCode))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("买家手机号:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.payerInfoPhoneNumberNationalNumber))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("买家地址状态:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.payerInfoAddressStatus))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("买家状态:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.payerInfoPayerStatus))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("买家姓名:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.payerInfoPayerNameGivenName))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("总箱数:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.payerInfoPayerNameSurname))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("买家备用的全名:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.payerInfoPayerNameAlternateFullName))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("买家国家简称号:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.payerInfoCountryCode))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("物流信息(收件人姓名):")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.shippingInfoName))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("地址第一行:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.shippingInfoAddressLine1))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("地址第二行:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.shippingInfoAddressLine2))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("城镇/城市:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.shippingInfoAddressCity))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("省/市/自治区/直辖市/特别行政区:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.shippingInfoAddressState))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("国家/地区:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.shippingInfoAddressCountryCode))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("邮政编码:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.shippingInfoAddressPostalCode))])],1),s("Row",{staticClass:"info-item"},[s("Col",{staticClass:"info-title",attrs:{span:6}},[t._v("店铺标识:")]),s("Col",{attrs:{offset:1,span:6}},[t._v(t._s(t.rowInfo.shopMark))])],1)],1)],1)],1)],1),s("TabPane",{attrs:{label:"产品列表"}},[s("Table",{ref:"tables",attrs:{height:"500",data:t.rowInfo.bnsPaypalTransactionDetailsCartInfos,columns:t.CartColums,stripe:""}})],1)],1)],1)},o=[],e={props:{detilsRow:Object,parent:Object},data:function(){return{rowInfo:{},CartColums:[{title:"产品编号",key:"cartInfoItemDetailsItemCode"},{title:"产品姓名",key:"cartInfoItemDetailsItemName"},{title:"产品描述",key:"cartInfoItemDetailsItemDescription"},{title:"数量",key:"cartInfoItemDetailsItemQuantity"},{title:"单价币种",key:"cartInfoItemDetailsItemUnitPriceCurrencyCode"},{title:"单价",key:"cartInfoItemDetailsItemUnitPriceValue"},{title:"总价币种",key:"cartInfoItemDetailsItemAmountCurrencyCode"},{title:"总价",key:"cartInfoItemDetailsItemAmountValue"},{title:"税额币种",key:"cartInfoItemDetailsTaxAmountTaxAmountCurrencyCode"},{title:"税额",key:"cartInfoItemDetailsTaxAmountTaxAmountValue"},{title:"总额币种",key:"cartInfoItemDetailsTotalItemAmountCurrencyCode"},{title:"总额",key:"cartInfoItemDetailsTotalItemAmountValue"},{title:"发票号码",key:"cartInfoItemDetailsInvoiceNumber"}]}},watch:{detilsRow:function(t,a){this.rowInfo=Object.assign({},t)}}},i=e,r=(s("0187"),s("2877")),l=Object(r["a"])(i,n,o,!1,null,"7ea87f30",null);a["default"]=l.exports},c28d:function(t,a,s){},fa50:function(t,a,s){"use strict";s.r(a);var n=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"content-main"},[s("div",{staticClass:"search-con search-con-top"},[s("Row",[s("Col",{attrs:{span:24}},[s("Form",{ref:"formInline",attrs:{"label-position":"right","label-width":100,inline:""}},[s("FormItem",{attrs:{label:"交易号"}},[s("Input",{staticClass:"search-input",attrs:{clearable:""},model:{value:t.filters.transactionInfoTransactionId,callback:function(a){t.$set(t.filters,"transactionInfoTransactionId",a)},expression:"filters.transactionInfoTransactionId"}})],1),s("FormItem",{attrs:{label:"原始平台账单号"}},[s("Input",{staticClass:"search-input",attrs:{clearable:""},model:{value:t.filters.TransactionInfoInvoiceId,callback:function(a){t.$set(t.filters,"TransactionInfoInvoiceId",a)},expression:"filters.TransactionInfoInvoiceId"}})],1),s("FormItem",[s("Button",{staticClass:"search-btn",attrs:{type:"primary"},on:{click:function(a){return t.loadFilter()}}},[t._v("搜索")])],1)],1)],1)],1)],1),s("Table",{ref:"tables",attrs:{height:"700",loading:t.tableLoading,data:t.listData,columns:t.listColumns,stripe:""}}),s("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[s("div",{staticStyle:{float:"right"}},[s("Page",{attrs:{total:t.pageTotal,current:t.pageCurrent,"page-size":t.pageSize,"page-size-opts":[100,200,300,400,500],"show-total":"","show-elevator":"","show-sizer":""},on:{"on-change":t.changePage,"on-page-size-change":t.changePageSize}})],1)]),s("Modal",{attrs:{title:"详情","mask-closable":!1,width:"90%",scrollable:"","footer-hide":""},model:{value:t.modelDetils,callback:function(a){t.modelDetils=a},expression:"modelDetils"}},[s("Detils",{ref:"detils",attrs:{parent:this,"detils-row":t.detilsRow}})],1)],1)},o=[],e=s("7f10"),i=s("9f9a"),r={components:{Detils:i["default"]},data:function(){var t=this;return{filters:{TransactionInfoInvoiceId:"",transactionInfoTransactionId:""},listData:[],listColumns:[{title:"原始平台账单号",key:"transactionInfoInvoiceId",width:"200"},{title:"交易号",key:"transactionInfoTransactionId",width:"200"},{title:"交易类型",key:"transactionInfoTransactionEventCode",width:"100"},{title:"交易开始时间",key:"transactionInfoTransactionInitiationDate",width:"200",sortable:!0},{title:"交易更新时间",key:"transactionInfoTransactionUpdatedDate",width:"200",sortable:!0},{title:"交易币种",key:"transactionInfoTransactionAmountCurrencyCode",width:"100"},{title:"交易总额",key:"transactionInfoTransactionAmountValue",width:"100"},{title:"交易费用币种",key:"transactionInfoFeeAmountCurrencyCode",width:"100"},{title:"交易费用",key:"transactionInfoFeeAmountValue",width:"100"},{title:"营业税币种",key:"transactionInfoSalesTaxAmountCurrencyCode",width:"100"},{title:"营业税",key:"transactionInfoSalesTaxAmountValue",width:"100"},{title:"paypal买家email",key:"payerInfoEmailAddress",width:"200"},{title:"操作",key:"action",align:"center",width:"150",render:function(a,s){return a("div",[a("Button",{props:{type:"default",size:"small"},on:{click:function(){t.viewDetils(s)}}},"详细")])}}],pageTotal:1,pageCurrent:1,pageSize:100,detilsRow:{},modelDetils:!1,tableLoading:!1}},methods:{loadData:function(){var t=this,a=this,s=[];""!=a.filters.TransactionInfoInvoiceId&&s.push({key:"TransactionInfoInvoiceId",binaryop:"eq",value:a.filters.TransactionInfoInvoiceId,andorop:"and"}),""!=a.filters.transactionInfoTransactionId&&s.push({key:"transactionInfoTransactionId",binaryop:"eq",value:a.filters.transactionInfoTransactionId,andorop:"and"});var n={pageNum:a.pageCurrent,pageSize:a.pageSize,query:s};a.tableLoading=!0,Object(e["GetPaypalList"])(n).then((function(s){a.tableLoading=!1;var n=s.data;200==s.status?(a.listData=n.data,a.pageTotal=n.totalCount):t.$Message.error({content:n.msg,duration:10,closable:!0})})).catch((function(t){a.tableLoading=!1,console.log(t)}))},loadFilter:function(){var t=this;t.pageCurrent=1,t.loadData()},changePage:function(t){var a=this;a.pageCurrent=t,a.loadData()},changePageSize:function(t){var a=this;a.pageSize=t,a.loadData()},viewDetils:function(t){var a=this;a.detilsRow={},a.detilsRow=t.row,a.modelDetils=!0}},mounted:function(){this.loadData()}},l=r,f=s("2877"),c=Object(f["a"])(l,n,o,!1,null,null,null);a["default"]=c.exports}}]);