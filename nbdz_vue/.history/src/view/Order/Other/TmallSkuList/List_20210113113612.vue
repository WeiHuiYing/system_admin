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
export default {
  data() {
    return {
      tableLoading: false,
      tableColumns: [],
      tableData: [],
    };
  },
};
</script>