<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="18">
        <Form ref="formInline" label-position="right" :label-width="100" inline>
          <FormItem prop="startTime" label="下单开始时间">
            <DatePicker
              v-model="filters.startTime"
              type="date"
              placeholder="请选择开始时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem prop="endTime" label="下单结束时间">
            <DatePicker
              v-model="filters.endTime"
              type="date"
              placeholder="请选择结束时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="平台">
            <Select
              @on-change="filtersPlateForm"
              multiple
              v-model="filters.plateForm"
              clearable
              style="width:200px"
            >
              <Option value="aliexpress">aliexpress</Option>
              <Option value="amazon">amazon</Option>
              <Option value="ebay">ebay</Option>
              <Option value="magento">magento</Option>
              <Option value="magento2">magento2</Option>
              <Option value="shopify">shopify</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button @click="loadData()" class="search-btn" type="primary">
              <Icon type="search" />&nbsp;&nbsp;搜索
            </Button>
          </FormItem>
        </Form>
      </Col>
      <Col :span="6">
        <Dropdown v-if="selectionList.length > 0" placement="bottom-start" @on-click="handleMenu">
          <Button type="primary">
            操作
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="export">导出</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
    </Row>
    <Table
      ref="tables"
      height="700"
      :loading="tableLoading"
      :data="listData"
      v-bind:columns="listColums"
      stripe
      :border="true"
      show-summary
      :summary-method="handleSummary"
      @on-selection-change="tableSelect"
    ></Table>
  </div>
</template>

<script>
import { GetOddMinusSale as getList } from "@/api/Analysis";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      filters: {
        startTime: "",
        endTime: "",
        plateForm: []
      },
      tableLoading: false,
      totalData: [],
      listData: [],
      listColums: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "平台",
          key: "plateForm"
        },
        {
          title: "单条订单数",
          key: "oddQty"
        },
        {
          title: "多条订单数",
          key: "minusQty"
        },
        {
          title: "总订单数",
          key: "zqty"
        },
        {
          title: "单条占比",
          key: "oddQtyRate"
        },
        {
          title: "多条占比",
          key: "minusQtyRate"
        }
      ],
      selectionList: [],
      styleList: []
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {};
      if (_this.filters.startTime !== "") {
        data.startTime = dayjs(_this.filters.startTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        data.startTime = dayjs()
          .subtract(7, "day")
          .format("YYYY-MM-DD HH:mm:ss");
        _this.filters.startTime = dayjs()
          .subtract(7, "day")
          .format("YYYY-MM-DD HH:mm:ss");
      }
      if (_this.filters.endTime !== "") {
        data.endTime = dayjs(_this.filters.endTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        data.endTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
        _this.filters.endTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      }
      if (!dayjs(data.endTime).isAfter(dayjs(data.startTime))) {
        this.$Message.error({
          content: "结束时间在开始时间之后",
          duration: 10,
          closable: true
        });
        return false;
      }
      _this.tableLoading = true;
      getList(data)
        .then(res => {
          _this.tableLoading = false;
          const resData = res.data;
          if (resData.code == 200) {
            _this.totalData = resData.data;
            if (_this.filters.plateForm.length > 0) {
              _this.filtersPlateForm();
            } else {
              _this.listData = _this.totalData;
            }
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
    filtersPlateForm() {
      let _this = this;
      if (_this.totalData.length > 0) {
        if (_this.filters.plateForm.length > 0) {
          _this.listData = _this.totalData.filter(item => {
            for (let i = 0; i < _this.filters.plateForm.length; i++) {
              if (item.plateForm == _this.filters.plateForm[i]) {
                return item;
              }
            }
          });
        } else {
          _this.listData = _this.totalData;
        }
      }
    },
    // 合并单元格
    handleSpan({ row, column, rowIndex, columnIndex }) {
      //   console.log({ row, column, rowIndex, columnIndex });
      if (columnIndex === 2) {
        return {
          rowspan: 1,
          colspan: 1
        };
      }
    },
    // 合计
    handleSummary({ columns, data }) {
      const sums = {};
      columns.forEach((column, index) => {
        const key = column.key;
        if (index === 0) {
          sums[key] = {
            key,
            value: "总计"
          };
          return;
        } else if (index === 1) {
          sums[key] = {
            key,
            value: "/"
          };
          return;
        }
        let stringType = false;
        const values = data.map(item => {
          let value = JSON.stringify(item[key]);
          stringType = value.indexOf("%") != -1;
          value = value.replace("%", "");
          value = JSON.parse(value);
          return Number(value);
        });
        if (!values.every(value => isNaN(value))) {
          let val = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (stringType) {
            val = parseFloat(val).toFixed(2) + "%";
          }
          sums[key] = {
            key,
            value: val
          };
        } else {
          sums[key] = {
            key,
            value: "/"
          };
        }
      });
      return sums;
    },
    tableSelect(selection) {
      this.selectionList = selection;
    },
    handleMenu(name) {
      if (name == "export") {
        this.exportList();
      }
    },
    exportList() {
      let _this = this;
      let titleArr = [];
      let keyArr = [];
      let columnsArr = [];
      _this.listColums
        .filter((item, index) => {
          return index != 0;
        })
        .forEach(item => {
          if (item.children) {
            item.children.forEach(child => {
              let children = {};
              children.title = item.title + "|" + child.title;
              children.key = child.key;
              columnsArr.push(children);
            });
          } else {
            columnsArr.push(item);
          }
        });
      titleArr = columnsArr.map(item => {
        return item.title;
      });
      keyArr = columnsArr.map(item => {
        return item.key;
      });
      const params = {
        title: titleArr,
        key: keyArr,
        data: this.selectionList,
        autoWidth: true,
        filename: "单条订单与多条订单对比"
      };
      excel.export_array_to_excel(params);
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
