<template>
  <div>
    <Table
      :loading="tableLoading"
      v-bind:columns="tableColumns"
      :data="tableData"
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