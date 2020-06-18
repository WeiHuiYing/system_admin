import React from 'react';
import { Table, Form, Button, Input, Select, DatePicker, notification } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
const { Option } = Select;

import { GetProductCategoryList as getCategory } from '@/services/selectList.js';

@connect(({ SalesTotal, loading }) => ({
  SalesTotal,
  loading: loading.models.SalesTotal,
}))
class SalesTotalAnalysis extends React.Component {
  state = {
    startTime: '',
    endTime: '',
    cateList: [],
    type: [],
    columnsData: [],
  };
  columns = [
    {
      title: formatMessage({ id: 'sale.field.productCategory' }),
      dataIndex: 'productCategory',
      key: 'productCategory',
    },
    {
      title: formatMessage({ id: 'sale.field.saleQty' }),
      dataIndex: 'saleQty',
      key: 'saleQty',
    },
  ];
  componentWillMount() {
    const {
      SalesTotal: { listData },
    } = this.props;

    this.setState(
      {
        startTime: moment()
          .subtract(7, 'days')
          .format('YYYY-MM-DD'),
        endTime: moment().format('YYYY-MM-DD'),
        columnsData: listData,
      },
      () => {
        this.loadData();
      },
    );
    this.loadCate();
  }
  loadData() {
    const { dispatch } = this.props;
    const { startTime, endTime, type } = this.state;

    dispatch({
      type: 'SalesTotal/fetchList',
      payload: {
        startTime: startTime,
        endTime: endTime,
      },
    });
  }
  loadCate = async () => {
    try {
      const success = await getCategory();
      if (success.code === 200) {
        this.setState({
          cateList: success.data,
        });
      } else {
        notification.error({
          message: success.msg,
        });
      }
    } catch (error) {}
  };
  handleSearch() {}
  renderSearchForm() {
    return (
      <div className="layout-header-form">
        <Form
          onFinish={values => {
            this.loadData();
          }}
          layout="inline"
        >
          <Form.Item label={formatMessage({ id: 'sale.field.startTime' })} name="startTime">
            <DatePicker
              value={this.state.startTime ? this.state.startTime : ''}
              format="YYYY-MM-DD"
              onChange={(value, text) => {
                this.setState({
                  startTime: text,
                });
              }}
            />
          </Form.Item>
          <Form.Item label={formatMessage({ id: 'sale.field.endTime' })} name="endTime">
            <DatePicker
              value={this.state.endTime ? this.state.endTime : ''}
              format="YYYY-MM-DD"
              onChange={(value, text) => {
                this.setState({
                  endTime: text,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label={formatMessage({ id: 'sale.field.productCategory' })}
            name="productCategory"
          >
            <Select
              value={this.state.type ? this.state.type : []}
              style={{
                width: 200,
              }}
              placeholder="请选择商品类型"
              mode="multiple"
              onChange={(value, text) => {
                this.setState({
                  type: value,
                });
              }}
            >
              {this.state.cateList.map((item, index) => (
                <Option key={index}>{item}</Option>
              ))}
            </Select>
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
      SalesTotal: { listData },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper>
        {this.renderSearchForm()}
        <Table
          rowKey="index"
          pagination={false}
          loading={loading}
          columns={this.columns}
          dataSource={listData}
        />
      </PageHeaderWrapper>
    );
  }
}

export default SalesTotalAnalysis;
