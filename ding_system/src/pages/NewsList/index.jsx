import React, { useState } from 'react';
import { Button, Row, Col, Form, Input, Card, Tag, Pagination, Modal, message } from 'antd';
import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { GetNew, deleteTypes, editNew } from '@/services/newsList';
import ArticleDetils from '@/components/NewsDetils/detils';
import CateList from '@/components/NewsDetils/cateList';
import CateDetils from '@/components/NewsDetils/cateDetils';
const { confirm } = Modal;
@connect(({ NewsModel, loading }) => ({
  NewsModel,
  loading: loading.models.NewsModel,
}))
class NewsList extends React.Component {
  state = {
    // 筛选传参类
    pageCurrent: 1,
    pageSize: 24,
    filters: {},
    // 默认新闻中心 1 龙祁文化 2
    classfiyId: 1,
    cateCurrent: '',
    statusCurrent: '1',
    // 创建编辑 新闻类
    createVisible: false,
    isAdd: false,
    editForm: {},
    // 分类  操作
    cateVisible: false,
    cateListVisible: false,
    editCate: {},
  };
  componentDidMount() {
    this.loadData();
    this.typeLoad();
  }
  typeLoad() {
    const { dispatch } = this.props;
    const { classfiyId } = this.state;
    dispatch({
      type: 'NewsModel/typeList',
      payload: {
        id: classfiyId,
      },
    });
  }
  loadData() {
    const { dispatch } = this.props;
    const { pageCurrent, pageSize, filters, cateCurrent, statusCurrent, classfiyId } = this.state;
    let filtersQuery = [];
    if (filters.author && filters.author != '') {
      filtersQuery.push({
        key: 'editer',
        binaryop: 'eq',
        value: filters.author,
        andorop: 'and',
      });
    }
    if (statusCurrent && statusCurrent != '') {
      filtersQuery.push({
        key: 'status',
        binaryop: 'eq',
        value: statusCurrent,
        andorop: 'and',
      });
    }
    

    let formData = {
      data: {
        pageNum: pageCurrent,
        pageSize: pageSize,
        query: filtersQuery,
        order: {
          columnName: "createTime",
          reverse: true
        },
      },
      classfiyid: cateCurrent,
      id: classfiyId,
    };
    dispatch({
      type: 'NewsModel/newsList',
      payload: formData,
    });
  }
  // 搜索
  handleSearch = values => {
    let filterData = {};
    if (values.author) {
      filterData.author = values.author;
    }
    this.setState(
      {
        filters: filterData,
        pageCurrent: 1,
      },
      () => {
        this.loadData();
      },
    );
  };
  // 页码切换
  sizeChange = (current, pageSize) => {
    this.setState(
      {
        pageCurrent: current,
        pageSize: pageSize,
      },
      () => {
        this.loadData();
      },
    );
  };
  changePage = pageNumber => {
    this.setState(
      {
        pageCurrent: pageNumber,
      },
      () => {
        this.loadData();
      },
    );
  };
  // 分类删除
  cateDelete = tag => {
    const tagId = tag.id;
    let _this = this;
    confirm({
      title: '确定删除该分类?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        _this.handleDeleteCate(tagId);
      },
    });
  };
  handleDeleteCate = async tagId => {
    try {
      const success = await deleteTypes(tagId);
      if (success.code == 200) {
        message.success('删除成功');
      }
      this.typeLoad();
    } catch (error) {}
  };
  // 文章删除
  handleDelete = async row => {
    try {
      row.status = '2';
      let data = {
        cateId: row.dingClassify.id,
        data: row,
      };
      const success = await editNew(data);
      if (success.code == 200) {
        message.success('删除成功');
      }
      this.loadData();
    } catch (error) {}
  };
  // 文章新建与编辑
  handleAdd = () => {
    this.setState(
      {
        isAdd: true,
        editForm: {},
      },
      () => {
        this.setState({
          createVisible: true,
        });
      },
    );
  };
  handleEdit = async row => {
    try {
      const editForm = await GetNew(row.id);
      this.setState(
        {
          isAdd: false,
          editForm: editForm.data,
        },
        () => {
          this.setState({
            createVisible: true,
            pageCurrent: 1,
          }, () => {
              this.loadData()
          });
        },
      );
    } catch (error) {}
  };
  handleModalVisible = value => {
    this.setState({
      createVisible: value,
    });
  };
  renderSearchForm() {
    let {
      NewsModel: { typeListData, newsPage },
    } = this.props;
    let { cateCurrent, pageCurrent, pageSize, statusCurrent } = this.state;
    return (
      <div className="layout-header-form">
        <Row className="layout-header-row">
          <Col span={20}>
            <Form layout="inline" onFinish={this.handleSearch}>
              <Form.Item name="author">
                <Input placeholder="请输入作者" />
              </Form.Item>
              <Form.Item shouldUpdate>
                {() => (
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                )}
              </Form.Item>
            </Form>
          </Col>
          <Col style={{ textAlign: 'right' }} span={4}>
            <Button
              type="primary"
              onClick={() => {
                this.handleAdd();
              }}
            >
              添加新闻
            </Button>
          </Col>
        </Row>
        <Row className="layout-header-row">
          <Col span={1}>状态：</Col>
          <Col span={23}>
            <Tag
              onClick={() => {
                if (statusCurrent != '1') {
                  this.setState(
                    {
                      statusCurrent: '1',
                      pageCurrent: 1,

                    },
                    () => {
                      this.loadData();
                    },
                  );
                }
              }}
              color={statusCurrent == '1' ? '#1890ff' : ''}
            >
              已发布
            </Tag>
            <Tag
              onClick={() => {
                if (statusCurrent != '0') {
                  this.setState(
                    {
                      statusCurrent: '0',
                      pageCurrent: 1,
                    },
                    () => {
                      this.loadData();
                    },
                  );
                }
              }}
              color={statusCurrent == '0' ? '#1890ff' : ''}
            >
              未发布
            </Tag>
          </Col>
        </Row>

        <Row className="layout-header-row">
          <Col span={1}>类型：</Col>
          <Col span={21}>
            <Tag
              onClick={() => {
                if (cateCurrent != '') {
                  this.setState(
                    {
                      cateCurrent: '',
                      pageCurrent: 1,
                    },
                    () => {
                      this.loadData();
                    },
                  );
                }
              }}
              color={cateCurrent == '' ? '#1890ff' : ''}
            >
              全部
            </Tag>
            {typeListData.map(tag => (
              <Tag
                onClick={() => {
                  if (cateCurrent != tag.id) {
                    this.setState(
                      {
                        cateCurrent: tag.id,
                        pageCurrent: 1,
                      },
                      () => {
                        this.loadData();
                      },
                    );
                  }
                }}
                key={tag.id}
                color={cateCurrent == tag.id ? '#1890ff' : ''}
                closable
                onClose={e => {
                  e.preventDefault();
                  this.cateDelete(tag);
                }}
              >
                {tag.name}
              </Tag>
            ))}
            <Tag
              onClick={() => {
                this.setState(
                  {
                    editCate: {},
                  },
                  () => {
                    this.setState({
                      cateVisible: true,
                    });
                  },
                );
              }}
              className="site-tag-plus"
              color="#1890ff"
            >
              <PlusOutlined />
              分类
            </Tag>
          </Col>
          <Col style={{ textAlign: 'right' }} span={2}>
            <Button
              type="primary"
              onClick={() => {
                this.setState({
                  cateListVisible: true,
                });
              }}
            >
              分类管理
            </Button>
          </Col>
        </Row>

        <div style={{ textAlign: 'right' }}>
          <Pagination
            defaultCurrent={pageCurrent}
            total={newsPage}
            defaultPageSize={pageSize}
            onShowSizeChange={this.sizeChange}
            onChange={this.changePage}
          />
        </div>
      </div>
    );
  }
  render() {
    const {
      NewsModel: { newsListData, typeListData },
    } = this.props;
    const {
      createVisible,
      editForm,
      isAdd,
      cateVisible,
      editCate,
      cateListVisible,
      classfiyId,
    } = this.state;
    return (
      <PageHeaderWrapper>
        {this.renderSearchForm()}
        <Row className="card-warp" gutter={16}>
          {newsListData.map(item => (
            <Col key={item.id} span={6}>
              <Card
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => {
                      this.handleEdit(item);
                    }}
                  />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => {
                      this.handleDelete(item);
                    }}
                  />,
                ]}
                cover={
                  item.image && item.image != '' ? (
                    <img style={{ height: '210px' }} alt="封面图" src={item.image} />
                  ) : (
                    <div style={{ height: '210px', lineHeight: '210px', textAlign: 'center' }}>
                      暂无图片
                    </div>
                  )
                }
              >
                <p className="content-title text-ellipsis-1">{item.title}</p>
                <p className="content-text text-ellipsis-2">{item.subTitle}</p>
                <Row>
                  <Col span={12}>{item.createTime}</Col>
                  <Col style={{ textAlign: 'right' }} span={12}>
                    {item.editer}
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>

        <ArticleDetils
          modalVisible={createVisible}
          editForm={editForm}
          isAdd={isAdd}
          typeList={typeListData}
          onCancel={() => {
            this.handleModalVisible(false);
          }}
          onSubmit={() => {
            this.handleModalVisible(false);
            this.loadData();
          }}
        ></ArticleDetils>
        <CateDetils
          editCate={editCate}
          classfiyId={classfiyId}
          onSubmit={() => {
            this.setState(
              {
                cateVisible: false,
              },
              () => {
                this.typeLoad();
              },
            );
          }}
          onCancel={() => {
            this.setState({
              cateVisible: false,
            });
          }}
          modalVisible={cateVisible}
        ></CateDetils>
        <CateList
          onSubmit={() => {
            this.typeLoad();
          }}
          onCancel={() => {
            this.setState({
              cateListVisible: false,
            });
          }}
          typeList={typeListData}
          classfiyId={classfiyId}
          modalVisible={cateListVisible}
        ></CateList>
      </PageHeaderWrapper>
    );
  }
}

export default NewsList;
