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
import { getShipList as getList, addShip as Add } from "@/api/Analysis";
import Detils from "./Detils";
export default {
  components: {
    Detils
  },
  data() {
    return {
      listColums: [
        {
          title: "订单编码",
          key: "orderCode"
        },
        {
          title: "入库单号",
          key: "referenceNo"
        },
        {
          title: "添加时间",
          key: "addTime",
          sortable: true
        },
        {
          title: "预计时间",
          key: "expectedDate",
          sortable: true
        },
        {
          title: "用户",
          key: "userAccount"
        },
        {
          title: "仓库",
          key: "warehouse"
        },
        {
          title: "目标仓库",
          key: "toWarehouse"
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
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.viewDetils(params);
                    }
                  }
                },
                "详细"
              )
            ]);
          }
        }
      ],
      listData: [],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
      detilsRow: {},
      modelDetils: false,
      modelAdd: false,
      addData: ""
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize
      };
      _this.tableLoading = true;
      getList(data).then(res => {
        _this.tableLoading = false;
        let resData = res.data;
        if (resData.code == 200) {
          _this.listData = resData.data;
          _this.pageTotal = resData.totalCount;
        } else {
          this.$Message.error({
            content: resData.msg,
            duration: 10,
            closable: true
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
        Add(data)
          .then(res => {
            const resData = res.data;
            if (resData.code == 200) {
              _this.modelAdd = false;
              this.$Message.info({
                content: resData.msg,
                duration: 10,
                closable: true
              });
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
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>