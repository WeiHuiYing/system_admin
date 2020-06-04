import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { formatMessage } from 'umi-plugin-react/locale';

@connect(({ Sales, loading }) => ({
  Sales,
  loading: loading.models.Sales,
}))
class SalesAnalysis extends React.Component {
  state = {
    pageCurrent: 1,
    pageSize: 1,
    filters: {
      datetimePoint: '',
      singleSku: '',
      warehouseId: '',
    },
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
    const { dispatch } = this.props;
    const { pageCurrent, pageSize, filters } = this.state;
    dispatch({
      type: 'Sales/fetchList',
      payload: {
        pageNum: 1,
        pageSize: 10,
        datetimePoint: '2020-03-16 13:46:55',
        order: {},
        query: [],
        navPropertyPaths: [],
      },
    });
  }
  handleSearch() {}
  renderSearchForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    consolelog(this.props);
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label={formatMessage({ id: 'role.field.singleSku' })}>
              {getFieldDecorator('singleSku')(
                <Input
                  placeholder={formatMessage(
                    {
                      id: 'component.placeholder.content',
                    },
                    {
                      content: formatMessage({
                        id: 'role.field.name',
                      }),
                    },
                  )}
                />,
              )}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <div style={{ overflow: 'hidden' }}>
              <span style={{ marginBottom: 24 }}>
                <Button type="primary" htmlType="submit">
                  <FormattedMessage id="component.searchList.search" />
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  <FormattedMessage id="component.searchList.reset" />
                </Button>
              </span>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      Sales: { listData, listPage },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper>
        <Table
          loading={loading}
          columns={this.columns}
          dataSource={listData}
          pagination={listPage}
        />
      </PageHeaderWrapper>
    );
  }
}

export default SalesAnalysis;
