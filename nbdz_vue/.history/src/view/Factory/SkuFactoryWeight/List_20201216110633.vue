<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="22">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem label="sku">
            <Input
              clearable
              v-model="filters.sku"
              placeholder="请输入搜索sku"
            ></Input>
          </FormItem>
          <FormItem label="商品大类">
            <Select
              clearable
              style="width: 200px"
              v-model="filters.productType"
              placeholder="请选择商品大类"
            >
              <Option
                v-for="(item, index) in typeList"
                :key="index"
                :label="item"
                :value="item"
              ></Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button
              style="margin-right: 5px"
              @click="loadFilter()"
              type="primary"
              >搜索</Button
            >
          </FormItem>
        </Form>
      </Col>
      <Col :span="2">
        <Upload
          action=""
          accept=".xls, .xlsx"
          :show-upload-list="false"
          :before-upload="importExcel"
          :disabled="uploadLoading"
        >
          <Button :loading="uploadLoading" type="primary">导入</Button>
        </Upload>
      </Col>
    </Row>
    <Table
      ref="tables"
      height="700"
      :data="listData"
      :loading="tableLoading"
      v-bind:columns="listColums"
      stripe
    >
      <template slot-scope="{ row }" slot="action">
        <Button
          v-if="row.isEdit"
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="saveRow(row)"
          >保存</Button
        >
        <Button
          @click="editRow(row)"
          v-else
          type="primary"
          size="small"
          style="margin-right: 5px"
          >编辑</Button
        >
      </template>
    </Table>
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
  </div>
</template>

<script>
import {
  GetBaseList as getList,
  EditBaseDate as editData,
  UploadBaseMaterial,
} from "@/api/Factory";
import dayjs from "dayjs";
import { filtersNewDate as filtersDate } from "@/libs/validator";
export default {
  data() {
    return {
      listColums: [
        {
          title: "原料类型",
          key: "type",
          align: "center",
          width: 100,
        },
        {
          title: "工厂sku",
          key: "factorySku",
          align: "center",
          width: 200,
        },
        {
          title: "系统sku关键字",
          key: "skuKey",
          align: "center",
          width: 200,
        },
        {
          title: "根据SKU匹配",
          key: "isFullMatching",
          align: "center",
          width: 120,
        },
        {
          title: "数量",
          key: "qty",
          align: "center",
          width: 120,
        },
        {
          title: "8''",
          key: "m8",
          align: "center",
          width: 100,
        },
        {
          title: "8-1''",
          key: "m8_1",
          align: "center",
          width: 100,
        },
        {
          title: "8-2''",
          key: "m8_2",
          align: "center",
          width: 100,
        },
        {
          title: "8-3''",
          key: "m8_3",
          align: "center",
          width: 100,
        },
        {
          title: "10''",
          key: "m10",
          align: "center",
          width: 100,
        },
        {
          title: "10''(手织)",
          key: "h10",
          align: "center",
          width: 100,
        },
        {
          title: "12''",
          key: "m12",
          align: "center",
          width: 100,
        },
        {
          title: "12''(手织)",
          key: "h12",
          align: "center",
          width: 100,
        },
        {
          title: "14''",
          key: "m14",
          align: "center",
          width: 100,
        },
        {
          title: "14''(手织)",
          key: "h14",
          align: "center",
          width: 100,
        },
        {
          title: "16''",
          key: "m16",
          align: "center",
          width: 100,
        },
        {
          title: "16''(手织)",
          key: "h16",
          align: "center",
          width: 100,
        },
        {
          title: "16''",
          key: "m16",
          align: "center",
          width: 100,
        },
        {
          title: "16''(手织)",
          key: "h16",
          align: "center",
          width: 100,
        },
        {
          title: "18''",
          key: "m18",
          align: "center",
          width: 100,
        },
        {
          title: "18''(手织)",
          key: "h18",
          align: "center",
          width: 100,
        },
        {
          title: "20''",
          key: "m20",
          align: "center",
          width: 100,
        },
        {
          title: "20''(手织)",
          key: "h20",
          align: "center",
          width: 100,
        },
        {
          title: "24''",
          key: "m24",
          align: "center",
          width: 100,
        },
        {
          title: "24''(手织)",
          key: "h24",
          align: "center",
          width: 100,
        },
        {
          title: "26''",
          key: "m26",
          align: "center",
          width: 100,
        },
        {
          title: "26''(手织)",
          key: "h26",
          align: "center",
          width: 100,
        },
        {
          title: "28''",
          key: "m28",
          align: "center",
          width: 100,
        },
        {
          title: "28''(手织)",
          key: "h28",
          align: "center",
          width: 100,
        },
        {
          title: "30''",
          key: "m30",
          align: "center",
          width: 100,
        },
        {
          title: "30''(手织)",
          key: "h30",
          align: "center",
          width: 100,
        },
        {
          title: "导入日期",
          key: "enterDate",
          align: "center",
          width: 200,
        },
        {
          title: "更新日期",
          key: "updateDate",
          align: "center",
          width: 200,
        },
        {
          title: "操作",
          align: "center",
          width: 200,
          slot: "action",
          fixed: "right",
        },
      ],
      listData: [],
      totalCount: 1,
      currentPage: 1,
      pageSize: 100,
      filters: {
        sku: "",
        productType: "",
      },
      tableLoading: false,
      typeList: [],
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
        pageNum: _this.currentPage,
        pageSize: _this.pageSize,
        // query: filtersquery,
      };
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          _this.tableLoading = false;
          let resData = res.data;
          if (resData.code == "200") {
            _this.listData = resData.data;
            _this.totalCount = resData.totalCount;
          } else {
            this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true,
            });
          }
        })
        .catch((err) => {
          _this.tableLoading = false;
          console.log(err);
        });
    },
    saveRow(row) {
      const _this = this;
      row.launchDate = dayjs(row.launchDate).format("YYYY-MM-DD");
      row.importDate = dayjs(row.importDate).format("YYYY-MM-DD");
      NewProductEdit(row).then((res) => {
        _this.$Message.success({
          content: "操作成功",
          duration: 10,
          closable: true,
        });
        this.$set(row, "isEdit", false);
      });
    },
    editRow(row) {
      const _this = this;
      this.$set(row, "isEdit", true);
    },
    importExcel(file) {
      const _this = this;
      const formData = new FormData();
      formData.append("excelFile", file);
      _this.tableLoading = true;
      _this.uploadLoading = true;
      NewProductUpload(formData)
        .then((res) => {
          _this.tableLoading = false;
          _this.uploadLoading = false;
          _this.loadData();
          _this.$Message.success({
            content: "操作成功",
            duration: 10,
            closable: true,
          });
        })
        .catch((err) => {
          _this.tableLoading = false;
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
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less" scoped>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>
