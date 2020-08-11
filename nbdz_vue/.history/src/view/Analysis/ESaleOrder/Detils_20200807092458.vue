<template>
  <div>
    <Tabs>
      <TabPane label="详情"></TabPane>
      <TabPane label="装箱单信息"></TabPane>
      <TabPane label="订单产品信息"></TabPane>
    </Tabs>
  </div>
</template>

<script>
import { getShipList as getList } from "@/api/Analysis";
export default {
  props: { detilsRow: Object, parent: Object },
  data() {
    return {
      rowInfo: {},
      packingColums: [
        {
          title: "参考号",
          key: "ReferenceNo",
        },
        {
          title: "装箱单号",
          key: "TppCode",
        },
        {
          title: "产品数量",
          key: "TppQuantity",
          sortable: true,
        },
        {
          title: "重量（kg）",
          key: "TppWeight",
        },
        {
          title: "体积（cm³）",
          key: "TppVolume",
        },
      ],
      productColums: [
        {
          title: "产品名称",
          key: "ProductTitle",
        },
        {
          title: "产品代码",
          key: "ProductBarcode",
        },
        {
          title: "三方仓库产品代码",
          key: "BarcodeCode",
        },
        {
          title: "产品数量",
          key: "OpQuantity",
        },
        {
          title: "产品单重（kg）",
          key: "ProductWeight",
        },
        {
          title: "产品体积（cm³）",
          key: "Volume",
        },
        {
          title: "产品付款时间",
          key: "OpRefPaydate",
          sortable: true,
        },
        {
          title: "总重量",
          key: "TotalWeight",
        },
      ],
    };
  },
  watch: {
    detilsRow(newVal, oldVal) {
      this.loadData();
    },
  },
  methods: {
    loadData() {
      const _this = this;
      getList(_this.detilsRow, "GET")
        .then((res) => {
          if (res.status == 200) {
            _this.rowInfo = res.data;
          }
        })
        .catch((err) => {
          if (err.response && err.response.request) {
            const response = err.response.request;
            this.$Message.error({
              content: response.responseText,
              duration: 10,
              closable: true,
            });
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.info-warp {
  .info-item {
    font-size: 14px;
    line-height: 32px;
    .info-title {
      font-size: 16px;
      font-weight: 500;
      text-align: right;
    }
  }
}
</style>
