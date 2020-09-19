/* 2020 / 09/ 04
weihuiying
商品海关编码维护  */
<template>
  <div class="content-main">
    <div style="margin:10px 0" class="search-con search-con-top">
      <Row>
        <Col :span="20">
          <Form ref="formInline" label-position="right" :label-width="100" inline>
            <FormItem prop="HsCode" label="海关编码">
              <Input v-model="filters.HsCode" />
            </FormItem>
            <FormItem prop="Status" label="状态">
              <Select v-model="filters.Status" clearable style="width:150px">
                <Option value="1">已对应海关编码</Option>
                <Option value="-1">未对应海关编码</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Button @click="loadData('filter')" class="search-btn" type="primary">搜索</Button>
            </FormItem>
          </Form>
        </Col>
        <Col :span="2">
          <a download href="http:192.168.1.27/media/海关编码.xls">示例文件</a>
        </Col>
        <Col :span="2">
          <Upload
            accept=".xls, .xlsx"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            action="/log/e_trade/product_hscode/upload_hs_code/"
          >
            <Button :loading="uploadLoading">批量更新商品海关信息</Button>
          </Upload>
        </Col>
      </Row>
    </div>
    <Table
      height="700"
      ref="tables"
      :loading="tableLoading"
      :data="listData"
      :columns="listColumns"
      stripe
    >
      <template slot-scope="{ row}" slot="HsCode">
        <Select
          @on-change="HsCodeChange(row)"
          v-if="row.isEdit"
          v-model="row.HsCode"
          filterable
          remote
          placeholder="请输入海关编码关键字"
          clearable
          :remote-method="filterHsCode"
          :loading="HsCodeLoading"
        >
          <Option
            v-for="(option, index) in HsCodeList"
            :value="option.HsCode"
            :key="index"
          >{{option.HsCode}}</Option>
        </Select>
        <span v-else>{{row.HsCode}}</span>
      </template>
      <template slot-scope="{ row ,index}" slot="action">
        <Button
          v-if="row.isEdit"
          type="primary"
          size="small"
          @click="saveData(row,index)"
          style="margin-right: 5px"
        >保存</Button>
        <Button
          v-else
          type="primary"
          size="small"
          @click="editData(row,index)"
          style="margin-right: 5px"
        >编辑</Button>
      </template>
    </Table>
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
import {
  productCode as getList,
  hsCode as getCodeList,
  uploadHsCode,
} from "@/api/Customs";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listData: [],
      listColumns: [
        {
          title: "商品编码",
          key: "ProductSku",
          align: "center",
        },
        {
          title: "海关编码",
          align: "center",
          slot: "HsCode",
        },
        {
          title: "申报中文名",
          key: "ReportName",
          align: "ReportName",
        },
        {
          title: "申报英文名",
          key: "ReportEnName",
          align: "ReportEnName",
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      filters: {},
      tableLoading: false,
      detilsForm: {},
      HsCodeList: [],
      HsCodeLoading: false,
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      uploadLoading: false,
    };
  },
  methods: {
    loadData(type) {
      let _this = this;
      if (type && type == "filter") {
        _this.pageCurrent = 1;
      }
      let data = {
        page: _this.pageCurrent,
        page_size: _this.pageSize,
      };
      data = Object.assign(data, _this.filters);
      _this.tableLoading = true;
      getList(data, "Get")
        .then((res) => {
          console.log(res);
          const resData = res.data;
          _this.tableLoading = false;
          if (res.status == 200) {
            _this.listData = resData.results;
            _this.pageTotal = resData.count;
          } else {
            this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true,
            });
          }
        })
        .catch((err) => {
          console.log(err.response);
          const response = err.response;
          if (response.data && response.data.detail) {
            this.$Message.error({
              content: response.data.detail,
              duration: 10,
              closable: true,
            });
          }
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
    },
    editData(row, index) {
      const _this = this;
      row.isEdit = true;
      this.$set(this.listData, index, row);
    },
    removeData(row) {
      const _this = this;
      console.log(row);
    },
    filterHsCode(val) {
      const _this = this;
      let data = {
        search: val,
      };
      _this.HsCodeLoading = true;
      getCodeList(data, "Get")
        .then((res) => {
          const resData = res.data;
          _this.HsCodeLoading = false;
          if (res.status == 200) {
            _this.HsCodeList = resData.results;
          } else {
            this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true,
            });
          }
        })
        .catch((err) => {
          console.log(err.response);
          const response = err.response;
          if (response.data && response.data.detail) {
            this.$Message.error({
              content: response.data.detail,
              duration: 10,
              closable: true,
            });
          }
        });
    },
    HsCodeChange(row) {
      let codeItem, rowIndex;
      this.HsCodeList.forEach((item) => {
        if (item.HsCode == row.HsCode) {
          codeItem = item;
        }
      });
      this.listData.forEach((item, index) => {
        if (item.id == row.id) {
          rowIndex = index;
        }
      });
      if (codeItem) {
        let rowItem = JSON.parse(JSON.stringify(row));
        rowItem.ReportName = codeItem.ReportName;
        rowItem.ReportEnName = codeItem.ReportEnName;
        this.$set(this.listData, rowIndex, rowItem);
      }
    },
    saveData(row, index) {
      const _this = this;
      getList(row, "Patch")
        .then((res) => {
          this.$Message.success({
            content: "操作成功",
            duration: 10,
            closable: true,
          });
          this.$set(this.listData, index, res.data);
        })
        .catch((err) => {
          console.log(err.response);
          const response = err.response;
          if (response.data && response.data.detail) {
            this.$Message.error({
              content: response.data.detail,
              duration: 10,
              closable: true,
            });
          }
        });
    },
    beforeUpload(file) {
      const _this = this;
      const formData = new FormData();
      formData.append("file", file);
      this.uploadLoading = true;
      uploadHsCode(formData, "Post")
        .then((res) => {
          this.uploadLoading = false;
          this.$Message.success({
            content: res.data.detail,
            duration: 10,
            closable: true,
          });
          _this.loadData();
        })
        .catch((err) => {
          const response = err.response;
          if (response.data && response.data.detail) {
            this.$Message.error({
              content: response.data.detail,
              duration: 10,
              closable: true,
            });
          }
        });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less" scoped>
</style>