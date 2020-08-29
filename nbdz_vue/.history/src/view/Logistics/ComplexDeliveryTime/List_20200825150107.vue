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
import { ComplexDeliver as getList } from "@/api/Logistics";
import dayjs from "dayjs";
export default {
  data() {
    return {
      filters: {
        fkstart: "",
        fkend: "",
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      listData: [],
      listColumns: [
        {
          title: "发货时效",
          key: "deliveryTimeLimit",
        },
        {
          title: "占比",
          key: "deliveryTimeLimitRate",
          width: "200",
        },
      ],
      tableLoading: false,
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {};
      let filterQuery = [];
      let filterFk = _this.filtersDate(
        "fkstart",
        "fkend",
        _this.filters.fkstart,
        _this.filters.fkend
      );
      if (filterFk) {
        if (filterFk.length > 0) {
          filterQuery = filterQuery.concat(filterFk);
        }
      } else {
        return false;
      }
      data = {
        query: filterQuery,
      };
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
    filtersDate(startString, endString, startTime, endTime) {
      const _this = this;
      let filterQuery = [];
      if (startTime != "" && endTime != "") {
        endTime = dayjs(endTime).add(1, "day");
        if (!dayjs(endTime).isAfter(dayjs(startTime))) {
          this.$Message.error({
            content: "结束时间在开始时间之后",
            duration: 10,
            closable: true,
          });
          return false;
        } else {
          let Start = {
            key: startString,
            binaryop: "gte",
            value: dayjs(startTime).format("YYYY-MM-DD"),
            andorop: "and",
          };
          let End = {
            key: endString,
            binaryop: "lt",
            value: dayjs(endTime).format("YYYY-MM-DD"),
            andorop: "and",
          };
          filterQuery.push(Start);
          filterQuery.push(End);
        }
      }
      return filterQuery;
    },
    handleChangeDate() {
      const _this = this;
      if (dayjs(dayjs(_this.filters.fkstart).add(7, "day")).isAfter(dayjs())) {
        _this.filters.fkend = dayjs().format("YYYY-MM-DD");
      } else {
        _this.filters.fkend = dayjs(_this.filters.fkstart)
          .add(7, "day")
          .format("YYYY-MM-DD");
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="less" scoped>
</style>