/* 2020 / 10/ 07
weihuiying
新品追踪导入  */
<template>
  <div>
    <Row class="search-con search-con-top">
      <Col :span="24">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem label="sku">
            <Input
              clearable
              v-model="filters.sku"
              placeholder="请输入sku"
            ></Input>
          </FormItem>
          <FormItem>
            <Button
              style="margin-right: 5px"
              @click="loadData('filter')"
              type="primary"
              >搜索</Button
            >
          </FormItem>
        </Form>
      </Col>
    </Row>
    <Table
      ref="tables"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
      :border="true"
      height="670"
    >
    </Table>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
          :page-size="pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
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
import { NewProductReport as getList } from "@/api/order";
import dayjs from "dayjs";
export default {
  data() {
    return {
      tableLoading: false,
      listData: [],
      pageCurrent: 1,
      pageTotal: 1,
      pageSize: 100,
      filters: {
        sku: "",
      },
      selectionList: [],
      listColums: [
        {
          title: "sku",
          key: "sku",
          align: "center",
        },
        {
          title: "发网类型",
          key: "hairNetType",
          align: "center",
        },
        {
          title: "产品类型",
          key: "productType",
          align: "center",
        },
        {
          title: "上新时间",
          key: "launchDate",
          align: "center",
        },
        {
          title: "销量",
          key: "qty",
          align: "center",
        },
      ],
    };
  },
  methods: {
    loadData(type) {
      const _this = this;
      let filterQuery = [];
      if (_this.filters.sku != "") {
        filterQuery.push({
          key: "sku",
          value: _this.filters.sku,
          option: "like",
          isAnd: "true",
        });
      }
      if (type && type == "filter") {
        _this.pageCurrent = 1;
      }
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        query: filterQuery,
      };

      _this.tableLoading = true;
      getList(data)
        .then((res) => {
          const resData = res.data;
          resData.data.forEach((item) => {
            item.importDate = dayjs(item.importDate).format("YYYY-MM-DD");
            item.launchDate = dayjs(item.launchDate).format("YYYY-MM-DD");
          });
          _this.tableLoading = false;
          _this.listData = resData.data;
          // _this.editVisible = true;
        })
        .catch((err) => {
          _this.tableLoading = false;
          console.log(err);
        });
    },

    changePageSize(val) {
      let _this = this;
      _this.pageSize = val;
      _this.loadData();
    },
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>