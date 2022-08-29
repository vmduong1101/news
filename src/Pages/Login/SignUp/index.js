import React, { useState } from 'react'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
    const navigate = useNavigate()
    const { change, setChange } = props
    const [eye, setEye] = useState(false)
    const handleRegister = () => {
        setChange(true)
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('user')) || []
        if (user.email === username && user.password === password) {
            toast.success("Đăng nhập thành công!", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'light'
            })
            setTimeout(() => navigate('/home'), 1000)
        } else {
            toast.error("Đăng nhập thất bại!", {
                position: "bottom-right",
                autoClose: 2000,
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
        <div className='signUp'>
            <div className='signUpContainer'>
                <div className='signUpTitle'>
                    <h3>Đăng Nhập</h3>
                    <p>Bạn chưa có tài khoản ? <a onClick={handleRegister}>Đăng ký</a></p>
                </div>
                <form className='signUpForm' onSubmit={(e) => handleSubmit(e)}>
                    <div className='signUpUser'>
                        <input type='text' placeholder='Số điện thoại hoặc Email' value={username} onChange={(e) => setUsername(e.target.value)} />
                        <div className='validatUser'>
                            <div className='validateContainer'>
                                <p>Số điện thoại hoặc Email không chính xác</p>
                                <FontAwesomeIcon icon={faXmark} className='validateCancle'></FontAwesomeIcon>
                            </div>
                        </div>
                    </div>
                    <div className='signUpPw'>
                        <input type={eye ? 'text' : 'password'} placeholder='Mật khẩu' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <FontAwesomeIcon icon={faEye} className={eye ? 'pwEye active' : 'pwEye'} onClick={() => setEye(!eye)}></FontAwesomeIcon>

                    </div>
                    <div className='signUpBottom'>
                        <button className='signUpLogin'>Đăng nhập</button>
                        <h5>Hoặc đăng nhập bằng</h5>
                        <div className='signUpDif'>
                            <div className='signUpFb'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" /></svg>
                                <p>Facebook</p>
                            </div>
                            <div className='signUpGg'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>
                                <p>Google</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}
export default SignUp