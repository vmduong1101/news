import { Space, Table, Button, Modal, Input, Form, Select, message, Upload, Spin } from 'antd';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductThunk, fetchProductThunk, addProductThunk, editProductThunk, getItemProductThunk } from '../../Pages/Home/homeSlice';
import { unwrapResult } from '@reduxjs/toolkit'

const { Option } = Select;


const AdminProduct = () => {
    const dispatch = useDispatch()
    const [productList, setProductList] = useState([])
    const [formValue, setFormValue] = useState([])
    const [idSelect, setIdSelect] = useState('')
    const [idList, setIdList] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const stateListProduct = useSelector(state => state.products.loading)

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
        handleEdit('')
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
                    <a onClick={() => handleEdit(record.id)}>Sửa</a>
                    <a onClick={() => handleDelete(record)}>Xóa</a>
                </Space >
            ),
            align: 'center',
        },
    ];



    //Handle Edit
    const handleEdit = (id) => {
        setIdSelect(id)
        //Get Item Product
        const fetchGetItemProduct = async () => {
            try {
                const actiongetItemResult = await dispatch(getItemProductThunk(id))
                const getItemProduct = unwrapResult(actiongetItemResult)
                setIdList(getItemProduct.id)
                if (getItemProduct.id == id) {
                    const data = {
                        id: getItemProduct.id,
                        name: getItemProduct.name,
                        price: getItemProduct.price,
                        img: getItemProduct.img,
                        brand: getItemProduct.category,
                        cpu: getItemProduct.des.cpu,
                        ram: getItemProduct.des.ram,
                        rom: getItemProduct.des.rom,
                        rearCamera: getItemProduct.des.rearCamera,
                        frontCamera: getItemProduct.des.frontCamera,
                        pin: getItemProduct.des.pin,
                        pluggin: getItemProduct.des.pluggin,

                    }
                    formModal.setFieldsValue(data)
                    setIsModalVisible(true);
                }

                fetchProductList()
            } catch (err) {
                console.log(err)
            }
        }
        fetchGetItemProduct()
    }

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
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        const payload = {
            idSelect,
            formValue
        }
        if (idSelect == idList) {
            console.log('Dif')
            console.log(idSelect, idList)
            const fetchEditProduct = async () => {
                try {
                    const actionEditResult = await dispatch(editProductThunk(payload))
                    const editListProduct = unwrapResult(actionEditResult)
                    fetchProductList()
                } catch (err) {
                    console.log(err)
                }
            }
            fetchEditProduct()
            setIsModalVisible(false);
            formModal.resetFields();
            setIdList('')
        } else {
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
            setIsModalVisible(false);
            formModal.resetFields();
        }
    }

    const handleCancel = () => {
        setIsModalVisible(false);
        formModal.resetFields();
        setFormValue({})
        setIdList('')
    };
    //Form Ant
    const onFinish = (values) => {
        console.log('Success:', values);

    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
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
            <Spin spinning={stateListProduct} tip='Loading...'>
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
                            form={formModal}
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
                                    <Option value="realme">Realme</Option>
                                    <Option value="vivo">Vivo</Option>
                                    <Option value="nokia">Nokia</Option>
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
                                <Input placeholder='Nhập link hình ảnh của sản phẩm' />
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
            </Spin>
        </div >
    )
}
export default AdminProduct