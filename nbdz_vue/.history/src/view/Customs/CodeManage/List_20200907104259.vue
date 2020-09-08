/* 2020 / 09/ 04
weihuiying
海关编码维护  */
<template>
  <div class="content-main">
    <div style="margin:10px 0" class="search-con search-con-top">
      <Row>
        <Col :span="22">
        <Form ref="formInline" label-position="right" :label-width="100" inline>
          <FormItem prop="HsCode" label="海关编码">
            <Input v-model="filters.HsCode"/>
          </FormItem>
          <FormItem prop="ReportName" label="申报中文名">
            <Input v-model="filters.ReportName"/>
          </FormItem>
          <FormItem prop="ReportEnName" label="申报英文名">
            <Input v-model="filters.ReportEnName"/>
          </FormItem>
          <FormItem>
            <Button @click="loadData('filter')" class="search-btn" type="primary">
              <Icon type="search" />&nbsp;&nbsp;搜索
            </Button>
          </FormItem>
        </Form>
        </Col>
        <Col :span="2">
          <Button type="primary" @click="AddData()">创建</Button>
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
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" @click="editData(row)" style="margin-right: 5px">编辑</Button>
        <Button type="error" size="small" @click="removeData(row,index)">删除</Button>
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
    <Modal
      title="详情"
      :mask-closable="false"
      v-model="modelDetils"
      width="90%"
      scrollable
      footer-hide
    >
      <Detils ref="detils" :parent="this" :detils-row="detilsForm"></Detils>
    </Modal>
  </div>
</template>

<script>
import { hsCode as getList } from "@/api/Customs";
import dayjs from "dayjs";
import Detils from "./components/Detils";
export default {
  data() {
    return {
      listData: [],
      filters:{},
      listColumns: [
        {
          title: "海关编码",
          key: "HsCode",
          align: "center",
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
      tableLoading: false,
      detilsForm: {},
      modelDetils: false,
      pageTotal: 1,
      pageCurrent: 1,
      pageSize: 100,
    };
  },
  components: {
    Detils,
  },
  methods: {
    loadData() {
      let _this = this;
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
          console.log(err);
        });
    },
    editData(row) {
      const _this = this;
      _this.detilsForm = JSON.parse(JSON.stringify(row));
      _this.modelDetils = true;
      console.log(row);
    },
    AddData(){
      const _this = this;
      _this.detilsForm = {};
      _this.modelDetils = true;
    },
    removeData(row, index) {
      const _this = this;
      console.log(row);
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
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less" scoped>
</style>