import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';

@connect(({ BaseSet, loading }) => ({
  BaseSet,
  loading: loading.models.BaseSet,
}))
class TaskList extends React.Component {
  state = {
    pageCurrent: 1,
    pageSize: 10,
    filters: {
      datetimePoint: '',
      singleSku: '',
      warehouseId: '',
    },
  };
  TableColumns = [
    {
      title: '任务名称',
      dataIndex: 'jobName',
      key: 'jobName',
    },
    {
      title: '链接',
      dataIndex: 'url',
      key: 'url',
      render: text => <a>{text}</a>,
    },
    {
      title: '任务所在DLL对应的程序集名称',
      dataIndex: 'assemblyName',
      key: 'assemblyName',
    },
    {
      title: '任务组',
      key: 'jobGroup',
      dataIndex: 'jobGroup',
    },
    {
      title: '任务描述',
      key: 'remark',
      dataIndex: 'remark',
    },
    {
      title: '创建时间',
      key: 'createDate',
      dataIndex: 'createDate',
    },
    {
      title: '开始运行时间',
      key: 'beginTime',
      dataIndex: 'beginTime',
    },
    {
      title: '结束运行时间',
      key: 'endTime',
      dataIndex: 'endTime',
    },
    {
      title: '触发器类型',
      key: 'triggerType',
      dataIndex: 'triggerType',
      render: (text, row, index) => {
        let triggerType = text;
        let triggerTypeText = '';
        if (triggerType === 0) {
          triggerTypeText = 'simple';
        } else if (triggerType === 1) {
          triggerTypeText = 'cron';
        }
        return <span>{triggerTypeText}</span>;
      },
    },
  ];
  componentDidMount() {
    const { dispatch } = this.props;
    const { pageCurrent, pageSize, filters } = this.state;
    dispatch({
      type: 'BaseSet/TaskList',
      payload: {
        pageNum: pageCurrent,
        pageSize: pageSize,
        order: {},
        query: [],
        navPropertyPaths: [],
      },
    });
  }
  handleSearch() {}

  render() {
    const {
      BaseSet: { taskListData },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper>
        <Table
          rowKey="id"
          loading={loading}
          columns={this.TableColumns}
          dataSource={taskListData}
        />
      </PageHeaderWrapper>
    );
  }
}

export default TaskList;
