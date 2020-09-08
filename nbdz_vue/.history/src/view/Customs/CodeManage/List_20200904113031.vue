/* 2020 / 08/ 24
weihuiying
综合站发货时效报表  */
<template>
  <div class="content-main">
    <div style="margin:10px 0" class="search-con search-con-top">
      <Row>
        <Col :span="24">
          <Form ref="formInline" label-position="right" :label-width="100" inline>
            <FormItem prop="fkstart" label="付款开始时间">
              <DatePicker
                v-model="filters.fkstart"
                type="date"
                :options="dateOptions"
                placeholder="请选择开始时间"
                style="width: 200px"
                @on-change="handleChangeDate()"
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem prop="fkend" label="付款结束时间">
              <DatePicker
                v-model="filters.fkend"
                type="date"
                :options="dateOptions"
                placeholder="请选择结束时间"
                style="width: 200px"
                disabled
                clearable
              ></DatePicker>
            </FormItem>
            <FormItem>
              <Button
                @click="loadData()"
                style="margin-right:5px"
                class="search-btn"
                type="primary"
              >搜索</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
    <Table
      height="700"
      ref="tables"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColumns"
      stripe
    ></Table>
  </div>
</template>

<script>
import { hsCode as getList } from "@/api/Customs";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listData: [],
      listColumns: [],
      tableLoading: false,
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {};
      data = {};
      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          const resData = res.data;
          _this.tableLoading = false;
          if (resData.code == 200) {
            _this.listData = resData.data;
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
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less" scoped>
</style>