/* 2020 / 09/ 04
weihuiying
海关编码维护  */
<template>
  <div class="content-main">
    <div style="margin:10px 0" class="search-con search-con-top">
      <Row>
        <Col :span="24"></Col>
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
      <template slot-scope="{ row, index }" slot="HsCode">
        <Select
          v-if="row.isEdit"
          v-model="row.HsCode"
          filterable
          remote
          placeholder="请输入海关编码关键字"
          clearable
          :remote-method="filterHsCode"
          :loading="HsCodeLoading">
          :on-change="HsCodeChange"
            <Option v-for="(option, index) in HsCodeList" :value="option.HsCode" :key="index">{{option.HsCode}}</Option>
        </Select>
        <span v-else>{{row.HsCode}}</span>
      </template>
      <template slot-scope="{ row ,index}" slot="action">
        <Button type="primary" size="small" @click="editData(row,index)" style="margin-right: 5px">编辑</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import { productCode as getList,hsCode as getCodeList  } from "@/api/Customs";
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
          slot:"HsCode"
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
      HsCodeList:[],
      HsCodeLoading:false,
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {};
      data = {};
      _this.tableLoading = true;
      getList(data, "Get")
        .then((res) => {
          console.log(res);
          const resData = res.data;
          _this.tableLoading = false;
          if (res.status == 200) {
            _this.listData = resData.results;
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
    editData(row,index) {
      const _this = this;
      row.isEdit = true;
      this.$set(this.listData, index, row);
    },
    removeData(row) {
      const _this = this;
      console.log(row);
    },
    filterHsCode(val){
      const _this = this;
      let data = {
        search:val
      }
      _this.HsCodeLoading = true;
      getCodeList(data,"Get").then(res=>{
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
      }).catch(err=>{
        console.log(err)
      })
    },
    HsCodeChange(val){
      console.log(val)
    }
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less" scoped>
</style>