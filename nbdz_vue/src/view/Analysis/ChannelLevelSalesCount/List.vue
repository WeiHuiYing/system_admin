<template>
  <div class="content-main">
    <Row class="search-con search-con-top">
      <Col :span="20">
        <Form ref="formInline" label-position="right" :label-width="100" inline>
          <FormItem prop="startTime" label="下单开始时间">
            <DatePicker
              v-model="filters.startTime"
              type="datetime"
              placeholder="请选择开始时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem prop="endTime" label="下单结束时间">
            <DatePicker
              v-model="filters.endTime"
              type="datetime"
              placeholder="请选择结束时间"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="商品类型">
            <Select
              @on-change="filtersTypeList"
              v-model="filters.type"
              style="width:150px"
            > 
              <Option value="发块">发块</Option>
              <Option value="发帘">发帘</Option>
              <Option value="头套">头套</Option>
            </Select>
          </FormItem>
          <FormItem label="商品分类">
            <Select
              @on-change="filtersCate"
              v-model="filters.cate"
              multiple
              clearable
              style="width:150px"
            >
              <Option v-for="(item,index) in cateList" :key="index" :value="item.cate">{{item.cate}}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button @click="loadData()" class="search-btn" type="primary">
              <Icon type="search" />&nbsp;&nbsp;搜索
            </Button>
          </FormItem>
        </Form>
      </Col>
      <Col :span="4">
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
      // :summary-method="handleSummary"
import { ChannelLevelSalesCount as getList } from "@/api/Analysis";
import dayjs from "dayjs";
import excel from "@/libs/excel";
export default {
  data() {
    return {
      filters: {
        startTime:'',
        endTime:'',
        type: '发块',
        cate:[]
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
          title: "商品分类",
          key: "saleType",
          width:150,
        },
        {
          title: "速卖通销量",
          key: "aliexpressQty",
          width:150,
        },
        {
          title: "ebay销量",
          key: "ebayQty",
          width:150,
        },
        {
          title: "亚马逊销量",
          key: "amazonQty",
          width:150,
        },
        {
          title: "自营站销量",
          key: "zyQty",
          width:150,
        },
        {
          title: "shopify销量",
          key: "shopifyQty",
          width:150,
        },
        {
          title: "其他平台销量",
          key: "otherQty",
          width:150,
        },
        {
          title: "平台销量合计",
          key: "zQty",
          width:150,
        },
        {
          title:"自营站",
          align:"center",
          children:[
            {
              title: "africanmall销量",
              key: "africanmallQty",
              width:150,
            },
            {
              title: "juliamall销量",
              key: "juliahairQty",
              width:150,
            },
            {
              title: "nadulamall销量",
              key: "nadulamallQty",
              width:150,
            },
            {
              title: "unicemall销量",
              key: "unicemallQty",
              width:150,
            },
            {
              title: "bfmall销量",
              key: "bfmallQty",
              width:150,
            },
            {
              title: "其他销量",
              key: "zyItemQty",
              width:150,
            }
          ]
        }
      ],
      selectionList: [],
      typeList: [
        {
          type:"发块",
          children:[
            {
              cate:'生发发块'
            },{
              cate:'压色发块'
            },{
              cate:'辫发发块'
            }
          ]
        },
        {
          type:"发帘",
          children:[
            {
              cate:'生发发帘(不含新幅度）'
            },{
              cate:'生发新幅度发帘'
            },{
              cate:'压色发帘'
            },{
              cate:'辫发发帘'
            }
          ]
        },
        {
          type:"头套",
          children:[
            {
              cate:'头套'
            }
          ]
        }
      ],
      cateList:[]
    };
  },
  methods: {
    loadData() {
      let _this = this;
      let data = {
        type:_this.filters.type
      };
      if (_this.filters.startTime !== "") {
        data.startTime = dayjs(_this.filters.startTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        data.startTime = dayjs().subtract(7, 'day').format(
          "YYYY-MM-DD HH:mm:ss"
        );
        _this.filters.startTime = dayjs().subtract(7, 'day').format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      if (_this.filters.endTime !== "") {
        data.endTime = dayjs(_this.filters.endTime).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      } else {
        data.endTime = dayjs().format(
          "YYYY-MM-DD HH:mm:ss"
        );
        _this.filters.endTime = dayjs().format(
          "YYYY-MM-DD HH:mm:ss"
        );
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
            if (_this.filters.cate.length > 0) {
              _this.filtersCate();
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
    filtersTypeList() {
      let _this = this;
      _this.typeList.forEach(item => {
        if(item.type == _this.filters.type){
          _this.cateList = item.children
        }
      })
    },
    filtersCate(){
      let _this = this;
      if (_this.totalData.length > 0) {
        if (_this.filters.cate.length > 0) {
          _this.listData = _this.totalData.filter(item => {
            for (let i = 0; i < _this.filters.cate.length; i++) {
              if (item.saleType == _this.filters.cate[i]) {
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
      _this.listColums.filter((item, index) => { return index != 0; }).forEach(item => {
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
        return item.title
      })
      keyArr = columnsArr.map(item => {
        return item.key
      })
      const params = {
        title: titleArr,
        key: keyArr,
        data: this.selectionList,
        autoWidth: true,
        filename: "各店铺各等级产品销量汇总"
      };
      excel.export_array_to_excel(params);
    }
  },
  mounted(){
    this.loadData()
    this.filtersTypeList()
  }
};
</script>
