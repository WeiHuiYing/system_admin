<template>
  <div>
    <Table
      ref="tables"
      height="400"
      style="width: 60%"
      :data="data"
      v-bind:columns="productColums"
      stripe
    ></Table>
  </div>
</template>

<script>
export default {
  props: { data: Array },
  data() {
    return {
      productColums: [
        {
          title: "E trade id",
          key: "e_trade_id",
          width: 200,
        },
        {
          title: "商品sku",
          key: "sku",
          width: 200,
        },
        {
          title: "账册备案料号",
          key: "itemRecordNo",
          width: 200,
        },
        {
          title: "备案商品编号(检)",
          key: "itemNoCiq",
          width: 200,
        },
        {
          title: "商品上架品名",
          key: "shelfGoodsName",
          width: 200,
        },
        {
          title: "申报品名",
          key: "goodsName",
          width: 200,
        },
        {
          title: "商品描述",
          key: "describe",
          width: 200,
        },
        {
          title: "HS编码",
          key: "codeTs",
          width: 200,
        },
        {
          title: "规格型号",
          key: "goodsModel",
          width: 200,
        },
        {
          title: "行邮税号",
          key: "taxCode",
          width: 200,
        },
        {
          title: "成交单价",
          key: "price",
          width: 200,
        },
        {
          title: "销售单价(含运费)",
          key: "tprice",
          width: 200,
        },
        {
          title: "报关价格",
          key: "customs_price",
          width: 200,
        },
        {
          title: "数量",
          key: "quantity",
          width: 200,
        },
        {
          title: "折扣优惠",
          key: "discount",
          width: 200,
        },
        {
          title: "用途",
          key: "usage",
          width: 200,
        },
        {
          title: "废旧物品",
          key: "wasteMaterials",
          width: 200,
        },
        {
          title: "内件包装种类(检)",
          key: "wrapTypeCiq",
          width: 200,
        },
        {
          title: "内件包装种类(关)",
          key: "wrapTypeCus",
          width: 200,
        },
        {
          title: "描述",
          key: "description",
          width: 200,
        },
        {
          title: "成交总价",
          key: "priceTotal",
          width: 200,
        },
        {
          title: "HS编码",
          key: "hs_code",
          width: 200,
        },
        {
          title: "计量单位",
          key: "unit",
          width: 200,
        },
        {
          title: "法定第一计量单位",
          key: "unit1",
          width: 200,
        },
        {
          title: "法定第二计量单位",
          key: "unit2",
          width: 200,
        },
        {
          title: "净重",
          key: "netweight",
          width: 200,
        },
        {
          title: "毛重",
          key: "weight",
          width: 200,
        },
      ],
    };
  },
};
</script>