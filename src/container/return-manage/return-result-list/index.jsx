/**
 * this is a returnResultList page
 * */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Input, Button, Select, Table, Row, Col } from 'antd';
import * as returnResultListAction from './return-result-list-action';
import contentTitle from '../../component/content-title/ContentTitle';

const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
};

const mapStateToProps = state => ({
    returnResultList: state.returnResultList,
});
const mapPropsToAction = dispatch => ({
    returnResultListAction: bindActionCreators(returnResultListAction, dispatch),
});

@connect(mapStateToProps, mapPropsToAction)
class returnResultList extends React.Component {
    static propTypes = {
        form: PropTypes.shape().isRequired,
        returnResultList: PropTypes.shape({
            index: PropTypes.number,
        }).isRequired,
        returnResultListAction: PropTypes.shape({
            add: PropTypes.func,
            omsPager: PropTypes.func,
            saveOms: PropTypes.func,
        }).isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const {
            returnResultList: { params },
            returnResultListAction: { searchReturnResultList },
        } = this.props;

        searchReturnResultList(params);
    }

    handleSearch = () => {
        const {
            form: { validateFields },
            returnResultList: { params },
            returnResultListAction: { searchReturnResultList },
        } = this.props;

        validateFields((err, fieldsValue) => {
            if (err) {
                return false;
            }

            const newParams = {
                ...params,
                pageNo: 1,
                ...fieldsValue,
            };

            searchReturnResultList(newParams);
            return false;
        });
    }

    handleChange = (pagination) => {
        const {
            returnResultList: { params },
            returnResultListAction: { searchReturnResultList },
        } = this.props;
        const { current } = pagination;

        searchReturnResultList({ ...params, pageNo: current });
    }

    render() {
        const {
            form: { getFieldDecorator },
            returnResultList: {
                params,
                returnResultListData,
                total,
                isRequesting,
            },
        } = this.props;

        const pagination = {
            current: params.pageNo,
            pageSize: params.pageSize,
            total,
        };

        const listColumn = [
            {
                title: '退货单号',
                dataIndex: 'returnOrder',
                key: 'returnOrder',
            },
            {
                title: '制单人',
                dataIndex: 'person',
                key: 'person',
            },
            {
                title: '单据状态',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '关联订单',
                dataIndex: 'assOrder',
                key: 'assOrder',
            },
            {
                title: '创建日期',
                dataIndex: 'date',
                key: 'date',
            },
            {
                title: '处理意见',
                dataIndex: 'opinion',
                key: 'opinion',
            },
            {
                title: '操作',
                dataIndex: 'operations',
                key: 'operations',
                render: () => {
                    return (<span><a href="javascript:void(0);">详情</a></span>);
                },
            },
        ];

        return (
            <Row>
                {contentTitle([{ to: '', text: 'B2B销售业务平台' }, { to: '', text: '退货处理结果管理' }])}
                <Form layout="horizontal">
                    <Row style={{ marginTop: 25 }}>
                        <Col span="6">
                            <FormItem {...formItemLayout} label="退货单号">
                                {getFieldDecorator('returnOrder')(<Input placeholder="请输入退货单号" />)}
                            </FormItem>
                        </Col>
                        <Col span="6" offset="3">
                            <FormItem {...formItemLayout} label="单据状态">
                                {getFieldDecorator('status', {
                                    initialValue: '',
                                })(<Select>
                                    <Option value="">请选择</Option>
                                    <Option value="1">状态1</Option>
                                    <Option value="2">状态2</Option>
                                    <Option value="3">状态3</Option>
                                </Select>)}
                            </FormItem>
                        </Col>
                        <Col span="6" offset="3" style={{ textAlign: 'right' }}>
                            <Button type="primary" onClick={this.handleSearch}>查询</Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Table
                        loading={isRequesting}
                        pagination={pagination}
                        dataSource={returnResultListData}
                        columns={listColumn}
                        onChange={this.handleChange} />
                </Row>
            </Row>
        );
    }
}

const WrappedReturnResultList = Form.create()(returnResultList);

export default WrappedReturnResultList;
