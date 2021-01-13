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
      tableColumns: [],
      tableData: [],
    };
  },
  methods: {
    loadData() {},
  },
  mounted() {
    this.loadData();
  },
};
</script>