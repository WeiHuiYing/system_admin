import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
const { Column, ColumnGroup } = Table;
@connect(({ weavingBlock, loading }) => ({
  weavingBlock,
  loading: loading.models.weavingBlock,
}))
class weavingBlockAnalysis extends React.Component {
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
      type: 'weavingBlock/fetchList',
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
      weavingBlock: { listData },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper>
        <Table loading={loading} dataSource={listData} pagination={false} rowKey="index">
          <Column title="尺寸" dataIndex="size" key="size" />
          <Column title="总销量" dataIndex="total" key="total" />
          <Column title="单尺寸销量" dataIndex="sizeTotal" key="sizeTotal" />
          <Column title="尺寸总占比" dataIndex="sizeTotalRatio" key="sizeTotalRatio" />
          <ColumnGroup title="速卖通">
            <Column title="销量" dataIndex="aliSizeTotal" key="aliSizeTotal" />
            <Column title="占比" dataIndex="aliSizeTotalRatio" key="aliSizeTotalRatio" />
          </ColumnGroup>
          <ColumnGroup title="亚马逊">
            <Column title="销量" dataIndex="amazSizeTotal" key="amazSizeTotal" />
            <Column title="占比" dataIndex="amazSizeTotalRatio" key="amazSizeTotalRatio" />
          </ColumnGroup>
          <ColumnGroup title="自营站">
            <Column title="销量" dataIndex="magentoSizeTotal" key="magentoSizeTotal" />
            <Column title="占比" dataIndex="magentoSizeTotalRatio" key="magentoSizeTotalRatio" />
          </ColumnGroup>
          <ColumnGroup title="SHOPIFY">
            <Column title="销量" dataIndex="shopifySizeTotal" key="shopifySizeTotal" />
            <Column title="占比" dataIndex="shopifySizeTotalRatio" key="shopifySizeTotalRatio" />
          </ColumnGroup>
          <ColumnGroup title="ebay平台">
            <Column title="销量" dataIndex="ebaySizeTotal" key="ebaySizeTotal" />
            <Column title="占比" dataIndex="ebaySizeTotalRatio" key="ebaySizeTotalRatio" />
          </ColumnGroup>
        </Table>
      </PageHeaderWrapper>
    );
  }
}

export default weavingBlockAnalysis;
