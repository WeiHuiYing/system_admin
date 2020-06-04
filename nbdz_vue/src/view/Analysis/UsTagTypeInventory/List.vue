<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Form ref="formInline" label-position="right" :label-width="60" inline>
        <FormItem label="Sku">
          <Input class="search-input" clearable v-model="filters.productSku" />
        </FormItem>
        <FormItem>
          <Button @click="loadData()" class="search-btn" type="primary">
            <Icon type="search" />&nbsp;&nbsp;搜索
          </Button>
        </FormItem>
      </Form>
    </div>
    <Table
      ref="tables"
      height="700"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
    ></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size="pageSize"
          :page-size-opts="[100,200,300,400,500]"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </div>
    </div>
  </div>
</template>

<script>
import { getUsInventoryList as getList } from "@/api/Analysis";
import { getList as getWareList } from "@/api/ECWarehouse";
export default {
  data() {
    return {
      listColums: [
        {
          title: "编码",
          key: "rowNumber"
        },
        {
          title: "产品SKU",
          key: "productSku"
        },
        {
          title: "类型",
          key: "tagType"
        },
        {
          title: "数量",
          key: "qty"
        }
      ],
      listData: [],
      filters: {
        singleSku: ""
      },
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false
    };
  },
  methods: {
    loadData() {
      let _this = this;
      if (!_this.pageCurrent) _this.pageCurrent = 1;
      let filtersquery = [];
      let filtersSku = {};
      if (_this.filters.productSku && !_this.filters.productSku == "") {
        filtersSku = {
          key: "productSku",
          binaryop: "eq",
          value: _this.filters.productSku,
          andorop: "and"
        };
        filtersquery.push(filtersSku);
      }
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        order: {},
        query: filtersquery
      };
      _this.tableLoading = true;
      getList(data)
        .then(res => {
          _this.tableLoading = false;
          if (res.data.code == 200) {
            _this.listData = res.data.data;
            _this.pageTotal = res.data.count;
          } else {
            this.$Message.error({
              content: res.data.msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {
          _this.tableLoading = false;
          console.log(err);
        });
    },
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
    changePageSize(size) {
      let _this = this;
      _this.pageSize = size;
      _this.loadData();
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style lang="less"></style>
