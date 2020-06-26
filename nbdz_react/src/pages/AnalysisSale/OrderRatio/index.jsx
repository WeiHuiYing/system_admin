import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
const { Column, ColumnGroup } = Table;
@connect(({ orderRatio, loading }) => ({
  orderRatio,
  loading: loading.models.orderRatio,
}))
class orderRatioAnalysis extends React.Component {
  state = {
    startTime: '',
    endTime: '',
  };
  columns = [
    {
      title: formatMessage({ id: 'sale.field.rowNumber' }),
      dataIndex: 'plateForm',
      key: 'plateForm',
    },
    {
      title: formatMessage({ id: 'sale.field.warehouseDesc' }),
      dataIndex: 'warehouseDesc',
      key: 'warehouseDesc',
    },
  ];
  loadData() {
    const { dispatch } = this.props;
    const { type, startTime, endTime } = this.state;
    dispatch({
      type: 'orderRatio/fetchList',
      payload: {
        startTime: startTime,
        endTime: endTime,
      },
    });
  }
  componentWillMount() {
    this.setState(
      {
        startTime: moment()
          .subtract(7, 'days')
          .format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
      },
      () => {
        this.loadData();
      },
    );
  }
  handleSearch() {}
  renderSearchForm() {}
  render() {
    const {
      orderRatio: { listData },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper>
        <Table
          loading={loading}
          columns={this.columns}
          dataSource={listData}
          pagination={false}
          rowKey="index"
        />
      </PageHeaderWrapper>
    );
  }
}

export default orderRatioAnalysis;
