import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AutoComplete, Breadcrumb, Button, DatePicker, Input, InputNumber, Form, Row, Col, Modal, Select, Table } from 'antd';
const ReactHighcharts = require('react-highcharts');

const FormItem = Form.Item;
const { MonthPicker } = DatePicker;

const CONFIG = {
    chart: {
        type: 'column',
    },
    title: {
        text: '月平均降雨量',
    },
    subtitle: {
        text: '数据来源: WorldClimate.com'
    },
    xAxis: {
        categories: [
            '一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'
        ],
        crosshair: true,
    },
    yAxis: {
        min: 0,
        title: {
            text: '降雨量 (mm)',
        },
    },
    tooltip: {
        // head + 每个 point + footer 拼接成完整的 table
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            borderWidth: 0
        }
    },
    series: [{
        name: '东京',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    }, {
        name: '纽约',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
    }, {
        name: '伦敦',
        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
    }, {
        name: '柏林',
        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
    }]
};

@Form.create()
class XX extends Component {
    static propTypes = {
        form: PropTypes.shape({
            getFieldDecorator: PropTypes.func,
        }).isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            custom: 1,
        };
    }

    render() {
        const {
            form: { getFieldDecorator },
        } = this.props;

        const formItemLayout = {
            labelCol: {
                sm: { span: 8 },
            },
            wrapperCol: {
                sm: { span: 14 },
            },
        };

        const config = CONFIG;

        return (
            <div className="sell-anticipate-adjust">
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">Application Center</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/">Application List</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>预测提交</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Form
                        layout="inline"
                        onSubmit={this.handleSubmit}
                    >
                        <Col span={8}>
                            <FormItem
                                label="预测期间"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('name', {
                                    rules: [{ required: false }],
                                })(<MonthPicker placeholder="请选择月份" />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                label="区域办事处"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('ddd', {
                                    rules: [{ required: false }],
                                })(<Select style={{ width: 200 }} placeholder="请选择办事处">
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                </Select>)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <Button
                                type="primary"
                                htmlType="button"
                            >
                                搜索
                            </Button>
                        </Col>
                    </Form>
                </Row>
                <Row>
                    <ReactHighcharts config={config} ref="chart" />;
                </Row>
            </div>
        );
    }
}

export default XX;
