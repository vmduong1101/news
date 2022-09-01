import React, { useEffect, useState } from "react";
import productApi from "../Api/productApi";
import { useDispatch, useSelector } from 'react-redux/es/exports';
import './style.scss'
import { fetchProduct } from "../../Pages/Home/homeSlice";
import { getProductApi } from "../Api/productApi";

const Container = () => {
    const [productList, setProductList] = useState([])
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const res = await getProductApi.getAllProduct();
                console.log(res)
                setProductList(res)
            } catch (err) {
                console.log(err)
            }
        }
        fetchProductList()
        // fetchProduct()
    }, [])
    var formatter = new Intl.NumberFormat('vi-VN',
        { style: 'currency', currency: 'VND' }
    );

    return (
        <div className='w-screen my-5'>
            <div className='grid grid-cols-5 gap-5 px-36 text-center'>
                {productList &&
                    productList.map((item) => (
                        <div className='my-6 border p-5 cursor-pointer hover:border-none customShadow' key={item.id}>
                            <img className="imgProduct" src={item.img} />
                            <div className='text-left my-6'>
                                <h1 className='text-base'>{item.name}</h1>
                                <p className='font-bold mb-3'>{formatter.format(item.price)}</p>
                                <ul className='text-xs list-disc ml-3'>
                                    <li>{item.des.cpu}</li>
                                    <li>RAM {item.des.ram}, ROM {item.des.rom}</li>
                                    <li>Camera sau: {item.des.rearCamera}</li>
                                    <li>Camera trước: {item.des.frontCamera}</li>
                                    <li>Pin {item.des.pin}, Sạc {item.des.pluggin}</li>
                                </ul>
                            </div>
                        </div>
                    )

                    )}
            </div>
        </div>
    )
}


export default Container