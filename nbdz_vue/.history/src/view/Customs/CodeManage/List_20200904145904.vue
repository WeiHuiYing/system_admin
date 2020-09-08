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
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" @click="editData(row)" style="margin-right: 5px">编辑</Button>
        <Button type="error" size="small" @click="removeData(row,index)">删除</Button>
      </template>
    </Table>
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
    };
  },
  components: {
    Detils,
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
    editData(row) {
      const _this = this;
      _this.detilsForm = JSON.parse(JSON.stringify(row));
      _this.modelDetils = true;
      console.log(row);
    },
    removeData(row, index) {
      const _this = this;
      console.log(row);
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less" scoped>
</style>