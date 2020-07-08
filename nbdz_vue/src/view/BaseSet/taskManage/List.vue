<template>
  <div class="content-main">
    <div class="content-header">
      <Button @click="addTask()" type="primary">添加任务</Button>
    </div>
    <Table ref="tables" height="700" :data="listData" v-bind:columns="listColums" stripe></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          :total="pageTotal"
          :current="pageCurrent"
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
    <Modal
      title="任务详情"
      :mask-closable="false"
      v-model="modelEdit"
      width="90%"
      scrollable
      footer-hide
      @on-ok="saveEdit"
    >
      <Edit ref="edit" :parent="this" :edit-row="eidtRow"></Edit>
    </Modal>
  </div>
</template>
<script>
import { GetPage, Excute, Stop, Resume, Delete } from "@/api/ResSchedule";
import Edit from "./Edit";
export default {
  data() {
    return {
      listColums: [
        {
          title: "任务名称",
          key: "jobName"
        },
        {
          title: "链接",
          key: "url",
          render: (h, params) => {
            return h(
              "a",
              {
                props: {
                  type: "person"
                }
              },
              params.row.url
            );
          }
        },
        {
          title: "任务所在DLL对应的程序集名称",
          key: "assemblyName"
        },
        {
          title: "任务组",
          key: "jobGroup"
        },
        {
          title: "任务描述",
          key: "remark"
        },
        {
          title: "创建时间",
          key: "createDate",
          sortable: true
        },
        {
          title: "开始运行时间",
          key: "beginTime",
          sortable: true
        },
        {
          title: "结束运行时间",
          key: "endTime"
        },
        {
          title: "触发器类型",
          key: "triggerType",
          render: (h, params) => {
            let triggerType = params.row.triggerType;
            let triggerTypeText = "";
            if (triggerType === 0) {
              triggerTypeText = "simple";
            } else if (triggerType === 1) {
              triggerTypeText = "cron";
            }
            return h("span", triggerTypeText);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 300,
          align: "center",
          render: (h, params) => {
            if (params.row.runStatus === 1) {
              if (params.row.jobStatus === 0) {
                return h("div", [
                  h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      style: {
                        marginRight: "5px"
                      },
                      on: {
                        click: () => {
                          this.editStatus(params);
                        }
                      }
                    },
                    "启动"
                  ),
                  h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      style: {
                        marginRight: "5px"
                      },
                      on: {
                        click: () => {
                          this.editRow(params);
                        }
                      }
                    },
                    "编辑"
                  ),
                  h(
                    "Button",
                    {
                      props: {
                        type: "error",
                        size: "small"
                      },
                      style: {
                        marginRight: "5px"
                      },
                      on: {
                        click: () => {
                          this.deleteRow(params);
                        }
                      }
                    },
                    "删除"
                  )
                ]);
              } else if (params.row.jobStatus === 1) {
                return h("div", [
                  h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      style: {
                        marginRight: "5px"
                      },
                      on: {
                        click: () => {
                          this.editStatus(params);
                        }
                      }
                    },
                    "暂停"
                  ),
                  h(
                    "Button",
                    {
                      props: {
                        type: "primary",
                        size: "small"
                      },
                      style: {
                        marginRight: "5px"
                      },
                      on: {
                        click: () => {
                          this.editRow(params);
                        }
                      }
                    },
                    "编辑"
                  ),
                  h(
                    "Button",
                    {
                      props: {
                        type: "error",
                        size: "small"
                      },
                      style: {
                        marginRight: "5px"
                      },
                      on: {
                        click: () => {
                          this.deleteRow(params);
                        }
                      }
                    },
                    "删除"
                  )
                ]);
              }
            } else {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.runStatus(params);
                      }
                    }
                  },
                  "执行"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.editRow(params);
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.deleteRow(params);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        }
      ],
      listData: [],
      pageCurrent: 1,
      pageTotal: 1,
      pageSize: 100,
      modelEdit: false,
      eidtRow: {}
    };
  },
  components: {
    Edit
  },
  methods: {
    loadData() {
      let _this = this;
      if (!_this.pageCurrent) _this.pageCurrent = 1;
      let data = {
        pageNum: _this.pageCurrent,
        pageSize: _this.pageSize,
        order: {},
        query: [],
        navPropertyPaths: []
      };
      GetPage(data)
        .then(res => {
          _this.listData = res.data.data;
          _this.pageTotal = res.data.count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    changePage(page) {
      let _this = this;
      _this.currentPage = page;
      this.loadData();
    },
    saveEdit() {
      let _this = this;
    },
    editRow(params) {
      let _this = this;
      let row = params.row;
      _this.modelEdit = true;
      _this.eidtRow = row;
    },
    addTask() {
      let _this = this;
      _this.modelEdit = true;
      _this.eidtRow = {};
    },
    editStatus(params) {
      let row = params.row;
      if (row.jobStatus === 0) {
        // 启动
        Resume(row.id)
          .then(res => {
            if (res.data.code === 200) {
              this.$Message.info(res.data.msg);
            } else {
              this.$Message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (row.jobStatus === 1) {
        // 暂停
        Stop(row.id)
          .then(res => {
            if (res.data.code === 200) {
              this.$Message.info(res.data.msg);
            } else {
              this.$Message.error(res.data.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    runStatus(params) {
      let row = params.row;
      // 执行
      Excute(row.id)
        .then(res => {
          if (res.data.code === 200) {
            this.$Message.info(res.data.msg);
          } else {
            this.$Message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteRow(params) {
      let row = params.row;
      Delete(row.id)
        .then(res => {
          if (res.data.code === 200) {
            this.$Message.info(res.data.msg);
            _this.loadData();
          } else {
            this.$Message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changePage(val) {
      let _this = this;
      _this.pageCurrent = val;
      _this.loadData();
    },
    changePageSize(size) {
      let _this = this;
      _this.pageSize = size;
      _this.loadData();
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style lang="less" scoped>
.content-main {
  .content-header {
    padding: 5px;
  }
}
</style>
