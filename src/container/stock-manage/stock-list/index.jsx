/**
 * @name stock-list/index
 *
 * @author yangliu at 2018/08/13
 *
 * @desc stock manage
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listAction from './list-action';
import { Spin, Table, Row, Col, Button, Form, AutoComplete, Modal, Input, Popconfirm } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import contentTitle from '../../component/content-title/ContentTitle';
import './index.scss';

const mapStateToProps = state => ({
    states: state.stockList,
});
const mapPropsToAction = dispatch => ({
    actions: bindActionCreators(listAction, dispatch),
});

@connect(mapStateToProps, mapPropsToAction)
@injectIntl
export default class StockList extends React.Component {
    static propTypes = {
        states: PropTypes.shape({
            tableList: PropTypes.array,
            total: PropTypes.number,
            searchParams: PropTypes.object,
        }).isRequired,
        actions: PropTypes.shape({
            initial: PropTypes.func,
            willUnmount: PropTypes.func,
            // demoPager: PropTypes.func,
            // demoSave: PropTypes.func,
        }).isRequired,
        intl: PropTypes.shape({
            formatMessage: PropTypes.func,
        }).isRequired,
    }
    //   constructor(props) {
    //   }
    componentDidMount() {
        console.log(this.props.states,'inintin-state')
        this.props.actions.initial();
        this.props.actions.willUnmount();
    }
    componentWillUnmount() {
        this.props.actions.willUnmount();
    }
    // 渲染查询
    renderSearch = () => {
        const { actions, intl } = this.props;
        const { formatMessage } = intl;
        const FormItem = Form.Item;
        const formItemLayout = {
            labelCol: {
                xs: { span: 8 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 8 },
                sm: { span: 4 },
            },
        };
        return (
            <Form className="search_form">
                <Row className="search" gutter={24}>
                    <Col span={6}>
                        <FormItem label={formatMessage({ id: 'warehouse' })} >
                            <Input
                                placeholder={formatMessage({ id: 'warehouse_placeholder' })}
                                onChange={(e) => {
                                    actions.setSearchParams({ warehouse: e.target.value });
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label={formatMessage({ id: 'sku_code' })} >
                            <Input
                                placeholder={formatMessage({ id: 'sku_code_placeholder' })}
                                onChange={(e) => {
                                    actions.setSearchParams({ skuCode: e.target.value });
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label={formatMessage({ id: 'product_name' })} >
                            <Input
                                placeholder={formatMessage({ id: 'product_placeholder' })}
                                onChange={(e) => {
                                    actions.setSearchParams({ productName: e.target.value });
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label={formatMessage({ id: 'bar_code' })} >
                            <Input
                                placeholder={formatMessage({ id: 'bar_code_placeholder' })}
                                onChange={(e) => {
                                    actions.setSearchParams({ barCode: e.target.value });
                                }}
                            />
                        </FormItem>
                    </Col>
                </Row>
                <Row className="operate">
                    <Button type="primary" onClick={this.delRow}>{formatMessage({ id: 'search' })}</Button>
                </Row>
            </Form>
        );
    }
    // 渲染table列表
    renderTable = () => {
        const { formatMessage } = this.props.intl;
        const { tableList, total, searchParams } = this.props.states;
        console.log(this.props.states, 'states');
        const columns = [
            {
                title: formatMessage({ id: 'warehouse' }),
                dataIndex: 'warehouse',
                key: 'warehouse',
            },
            {
                title: formatMessage({ id: 'sku_code' }),
                dataIndex: 'skuCode',
                key: 'skuCode',
            },
            {
                title: formatMessage({ id: 'product_name' }),
                dataIndex: 'productName',
                key: 'productName',
            },
            {
                title: formatMessage({ id: 'bar_code' }),
                dataIndex: 'barCode',
                key: 'barCode',
            },
            {
                title: formatMessage({ id: 'brand' }),
                dataIndex: 'brand',
                key: 'brand',
            },
            {
                title: formatMessage({ id: 'ammount' }),
                dataIndex: 'ammount',
                key: 'ammount',
            },
            {
                title: formatMessage({ id: 'price' }),
                dataIndex: 'price',
                key: 'price',
            },
        ];
        const pagination = {
            pageNo: searchParams.pageNo,
            pageSize: searchParams.pageSize,
            total,
        };
        return (
            <Table
                columns={columns}
                dataSource={tableList}
                size="small"
                rowKey={row => row.id}
                pagination={pagination}
                onChange={this.pagerChanage}
            />
        );
    }
    render() {
        const { formatMessage } = this.props.intl;
        const titleList = [
            {
                text: formatMessage({ id: 'stock_control' }),
            },
            {
                to: '/stock-list',
                text: formatMessage({ id: 'stock_control_list' }),
            },
        ];
        return (
            <div className="stock_list">
                {contentTitle(titleList)}
                <div className="search">
                    {this.renderSearch()}
                    {this.renderTable()}
                </div>
            </div>
        );
    }
}
