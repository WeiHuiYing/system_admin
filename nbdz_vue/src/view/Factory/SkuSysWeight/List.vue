<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="12">
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
      <Col style="text-align: right" :span="12">
        <Button @click="exportData()" type="primary">导出</Button>
      </Col>
    </Row>

    <Tabs v-model="currentTab" @on-click="changeTabs()">
      <TabPane label="工厂数据" name="factory">
        <Table
          ref="factoryTables"
          height="700"
          :data="listData"
          :loading="tableLoading"
          v-bind:columns="factoryColums"
          stripe
        >
          <template slot-scope="{ row }" slot="m8">
            <span>{{ row.m8 + row.m10 }}</span>
          </template>
        </Table>
      </TabPane>
      <TabPane label="财务数据" name="finance">
        <Table
          ref="financeTables"
          height="700"
          :loading="tableLoading"
          :data="listData"
          v-bind:columns="financeColums"
          stripe
        ></Table>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { UploadCalculateSku } from "@/api/Factory";
import dayjs from "dayjs";
import { filtersNewDate as filtersDate } from "@/libs/validator";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      factoryColums: [
        {
          title: "sku",
          key: "sku",
          align: "center",
          width: 200,
        },
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
          title: "数量",
          key: "qty",
          align: "center",
          width: 100,
        },
        {
          title: "2''",
          key: "m8_1",
          align: "center",
          width: 100,
        },
        {
          title: "4''",
          key: "m8_2",
          align: "center",
          width: 100,
        },
        {
          title: "6''",
          key: "m8_3",
          align: "center",
          width: 100,
        },
        {
          title: "8''",
          key: "m8",
          align: "center",
          width: 100,
          slot: "m8",
        },
        {
          title: "10''",
          key: "m12",
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
          key: "m14",
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
          key: "m16",
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
          key: "m18",
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
          key: "m20",
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
          key: "m24",
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
          key: "m26",
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
          key: "m28",
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
          key: "m30",
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
      ],
      financeColums: [
        {
          title: "sku",
          key: "sku",
          align: "center",
          width: 200,
        },
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
          title: "数量",
          key: "qty",
          align: "center",
          width: 100,
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
      currentTab: "factory",
      uploadLoading: false,
    };
  },
  methods: {
    importExcel(file) {
      const _this = this;
      const formData = new FormData();
      formData.append("excelFile", file);
      _this.tableLoading = true;
      _this.uploadLoading = true;
      UploadCalculateSku(formData)
        .then((res) => {
          const resData = res.data;
          _this.tableLoading = false;
          _this.uploadLoading = false;
          _this.listData = resData.data;
          _this.$Message.success({
            content: resData.message,
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
    changeTabs() {
      // console.log(this.currentTab);
      // let _this = this;
      // if (_this.currentTab == "store") {
      //   _this.totalVisible = false;
      // } else {
      //   _this.totalVisible = true;
      // }
      // _this.pageCurrent = 1;
      // _this.loadData();
    },
    exportData() {
      let _this = this;
      let titleArr = [];
      let keyArr = [];
      let columnsArr = [];
      if (_this.currentTab === "factory") {
        _this.factoryColums.forEach((item) => {
          if (item.children) {
            item.children.forEach((child) => {
              let children = {};
              children.title = item.title + "|" + child.title;
              children.key = child.key;
              columnsArr.push(children);
            });
          } else {
            columnsArr.push(item);
          }
        });
      } else if (_this.currentTab === "finance") {
        _this.financeColums.forEach((item) => {
          if (item.children) {
            item.children.forEach((child) => {
              let children = {};
              children.title = item.title + "|" + child.title;
              children.key = child.key;
              columnsArr.push(children);
            });
          } else {
            columnsArr.push(item);
          }
        });
      }

      titleArr = columnsArr.map((item) => {
        return item.title;
      });
      keyArr = columnsArr.map((item) => {
        return item.key;
      });
      const params = {
        title: titleArr,
        key: keyArr,
        data: _this.listData,
        autoWidth: true,
        filename:
          _this.currentTab === "factory" ? "工厂数据报表" : "财务数据报表",
      };
      excel.export_array_to_excel(params);
    },
  },
};
</script>

<style lang="less" scoped>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>
