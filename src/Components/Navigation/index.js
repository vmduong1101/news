import React, { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './style.scss'
import { useDispatch } from "react-redux";
import { getValue } from "./navigationSlice";

const Navigation = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        dispatch(getValue(newValue))
    };

    return (
        <div className="px-52 border-b max-w-full">
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                >
                    <Tab value="" label="Tất cả" />

                    <Tab value="apple" label="Apple" />
                    <Tab value="samsung" label="Samsung" />
                    <Tab value="vivo" label="Vivo" />
                    <Tab value="xiaomi" label="Xiaomi" />
                    <Tab value="realme" label="Realme" />
                    <Tab value="nokia" label="Nokia" />
                    <Tab value="asus" label="Asus" />
                </Tabs>
            </Box>
        </div>
    )
}
export default Navigation