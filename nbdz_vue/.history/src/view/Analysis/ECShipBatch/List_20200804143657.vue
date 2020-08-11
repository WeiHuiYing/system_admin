<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="24" style="text-align:right">
          <Button class="search-btn" type="success" size="small" @click="handleAdd">
            <Icon type="md-add" />&nbsp;&nbsp;新增
          </Button>
        </Col>
      </Row>
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

    <Modal
      title="添加"
      :mask-closable="false"
      v-model="modelAdd"
      width="700"
      scrollable
      @on-ok="addCode"
    >
      <Form label-position="right" :label-width="60">
        <FormItem label="入库单号">
          <Input class="search-input" clearable placeholder="请输入" v-model="addData" />
        </FormItem>
      </Form>
      <div class="mark-warp">输入值请用“,”分隔</div>
    </Modal>
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
import { getShipList as getList } from "@/api/Analysis";
import Detils from "./Detils";
export default {
  components: {
    Detils,
  },
  data() {
    return {
      listColums: [
        {
          title: "订单编码",
          key: "OrderCode",
        },
        {
          title: "入库单号",
          key: "ReferenceNo",
        },
        {
          title: "添加时间",
          key: "AddTime",
          sortable: true,
        },
        {
          title: "预计时间",
          key: "ExpectedDate",
          sortable: true,
        },
        {
          title: "用户",
          key: "UserAccount",
        },
        {
          title: "仓库",
          key: "Warehouse",
        },
        {
          title: "目标仓库",
          key: "ToWarehouse",
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
      listData: [],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
      detilsRow: {},
      modelDetils: false,
      modelAdd: false,
      addData: "",
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        page: _this.pageCurrent,
        pageSize: _this.pageSize,
      };
      _this.tableLoading = true;
      getList(data, "GET").then((res) => {
        console.log(res);
        _this.tableLoading = false;
        let resData = res.data;
        if (res.status == 200) {
          _this.listData = resData.results;
          _this.pageTotal = resData.count;
        } else {
          this.$Message.error({
            content: resData.results,
            duration: 10,
            closable: true,
          });
        }
      });
    },
    viewDetils(params) {
      let _this = this;
      _this.detilsRow = {};
      _this.detilsRow = params.row;
      _this.modelDetils = true;
    },
    handleAdd() {
      let _this = this;
      _this.modelAdd = true;
    },
    addCode() {
      let _this = this;
      if (_this.addData != "") {
        let reg = new RegExp(/\uff0c/);
        _this.addData = _this.addData.replace(reg, ",");
        let data = _this.addData.split(",");
      }
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