import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux/es/exports';
import './style.scss'
import { fetchProductThunk } from "../../Pages/Home/homeSlice";
import { Button, Spin } from "antd";
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit'
import { addCartThunk, getcartThunk } from "../../Pages/Cart/cartSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Container = () => {
    const dispatch = useDispatch()
    const stateListProduct = useSelector(state => state.products.loading)
    const changeValue = useSelector(state => state.changeValue.changeCategory)
    const [productList, setProductList] = useState([])
    const [listCart, setListCart] = useState([])
    const stateGetCart = useSelector(state => state.cart.data)
    const fetchCart = async () => {
        try {
            const actionFetchCart = await dispatch(getcartThunk())
            const listCartAction = unwrapResult(actionFetchCart)
            setListCart(listCartAction)
        } catch (err) {
            console.log(err)
        }
    }
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

    const handleAddCart = async (id) => {
        const exist = await productList.find((item) => item.id == id)
        if (!exist) return
        if (stateGetCart.length == 1) {
            return toast.warning("Vui lòng thành toán trước khi mua thêm sản phẩm", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'light'
            })
        }
        const listExist = await stateGetCart.find((item) => item.cartId == exist.id)
        console.log('state Add', stateGetCart)
        console.log('listExist', listExist)

        if (listExist) {
            return toast.warning("Sản phẩm đã có trong giỏ hàng", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'light'
            })
        } else {
            const fetchAddCart = async () => {
                const itemCart = {
                    cartId: exist.id,
                    name: exist.name,
                    price: exist.price,
                    img: exist.img,
                    category: exist.brand,
                    des: {
                        cpu: exist.cpu,
                        ram: exist.ram,
                        rom: exist.rom,
                        rearCamera: exist.rearCamera,
                        frontCamera: exist.frontCamera,
                        pin: exist.pin,
                        pluggin: exist.pluggin,
                    }

                }
                try {
                    const actionAddCart = await dispatch(addCartThunk({ ...itemCart, quantity: 1 }))
                    const addListCart = unwrapResult(actionAddCart)
                    fetchCart()

                } catch (err) {
                    console.log(err)
                }
            }
            fetchAddCart()
            toast.success("Đã thêm sản phẩm vào giỏ hàng", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'light'
            })
        }
    }
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
                                <Button type="primary" onClick={() => handleAddCart(item.id)}>Mua hàng</Button>
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
                                <Button type="primary" onClick={() => handleAddCart(item.id)}>Mua hàng</Button>
                            </div>
                        ))
                    }
                </div>
            </div>
            <ToastContainer />
        </Spin>
    )
}


export default Container