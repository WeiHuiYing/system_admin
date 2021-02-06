<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="20">
        <Form ref="formInline" label-position="right" :label-width="100" inline>
          <FormItem label="搜索内容">
            <Input
              clearable
              v-model="filters.search"
              placeholder="请输入搜索内容"
            ></Input>
          </FormItem>
          <FormItem>
            <Button
              style="margin-right: 10px"
              @click="loadFilter()"
              type="primary"
              >搜索</Button
            >
            <Button @click="addRow()" type="success"> 添加 </Button>
          </FormItem>
        </Form>
      </Col>
      <Col style="text-align: right" :span="4">
        <Upload
          action=""
          accept=".xls, .xlsx"
          :show-upload-list="false"
          :before-upload="importExcel"
        >
          <Button :loading="importLoading" type="primary">联邦9610代推</Button>
        </Upload>
      </Col>
    </Row>
    <Table
      ref="tables"
      height="700"
      :data="listData"
      v-bind:columns="listColums"
      stripe
    ></Table>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="totalCount"
          :current="currentPage"
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
    <Modal
      title="编辑"
      :mask-closable="false"
      v-model="modelEdit"
      width="800"
      scrollable
      footer-hide
    >
      <detilsForm ref="edit" :parent="this" :editData="eidtRow"></detilsForm>
    </Modal>
  </div>
</template>

<script>
import { trackingCode as getList, pushDate9610 } from "@/api/common";
import detilsForm from "./components/detils.vue";
import { fileToJson } from "@/libs/validator";
import store from "@/store";
export default {
  components: { detilsForm },
  data() {
    return {
      listColums: [
        {
          title: "Tracking_more物流对照码",
          key: "ServerName",
          align: "center",
        },
        {
          title: "物流方式",
          key: "Shiping",
          align: "center",
        },
        {
          title: "Carry_code",
          key: "TrackingMoreCode",
          align: "center",
        },
        {
          title: "最大运输标准时间(天)",
          key: "MaxStandardDate",
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
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.editDetils(params);
                    },
                  },
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.deleteRow(params);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      listData: [],
      totalCount: 1,
      currentPage: 1,
      pageSize: 100,
      filters: {
        search: "",
      },
      modelEdit: false,
      eidtRow: {},
      isAdd: false,
      importLoading: false,
    };
  },
  methods: {
    loadData() {
      let _this = this;
      const data = {
        page: _this.currentPage,
        pageSize: _this.pageSize,
        search: _this.filters.search,
      };
      getList(data, "GET")
        .then((res) => {
          _this.listData = res.data.results;
          _this.totalCount = res.data.count;
        })
        .catch((err) => {
          if (err.response && err.response.request) {
            const response = err.response.request;
            this.$Message.error({
              content: response.responseText,
              duration: 10,
              closable: true,
            });
          }
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
    },
    editDetils(params) {
      const _this = this;
      _this.eidtRow = params.row;
      _this.modelEdit = true;
      _this.isAdd = false;
    },
    addRow() {
      const _this = this;
      _this.eidtRow = {};
      _this.modelEdit = true;
      _this.isAdd = true;
    },
    deleteRow(params) {
      const _this = this;
      getList(params.row, "DELETE")
        .then((res) => {
          if (res.status == 204) {
            this.$Message.info("删除成功");
            this.loadData();
          } else {
            this.$Message.error({
              content: msg,
              duration: 10,
              closable: true,
            });
          }
        })
        .catch((err) => {
          if (err.response && err.response.request) {
            const response = err.response.request;
            this.$Message.error({
              content: response.responseText,
              duration: 10,
              closable: true,
            });
          }
        });
    },
    importExcel(file) {
      const _this = this;
      const formData = new FormData();
      formData.append("excelFile", file);
      _this.importLoading = true;
      pushDate9610(formData)
        .then((res) => {
          const content = res;
          _this.importLoading = false;
          const blob = new Blob([content.data], {
            type: "application/vnd.ms-excel",
          });
          const fileName = "9610代推数据.xlsx";
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放 URL对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
        })
        .catch((err) => {
          _this.importLoading = false;
          if (err.response && err.response.data) {
            fileToJson(err.response.data).then((errData) => {
              _this.$Message.error({
                content: errData.message,
                duration: 10,
                closable: true,
              });
            });
          }
        });
      return false;
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less"></style>
