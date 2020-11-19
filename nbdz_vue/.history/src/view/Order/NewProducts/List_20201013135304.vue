/* 2020 / 10/ 07
weihuiying
新品追踪功能  */
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
          </FormItem>
        </Form>
      </Col>
      <Col :span="2">
        <Upload
          action=""
          accept=".xls, .xlsx"
          :show-upload-list="false"
          :before-upload="inportExcel"
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
      @on-selection-change="tableSelect"
      height="750"
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
  </div>
</template>

<script>
import {
  NewProductList as getList,
  NewProductDisable,
  NewProductUpload,
} from "@/api/Order";
import dayjs from "dayjs";
export default {
  data() {
    return {
      tableLoading: false,
      uploadLoading: false,
      listData: [],
      filters: {
        sku: "",
      },
      listColums: [
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
          title: "操作",
          key: "action",
          align: "center",
          slot: "action",
        },
      ],
    };
  },
  methods: {
    tableSelect() {},
    saveRow(row) {
      const _this = this;
      this.$set(row, "isEdit", false);
    },
    editRow(row) {
      const _this = this;
      this.$set(row, "isEdit", true);
    },
    loadData(type) {
      const _this = this;
      if (type && type == "filter") {
      }
      let data = {};
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          const resData = res.data;
          resData.data.forEach((item) => {
            item.importDate = dayjs(item.importDate).format("YYYY/MM/DD");
            item.launchDate = dayjs(item.launchDate).format("YYYY/MM/DD");
          });
          _this.tableLoading = false;
          _this.listData = resData.data;
        })
        .catch((err) => {
          _this.tableLoading = false;
          console.log(err);
        });
    },
    inportExcel(file) {
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
  },
  mounted() {
    this.loadData();
  },
};
</script>