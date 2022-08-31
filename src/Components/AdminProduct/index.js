import { Space, Table, Button, Modal, Input, Form, Select } from 'antd';
import React, { useState } from "react";


const { Option } = Select;


const AdminProduct = () => {
    const [formModal] = Form.useForm();
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Image',
            dataIndex: 'img',
            key: 'img',
        },
        {
            title: 'CPU',
            dataIndex: 'cpu',
            key: 'cpu',
        },
        {
            title: 'RAM',
            dataIndex: 'ram',
            key: 'ram',
        },
        {
            title: 'ROM',
            dataIndex: 'rom',
            key: 'rom',
        },
        {
            title: 'Camera trước',
            dataIndex: 'frontCamera',
            key: 'frontCamera',
        },
        {
            title: 'Camera sau',
            dataIndex: 'rearCamera',
            key: 'rearCamera',
        },
        {
            title: 'PIN',
            dataIndex: 'pin',
            key: 'pin',
        },
        {
            title: 'Sạc',
            dataIndex: 'pluggin',
            key: 'pluggin',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Sửa</a>
                    <a>Xóa</a>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    //Modal Ant
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        formModal.resetFields();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        formModal.resetFields();
    };
    //Form Ant
    const onFinish = (values) => {
        console.log('Success:', values);
        formModal.resetFields();

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    //Select Ant
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };
    return (
        <div>
            <Table columns={columns} dataSource={data} />
            <div>
                <Button type="primary" onClick={showModal}>
                    Add Product
                </Button>
                <Modal title="Thêm sản phẩm" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} getContainer={false} >
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="ID"
                            name="id"
                            disable='true'
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input disabled placeholder='ID' />
                        </Form.Item>

                        <Form.Item
                            label="Tên sản phẩm"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên sản phẩm',
                                },
                            ]}
                        >
                            <Input placeholder='Tên sản phẩm' />
                        </Form.Item>
                        <Form.Item
                            label="Giá"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giá sản phẩm',
                                },
                            ]}
                        >
                            <Input placeholder='Giá sản phẩm' />
                        </Form.Item>
                        <Form.Item
                            label="Nhãn hiệu"
                            name="brand"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn brand sản phẩm',
                                },
                            ]}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn một nhãn hàng"
                                optionFilterProp="children"
                                onChange={onChange}
                                onSearch={onSearch}
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            >
                                <Option value="apple">Apple</Option>
                                <Option value="samsung">Samsung</Option>
                                <Option value="xiaomi">Xiaomi</Option>
                                <Option value="realmi">Realmi</Option>
                                <Option value="vivo">Vivo</Option>
                                <Option value="acer">Acer</Option>
                                <Option value="asus">Asus</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="CPU"
                            name="cpu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập CPU sản phẩm',
                                },
                            ]}
                        >
                            <Input placeholder='CPU' />
                        </Form.Item>
                        <Form.Item
                            label="RAM"
                            name="ram"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập RAM sản phẩm',
                                },
                            ]}
                        >
                            <Input placeholder='RAM' />
                        </Form.Item>
                        <Form.Item
                            label="ROM"
                            name="rom"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập ROM sản phẩm',
                                },
                            ]}
                        >
                            <Input placeholder='ROM' />
                        </Form.Item>
                        <Form.Item
                            label="Camera trước"
                            name="frontCamera"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Camera trước',
                                },
                            ]}
                        >
                            <Input placeholder='Camera trước' />
                        </Form.Item>
                        <Form.Item
                            label="Camera sau"
                            name="rearCamera"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Camera sau',
                                },
                            ]}
                        >
                            <Input placeholder='Camera sau' />
                        </Form.Item>
                        <Form.Item
                            label="PIN"
                            name="pin"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập PIN sản phẩm',
                                },
                            ]}
                        >
                            <Input placeholder='PIN' />
                        </Form.Item>
                        <Form.Item
                            label="Pluggin"
                            name="pluggin"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Pluggin sản phẩm',
                                },
                            ]}
                        >
                            <Input placeholder='Pluggin' />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div >
    )
}
export default AdminProduct