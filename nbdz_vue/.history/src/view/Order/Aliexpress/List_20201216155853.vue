<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="22">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="90"
            inline
          >
            <FormItem label="导入时间">
              <DatePicker
                v-model="filters.createTime"
                type="date"
                :options="dateOptions"
                placeholder="请选择查询日期"
                style="width: 150px"
              ></DatePicker>
            </FormItem>
            <FormItem v-if="currentTab == 'hisList'" label="平台">
              <Select
                v-model="filters.plateform"
                clearable
                style="width: 160px"
              >
                <Option
                  v-for="(item, index) in plateList"
                  :key="index"
                  :label="item"
                  :value="item"
                  >{{ item }}</Option
                >
              </Select>
            </FormItem>
            <FormItem
              v-if="currentTab == 'hisList'"
              prop="FhStart"
              label="发货开始时间"
            >
              <DatePicker
                v-model="filters.FhStart"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 150px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem
              v-if="currentTab == 'hisList'"
              prop="FhEnd"
              label="发货结束时间"
            >
              <DatePicker
                v-model="filters.FhEnd"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 150px"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button
                @click="loadData('filter')"
                class="search-btn"
                type="primary"
                style="margin-right: 10px"
              >
                搜索
              </Button>
              <Dropdown placement="bottom-start" @on-click="handleMenu">
                <Button type="primary">
                  操作
                  <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                  <DropdownItem name="exportList">导出报表数据</DropdownItem>
                  <DropdownItem name="exportSum">导出本次求和数据</DropdownItem>
                  <DropdownItem name="exportHis">导出历史求和数据</DropdownItem>
                  <DropdownItem name="downTemp">导入模板下载</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </FormItem>
          </Form>
        </Col>
        <Col :span="2">
          <Upload
            action=""
            name="excelFile"
            accept=".xls, .xlsx"
            :show-upload-list="false"
            :before-upload="handleUpload"
          >
            <Button type="primary" :loading="uploadLoading"
              >导入明细数据</Button
            >
          </Upload>
        </Col>
      </Row>
    </div>
    <Tabs v-model="currentTab" @on-click="changeTabs()">
      <TabPane label="明细数据" name="list">
        <Table
          ref="tables"
          height="650"
          :data="listData"
          v-bind:columns="listColums"
          stripe
        ></Table>
      </TabPane>
      <TabPane label="本次求和" name="sum">
        <Table
          ref="tables"
          height="650"
          :data="listData"
          v-bind:columns="sumColums"
          stripe
        ></Table>
      </TabPane>
      <TabPane label="历史求和" name="hisList">
        <Table
          ref="tables"
          height="650"
          :data="listData"
          v-bind:columns="historyColums"
          stripe
        ></Table>
      </TabPane>
    </Tabs>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
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
import store from "@/store";
import {
  AliepressList,
  ExportAliepressList,
  HistoryList,
  ExportHistoryList,
  GetSumList,
  ExportSumList,
  uploadLoanInfo,
  GetPlateform,
} from "@/api/order";
import dayjs from "dayjs";
import { filtersNewDate as filtersDate } from "@/libs/validator";
export default {
  data() {
    return {
      listColums: [
        {
          title: "平台单号",
          key: "plateFormOrderCode",
        },
        {
          title: "流水号",
          key: "serialCode",
        },
        {
          title: "支付宝交易号",
          key: "alipayCode",
        },
        {
          title: "店铺",
          key: "plateForm",
        },
        {
          title: "放款金额",
          key: "amount",
          sortable: true,
        },
        {
          title: "币种",
          key: "currency",
        },
        {
          title: "类型",
          key: "type",
        },
        {
          title: "备注",
          key: "memo",
        },
        {
          title: "放款时间",
          key: "loanDate",
        },
        {
          title: "导入时间",
          key: "enterTime",
        },
      ],
      historyColums: [
        {
          title: "店铺",
          key: "plateForm",
          width: 200,
        },
        {
          title: "平台单号",
          key: "plateFormOrderCode",
          width: 200,
        },
        {
          title: "币种",
          key: "currency",
          width: 200,
        },
        {
          title: "付款时间",
          key: "fkDate",
          width: 200,
        },
        {
          title: "发货时间",
          key: "fhDate",
          width: 200,
        },
        {
          title: "类型",
          key: "type",
          width: 200,
        },
        {
          title: "订单总金额",
          key: "total",
          width: 200,
        },
        {
          title: "总放款金额",
          key: "amountTotal",
          width: 200,
        },
        {
          title: "第一次放款时间",
          key: "loanDate1",
          width: 200,
        },
        {
          title: "第一次放款金额",
          key: "amount1",
          width: 200,
        },
        {
          title: "第二次放款时间",
          key: "loanDate2",
          width: 200,
        },
        {
          title: "第二次放款金额",
          key: "amount2",
          width: 200,
        },
        {
          title: "第三次放款时间",
          key: "loanDate3",
          width: 200,
        },
        {
          title: "第三次放款金额",
          key: "amount3",
          width: 200,
        },
        {
          title: "第四次放款时间",
          key: "loanDate4",
          width: 200,
        },
        {
          title: "第四次放款金额",
          key: "amount4",
          width: 200,
        },
        {
          title: "第五次放款时间",
          key: "loanDate5",
          width: 200,
        },
        {
          title: "第五次放款金额",
          key: "amount5",
          width: 200,
        },
        {
          title: "导入时间",
          key: "enterTime",
          width: 200,
        },
      ],
      sumColums: [
        {
          title: "平台单号",
          key: "plateFormOrderCode",
        },
        {
          title: "店铺",
          key: "plateForm",
        },
        {
          title: "首次放款信息",
          key: "firstLoanDate",
        },
        {
          title: "末次放款信息",
          key: "lastLoanDate",
        },
        {
          title: "金额",
          key: "amount",
          sortable: true,
        },
        {
          title: "币种",
          key: "currency",
        },
        {
          title: "导入时间",
          key: "createTime",
        },
      ],
      filters: {
        createTime: "",
        plateform: "",
        FhStart: "",
        FhEnd: "",
      },
      currentTab: "list",
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      listData: [],
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
      uploadLoading: false,
      locationUrl: "",
      plateList: [],
    };
  },
  methods: {
    loadData(type) {
      const _this = this;
      if (type && type == "filter") {
        _this.pageCurrent = 1;
      }
      let filtersquery = this.filtersObj();
      let filterFh = filtersDate(
        "fhDate",
        _this.filters.FhStart,
        _this.filters.FhEnd
      );
      if (filterFh && filterFh.length > 0) {
        filtersquery = filterQuery.concat(filterFh);
      }
      // let filterQuery = [];
      // if (_this.filters.createTime && _this.filters.createTime != "") {
      //   if (_this.currentTab == "sum") {
      //     filterQuery.push({
      //       key: "createTime",
      //       value: dayjs(_this.filters.createTime).format("YYYY-MM-DD"),
      //       option: "eq",
      //       isAnd: "true",
      //     });
      //   }else if(_this.currentTab == "hisList"){
      //     filterQuery.
      //     filterQuery.push({
      //       key: "enterTime",
      //       value: dayjs(_this.filters.createTime).format("YYYY-MM-DD"),
      //       option: "eq",
      //       isAnd: "true",
      //     });
      //   }else {
      //     filterQuery.push({
      //       key: "enterTime",
      //       value: dayjs(_this.filters.createTime).format("YYYY-MM-DD"),
      //       option: "eq",
      //       isAnd: "true",
      //     });
      //   }
      // }
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery,
      };
      if (_this.currentTab == "list") {
        AliepressList(data).then((res) => {
          const resData = res.data;
          _this.listData = resData.data;
          _this.pageTotal = resData.totalCount;
        });
      } else if (_this.currentTab == "sum") {
        GetSumList(data).then((res) => {
          const resData = res.data;
          _this.listData = resData.data;
          _this.pageTotal = resData.totalCount;
        });
      } else if (_this.currentTab == "hisList") {
        HistoryList(data).then((res) => {
          const resData = res.data;
          _this.listData = resData.data;
          _this.pageTotal = resData.totalCount;
        });
      }
    },
    handleMenu(name) {
      if (name == "exportList") {
        this.exportData("list");
      } else if (name == "exportSum") {
        this.exportData("sum");
      } else if (name == "exportHis") {
        this.exportData("hisList");
      } else if (name == "downTemp") {
        this.downTemp();
      }
    },
    filtersObj() {
      const _this = this;
      let filterQuery = [];
      if (_this.currentTab == "sum") {
        if (_this.filters.createTime && _this.filters.createTime != "") {
          filterQuery.push({
            key: "createTime",
            value: dayjs(_this.filters.createTime).format("YYYY-MM-DD"),
            option: "eq",
            isAnd: "true",
          });
        }
      } else if (_this.currentTab == "hisList") {
        if (_this.filters.plateform && _this.filters.plateform != "") {
          filterQuery.push({
            key: "plateform",
            value: _this.filters.plateform,
            option: "eq",
            isAnd: "true",
          });
        }
        if (_this.filters.createTime && _this.filters.createTime != "") {
          filterQuery.push({
            key: "enterTime",
            value: dayjs(_this.filters.createTime).format("YYYY-MM-DD"),
            option: "eq",
            isAnd: "true",
          });
        }
      } else {
        if (_this.filters.createTime && _this.filters.createTime != "") {
          filterQuery.push({
            key: "enterTime",
            value: dayjs(_this.filters.createTime).format("YYYY-MM-DD"),
            option: "eq",
            isAnd: "true",
          });
        }
      }

      return filterQuery;
    },
    loadPlate() {
      let _this = this;
      let data = {};
      GetPlateform().then((res) => {
        _this.plateList = res.data;
      });
    },
    // 切换tab
    // 页码设置为1，筛选条件不变
    changeTabs() {
      let _this = this;
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
    handleUpload(file) {
      const _this = this;
      const formData = new FormData();
      formData.append("excelFile", file);
      _this.uploadLoading = true;
      uploadLoanInfo(formData)
        .then((res) => {
          _this.uploadLoading = false;
          _this.loadData();
          _this.$Message.success({
            content: "操作成功",
            duration: 10,
            closable: true,
          });
        })
        .catch((err) => {
          _this.uploadLoading = false;
          console.log(err.response);
        });
      return false;
    },
    exportData(type) {
      let _this = this;
      let filterQuery = [];
      if (_this.filters.createTime && _this.filters.createTime != "") {
        if (_this.currentTab == "sum") {
          filterQuery.push({
            key: "createTime",
            value: dayjs(_this.filters.createTime).format("YYYY-MM-DD"),
            option: "eq",
            isAnd: "true",
          });
        } else {
          filterQuery.push({
            key: "enterTime",
            value: dayjs(_this.filters.createTime).format("YYYY-MM-DD"),
            option: "eq",
            isAnd: "true",
          });
        }
      }
      let data = {
        query: filterQuery,
      };
      this.$Spin.show();
      if (type == "list") {
        ExportAliepressList(data).then((res) => {
          const content = res;
          const blob = new Blob([content.data], {
            type: "application/vnd.ms-excel",
          });
          const fileName = "速卖通放款导入列表.xlsx";
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
          this.$Spin.hide();
        });
      } else if (type == "sum") {
        ExportSumList(data).then((res) => {
          const content = res;
          const blob = new Blob([content.data], {
            type: "application/vnd.ms-excel",
          });
          const fileName = "速卖通放款求和列表.xlsx";
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
          this.$Spin.hide();
        });
      } else if (type == "hisList") {
        ExportHistoryList(data).then((res) => {
          const content = res;
          const blob = new Blob([content.data], {
            type: "application/vnd.ms-excel",
          });
          const fileName = "速卖通放款历史求和列表.xlsx";
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
          this.$Spin.hide();
        });
      }
    },
    downTemp() {
      const elink = document.createElement("a");
      elink.download = "速卖通放款信息导入模板";
      elink.style.display = "none";
      elink.href =
        location.origin +
        "/newApi/getImportTemp?fileName=速卖通放款信息导入模板";
      document.body.appendChild(elink);
      elink.click();
      URL.revokeObjectURL(elink.href); // 释放 URL对象
      document.body.removeChild(elink);
    },
  },
  mounted() {
    this.locationUrl = location.origin;
    this.loadData();
    this.loadPlate();
  },
};
</script>

<style lang="less"></style>
