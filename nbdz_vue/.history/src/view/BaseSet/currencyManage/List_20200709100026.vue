<template>
  <div class="content-main">
    <div class="button-top-warp">
      <Button class="search-btn" type="success" size="small" @click="handleAdd">
        <Icon type="md-add" />&nbsp;&nbsp;新增
      </Button>
    </div>
    <Table></Table>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleAdd() {}
  }
};
</script>