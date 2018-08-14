import React from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const layout = {
    xs: { span: 8, offset: 0 },
    lg: { span: 8, offset: 0 },
    xxl: { span: 6, offset: 0 },
}
const layout2 = {
    xs: { span: 8, offset: 0 },
    lg: { span: 8, offset: 0 },
    xxl: { span: 6, offset: 0 },
}

class BaseForm extends React.Component {
    static propTypes = {
        form: PropTypes.shape({
            getFieldDecorator: PropTypes.func,
        }).isRequired,
        handleSearch: PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }
    getFields() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Row>
                    <Col {...layout}>
                        <FormItem label="客户">
                            {getFieldDecorator('field-1', {
                                rules: [{
                                    required: true,
                                    message: 'Input something!',
                                }],
                            })(<Input placeholder="placeholder" />)}
                        </FormItem>
                    </Col>
                    <Col {...layout2}>
                        <FormItem label="业务部门">
                            {getFieldDecorator('field-2', {
                                rules: [{
                                    required: true,
                                    message: 'Input something!',
                                }],
                            })(<Input placeholder="placeholder" />)}
                        </FormItem>
                    </Col>
                    <Col {...layout}>
                        <FormItem label="业务人员">
                            {getFieldDecorator('field-3', {
                                rules: [{
                                    required: true,
                                    message: 'Input something!',
                                }],
                            })(<Input placeholder="placeholder" />)}
                        </FormItem>
                    </Col>
                    <Col {...layout}>
                        <FormItem label="订单编号">
                            {getFieldDecorator('field-4', {
                                rules: [{
                                    required: true,
                                    message: 'Input something!',
                                }],
                            })(<Input placeholder="placeholder" />)}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
    handleSearch() {
        this.props.handleSearch();
    }
    render() {
        return (
            <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
                layout="inline"
            >
                <Row gutter={24}>{this.getFields()}</Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">添加</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                            Clear
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}
const SearchForm = Form.create()(BaseForm);
export default SearchForm;
