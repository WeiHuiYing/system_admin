/* 2020 / 10/ 07
weihuiying
新品追踪导入  */
<template>
  <div>
    <Row class="search-con search-con-top">
      <Col :span="22">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem label="sku">
            <Input
              clearable
              v-model="filters.sku"
              placeholder="请输入sku"
            ></Input>
          </FormItem>
          <FormItem>
            <Button
              style="margin-right: 5px"
              @click="loadData('filter')"
              type="primary"
              >搜索</Button
            >
            <Button
              v-if="selectionList.length > 0"
              style="margin-right: 5px"
              @click="stopMore"
              type="primary"
              >批量停用</Button
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
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
      :border="true"
      height="670"
      @on-selection-change="tableSelect"
    >
      <template slot-scope="{ row }" slot="hairNetType">
        <Input v-if="row.isEdit" v-model="row.hairNetType" clearable></Input>
        <span v-else>{{ row.hairNetType }}</span>
      </template>
      <template slot-scope="{ row }" slot="productType">
        <Input v-if="row.isEdit" v-model="row.productType" clearable></Input>
        <span v-else>{{ row.productType }}</span>
      </template>
      <template slot-scope="{ row }" slot="launchDate">
        <DatePicker
          v-if="row.isEdit"
          v-model="row.launchDate"
          type="date"
          clearable
          style="width: 200px"
        >
        </DatePicker>
        <span v-else>{{ row.launchDate }}</span>
      </template>
      <template slot-scope="{ row }" slot="enable">
        <Checkbox
          v-model="row.enable"
          :on-change="editVisible ? saveRow(row) : ''"
        ></Checkbox>
      </template>

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
  </div>
</template>

<script>
import {
  NewProductList as getList,
  NewProductDisable,
  NewProductUpload,
  NewProductEdit,
} from "@/api/order";
import dayjs from "dayjs";
export default {
  data() {
    return {
      tableLoading: false,
      uploadLoading: false,
      listData: [],
      editVisible: false,
      pageCurrent: 1,
      pageTotal: 1,
      pageSize: 100,
      filters: {
        sku: "",
      },
      selectionList: [],
      listColums: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "sku",
          key: "sku",
          align: "center",
        },
        {
          title: "发网类型",
          key: "hairNetType",
          align: "center",
          slot: "hairNetType",
        },
        {
          title: "产品类型",
          key: "productType",
          align: "center",
          slot: "productType",
        },
        {
          title: "上新时间",
          key: "launchDate",
          align: "center",
          slot: "launchDate",
        },
        {
          title: "导入时间",
          key: "importDate",
          align: "center",
        },
        {
          title: "新品停用标记",
          key: "enable",
          align: "center",
          slot: "enable",
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          slot: "action",
        },
      ],
    };
  },
  methods: {
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
    loadData(type) {
      const _this = this;
      let filterQuery = [];
      if (_this.filters.sku != "") {
        filterQuery.push({
          key: "sku",
          value: _this.filters.sku,
          option: "like",
          isAnd: "true",
        });
      }
      if (type && type == "filter") {
        _this.pageCurrent = 1;
      }
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery,
      };

      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          const resData = res.data;
          resData.data.forEach((item) => {
            item.importDate = dayjs(item.importDate).format("YYYY-MM-DD");
            item.launchDate = dayjs(item.launchDate).format("YYYY-MM-DD");
          });
          _this.tableLoading = false;
          _this.listData = resData.data;
        })
        .catch((err) => {
          _this.tableLoading = false;
          console.log(err);
        });
    },

    changePageSize(val) {
      let _this = this;
      _this.pageSize = val;
      _this.loadData();
    },
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
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
    tableSelect(selection) {
      this.selectionList = selection.map((item) => {
        return item.id;
      });
    },
    stopMore() {
      const _this = this;
      let data = {
        ids: _this.selectionList,
      };
      NewProductDisable(data).then((res) => {
        console.log(res);
      });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>