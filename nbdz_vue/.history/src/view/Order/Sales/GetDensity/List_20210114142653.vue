<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="22">
        <Form ref="formInline" label-position="right" :label-width="100" inline>
          <FormItem prop="startTime" label="付款开始时间">
            <DatePicker
              v-model="filters.startTime"
              type="date"
              :options="dateOptions"
              placeholder="请选择开始时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem prop="endTime" label="付款结束时间">
            <DatePicker
              v-model="filters.endTime"
              type="date"
              :options="dateOptions"
              placeholder="请选择结束时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem prop="plateform" label="平台">
            <Select
              v-model="filters.plateform"
              multiple
              @on-change="changePlate"
              clearable
              style="width: 200px"
            >
              <Option
                v-for="(item, index) in plateList"
                :key="index"
                :label="item"
                :value="item"
                >{{ item }}</Option
              >
            </Select>
          </FormItem>
          <FormItem prop="storename" label="店铺">
            <Select
              :disabled="
                !filters.plateform || filters.plateform == '' ? true : false
              "
              v-model="filters.storename"
              multiple
              clearable
              style="width: 200px"
            >
              <Option
                v-for="(item, index) in shopList"
                :key="index"
                :label="item"
                :value="item"
                >{{ item }}</Option
              >
            </Select>
          </FormItem>
          <FormItem label="商品款式">
            <Select
              @on-change="filtersStyle"
              v-model="filters.type"
              multiple
              clearable
              style="width: 200px"
            >
              <Option
                v-for="(item, index) in styleList"
                :key="index"
                :value="item"
                >{{ item }}</Option
              >
            </Select>
          </FormItem>
          <FormItem :label-width="10">
            <Button @click="loadData()" class="search-btn" type="primary">
              <Icon type="search" />&nbsp;&nbsp;搜索
            </Button>
          </FormItem>
        </Form>
      </Col>
      <Col :span="2">
        <Dropdown placement="bottom-start" @on-click="handleMenu">
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
      @on-selection-change="tableSelect"
    ></Table>
  </div>
</template>

<script>
import {
  GetDensity as getList,
  GetDensityStyle as getStyle,
} from "@/api/order";
import { GetShop, GetPlateform } from "@/api/public";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      filters: {
        startTime: "",
        endTime: "",
        plateform: [],
        storename: [],
        type: [],
      },
      dateOptions: {
        disabledDate(date) {
          return dayjs(date).isAfter(dayjs());
        },
      },
      tableLoading: false,
      totalData: [],
      listData: [],
      listColums: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "商品款式",
          key: "style",
          width: 100,
        },
        {
          title: "总销量",
          key: "total",
          width: 100,
          sortable: true,
        },
        {
          title: "13*4",
          align: "center",
          children: [
            {
              title: "130%销量",
              key: "density134130",
              align: "center",
              width: 150,
              sortable: true,
            },
            {
              title: "150%销量",
              key: "density134150",
              align: "center",
              width: 150,
              sortable: true,
            },
            {
              title: "180%销量",
              key: "density134180",
              align: "center",
              width: 150,
              sortable: true,
            },
          ],
        },
        {
          title: "13*6",
          align: "center",
          children: [
            /* {
              title: "130%销量",
              key: "density136130",
              align: "center",
              width: 150,
              sortable: true,
            }, */
            {
              title: "150%销量",
              key: "density136150",
              align: "center",
              width: 150,
              sortable: true,
            },
            {
              title: "180%销量",
              key: "density136180",
              align: "center",
              width: 150,
              sortable: true,
            },
            /* {
              title: "250%销量",
              key: "density136250",
              align: "center",
              width: 150,
              sortable: true,
            }, */
          ],
        },
        {
          title: "360",
          align: "center",
          children: [
            // {
            //   title: "130%销量",
            //   key: "density360130",
            //   align: "center",
            //   width: 150,
            //   sortable: true,
            // },
            {
              title: "150%销量",
              key: "density360150",
              align: "center",
              width: 150,
              sortable: true,
            },
            {
              title: "180%销量",
              key: "density360180",
              align: "center",
              width: 150,
              sortable: true,
            },
            /* {
              title: "250%销量",
              key: "density360250",
              align: "center",
              width: 150,
              sortable: true,
            }, */
          ],
        },
        {
          title: "全手织",
          align: "center",
          children: [
            /* {
              title: "130%销量",
              key: "densityHand130",
              align: "center",
              width: 150,
              sortable: true,
            }, */
            {
              title: "150%销量",
              key: "densityHand150",
              align: "center",
              width: 150,
              sortable: true,
            },
            {
              title: "180%销量",
              key: "densityHand180",
              align: "center",
              width: 150,
              sortable: true,
            },
          ],
        },
        {
          title: "4*4",
          align: "center",
          children: [
            /* {
              title: "130%销量",
              key: "density44130",
              align: "center",
              width: 150,
              sortable: true,
            }, */
            {
              title: "150%销量",
              key: "density44150",
              align: "center",
              width: 150,
              sortable: true,
            },
            {
              title: "180%销量",
              key: "density44180",
              align: "center",
              width: 150,
              sortable: true,
            },
          ],
        },
        {
          title: "机制",
          align: "center",
          children: [
            {
              title: "销量",
              key: "densityMachine",
              align: "center",
              width: 150,
              sortable: true,
            },
            /* {
              title: "130%销量",
              key: "densityMachine130",
              align: "center",
              width: 150,
              sortable: true,
            }, */
          ],
        },
        {
          title: "HD",
          key: "densityHD",
          width: 100,
          sortable: true,
          align: "center",
        },
        {
          title: "HF",
          key: "densityHF",
          width: 100,
          sortable: true,
          align: "center",
        },
        {
          title: "发缝",
          key: "densityHairLine",
          width: 100,
          sortable: true,
          align: "center",
        },
        {
          title: "Headband",
          key: "densityHeadband",
          width: 100,
          sortable: true,
          align: "center",
        },
        {
          title: "PU",
          key: "densityPU",
          width: 100,
          sortable: true,
          align: "center",
        },
        {
          title: "UPT",
          key: "densityUPT",
          width: 100,
          sortable: true,
          align: "center",
        },
        {
          title: "其他",
          key: "densityOther",
          width: 100,
          sortable: true,
          align: "center",
        },
      ],
      selectionList: [],
      styleList: [],
      shopList: [],
      plateList: [],
    };
  },
  methods: {
    loadData() {
      let _this = this;
      if (_this.filters.startTime == "") {
        _this.filters.startTime = dayjs()
          .subtract(7, "day")
          .format("YYYY-MM-DD");
      }
      if (_this.filters.endTime == "") {
        _this.filters.endTime = dayjs().format("YYYY-MM-DD");
      }
      console.log(_this.filters);
      // _this.tableLoading = true;
      // getList(data)
      //   .then((res) => {
      //     _this.tableLoading = false;
      //     const resData = res.data;
      //     if (resData.code == 200) {
      //       _this.totalData = resData.data;
      //       _this.listData = _this.totalData;
      //       _this.filtersStyle();
      //     } else {
      //       this.$Message.error({
      //         content: resData.msg,
      //         duration: 10,
      //         closable: true,
      //       });
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     const response = err.response;
      //     if (response.data && response.data.detail) {
      //       this.$Message.error({
      //         content: response.data.detail,
      //         duration: 10,
      //         closable: true,
      //       });
      //     } else if (response.data) {
      //       let msg = "";
      //       Object.keys(response.data).forEach((key) => {
      //         msg += key + ":" + response.data[key];
      //       });
      //       this.$Message.error({
      //         content: msg,
      //         duration: 10,
      //         closable: true,
      //       });
      //     }
      //   });
    },
    selectLoad() {
      let _this = this;
      let data = {};
      GetPlateform().then((res) => {
        _this.plateList = res.data;
      });
      getStyle()
        .then((res) => {
          if (res.status == 200) {
            _this.styleList = res.data;
          } else {
            this.$Message.error({
              content: res.msg,
              duration: 10,
              closable: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          const response = err.response;
          if (response.data && response.data.detail) {
            this.$Message.error({
              content: response.data.detail,
              duration: 10,
              closable: true,
            });
          } else if (response.data) {
            let msg = "";
            Object.keys(response.data).forEach((key) => {
              msg += key + ":" + response.data[key];
            });
            this.$Message.error({
              content: msg,
              duration: 10,
              closable: true,
            });
          }
        });
    },
    changePlate() {
      let _this = this;
      GetShop(_this.filters.plateform)
        .then((res) => {
          _this.shopList = res.data;
        })
        .catch((err) => {
          console.log(err);
          const response = err.response;
          if (response.data && response.data.detail) {
            this.$Message.error({
              content: response.data.detail,
              duration: 10,
              closable: true,
            });
          } else if (response.data) {
            let msg = "";
            Object.keys(response.data).forEach((key) => {
              msg += key + ":" + response.data[key];
            });
            this.$Message.error({
              content: msg,
              duration: 10,
              closable: true,
            });
          }
        });
    },
    filtersStyle() {
      let _this = this;
      if (_this.totalData.length > 0) {
        if (_this.filters.type.length > 0) {
          _this.listData = _this.totalData.filter((item) => {
            if (item.style == "占比(%)" || item.style == "合计") {
              return item;
            } else {
              for (let i = 0; i < _this.filters.type.length; i++) {
                if (item.style == _this.filters.type[i]) {
                  return item;
                }
              }
            }
          });
        } else {
          _this.listData = _this.totalData;
        }
      }
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
        .forEach((item) => {
          if (item.children) {
            item.children.forEach((child) => {
              let children = {};
              children.title = item.title + "|" + child.title;
              children.key = child.key;
              columnsArr.push(children);
            });
          } else {
            columnsArr.push(item);
          }
        });
      titleArr = columnsArr.map((item) => {
        return item.title;
      });
      keyArr = columnsArr.map((item) => {
        return item.key;
      });
      const params = {
        title: titleArr,
        key: keyArr,
        data: this.selectionList,
        autoWidth: true,
        filename: "头套产品销售明细",
      };
      excel.export_array_to_excel(params);
    },
  },
  mounted() {
    this.loadData();
    this.selectLoad();
  },
};
</script>
