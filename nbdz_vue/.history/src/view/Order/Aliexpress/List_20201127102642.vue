<template>
  <div class="content-main">
    <div class="search-con search-con-top">
      <Row>
        <Col :span="24">
          <Form
            ref="formInline"
            label-position="right"
            :label-width="60"
            inline
          >
            <FormItem label="时间">
              <DatePicker
                v-model="filters.createTime"
                type="date"
                :options="dateOptions"
                placeholder="请选择查询日期"
                style="width: 200px"
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Upload
                action=""
                name="excelFile"
                accept=".xls, .xlsx"
                :show-upload-list="false"
                :before-upload="handleUpload"
              >
                <Button :loading="uploadLoading">导入速卖通放款信息</Button>
              </Upload>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
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
  GetSumList,
  ExportSumList,
  uploadLoanInfo,
} from "@/api/order";
export default {
  data() {
    return {
      listColums: [
        {
          title: "平台单号",
          key: "plateformCode",
        },
        {
          title: "店铺",
          key: "storeName",
        },
        {
          title: "放款时间",
          key: "fkDATE",
          sortable: true,
        },
        {
          title: "业务类型",
          key: "fkType",
        },
        {
          title: "币种",
          key: "currency",
        },
        {
          title: "放款金额",
          key: "fkAmount",
        },
      ],
      filters: {
        createTime: "",
      },
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
    };
  },
  methods: {
    loadData() {
      const _this = this;
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: [],
      };
      AliepressList(data).then((res) => {
        console.log(res);
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
    handleUpload() {
      let _this = this;
      return false;
    },
    handleSuccess(response, file, fileList) {
      let _this = this;
      if (response.code == 200) {
        _this.listData = response.data;
        this.$Message.info({
          content: response.msg,
          duration: 10,
          closable: true,
        });
      } else {
        this.$Message.error({
          content: response.msg,
          duration: 10,
          closable: true,
        });
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less"></style>
