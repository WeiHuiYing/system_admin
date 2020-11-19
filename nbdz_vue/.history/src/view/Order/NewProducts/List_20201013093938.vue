/* 2020 / 10/ 07
weihuiying
新品追踪功能  */
<template>
  <div>
    <Table
      ref="tables"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
      :border="true"
      @on-selection-change="tableSelect"
      height="750"
    >
      <template slot-scope="{ row }" slot="type">
        <Select
          v-if="row.isEdit"
          v-model="row.type"
          clearable
          style="width: 150px"
        >
          <Option key="1" label="正常销售订单" value="正常销售订单"
            >正常销售订单</Option
          >
          <Option key="2" label="重发订单" value="重发订单">重发订单</Option>
          <Option key="3" label="营销单" value="营销单">营销单</Option>
          <Option key="4" label="线下单分" value="线下单分">线下单分</Option>
        </Select>
        <span v-else>{{ row.type }}</span>
      </template>
      <template slot-scope="{ row }" slot="productType">
        <Select
          v-if="row.isEdit"
          v-model="row.productType"
          clearable
          style="width: 150px"
        >
          <Option key="1" label="正常销售订单" value="正常销售订单"
            >正常销售订单</Option
          >
          <Option key="2" label="重发订单" value="重发订单">重发订单</Option>
          <Option key="3" label="营销单" value="营销单">营销单</Option>
          <Option key="4" label="线下单分" value="线下单分">线下单分</Option>
        </Select>
        <span v-else>{{ row.productType }}</span>
      </template>
      <template slot-scope="{ row }" slot="time">
        <DatePicker
          v-if="row.isEdit"
          v-model="row.time"
          type="date"
          clearable
          style="width: 200px"
        >
        </DatePicker>
        <span v-else>{{ row.time }}</span>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button
          v-if="row.isEdit"
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="saveRow(row)"
          >保存</Button
        >
        <Button
          @click="editRow(row)"
          v-else
          type="primary"
          size="small"
          style="margin-right: 5px"
          >编辑</Button
        >
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableLoading: false,
      listData: [],
      listColums: [
        {
          title: "sku",
          key: "sku",
          align: "center",
        },
        {
          title: "发网类型",
          key: "type",
          align: "center",
          slot: "type",
        },
        {
          title: "产品类型",
          key: "productType",
          align: "center",
          slot: "productType",
        },
        {
          title: "上新时间",
          key: "time",
          align: "center",
          slot: "time",
        },
        {
          title: "销量",
          key: "saleQty",
          align: "center",
        },

        {
          title: "操作",
          key: "action",
          align: "center",
          slot: "action",
        },
      ],
    };
  },
  methods: {
    tableSelect() {},
    saveRow(row) {
      const _this = this;
      this.$set(row, "isEdit", false);
    },
    editRow(row) {
      const _this = this;
      this.$set(row, "isEdit", true);
    },
  },
  mounted() {},
};
</script>