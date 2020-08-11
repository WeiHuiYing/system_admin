<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="24">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem label="国家">
            <Select style="width: 200px" v-model="filters.countryname">
              <Option label="全部" value="全部"></Option>
              <Option label="美国" value="美国"></Option>
              <Option label="法国" value="法国"></Option>
              <Option label="英国" value="英国"></Option>
              <Option label="加拿大" value="加拿大"></Option>
              <Option label="德国" value="德国"></Option>
              <Option label="意大利" value="意大利"></Option>
              <Option label="比利时" value="比利时"></Option>
              <Option label="荷兰" value="荷兰"></Option>
              <Option label="南非" value="南非"></Option>
              <Option label="巴西" value="巴西"></Option>
              <Option label="西班牙" value="西班牙"></Option>
            </Select>
          </FormItem>
          <FormItem label="质量维度">
            <Select style="width: 200px" v-model="filters.countryname">
              <Option label="全部" value="全部"></Option>
              <Option label="H" value="H"></Option>
              <Option label="UV" value="UV"></Option>
              <Option label="V" value="V"></Option>
            </Select>
          </FormItem>
          <FormItem label="付款开始时间">
            <DatePicker
              v-model="filters.starttime"
              type="date"
              :options="dateOptions"
              placeholder="请选择开始时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="付款结束时间">
            <DatePicker
              v-model="filters.endtime"
              type="date"
              :options="dateOptions"
              placeholder="请选择开始时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem>
            <Button style="margin-right:5px" @click="loadFilter()" type="primary">搜索</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
    <Table ref="tables" border height="700" :data="listData" v-bind:columns="listColums" stripe></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          :total="totalCount"
          :current="currentPage"
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
  </div>
</template>

<script>
import { HairWeftBlockSaleReport as getList } from "@/api/Analysis";
import dayjs from "dayjs";
export default {
  data() {
    return {
      listColums: [
        {
          title: "总订单量",
          key: "totalOrder",
          align: "center"
        },
        {
          title: "发帘",
          align: "center",
          children: [
            {
              title: "订单量",
              key: "hairWeftOrder",
              align: "center"
            },
            {
              title: "销量占比",
              key: "hairWeftOrderRate",
              align: "center"
            }
          ]
        },
        {
          title: "发帘发块",
          align: "center",
          children: [
            {
              title: "订单量",
              key: "hairWeftBlocksOrder",
              align: "center"
            },
            {
              title: "销量占比",
              key: "hairWeftBlockesOrderRate",
              align: "center"
            }
          ]
        },
        {
          title: "发块",
          align: "center",
          children: [
            {
              title: "订单量",
              key: "hairBlocksOrder",
              align: "center"
            },
            {
              title: "销量占比",
              key: "hairBlockesOrderRate",
              align: "center"
            }
          ]
        },
        {
          title: "头套",
          align: "center",
          children: [
            {
              title: "订单量",
              key: "headGearOrder",
              align: "center"
            },
            {
              title: "销量占比",
              key: "headGearOrderRate",
              align: "center"
            }
          ]
        },
        {
          title: "混合单",
          align: "center",
          children: [
            {
              title: "订单量",
              key: "hhOrder",
              align: "center"
            },
            {
              title: "销量占比",
              key: "hhOrderRate",
              align: "center"
            }
          ]
        }
      ],
      listData: [],
      totalCount: 1,
      currentPage: 1,
      pageSize: 100,
      filters: {
        sku: ""
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        }
      }
    };
  },
  methods: {
    loadData() {
      let _this = this;
      if (!_this.currentPage) _this.currentPage = 1;
      let filtersquery = [];
      let data = {
        pageNum: _this.currentPage,
        pageSize: _this.pageSize,
        query: filtersquery
      };
      getList(data)
        .then(res => {
          let resData = res.data;
          if (resData.code == "200") {
            _this.listData = resData.data;
            _this.totalCount = resData.totalCount;
          } else {
            this.$Message.error({
              content: resData.msg,
              duration: 10,
              closable: true
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
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
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style lang="less"></style>
