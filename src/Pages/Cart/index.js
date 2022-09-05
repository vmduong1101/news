import React from 'react'
import Header from '../../Components/Header/index'
import { AiTwotoneDelete } from "react-icons/ai";
import $, { data } from 'jquery';
import { Button } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { deleteCartThunk, editCartThunk, getcartThunk } from './cartSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { ConstructionOutlined } from '@mui/icons-material';
import { list } from 'postcss';

export default function Cart(props) {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const [value, setValue] = useState('')
    const [listCart, setListCart] = useState([])
    const stateDataCart = useSelector(state => state.cart.data)


    const fetchCart = async () => {
        try {
            const actionFetchCart = await dispatch(getcartThunk())
            const listCartAction = unwrapResult(actionFetchCart)
            console.log(listCartAction)
            setListCart(listCartAction)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchCart()
    }, [])
    //Jquery Minus Plus Quantity

    const arrTest = [
        {
            id: 1,
            img: 'https://cdn.tgdd.vn/Products/Images/42/153856/TimerThumb/iphone-11-(50).jpg',
            price: 50000000
        },
        {
            id: 2,
            img: 'https://cdn.tgdd.vn/Products/Images/42/261888/TimerThumb/realme-c35.jpg',
            price: 20000000
        }
    ]
    const handleDelete = (id) => {
        const fetchDeleteCart = async () => {
            try {
                const actionDeleteCart = await dispatch(deleteCartThunk(id))
                const deleteCartAction = unwrapResult(actionDeleteCart)
                console.log('unwrap', deleteCartAction)

            } catch (err) {
                console.log(err)
            }
        }
        fetchDeleteCart()
    }
    //Code React
    const handlePlus = (id) => {
        if (quantity >= 10) return
        setQuantity(quantity + 1)
    }
    const handleMinus = (id) => {
        if (quantity == 0) return
        setQuantity(quantity - 1)
    }
    var formatter = new Intl.NumberFormat('vi-VN',
        { style: 'currency', currency: 'VND' }
    );
    return (
        <div className='bg-slate-100 h-screen'>
            <div className='pt-10'>
                <div className='flex justify-between mx-40 py-5 px-3 bg-white items-center rounded-xl'>
                    <p className='mb-0'>Tất cả sản phẩm</p>
                    <div className='w-3/4 flex justify-between pl-48'>
                        <p className='mb-0'>Đơn giá</p>
                        <p className='mb-0'>Số lượng</p>
                        <p className='mb-0'>Thành tiền</p>
                        <AiTwotoneDelete />
                    </div>
                </div>
            </div>
            <div>
                <div className='mx-40 mt-14'>
                    {stateDataCart && stateDataCart.map((item => (
                        <div className='flex py-4 justify-between items-center px-3 bg-white' key={item.id}>
                            <div className='flex w-80 items-center'>
                                <img className='w-20 h-20' src={item.img} />
                                <p className='ml-3 mb-0'>{item.name}</p>
                            </div>
                            <p className='mb-0 w-9'>{formatter.format(item.price)}</p>
                            <div className="group-input">
                                <button className="disable" onClick={() => handleMinus()}>
                                    <img src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg" alt="" />
                                </button>
                                <input type="text" value={quantity} className="input" onChange={(e) => setValue(e)} />
                                <button className="enable" onClick={() => handlePlus()}>
                                    <img src="	https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg" alt="" />
                                </button>
                            </div>
                            <p className='mb-0 w-9'>{formatter.format(item.price * quantity)}</p>
                            <AiTwotoneDelete onClick={() => handleDelete(item.id)} className='cursor-pointer hover:text-cyan-400 w-8' />
                        </div>
                    )))}

                </div>
                <div className='text-right mx-40 mt-3'>
                    <Button className='' type="primary">Mua Hàng</Button>
                </div>
            </div>
        </div>
    )
}
