<template>
  <div class="content-main">
    <div style="margin-bottom: 10px">
      <Row>
        <Col :span="20">
          <Button type="primary" @click="handleAdd">新增</Button>
        </Col>
        <Col :span="4">
          <Upload
            action=""
            accept=".xls, .xlsx"
            :before-upload="importExcel"
            :show-upload-list="false"
          >
            <Button type="primary" :loading="uploadLoading">导入</Button>
          </Upload>
        </Col>
      </Row>
    </div>
    <Table
      :loading="tableLoading"
      :data="listData"
      :columns="listColumns"
    ></Table>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
          :page-size="pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size-opts="[100, 200, 300, 400, 500]"
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
      <Detils ref="detils" :parent="this" :detilsRow="detilsRow"></Detils>
    </Modal>
  </div>
</template>

<script>
import Detils from "./Detils";
import { getCurrency as getList, uploadCurrency } from "@/api/ResManage";
export default {
  data() {
    return {
      listData: [],
      listColumns: [
        {
          title: "币种简称",
          key: "currencyCode",
        },
        {
          title: "币种",
          key: "currencyName",
        },
        {
          title: "对RMB汇率",
          key: "currencyRate2RMB",
        },
        {
          title: "对USD汇率",
          key: "currencyRate2USD",
        },
        {
          title: "汇率月份",
          key: "month",
        },
        {
          title: "操作",
          key: "action",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.handleEdit(params);
                    },
                  },
                },
                "编辑"
              ),
            ]);
          },
        },
      ],
      tableLoading: false,
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      modelDetils: false,
      detilsRow: {},
      isAdd: false,
    };
  },
  components: {
    Detils,
  },
  methods: {
    loadData() {
      const _this = this;
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
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
    changePage(val) {
      const _this = this;
      _this.pageCurrent = val;
    },
    changePageSize(val) {
      const _this = this;
      _this.pageSize = val;
    },
    handleAdd() {
      const _this = this;
      _this.isAdd = true;
      _this.modelDetils = true;
      _this.detilsRow = {};
    },
    handleEdit(params) {
      const _this = this;
      _this.isAdd = false;
      _this.modelDetils = true;
      _this.detilsRow = params.row;
    },
    handleDelete(params) {
      const _this = this;
      const row = params.row.id;
    },
    importExcel(file) {
      const _this = this;
      const formData = new FormData();
      formData.append("excelFile", file);
      _this.tableLoading = true;
      uploadCurrency(formData)
        .then((res) => {
          _this.tableLoading = false;
          _this.loadData();
          _this.$Message.success({
            content: "操作成功",
            duration: 10,
            closable: true,
          });
        })
        .catch((err) => {
          _this.tableLoading = false;
          console.log(err.response);
        });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>