import React, { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './style.scss'
const Navigation = () => {
    const [value, setValue] = useState('one');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="px-52 border-b">
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                >
                    <Tab value="one" label="Apple" />
                    <Tab value="two" label="Samsung" />
                    <Tab value="vivo" label="Vivo" />
                    <Tab value="three" label="Xiaomi" />
                    <Tab value="four" label="Realmi" />
                    <Tab value="five" label="Nokia" />
                    <Tab value="six" label="Acer" />
                    <Tab value="seven" label="Asus" />
                </Tabs>
            </Box>
        </div>
    )
}
export default Navigation