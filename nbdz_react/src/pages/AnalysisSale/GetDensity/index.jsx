import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
const { Column, ColumnGroup } = Table;
@connect(({ GetDensity, loading }) => ({
  GetDensity,
  loading: loading.models.GetDensity,
}))
class GetDensityAnalysis extends React.Component {
  state = {
    startTime: '',
    endTime: '',
    type: '发帘',
  };
  columns = [];
  loadData() {
    const { dispatch } = this.props;
    const { type, startTime, endTime } = this.state;
    dispatch({
      type: 'GetDensity/fetchList',
      payload: {
        startTime: startTime,
        endTime: endTime,
        type: type,
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
      GetDensity: { listData },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper>
        <Table loading={loading} dataSource={listData} pagination={false} rowKey="index">
          <Column title="商品款式" dataIndex="style" key="style" />
          <Column title="总销量" dataIndex="total" key="total" />
          <ColumnGroup title="13*4">
            <Column title="130%销量" dataIndex="density134130Total" key="density134130Total" />
            <Column title="150%销量" dataIndex="density134150Total" key="density134150Total" />
            <Column title="180%销量" dataIndex="density134150Total" key="density134150Total" />
          </ColumnGroup>
          <ColumnGroup title="13*6">
            <Column title="130%销量" dataIndex="density136130Total" key="density136130Total" />
            <Column title="150%销量" dataIndex="density136150Total" key="density136150Total" />
            <Column title="180%销量" dataIndex="density136180Total" key="density136180Total" />
            <Column title="250%销量" dataIndex="density136250Total" key="density136250Total" />
          </ColumnGroup>
          <ColumnGroup title="360">
            <Column title="130%销量" dataIndex="density360130Total" key="density360130Total" />
            <Column title="150%销量" dataIndex="density360150Total" key="density360150Total" />
            <Column title="180%销量" dataIndex="density360180Total" key="density360180Total" />
            <Column title="250%销量" dataIndex="density360250Total" key="density360250Total" />
          </ColumnGroup>
          <ColumnGroup title="全手织">
            <Column title="130%销量" dataIndex="densityHand130Total" key="densityHand130Total" />
            <Column title="150%销量" dataIndex="densityHand150Total" key="densityHand150Total" />
            <Column title="180%销量" dataIndex="densityHand180Total" key="densityHand180Total" />
          </ColumnGroup>
          <ColumnGroup title="4*4">
            <Column title="130%销量" dataIndex="density44130Total" key="density44130Total" />
            <Column title="150%销量" dataIndex="density44150Total" key="density44150Total" />
            <Column title="180%销量" dataIndex="density44180Total" key="density44180Total" />
          </ColumnGroup>
          <ColumnGroup title="机制">
            <Column title="销量" dataIndex="densityMachineTotal" key="densityMachineTotal" />
            <Column
              title="130%销量"
              dataIndex="densityMachine130Total"
              key="densityMachine130Total"
            />
          </ColumnGroup>
        </Table>
      </PageHeaderWrapper>
    );
  }
}

export default GetDensityAnalysis;
