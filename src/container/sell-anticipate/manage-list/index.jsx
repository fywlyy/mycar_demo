import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Divider, DatePicker, Form, Row, Col, Modal, Select, Table } from 'antd';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sellAnticipationAction from './manage-list-action';

const FormItem = Form.Item;
const { confirm } = Modal;
const { MonthPicker } = DatePicker;
const { Option } = Select;

const mapStateToProps = state => ({
    sellAnticipation: state.sellAnticipateList,
});

const mapPropsToAction = dispatch => ({
    sellAnticipationAction: bindActionCreators(sellAnticipationAction, dispatch),
});

@connect(mapStateToProps, mapPropsToAction)
@Form.create()
class SellAnticipate extends Component {
    static propTypes = {
        form: PropTypes.shape({
            getFieldDecorator: PropTypes.func,
            validateFields: PropTypes.func,
        }).isRequired,
        sellAnticipation: PropTypes.shape({
            queryParams: PropTypes.shape({
                pageNo: PropTypes.number,
                pageSize: PropTypes.number,
                __datesal: PropTypes.string,
                __userName: PropTypes.string,
            }),
        }).isRequired,
        sellAnticipationAction: PropTypes.shape({
            queryList: PropTypes.func,
        }).isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            custom: 1,
        };
    }

    componentDidMount() {
        const {
            __datesal, __userName, pageNo, pageSize,
        } = this.props.sellAnticipation.queryParams;

        const queryParams = {
            __datesal,
            __userName,
            pageNo,
            pageSize,
        };

        this.props.sellAnticipationAction.queryList(queryParams);
    }

    handleSubmit = (e, pagination = false) => {
        e && e.preventDefault();
        const { queryParams: { pageNo, pageSize } } = this.props.sellAnticipation;
        let pageInfo = { pageNo, pageSize };

        if (pagination) {
            pageInfo = {
                ...pageInfo,
                ...pagination,
            };
        }

        this.props.form.validateFields((err, values) => {
            const queryParams = {
                ...values,
                ...pageInfo,
            };

            if (!err) {
                this.props.sellAnticipationAction.queryList(queryParams);
            }
        });
    }

    handlePageChange = ({ current }) => {
        this.handleSubmit(null, {
            pageNo: current,
        });
    }

    handleDelete = ({ id }) => {
        confirm({
            title: `是否删除这条数据${id}`,
            onOk() {
                // 执行删除
            },
        });
    }

    render() {
        const that = this;

        const {
            form: { getFieldDecorator },
            sellAnticipation: {
                queryParams: { pageNo },
                total, items, isLoading,
            },
        } = this.props;


        const formItemLayout = {
            labelCol: {
                sm: { span: 10 },
                xl: { span: 6 },
            },
            wrapperCol: {
                sm: { span: 14 },
                xl: { span: 14 },
            },
        };

        const columns = [
            { title: '办事处', dataIndex: '__userName', key: '__userName' },
            { title: '创建人', dataIndex: '__man', key: '__man' },
            { title: '创建日期', dataIndex: '__date', key: '__date' },
            {
                title: '操作',
                dataIndex: 'opera',
                key: 'opera',
                render(first, row) {
                    const handleDeleteClosures = () => {
                        that.handleDelete(row);
                    };

                    return (
                        <span>
                            <a href="javascript:;" onClick={handleDeleteClosures}>
                                删除
                            </a>
                            <Divider type="vertical" />
                            <Link to={`/ucm/user/edit/${row.id}`}>
                                详情
                            </Link>
                        </span>
                    );
                },
            },
        ];

        const options = _.map(['jasu', 'lings'], item => (<Option key={item} value={item}>{item}</Option>));

        return (
            <div className="sell-anticipate-page">
                <Breadcrumb style={{ marginBottom: 30 }}>
                    <Breadcrumb.Item><Link to="/">B2B销售业务平台</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>销售预测管理{this.state.custom}</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Form
                        onSubmit={this.handleSubmit}
                    >
                        <Col span={8}>
                            <FormItem
                                label="预测期间"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('__datesal', {
                                    rules: [{ required: false }],
                                })(<MonthPicker style={{ width: '100%' }} placeholder="请选择月份" />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="区域办事处"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('__userName', {
                                    rules: [{ required: false }],
                                })(<Select style={{ width: '100%' }} placeholder="请选择办事处">{options}</Select>)}
                            </FormItem>
                        </Col>
                        <Col span={8} style={{ textAlign: 'right' }}>
                            <Button
                                type="primary"
                                htmlType="button"
                                onClick={this.handleSubmit}
                            >
                                搜索
                            </Button>
                        </Col>
                    </Form>
                </Row>
                <Table
                    bordered
                    columns={columns}
                    dataSource={items}
                    loading={isLoading}
                    rowKey={row => row.id}
                    onChange={this.handlePageChange}
                    pagination={{ current: pageNo, total }}
                />
            </div>
        );
    }
}

export default SellAnticipate;

