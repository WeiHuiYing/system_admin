import React from 'react';
import { Table, Form, Row, Col, Button, Input, Select, DatePicker, notification } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import { GetList as getWare } from '@/services/selectList.js';
const { Option } = Select;
@connect(({ Sales, loading }) => ({
  Sales,
  loading: loading.models.Sales,
}))
class SalesAnalysis extends React.Component {
  state = {
    pageCurrent: 1,
    pageSize: 100,
    datetimePoint: '',
    singleSku: '',
    warehouseId: '',
    wareList: [],
  };
  columns = [
    {
      title: formatMessage({ id: 'sale.field.rowNumber' }),
      dataIndex: 'rowNumber',
      key: 'rowNumber',
    },
    {
      title: formatMessage({ id: 'sale.field.warehouseDesc' }),
      dataIndex: 'warehouseDesc',
      key: 'warehouseDesc',
    },
    {
      title: formatMessage({ id: 'sale.field.singleSku' }),
      dataIndex: 'singleSku',
      key: 'singleSku',
    },
    {
      title: formatMessage({ id: 'sale.field.threeDaysSales' }),
      dataIndex: 'threeDaysSales',
      key: 'threeDaysSales',
    },
    {
      title: formatMessage({ id: 'sale.field.sevenDaysSales' }),
      dataIndex: 'sevenDaysSales',
      key: 'sevenDaysSales',
    },
    {
      title: formatMessage({ id: 'sale.field.forteenDaysSales' }),
      dataIndex: 'forteenDaysSales',
      key: 'forteenDaysSales',
    },
    {
      title: formatMessage({ id: 'sale.field.thirtyDaysSales' }),
      dataIndex: 'thirtyDaysSales',
      key: 'thirtyDaysSales',
    },
  ];

  componentDidMount() {
    this.loadWare();
  }
  loadData() {
    const { dispatch } = this.props;
    const { pageCurrent, pageSize, datetimePoint, singleSku, warehouseId } = this.state;
    if (datetimePoint != '') {
      let filtersQuery = [];
      if (singleSku != '') {
        filtersQuery.push({
          key: 'singleSku',
          binaryop: 'like',
          value: singleSku,
          andorop: 'and',
        });
      }
      if (warehouseId != '') {
        filtersQuery.push({
          key: 'warehouseId',
          binaryop: 'eq',
          value: warehouseId,
          andorop: 'and',
        });
      }
      dispatch({
        type: 'Sales/fetchList',
        payload: {
          pageNum: pageCurrent,
          pageSize: pageSize,
          datetimePoint: datetimePoint,
          query: filtersQuery,
        },
      });
    } else {
      notification.error({
        message: `请选择查询时间`,
      });
    }
  }
  loadWare = async () => {
    try {
      const success = await getWare({});
      if (success.code === 200) {
        this.setState({
          wareList: success.data,
        });
      }
    } catch (error) {}
  };
  sizeChange = (page, pageSize) => {
    this.setState(
      {
        pageCurrent: page,
        pageSize: pageSize,
      },
      () => {
        this.loadData();
      },
    );
  };
  changePage = (current, size) => {
    this.setState(
      {
        pageCurrent: current,
        pageSize: size,
      },
      () => {
        this.loadData();
      },
    );
  };
  renderSearchForm() {
    return (
      <div className="layout-header-form">
        <Form
          onFinish={values => {
            this.loadData();
          }}
          layout="inline"
        >
          <Form.Item label={formatMessage({ id: 'sale.field.singleSku' })} name="singleSku">
            <Input
              value={this.state.singleSku ? this.state.singleSku : ''}
              onChange={e => {
                const { value } = e.target;
                this.setState({
                  singleSku: value,
                });
              }}
              placeholder="请输入要搜索的sku"
            />
          </Form.Item>
          <Form.Item label={formatMessage({ id: 'sale.field.warehouseDesc' })} name="warehouseId">
            <Select
              value={this.state.warehouseId ? this.state.warehouseId : ''}
              style={{
                width: 200,
              }}
              placeholder="请选择仓库"
              onChange={(value, text) => {
                this.setState({
                  warehouseId: value,
                });
              }}
            >
              {this.state.wareList.map(item => (
                <Option key={item.warehouseId}>{item.warehouseCode}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label={formatMessage({ id: 'sale.field.filterTime' })} name="datetimePoint">
            <DatePicker
              value={this.state.datetimePoint ? this.state.datetimePoint : ''}
              format="YYYY-MM-DD"
              onChange={(value, text) => {
                this.setState({
                  datetimePoint: text,
                });
              }}
            />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }

  render() {
    const {
      Sales: { listData, listPage },
      loading,
    } = this.props;
    const { pageCurrent, pageSize } = this.state;
    return (
      <PageHeaderWrapper>
        {this.renderSearchForm()}
        <Table
          rowKey="rowNumber"
          loading={loading}
          columns={this.columns}
          dataSource={listData}
          pagination={{
            total: listPage,
            current: pageCurrent,
            pageSize: pageSize,
            onShowSizeChange: this.sizeChange,
            onChange: this.changePage,
          }}
        />
      </PageHeaderWrapper>
    );
  }
}

export default SalesAnalysis;
