<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="22">
        <Form ref="formInline" label-position="right" :label-width="120" inline>
          <FormItem label="搜索内容">
            <Input
              clearable
              v-model="filters.shipping_ids"
              placeholder="请输入搜索内容"
              :autofocus="false"
              @on-focus="onFocus()"
            ></Input>
          </FormItem>
          <FormItem>
            <Button
              style="margin-right: 5px"
              @click="loadFilter()"
              type="primary"
              >搜索</Button
            >
          </FormItem>
        </Form>
      </Col>
      <Col :span="2">
        <Button type="primary">导出</Button>
      </Col>
    </Row>
    <Table
      :loading="loading"
      ref="tables"
      height="700"
      :data="listData"
      v-bind:columns="listColums"
      stripe
    ></Table>
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
    <Modal
      title="筛选"
      :mask-closable="false"
      v-model="modelFilters"
      width="90%"
      scrollable
      footer-hide
    >
      <Form
        style="width: 60%; margin: 0 auto"
        label-position="right"
        :label-width="150"
      >
        <FormItem label="搜索内容">
          <Input
            v-model="filters.shipping_id"
            type="textarea"
            :rows="4"
            placeholder="请输入要搜索的单号"
          />
        </FormItem>
        <div style="text-align: right">
          <Button @click="filtersLoad()" class="search-btn" type="primary"
            >搜索</Button
          >
        </div>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { batchOrder as getList } from "@/api/Logistics";
import store from "@/store";
export default {
  data() {
    return {
      listColums: [
        {
          width: 50,
          type: "expand",
          key: "LogisticsDetails",
          render(h, params) {
            return h("div", {
              domProps: {
                innerHTML: params.row.LogisticsDetails,
              },
            });
          },
        },
        {
          title: "跟踪号",
          key: "ShippingMethodNo",
          align: "center",
        },
        {
          title: "平台发货时间",
          key: "PlatformShipTime",
          align: "center",
        },
        {
          title: "物流状态",
          key: "DeliveredStatus",
          align: "center",
        },
      ],
      listData: [],
      totalCount: 1,
      currentPage: 1,
      pageSize: 100,
      filters: {
        shipping_ids: "",
        shipping_id: "",
      },
      loading: false,
      modelFilters: false,
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        page: _this.currentPage,
        page_size: _this.pageSize,
        shipping_ids: _this.filters.shipping_ids,
      };
      _this.loading = true;
      getList(data)
        .then((res) => {
          _this.loading = false;
          _this.listData = res.data.results;
          _this.totalCount = res.data.count;
        })
        .catch((err) => {
          _this.loading = false;
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
    },
    onFocus() {
      const _this = this;
      _this.modelFilters = true;
    },
    filtersLoad() {
      const _this = this;
      _this.filters.shipping_ids = _this.filters.shipping_id.replace(
        /[\r\n]/g,
        ","
      );
      _this.modelFilters = false;
      _this.loadData();
    },
  },
  mounted() {},
};
</script>

<style lang="less"></style>
