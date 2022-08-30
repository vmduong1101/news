import './style.scss'
import { useNavigate } from 'react-router-dom';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import { useEffect, useState } from 'react';
import { FaAd } from 'react-icons/fa';
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
        <div className='flex bg-sky-400 h-20 justify-between items-center px-24'>
            <img className='w-28 h-14' src='https://xgear.net/wp-content/uploads/2022/05/Xgear-logo.png' />
            <button className='bg-slate-200 p-1 rounded' onClick={handleSignOut} >Sign-Out</button>
            <div className='homeHeaderRight flex justify-between items-center'>
                <img className='rounded-full w-8 h-8 mr-3' src='https://i.ytimg.com/vi/HP7zQ6tW0_4/maxresdefault.jpg' />
                <p className='text-white'>{user}</p>
                <AiOutlineShoppingCart className='w-6 h-6' />
            </div>
        </div>
    )
}
export default Header