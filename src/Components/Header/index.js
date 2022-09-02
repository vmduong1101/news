import './style.scss'
import { useNavigate } from 'react-router-dom';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineShoppingCart } from "react-icons/ai";
const Header = () => {
    const navigate = useNavigate();
    const userlocal = JSON.parse(localStorage.getItem('userLocal'))
    const userGmail = JSON.parse(localStorage.getItem('userGmail'))

    const [user, setUser] = useState('')
    useEffect(() => {
        if (userlocal) {
            setUser(userlocal.name)
        } else if (userGmail) {
            setUser(userGmail)
        }

    }, [])

    const handleSignOut = () => {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            navigate('/')
        }).catch(function (error) {
            // An error happened.
            console.log(error)
        });
    }
    return (
        <div className='flex bg-sky-400 h-20 justify-between items-center px-24 max-w-full'>
            <img className='w-28 h-14' src='https://xgear.net/wp-content/uploads/2022/05/Xgear-logo.png' />
            <div className='flex items-center relative'>
                <input className='rounded-lg p-1 px-6 w-96 outline-none text-sm h-9 text-stone-600' placeholder='Bạn cần tìm sản phẩm nào ?' />
                <BiSearch className='absolute top-2 right-0 mr-3 text-lg cursor-pointer text-sky-600' />
            </div>
            <div className='flex items-center'>
                <AiOutlineShoppingCart className='w-7 h-7 mx-5 cursor-pointer text-white' />
                <div className='homeHeaderRight flex justify-between items-center'>
                    <img className='rounded-full w-8 h-8 mr-3' src='https://i.ytimg.com/vi/HP7zQ6tW0_4/maxresdefault.jpg' />
                    <p className='text-white m-0'>{user}</p>
                    <button className='bg-slate-200 p-1 rounded text-sm ml-3 hover:bg-violet-600 text-slate-900 px-2' onClick={handleSignOut} >Đăng xuất</button>
                </div>
            </div>
        </div>
    )
}
export default Header