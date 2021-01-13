<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="24">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="60"
            inline
          >
            <FormItem label="运单号">
              <Input
                clearable
                class="search-input"
                v-model="filters.shippingMethodNo"
              />
            </FormItem>
            <FormItem>
              <Button @click="loadFilter()" class="search-btn" type="primary"
                >搜索</Button
              >
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
    <Table
      height="700"
      ref="tables"
      :data="listData"
      v-bind:columns="listColumns"
      stripe
    ></Table>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size="pageSize"
          :page-size-opts="[100, 200, 300, 400, 500]"
          show-total
          show-elevator
          show-sizer
        ></Page>
      </div>
    </div>
  </div>
</template>

<script>
import { GetOrderDeliverList as getList } from "@/api/order";
export default {
  data() {
    return {
      filters: {
        shippingMethodNo: "",
      },
      listData: [],
      listColumns: [
        {
          title: "运单号",
          key: "shippingMethodNo",
        },
        {
          title: "发货时间",
          key: "platformShipTime",
          sortable: true,
        },
        {
          title: "妥投时间",
          key: "deliveredTime",
          sortable: true,
        },
        {
          title: "妥投状态",
          key: "deliveredStatus",
        },
        {
          title: "停留天数",
          key: "residenceTime",
          sortable: true,
        },
        {
          title: "运输天数",
          key: "transportationTime",
          sortable: true,
        },
        {
          title: "物流明细",
          key: "logisticsDetails",
          type: "expand",
          render(h, params) {
            return h("div", {
              domProps: {
                innerHTML: params.row.logisticsDetails,
              },
            });
          },
        },
      ],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let filtersQuery = [];
      if (_this.filters.shippingMethodNo != "") {
        filtersQuery.push({
          key: "shippingMethodNo",
          binaryop: "eq",
          value: _this.filters.shippingMethodNo,
          andorop: "and",
        });
      }
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filtersQuery,
      };
      getList(data)
        .then((res) => {
          const resData = res.data;
          if (resData.code == 200) {
            _this.listData = resData.data;
            _this.pageTotal = resData.totalCount;
          } else {
            this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadFilter() {
      const _this = this;
      _this.pageCurrent = 1;
      _this.loadData();
    },
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
    changePageSize(val) {
      let _this = this;
      _this.pageSize = val;
      _this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less">
</style>