import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AdminProduct from '../../Components/AdminProduct';

const Admin = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <div className='flex items-center font-bold text-2xl px-32 py-3'>
                <h1>ADMIN</h1>
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab label="Item One" />
                        <Tab label="Item Two" />
                        <Tab label="Item Three" />
                        <Tab label="Item Four" />
                        <Tab label="Item Five" />
                        <Tab label="Item Six" />
                    </Tabs>
                </Box>
            </div>
            <div className='px-28 mt-14'>
                <AdminProduct />
            </div>
        </div>
    );
}
export default Admin
