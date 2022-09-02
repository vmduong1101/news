import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux/es/exports';
import './style.scss'
import { fetchProductThunk } from "../../Pages/Home/homeSlice";
import { Spin } from "antd";
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit'


const Container = () => {
    const dispatch = useDispatch()
    const stateListProduct = useSelector(state => state.products.loading)
    const changeValue = useSelector(state => state.changeValue.changeCategory)
    const [productList, setProductList] = useState([])
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const actionResult = await dispatch(fetchProductThunk())
                const listProduct = unwrapResult(actionResult)
                setProductList(listProduct)
            } catch (err) {
                console.log(err)
            }
        }
        fetchProductList()
    }, [])
    var formatter = new Intl.NumberFormat('vi-VN',
        { style: 'currency', currency: 'VND' }
    );
    console.log(changeValue)
    const arr = productList.filter(item => item.category === changeValue)
    console.log(arr)
    return (
        <Spin spinning={stateListProduct} tip="Loading...">
            <div className='my-5 max-w-full'>
                <div className='grid grid-cols-5 gap-5 px-36 text-center'>
                    {productList && changeValue ?
                        productList.filter(item => item.category == changeValue).map(item => (

                            <div className='my-6 border p-5 cursor-pointer hover:border-none customShadow' key={item.id}>
                                <img className="imgProduct" src={item.img} />
                                <div className='text-left my-6'>
                                    <h1 className='text-base'>{item.name}</h1>
                                    <p className='font-bold mb-3'>{formatter.format(item.price)}</p>
                                    <ul className='text-xs list-disc ml-3 w-40'>
                                        <li>{item.des.cpu}</li>
                                        <li>RAM {item.des.ram}, ROM {item.des.rom}</li>
                                        <li>Camera sau: {item.des.rearCamera}</li>
                                        <li>Camera trước: {item.des.frontCamera}</li>
                                        <li>Pin {item.des.pin}, Sạc {item.des.pluggin}</li>
                                    </ul>
                                </div>
                            </div>
                        )) : productList.map((item) => (
                            <div className='my-6 border p-5 cursor-pointer hover:border-none customShadow' key={item.id}>
                                <img className="imgProduct" src={item.img} />
                                <div className='text-left my-6'>
                                    <h1 className='text-base'>{item.name}</h1>
                                    <p className='font-bold mb-3'>{formatter.format(item.price)}</p>
                                    <ul className='text-xs list-disc ml-3 w-40'>
                                        <li>{item.des.cpu}</li>
                                        <li>RAM {item.des.ram}, ROM {item.des.rom}</li>
                                        <li>Camera sau: {item.des.rearCamera}</li>
                                        <li>Camera trước: {item.des.frontCamera}</li>
                                        <li>Pin {item.des.pin}, Sạc {item.des.pluggin}</li>
                                    </ul>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Spin>
    )
}


export default Container