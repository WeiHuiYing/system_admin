<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="22">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem label="原料类型">
            <Select style="width: 200px" clearable v-model="filters.type">
              <Option label="手织" value="手织">手织</Option>
              <Option label="机制" value="机制">机制</Option>
              <Option label="BOB" value="BOB">BOB</Option>
            </Select>
          </FormItem>
          <FormItem label="工厂sku">
            <Input
              v-model="filters.factorySku"
              placeholder="请输入工厂sku"
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
      <template slot-scope="{ row }" slot="isFullMatching">
        <i-switch
          :disabled="!row.isEdit"
          v-model="row.isFullMatching"
          size="large"
        >
        </i-switch>
      </template>
      <template slot-scope="{ row }" slot="m8">
        <Input v-if="row.isEdit" v-model="row.m8" clearable></Input>
        <span v-else>{{ row.m8 }}</span>
      </template>
      <template slot-scope="{ row }" slot="m8_1">
        <Input v-if="row.isEdit" v-model="row.m8_1" clearable></Input>
        <span v-else>{{ row.m8_1 }}</span>
      </template>
      <template slot-scope="{ row }" slot="m8_2">
        <Input v-if="row.isEdit" v-model="row.m8_2" clearable></Input>
        <span v-else>{{ row.m8_2 }}</span>
      </template>
      <template slot-scope="{ row }" slot="m8_3">
        <Input v-if="row.isEdit" v-model="row.m8_3" clearable></Input>
        <span v-else>{{ row.m8_3 }}</span>
      </template>
      <template slot-scope="{ row }" slot="m10">
        <Input v-if="row.isEdit" v-model="row.m10" clearable></Input>
        <span v-else>{{ row.m10 }}</span>
      </template>
      <template slot-scope="{ row }" slot="h10">
        <Input v-if="row.isEdit" v-model="row.h10" clearable></Input>
        <span v-else>{{ row.h10 }}</span>
      </template>
      <template slot-scope="{ row }" slot="m12">
        <Input v-if="row.isEdit" v-model="row.m12" clearable></Input>
        <span v-else>{{ row.m12 }}</span>
      </template>
      <template slot-scope="{ row }" slot="h12">
        <Input v-if="row.isEdit" v-model="row.h12" clearable></Input>
        <span v-else>{{ row.h12 }}</span>
      </template>
      <template slot-scope="{ row }" slot="m14">
        <Input v-if="row.isEdit" v-model="row.m14" clearable></Input>
        <span v-else>{{ row.m14 }}</span>
      </template>
      <template slot-scope="{ row }" slot="h14">
        <Input v-if="row.isEdit" v-model="row.h14" clearable></Input>
        <span v-else>{{ row.h14 }}</span>
      </template>
      <template slot-scope="{ row }" slot="m16">
        <Input v-if="row.isEdit" v-model="row.m16" clearable></Input>
        <span v-else>{{ row.m16 }}</span>
      </template>
      <template slot-scope="{ row }" slot="h16">
        <Input v-if="row.isEdit" v-model="row.h16" clearable></Input>
        <span v-else>{{ row.h16 }}</span>
      </template>
      <template slot-scope="{ row }" slot="m18">
        <Input v-if="row.isEdit" v-model="row.m18" clearable></Input>
        <span v-else>{{ row.m18 }}</span>
      </template>
      <template slot-scope="{ row }" slot="h18">
        <Input v-if="row.isEdit" v-model="row.h18" clearable></Input>
        <span v-else>{{ row.h18 }}</span>
      </template>
      <template slot-scope="{ row }" slot="m20">
        <Input v-if="row.isEdit" v-model="row.m20" clearable></Input>
        <span v-else>{{ row.m20 }}</span>
      </template>
      <template slot-scope="{ row }" slot="h20">
        <Input v-if="row.isEdit" v-model="row.h20" clearable></Input>
        <span v-else>{{ row.h20 }}</span>
      </template>
      <template slot-scope="{ row }" slot="m22">
        <Input v-if="row.isEdit" v-model="row.m22" clearable></Input>
        <span v-else>{{ row.m22 }}</span>
      </template>
      <template slot-scope="{ row }" slot="h22">
        <Input v-if="row.isEdit" v-model="row.h22" clearable></Input>
        <span v-else>{{ row.h22 }}</span>
      </template>
      <template slot-scope="{ row }" slot="m24">
        <Input v-if="row.isEdit" v-model="row.m24" clearable></Input>
        <span v-else>{{ row.m24 }}</span>
      </template>
      <template slot-scope="{ row }" slot="h24">
        <Input v-if="row.isEdit" v-model="row.h24" clearable></Input>
        <span v-else>{{ row.h24 }}</span>
      </template>
      <template slot-scope="{ row }" slot="m26">
        <Input v-if="row.isEdit" v-model="row.m26" clearable></Input>
        <span v-else>{{ row.m26 }}</span>
      </template>
      <template slot-scope="{ row }" slot="h26">
        <Input v-if="row.isEdit" v-model="row.h26" clearable></Input>
        <span v-else>{{ row.h26 }}</span>
      </template>
      <template slot-scope="{ row }" slot="m28">
        <Input v-if="row.isEdit" v-model="row.m28" clearable></Input>
        <span v-else>{{ row.m28 }}</span>
      </template>
      <template slot-scope="{ row }" slot="h28">
        <Input v-if="row.isEdit" v-model="row.h28" clearable></Input>
        <span v-else>{{ row.h28 }}</span>
      </template>
      <template slot-scope="{ row }" slot="m30">
        <Input v-if="row.isEdit" v-model="row.m30" clearable></Input>
        <span v-else>{{ row.m30 }}</span>
      </template>
      <template slot-scope="{ row }" slot="h30">
        <Input v-if="row.isEdit" v-model="row.h30" clearable></Input>
        <span v-else>{{ row.h30 }}</span>
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
  GetMaterialRateList as getList,
  editMaterialRate as editData,
  exportMaterialRate,
} from "@/api/factory";
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
          title: "尺寸",
          key: "size",
          align: "center",
          width: 100,
        },
        {
          title: "匹配尺寸",
          key: "matchSize",
          align: "center",
          width: 100,
        },
        {
          title: "占比",
          key: "rate",
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
      let filtersquery = this.filtersObj();
      let data = {
        pageNum: _this.currentPage,
        pageSize: _this.pageSize,
        query: filtersquery,
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
    // 筛选条件字段拼接
    filtersObj() {
      const _this = this;
      let filterQuery = [];
      Object.keys(_this.filters).forEach((keyItem) => {
        if (_this.filters[keyItem] && _this.filters[keyItem] != "") {
          filterQuery.push({
            key: keyItem,
            option: "lk",
            value: _this.filters[keyItem],
            isAnd: "true",
          });
        }
      });
      return filterQuery;
    },
    saveRow(row) {
      const _this = this;

      editData(row).then((res) => {
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
      exportMaterialRate(formData)
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
      return false;
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
