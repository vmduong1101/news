import React from 'react'
import { Breadcrumb, Button, Spin } from 'antd';
import { Select } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductThunk, getItemProductThunk } from '../Home/homeSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { ToastContainer } from 'react-toastify';
import { data } from 'jquery';
import { addCartThunk, getcartThunk } from '../Cart/cartSlice';


const { Option } = Select;
export default function Detail() {
    const [province, setProvince] = useState([])
    const [detail, setDetail] = useState(false)
    const stateData = useSelector(state => state.products)
    console.log(stateData.loading)
    let { id } = useParams();
    const dispatch = useDispatch()


    const onChange = (value) => {

    };

    const onSearch = (value) => {

    };
    const getProvince = async () => {
        let response = await fetch('https://provinces.open-api.vn/api/')
        let data = await response.json()
        return data
    }
    const fetchGetItemProduct = async () => {
        try {
            const actionGetItemResult = await dispatch(getItemProductThunk(id))
            const getItemProduct = await unwrapResult(actionGetItemResult)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchGetItemProduct()
        getProvince().then(data => {
            return setProvince(data)
        })
    }, [])
    var formatter = new Intl.NumberFormat('vi-VN',
        { style: 'currency', currency: 'VND' }
    );

    const fetchCart = async () => {
        try {
            const actionFetchCart = await dispatch(getcartThunk())
            const listCartAction = unwrapResult(actionFetchCart)

        } catch (err) {
            console.log(err)
        }
    }

    const handleAddCart = async () => {
        // const itemCart = {
        //     cartId: stateData.data.id,
        //     name: stateData.data.name,
        //     price: exist.price,
        //     img: exist.img,
        //     category: exist.brand,
        //     des: {
        //         cpu: exist.cpu,
        //         ram: exist.ram,
        //         rom: exist.rom,
        //         rearCamera: exist.rearCamera,
        //         frontCamera: exist.frontCamera,
        //         pin: exist.pin,
        //         pluggin: exist.pluggin,
        //     }

        // }
        try {
            const actionAddCart = await dispatch(addCartThunk(...stateData.data))
            const addListCart = unwrapResult(actionAddCart)
            fetchCart()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Spin spinning={stateData.loading} tip='Loading...'>
            <div>
                {stateData.data && stateData.data.map((item, index) => (
                    <div key={index}>
                        <div className='ml-28 my-4'>
                            <Breadcrumb separator=">">
                                <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
                                <Breadcrumb.Item href="">{item.category.toUpperCase()}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className='ml-28 font-bold text-lg'>Điện thoại {item.name}</div>
                        <hr className=' my-4 mx-28' />
                        <div className='flex mx-28'>
                            <div className='' style={{ width: '750px' }}>
                                <img style={{ width: '710px', height: '394px' }} src={item.slide1} />
                            </div>
                            <div className='text-left'>
                                <h3 className='font-bold text-xl'>Cấu hình Điện thoại {item.name} {item.des.rom}</h3>
                                <ul className='' style={{ width: '400px' }}>
                                    <li className='bg-gray-100 p-2 flex'>
                                        <span className='w-24'>Chip:</span>
                                        <span className='ml-24'>{item.des.cpu}</span>
                                    </li>
                                    <li className='bg-white p-2 flex'>
                                        <span className='w-24'>Camera sau:</span>
                                        <span className='ml-24'>{item.des.rearCamera}</span>
                                    </li>
                                    <li className='bg-gray-100 p-2 flex'>
                                        <span className='w-24'>Camera trước:</span>
                                        <span className='ml-24'>{item.des.frontCamera}</span>
                                    </li>
                                    <li className='bg-white  p-2 flex'>
                                        <span className='w-24'>RAM:</span>
                                        <span className='ml-24'>{item.des.ram}</span>
                                    </li>
                                    <li className='bg-gray-100 p-2 flex'>
                                        <span className='w-24'>Bộ nhớ trong:</span>
                                        <span className='ml-24'>{item.des.rom}</span>
                                    </li>
                                    <li className='bg-white  p-2 flex'>
                                        <span className='w-24'>Pin, Sạc:</span>
                                        <span className='ml-24'>{item.des.pin} {item.des.pluggin}</span>
                                    </li>
                                </ul>
                                <span className='mr-3'>Giá tại</span>
                                <Select
                                    showSearch
                                    defaultValue={"thanh_pho_ho_chi_minh"}
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}

                                >
                                    {province && province.map((item) => (
                                        <Option key={item.code} value={item.codename}>{item.name}</Option>
                                    ))}
                                </Select>
                                <h1 className='mt-3 text-red-600 font-bold text-xl'>{formatter.format(item.price)}</h1>
                                <div className='text-center'>
                                    <Button onClick={() => handleAddCart()} type="primary">Mua ngay</Button>
                                </div>
                            </div>
                        </div>
                        <div className='flex mt-10'>
                            <div className='w-2/4 mx-auto'>
                                <div className='detail'>
                                    <h3 className='text-center font-bold text-xl'>Thông tin sản phẩm</h3>
                                    <p className=' font-bold text-xl'>{item.infor.primaryInfor}</p>
                                    <h4 className='font-bold text-xl'>Thiết kế sản phẩm</h4>
                                    <p>{item.infor.designProduct}</p>
                                    <img style={{ width: '800px', height: '390px' }} src={item.infor.designProductImg} />
                                </div>
                                {detail ?
                                    <div>
                                        <h4 className='font-bold text-xl mt-8'>Hiệu năng sản phẩm</h4>
                                        <p>{item.infor.performaceProduct}</p>
                                        <img style={{ width: '800px', height: '470px' }} src={item.infor.performaceProductImg} />
                                        <h4 className='font-bold text-xl'>Camera độ nét cao</h4>
                                        <p>{item.infor.highCamera}</p>
                                        <img style={{ width: '800px', height: '470px' }} src={item.infor.highCameraImg} />
                                        <div className='detailButton text-center'>
                                            <div className='article'></div>
                                            <button type="primary" onClick={() => setDetail(false)}>Thu gọn</button>
                                        </div>
                                    </div>
                                    :
                                    <div className='detailButton text-center'>
                                        <div className='article'></div>
                                        <button type="primary" onClick={() => setDetail(true)}>Xem thêm</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Spin>
    )
}
