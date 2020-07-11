<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Form ref="formInline" label-position="right" :label-width="60" inline>
        <FormItem label="sku">
          <Input clearable v-model="filters.sku" />
        </FormItem>
        <FormItem label="上级分类">
          <Select clearable style="width:200px" v-model="filters.categoryParent">
            <Option label="假发" value="假发"></Option>
            <Option label="服装" value="服装"></Option>
          </Select>
        </FormItem>
        <FormItem label="商品分类">
          <Input clearable v-model="filters.category" />
        </FormItem>
        <FormItem>
          <Button @click="loadFilter()" class="search-btn" type="primary">
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
import { UsUiceNomalSkuQty as getList } from "@/api/Analysis";
export default {
  data() {
    return {
      listColums: [
        {
          title: "sku",
          key: "sku"
        },
        {
          title: "商品上级分类",
          key: "categoryParent"
        },
        {
          title: "商品分类",
          key: "category"
        },
        {
          title: "商品上架品名",
          key: "name"
        },
        {
          title: "unice期初库存",
          key: "unicePeriodQty"
        },
        {
          title: "unice发货到海外仓的货物量",
          key: "uncieToUsQty"
        },
        {
          title: "东恒发货到海外仓的货物量",
          key: "dhToUsQty"
        },
        {
          title: "unice散单销量",
          key: "uniceSaleQty"
        },
        {
          title: "海外仓调拨到amazon uniceFBA仓量",
          key: "usTransAmazingQty"
        },
        {
          title: "发往各个线下店货物",
          key: "offLineQty"
        },
        {
          title: "Unice期末剩余库存",
          key: "uniceEndingQty"
        },
        {
          title: "海外仓总剩余库存",
          key: "usEndingQty"
        },
        {
          title: "通用剩余库存",
          key: "nomalEnndingQty"
        }
      ],
      listData: [],
      filters: {
        sku: "",
        categoryParent: "",
        category: ""
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
      Object.keys(_this.filters).forEach(keyItem => {
        if (_this.filters[keyItem] && _this.filters[keyItem] != "") {
          if (keyItem == "sku") {
            filtersquery.push({
              key: keyItem,
              binaryop: "like",
              value: _this.filters[keyItem],
              andorop: "and"
            });
          } else {
            filtersquery.push({
              key: keyItem,
              binaryop: "eq",
              value: _this.filters[keyItem],
              andorop: "and"
            });
          }
        }
      });
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filtersquery
      };
      _this.tableLoading = true;
      getList(data)
        .then(res => {
          _this.tableLoading = false;
          if (res.data.code == 200) {
            _this.listData = res.data.data;
            _this.pageTotal = res.data.totalCount;
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
    loadFilter() {
      const _this = this;
      _this.pageCurrent = 1;
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
