<template>
  <div class="content-main">
    <Card>
      <div class="search-con search-con-top">
        <Row>
          <Col :span="20">
            <Form ref="formInline" label-position="right" :label-width="60" inline>
              <FormItem label="入库单号">
                <Input class="search-input" clearable v-model="filters.omsReceivingCode" />
              </FormItem>
              <FormItem>
                <Button @click="loadFilter()" class="search-btn" type="primary">搜索</Button>
              </FormItem>
            </Form>
          </Col>
          <Col :span="4">
            <Button class="search-btn" type="success" @click="handleAdd">
              <Icon type="md-add" />&nbsp;&nbsp;新增
            </Button>
          </Col>
        </Row>
      </div>
      <Table
        ref="tables"
        height="700"
        :data="listData"
        v-bind:columns="listColums"
        stripe
        :loading="tableLoading"
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
            show-size
          ></Page>
        </div>
      </div>
    </Card>
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
import { getList, Add } from "@/api/OmsAnsList";
import Detils from "./Detils";
export default {
  components: {
    Detils
  },
  data() {
    return {
      filters: {
        omsReceivingCode: ""
      },
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      tableLoading: false,
      listData: [],
      listColums: [
        {
          title: "入库单号",
          key: "omsReceivingCode"
        },
        {
          title: "备注",
          key: "message"
        },
        {
          title: "创建日期",
          key: "createDate"
        },
        {
          title: "是否停止拉取",
          key: "stopFlag",
          render: (h, params) => {
            let stopFlag = params.row.stopFlag;
            let stopFlagText = "";
            if (stopFlag === true) {
              stopFlagText = "拉取中";
              return h(
                "Tag",
                {
                  props: {
                    color: "primary"
                  }
                },
                stopFlagText
              );
            } else if (stopFlag === false) {
              stopFlagText = "停止拉取";
              return h(
                "Tag",
                {
                  props: {
                    color: "error"
                  }
                },
                stopFlagText
              );
            }
          }
        },
        {
          title: "状态",
          key: "state",
          render: (h, params) => {
            let state = params.row.state;
            let stateText = "";
            if (state === 1) {
              stateText = "已拉取";
            } else if (state === 0) {
              stateText = "未拉取";
            }
            return h(
              "Tag",
              {
                props: {
                  color: "primary"
                }
              },
              stateText
            );
          }
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
      detilsRow: {},
      modelDetils: false,
      modelAdd: false,
      addData: ""
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let filtersquery = [];
      let filtersCode = {};
      if (
        _this.filters.omsReceivingCode &&
        _this.filters.omsReceivingCode != ""
      ) {
        filtersCode = {
          key: "omsReceivingCode",
          binaryop: "eq",
          value: _this.filters.omsReceivingCode,
          andorop: "and"
        };
        filtersquery.push(filtersCode);
      }
      let data = {};
      _this.tableLoading = true;
      getList(data)
        .then(res => {
          _this.tableLoading = false;
          if (res.data.code == 200) {
            _this.listData = res.data.data;
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
    changePageSize(size) {
      let _this = this;
      _this.pageSize = size;
      _this.loadData();
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
            if (resData.code == 200) {
              this.$Message.info({
                content: resData.msg,
                duration: 10,
                closable: true
              });
              _this.modelAdd = false;
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
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
