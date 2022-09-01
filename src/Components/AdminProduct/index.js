import { Space, Table, Button, Modal, Input, Form, Select } from 'antd';
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { deleteProductThunk, fetchProductThunk, addProductThunk } from '../../Pages/Home/homeSlice';
import { unwrapResult } from '@reduxjs/toolkit'
import axios from 'axios';

const { Option } = Select;


const AdminProduct = () => {
    const dispatch = useDispatch()
    const [productList, setProductList] = useState([])
    const [formValue, setFormValue] = useState([])
    const [id, setID] = useState('')

    const fetchProductList = async () => {
        try {
            const actionResult = await dispatch(fetchProductThunk())
            const listProduct = unwrapResult(actionResult)
            setProductList(listProduct)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchProductList()
    }, [])
    const [formModal] = Form.useForm();
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
            align: 'center',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
            align: 'center',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
        },
        {
            title: 'Brand',
            dataIndex: 'category',
            key: 'category',
            align: 'center',
        },
        {
            title: 'CPU',
            dataIndex: ['des', 'cpu'],
            // render: (des) => des.map((item) => item.cpu).join(),
            key: 'cpu',
            align: 'center',
        },
        {
            title: 'RAM',
            dataIndex: ['des', 'ram'],
            key: 'ram',
            align: 'center',
        },
        {
            title: 'ROM',
            dataIndex: ['des', 'rom'],
            key: 'rom',
            align: 'center',
        },
        {
            title: 'Camera trước',
            dataIndex: ['des', 'frontCamera'],
            key: 'frontCamera',
            align: 'center',
        },
        {
            title: 'Camera sau',
            dataIndex: ['des', 'rearCamera'],
            key: 'rearCamera',
            align: 'center',
        },
        {
            title: 'PIN',
            dataIndex: ['des', 'pin'],
            key: 'pin',
            align: 'center',
        },
        {
            title: 'Sạc',
            dataIndex: ['des', 'pluggin'],
            key: 'pluggin',
            align: 'center',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                < Space size="middle">
                    <a>Sửa</a>
                    <a onClick={() => handleDelete(record)}>Xóa</a>
                </Space >
            ),
            align: 'center',
        },
    ];
    const handleDelete = (record) => {
        const id = record.id
        const fetchDeleteProduct = async () => {
            try {
                const actionResult = await dispatch(deleteProductThunk(id))
                fetchProductList()
            } catch (err) {
                console.log(err)
            }
        }
        fetchDeleteProduct()
    }
    //Modal Ant
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {

        const fetchAddProduct = async () => {
            try {
                const actionAddResult = await dispatch(addProductThunk(formValue))
                const addListProduct = unwrapResult(actionAddResult)

                fetchProductList()
            } catch (err) {
                console.log(err)
            }
        }
        fetchAddProduct()
        // const data = {
        //     id: '1',
        //     name: '',
        //     price: 0,
        //     category: '',
        //     img: '',
        //     des: {
        //         cpu: '',
        //         ram: '',
        //         rom: '',
        //         rearCamera: '',
        //         frontCamera: '',
        //         pin: '',
        //         pluggin: '',
        //     }
        // }
        // console.log(data)
        // console.log(formValue)
        // axios({
        //     method: "POST",
        //     url: "https://630f636737925634188e6484.mockapi.io/product",
        //     data
        // })
        //     .then(res => {
        //         console.log("res", res.data.message);
        //         fetchProductList()
        //     })
        //     .catch(err => {
        //         console.log("error in request", err);
        //     });

        setIsModalVisible(false);

    }

    const handleCancel = () => {
        setIsModalVisible(false);
        formModal.resetFields();
    };
    //Form Ant
    const onFinish = (values) => {
        console.log('Success:', values);

    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    // var formdata = new FormData();
    // formdata.append("id", formValue.id)
    // formdata.append("name", formValue.name)
    // formdata.append("price", formValue.price)
    // formdata.append("img", formValue.img)
    // formdata.append("category", formValue.category)
    // formdata.append("des", {
    //     "cpu": formValue.des.cpu,
    //     "ram": formValue.des.ram,
    //     "rom": formValue.des.rom,
    //     "rearCamera": formValue.des.rearCamera,
    //     "frontCamera": formValue.des.frontCamera,
    //     "pin": formValue.des.pin,
    //     "pluggin": formValue.des.pluggin,
    // })
    const onValuesChange = (change, values) => {
        const data = {
            id: values.id,
            name: values.name,
            price: values.price,
            img: values.img,
            category: values.brand,
            des: {
                cpu: values.cpu,
                ram: values.ram,
                rom: values.rom,
                rearCamera: values.rearCamera,
                frontCamera: values.frontCamera,
                pin: values.pin,
                pluggin: values.pluggin,
            }

        }

        setFormValue(data)
    }

    //Select Ant
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };
    return (
        <div>
            <Table columns={columns} dataSource={productList} rowKey='id' />
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
                        onValuesChange={onValuesChange}
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
                            label="Hình ảnh"
                            name="img"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập hình ảnh sản phẩm',
                                },
                            ]}
                        >
                            <Input placeholder='Ảnh' />
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