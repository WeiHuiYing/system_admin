<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="22">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem label="sku:">
            <Input clearable v-model="filters.sku" placeholder="请输入搜索sku"></Input>
          </FormItem>
          <FormItem>
            <Button style="margin-right:5px" @click="loadFilter()" type="primary">搜索</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
    <Table ref="tables" height="700" :data="listData" v-bind:columns="listColums" stripe></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          :total="totalCount"
          :current="currentPage"
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
import { HairWeftBlockSaleReport as getList } from "@/api/Analysis";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listColums: [
        {
          title: "总订单量",
          key: "sku",
          align: "center"
        },
        {
          title: "发帘",
          align: "center",
          children: [
            {
              title: "订单量",
              key: "qty",
              align: "center"
            },
            {
              title: "销量占比",
              key: "warehouseCode",
              align: "center"
            }
          ]
        },
        {
          title: "发帘发块订单量",
          key: "warehouseCode",
          align: "center"
        },
        {
          title: "发帘发块销量占比",
          key: "warehouseCode",
          align: "center"
        },
        {
          title: "发块订单量",
          key: "warehouseCode",
          align: "center"
        },
        {
          title: "发块销量占比",
          key: "warehouseCode",
          align: "center"
        },
        {
          title: "头套订单量",
          key: "warehouseCode",
          align: "center"
        },
        {
          title: "头套销量占比",
          key: "warehouseCode",
          align: "center"
        },
        {
          title: "混合单订单量",
          key: "warehouseCode",
          align: "center"
        },
        {
          title: "混合单销量占比",
          key: "warehouseCode",
          align: "center"
        }
      ],
      listData: [],
      totalCount: 1,
      currentPage: 1,
      pageSize: 100,
      filters: {
        sku: ""
      }
    };
  },
  methods: {
    loadData() {
      let _this = this;
      if (!_this.currentPage) _this.currentPage = 1;
      let filtersquery = [];
      let data = {
        pageNum: _this.currentPage,
        pageSize: _this.pageSize,
        query: filtersquery
      };
      getList(data)
        .then(res => {
          let resData = res.data;
          if (resData.code == "200") {
            _this.listData = resData.data;
            _this.totalCount = resData.totalCount;
          } else {
            this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadFilter() {
      const _this = this;
      _this.currentPage = 1;
      _this.loadData();
    },
    changePageSize(val) {
      const _this = this;
      _this.pageSize = val;
      _this.loadData();
    },
    changePage(val) {
      const _this = this;
      _this.currentPage = val;
      _this.loadData();
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style lang="less"></style>
