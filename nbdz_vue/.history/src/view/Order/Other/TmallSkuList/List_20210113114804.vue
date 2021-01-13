<template>
  <div>
    <Table
      :loading="tableLoading"
      v-bind:columns="tableColumns"
      :data="tableData"
      stripe
      height="670"
    ></Table>
  </div>
</template>

<script>
import { ExportTmallSkuList, TmallSkuList } from "@/api/order";
export default {
  data() {
    return {
      tableLoading: false,
      tableColumns: [
        {
          title: "sku",
          key: "sku",
        },
        {
          title: "国际条形码",
          key: "skuCode",
        },
        {
          title: "销量",
          key: "saleQty",
        },
        {
          title: "库存量",
          key: "qty",
        },
      ],
      tableData: [],
    };
  },
  methods: {
    loadData() {
      const _this = this;
      let data = {};
      TmallSkuList(data).then((res) => {
        console.log(res);
      });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>