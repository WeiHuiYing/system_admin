<template>
  <div class="content-main">
    <Row style="margin-bottom: 10px">
      <Col :span="22">
        <Form ref="formInline" label-position="right" :label-width="90" inline>
          <FormItem label="日期">
            <DatePicker
              v-model="filters.Date"
              type="date"
              :options="dateOptions"
              placeholder="请选择查询日期"
              style="width: 150px"
            ></DatePicker>
          </FormItem>
          <FormItem label="员工姓名">
            <Input style="width: 150px" v-model="filters.EmployeeName" />
          </FormItem>
          <FormItem label="部门">
            <Input style="width: 150px" v-model="filters.Department" />
          </FormItem>
          <FormItem label="职位">
            <Input style="width: 150px" v-model="filters.Position" />
          </FormItem>
          <FormItem :label-width="10">
            <Button
              @click="loadData('filter')"
              class="search-btn"
              type="primary"
              style="margin-right: 10px"
            >
              搜索
            </Button>
            <Button type="primary">导出</Button>
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
import { importSalary, exportSalary, getSalary } from "@/api/human";
import dayjs from "dayjs";
export default {
  data() {
    return {
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      listColums: [
        {
          title: "员工姓名",
          key: "EmployeeName",
          align: "center",
          width: 100,
        },
        {
          title: "部门",
          key: "Department",
          align: "center",
          width: 100,
        },
        {
          title: "入职日期",
          key: "EntryDate",
          align: "center",
          width: 150,
        },
        {
          title: "变动日期",
          key: "ChangeDate",
          align: "center",
          width: 150,
        },
        {
          title: "职位",
          key: "Position",
          align: "center",
          width: 150,
        },
        {
          title: "基本工资",
          key: "BaseSalary",
          align: "center",
          width: 100,
        },
        {
          title: "缺勤天数",
          key: "AbsenceDays",
          align: "center",
          width: 100,
        },
        {
          title: "缺勤扣款",
          key: "AbsenceDeduction",
          align: "center",
          width: 100,
        },
        {
          title: "加班费",
          key: "OvertimeSalary",
          align: "center",
          width: 100,
        },
        {
          title: "工资合计1",
          key: "TotalSalary1",
          align: "center",
          width: 100,
        },
        {
          title: "全勤",
          key: "FullAttendance",
          align: "center",
          width: 100,
        },
        {
          title: "汇率",
          key: "ExchangeRate",
          align: "center",
          width: 100,
        },
        {
          title: "绩效标准",
          key: "PerformanceStandards",
          align: "center",
          width: 100,
        },
        {
          title: "月度绩效金额",
          key: "MonthlyPerformance",
          align: "center",
          width: 150,
        },
        {
          title: "营收目标",
          key: "RevenueTarget",
          align: "center",
          width: 100,
        },
        {
          title: "营收达成",
          key: "RevenueAchieved",
          align: "center",
          width: 100,
        },
        {
          title: "达成率",
          key: "AchievementRate",
          align: "center",
          width: 100,
        },
        {
          title: "净销售额",
          key: "NetSales",
          align: "center",
          width: 150,
        },
        {
          title: "提成比例",
          key: "CommissionRatio",
          align: "center",
          width: 100,
        },
        {
          title: "提成工资",
          key: "CommissionSalary",
          align: "center",
          width: 100,
        },
        {
          title: "奖励",
          key: "Reward",
          align: "center",
          width: 100,
        },
        {
          title: "利润",
          key: "Profit",
          align: "center",
          width: 100,
        },
        {
          title: "利润提成比例",
          key: "ProfitCommissionRatio",
          align: "center",
          width: 120,
        },
        {
          title: "利润提成工资",
          key: "ProfitCommissionSalary",
          align: "center",
          width: 120,
        },
        {
          title: "职称奖",
          key: "TitleAward",
          align: "center",
          width: 100,
        },
        {
          title: "其他补贴",
          key: "OtherSubsidies",
          align: "center",
          width: 100,
        },
        {
          title: "其他扣款",
          key: "OtherDeductions",
          align: "center",
          width: 100,
        },
        {
          title: "应发数",
          key: "ShouldSalary",
          align: "center",
          width: 100,
        },
        {
          title: "社保",
          key: "SocialSecurity",
          align: "center",
          width: 100,
        },
        {
          title: "公积金",
          key: "ProvidentFund",
          align: "center",
          width: 100,
        },
        {
          title: "税前工资",
          key: "GrossSalary",
          align: "center",
          width: 100,
        },
        {
          title: "现金发放",
          key: "Cash",
          align: "center",
          width: 100,
        },
        {
          title: "计税工资",
          key: "TaxableWages",
          align: "center",
          width: 100,
        },
        {
          title: "专项附加扣除",
          key: "SpecialAdditionalDeduction",
          align: "center",
          width: 120,
        },
        {
          title: "应缴个税",
          key: "PersonalTax",
          align: "center",
          width: 100,
        },
        {
          title: "税后实发工资",
          key: "SalaryAfterTax",
          align: "center",
          width: 120,
        },
        {
          title: "补发上月税款",
          key: "ReissueTaxOfLastMonth",
          align: "center",
          width: 120,
        },
        {
          title: "本月实发工资",
          key: "ActualSalary",
          align: "center",
          width: 120,
        },
        {
          title: "所属公司",
          key: "Company",
          align: "center",
          width: 150,
        },
        {
          title: "上传时间",
          key: "CreateDate",
          align: "center",
          width: 150,
        },
        {
          title: "日期",
          key: "Date",
          align: "center",
          width: 150,
        },
      ],
      listData: [],
      totalCount: 1,
      currentPage: 1,
      pageSize: 100,
      filters: {},
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
        page_num: _this.currentPage,
        page_size: _this.pageSize,
      };
      _this.tableLoading = true;
      getSalary(data)
        .then((res) => {
          _this.tableLoading = false;
          let resData = res.data;
          _this.listData = resData.results;
          _this.totalCount = resData.count;
        })
        .catch((err) => {
          _this.tableLoading = false;
          const response = err.response;
          if (response.data && response.data.detail) {
            this.$Message.error({
              content: response.data.detail,
              duration: 10,
              closable: true,
            });
          } else if (response.data) {
            let msg = "";
            Object.keys(response.data).forEach((key) => {
              msg += key + ":" + response.data[key];
            });
            this.$Message.error({
              content: msg,
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
      _this.tableLoading = true;
      _this.uploadLoading = true;
      UploadBaseMaterial(formData)
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
          const response = err.response;
          if (response.data && response.data.detail) {
            this.$Message.error({
              content: response.data.detail,
              duration: 10,
              closable: true,
            });
          } else if (response.data) {
            let msg = "";
            Object.keys(response.data).forEach((key) => {
              msg += key + ":" + response.data[key];
            });
            this.$Message.error({
              content: msg,
              duration: 10,
              closable: true,
            });
          }
        });
      return false;
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
