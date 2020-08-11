<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="24">
          <Form ref="formInline" label-position="right" :label-width="60" inline>
            <FormItem label="交易号">
              <Input clearable class="search-input" v-model="filters.reportRequestId" />
            </FormItem>
            <FormItem>
              <Button @click="loadFilter()" class="search-btn" type="primary">搜索</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
    <Table
      height="700"
      ref="tables"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColumns"
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
    <Modal
      title="详情"
      :mask-closable="false"
      v-model="modelDetils"
      width="90%"
      scrollable
      footer-hide
    >
      <Detils ref="detils" :parent="this" :detils-row="detilsRow"></Detils>
    </Modal>
  </div>
</template>

<script>
import { GetAmazonList as getList } from "@/api/Order";
import Detils from "./Detils";
export default {
  components: {
    Detils,
  },
  data() {
    return {
      filters: {
        reportRequestId: "",
      },
      listData: [],
      listColumns: [
        {
          title: "交易号",
          key: "reportRequestId",
          width: "200",
        },
        {
          title: "交易类型",
          key: "reportType",
        },
        {
          title: "交易创建时间",
          key: "createDate",
          sortable: true,
        },
        {
          title: "店铺",
          key: "store",
        },
        {
          title: "交易到期时间",
          key: "availableDate",
          sortable: true,
        },
        {
          title: "交易结束时间",
          key: "endDate",
          sortable: true,
        },
        {
          title: "交易开始时间",
          key: "startDate",
          sortable: true,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.viewDetils(params);
                    },
                  },
                },
                "详细"
              ),
            ]);
          },
        },
      ],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      detilsRow: {},
      modelDetils: false,
      tableLoading: false,
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let filtersQuery = [];
      if (
        _this.filters.reportRequestId &&
        _this.filters.reportRequestId != ""
      ) {
        filtersQuery.push({
          key: "reportRequestId",
          binaryop: "like",
          value: _this.filters.reportRequestId,
          andorop: "and",
        });
      }
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filtersQuery,
      };
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          const resData = res.data;
          _this.tableLoading = false;
          if (resData.code == 200) {
            _this.listData = resData.data;
            _this.pageTotal = resData.totalCount;
          } else {
            this.$Message.error(resData.msg);
          }
        })
        .catch((err) => {
          _this.tableLoading = false;
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
    viewDetils(params) {
      let _this = this;
      _this.detilsRow = {};
      _this.detilsRow = params.row;
      _this.modelDetils = true;
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less">
</style>