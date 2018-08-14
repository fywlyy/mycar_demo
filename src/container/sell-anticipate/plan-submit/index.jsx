import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AutoComplete, Breadcrumb, Button, Input, InputNumber, Form, Row, Col, Modal, Select, Table } from 'antd';
import _ from 'lodash';
import { api, getData } from '../../../request';

const FormItem = Form.Item;
const { Option } = Select;

const NatureNumberCell = ({ disabled, value, onChange }) => (
    <div>
        <InputNumber
            disabled={disabled}
            style={{ margin: '-5px 0' }}
            value={value}
            onChange={e => onChange(e)}
        />
    </div>
);

NatureNumberCell.propTypes = {
    disabled: PropTypes.bool.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
};

const DumbCell = ({ disabled, value, onChange }) => (
    <div>
        <Input
            disabled={disabled}
            value={value}
            onChange={e => onChange(e.target.value)}
        />
    </div>
);

DumbCell.propTypes = {
    disabled: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

/* todo 抽取请求业务 */

/* eslint react/no-multi-comp: 0 */
class AutoCompleteCell extends Component {
    static propTypes = {
        disabled: PropTypes.bool.isRequired,
        onChange: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            options: [],
            value: '',
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    componentWillReceiveProps({ value }) {
        this.setState({
            value,
        });
    }

    async handleSearch(value) {
        const response = await getData(api.queryFuzzyProductList, { name: value });

        if (response.success) {
            this.setState({
                options: response.result.content,
            });
        }
    }

    handleSelect = (code) => {
        const item = _.find(this.state.options, { code });
        this.props.onChange(item);
    }

    handleChange = (value) => {
        this.setState({
            value,
        });
    }
    render() {
        const children = _.map(this.state.options, ({ id, name, code }) => {
            return (<Option key={id} value={code}>{name}</Option>);
        });

        return (
            <div>
                <AutoComplete
                    value={this.state.value}
                    onSelect={this.handleSelect}
                    onSearch={this.handleSearch}
                    onChange={this.handleChange}
                >
                    {children}
                </AutoComplete>
            </div>
        );
    }
}

const emptyRowFactory = () => ({
    randomId: _.uniqueId('_row'),
    _name: '',
    _code: '',
    _unit: '',
    _amount: '',
    _nn1: '',
    _nn2: '',
    _nn3: '',
});

const isContainKey = (key, keyArray) => (_.indexOf(keyArray, key) > -1);

const disableCalculator = {
    checkColumn(column, row) {

        // case 1 在任何状态下，不能编辑的列 产品编码、小计数量
        // case 2 在编辑状态下，不能编辑的列 产品名称、基本单位
        // case 3 在时间条件下，不能编辑的列 n~n+3月
        const initialDisabledColumns = ['_code', '_amount', '_unit'];
        const editDisabledColumns = ['_name'];
        // const checkDateColumns = ['_nn1', '_nn2', '_nn3'];

        if (isContainKey(column, initialDisabledColumns)) {
            return true;
        }

        if (row.id && isContainKey(column, editDisabledColumns)) {
            return true;
        }

        return false;
    },
};

export default class XX extends Component {
    constructor(props) {
        super(props);

        this.state = {
            districts: [],
            selected: '',
            data: [],
            isRequesting: false,
        };

        this.getInitialData = this.getInitialData.bind(this);
        this.getInitialDistrict = this.getInitialDistrict.bind(this);
    }

    componentDidMount() {
        this.getInitialDistrict();
        this.getInitialData();
    }

    async getInitialData() {
        const response = await getData(api.querySellAnticipateListByDistrict);
        if (response.success) {
            const { result: { content } } = response;

            _.map(content, (item) => {
                item.randomId = _.uniqueId('_row');
            });

            this.setState({
                data: content,
            });
        }
    }

    async getInitialDistrict() {
        const response = await getData(api.queryDistrictList);
        if (response.success) {
            this.setState({
                districts: response.result.content,
            });
        }
    }

    handleSave = () => {}
    handleSubmit = () => {}

    handleSelectDistrict = (district) => {
        this.setState({
            selected: district,
        }, () => {
            this.getInitialData();
        });
    }

    handleAdd = () => {
        const { data } = this.state;

        this.setState({
            data: [...data, emptyRowFactory()],
        });
    }


    handleRowDataChange = (value, randomId, columnKey) => {
        const newData = [...this.state.data];
        const target = newData.filter(item => randomId === item.randomId)[0];

        if (target) {
            if (columnKey === '_name') {
                /* eslint no-underscore-dangle: 0 */
                target._name = value.name;
                target._code = value.code;
                target._unit = value.unit;
            } else if (isContainKey(columnKey, ['_nn1', '_nn2', '_nn3'])) {
                target[columnKey] = value;

                const { _nn1, _nn2, _nn3 } = target;
                target._amount = _nn1 + _nn2 + _nn3;
            } else {
                target[columnKey] = value;
            }

            this.setState({
                data: newData,
            });
        }
    }

    handleRowDelete = ({ randomId }) => {
        const newData = _.filter(this.state.data, item => randomId !== item.randomId);
        this.setState({
            data: newData,
        });
    }

    renderColumns = (cellValue, row, cellName) => {
        let Cell = null;
        switch (cellName) {
            case '_name':
                Cell = AutoCompleteCell;
                break;

            case '_code':
            case '_unit':
                Cell = DumbCell;
                break;

            case '_amount':
            case '_nn1':
            case '_nn2':
            case '_nn3':
                Cell = NatureNumberCell;
                break;

            default:
                alert('hehe');
        }

        const handleChangeClosure = (value) => {
            this.handleRowDataChange(value, row.randomId, cellName);
        };

        return (
            <Cell
                disabled={disableCalculator.checkColumn(cellName, row)}
                value={cellValue}
                onChange={handleChangeClosure}
            />
        );
    }

    render() {
        const that = this;

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
            {
                title: '产品名称',
                dataIndex: '_name',
                key: '_name',
                render: (value, row) => this.renderColumns(value, row, '_name'),
            },
            {
                title: '产品编码',
                dataIndex: '_code',
                key: '_code',
                render: (value, row) => this.renderColumns(value, row, '_code'),
            },
            {
                title: '基本单位',
                dataIndex: '_unit',
                key: '_unit',
                render: (value, row) => this.renderColumns(value, row, '_unit'),
            },
            {
                title: '小计数量',
                dataIndex: '_amount',
                key: '_amount',
                render: (value, row) => this.renderColumns(value, row, '_amount'),
            },
            {
                title: '3月数量',
                dataIndex: '_nn1',
                key: '_nn1',
                render: (value, row) => this.renderColumns(value, row, '_nn1'),
            },
            {
                title: '4月数量',
                dataIndex: '_nn2',
                key: '_nn2',
                render: (value, row) => this.renderColumns(value, row, '_nn2'),
            },
            {
                title: '5月数量',
                dataIndex: '_nn3',
                key: '_nn3',
                render: (value, row) => this.renderColumns(value, row, '_nn3'),
            },
            {
                title: '操作',
                dataIndex: '_opera',
                key: '_opera',
                render(first, row) {
                    const handleDeleteClosures = () => {
                        that.handleRowDelete(row);
                    };

                    // case 1: 没有id，则为新建，可以直接删除；
                    // case 2: 有id, 且含有删除标记，可以直接删除；
                    // case 3: 有id，单没有删除标记，不可删除
                    const deletable = !row.id || row.deletable;

                    if (!deletable) {
                        return null;
                    }

                    return (
                        <span>
                            <a href="javascript:;" onClick={handleDeleteClosures}>
                                删除
                            </a>
                        </span>
                    );
                },
            },
        ];

        const options = _.reduce(
            this.state.districts,
            (result, item) => {
                result.push(<Option key={item.id} value={item.id}>{item.name}</Option>);
                return result;
            },
            [<Option key="0x22321a" value="">请选择办事处</Option>]
        );

        return (
            <div className="sell-anticipate-submit">
                <Breadcrumb style={{ marginBottom: 30 }}>
                    <Breadcrumb.Item><Link to="/">销售预测管理</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>预测提交</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Form>
                        <Col span={8}>
                            <FormItem
                                label="区域办事处"
                                {...formItemLayout}
                            >
                                <Select style={{ width: 200 }} value={this.state.selected} placeholder="请选择办事处" onChange={this.handleSelectDistrict}>
                                    {options}
                                </Select>
                            </FormItem>
                        </Col>
                    </Form>
                </Row>
                <div>
                    <Button size="default" onClick={this.handleAdd} type="primary">
                        新增一行
                    </Button>
                    <Table
                        style={{ marginTop: 24 }}
                        columns={columns}
                        dataSource={this.state.data}
                        loading={false}
                        rowKey={row => row.randomId}
                        onChange={this.handlePageChange}
                        pagination={false}
                        footer={currentPageData => (
                            <p className="table-footer-p" style={{ margin: 0 }}>
                                <span>
                                    合计：{
                                        _.sumBy(currentPageData, '_amount')
                                    }
                                </span>
                            </p>
                        )
                        }
                    />
                </div>
                <div style={{ textAlign: 'right', paddingTop: 24 }}>
                    <span>
                        <Button type="primary" onClick={this.handleSave} style={{ marginRight: 10 }}>保存</Button>
                        <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                    </span>
                </div>
            </div>
        );
    }
}
