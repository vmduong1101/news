import React, { useState } from 'react'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";


const Register = (props) => {
    const { change, setChange } = props
    const [eyeSignInPw, setEyeSignInPw] = useState(false)
    const [eyeSignInRePw, setEyeSignInRePw] = useState(false)


    const formik = useFormik({
        initialValues: {
            name: "",
            password: "",
            rePassword: "",
            email: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "Phải có ít nhất 2 ký tự")
                .max(15, "Tối đa có 15 ký tự"),
            email: Yup.string()
                .email("Email không có giá trị!")
                .required("Bắt buộc!"),
            password: Yup.string()
                .min(6, "Phải có ít nhất 6 ký tự")
                .required("Bắt buộc !"),
            rePassword: Yup.string()
                .oneOf([Yup.ref("password")], "Nhập lại mật khẩu không đúng")
        }),
        onSubmit: (values, { resetForm }) => {
            localStorage.setItem('user', JSON.stringify(values))
            toast.success("Đăng ký tài khoản thành công!", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
            resetForm()
            return setTimeout(() => setChange(false), 2000)
        }
    });
    const handleSignUp = () => {
        setChange(false)
    }

    return (
        <div className='register'>
            <div className='registerContainer'>
                <div className='registerTitle'>
                    <h3>Đăng Ký</h3>
                    <p>Bạn đã có tài khoản ? <a onClick={handleSignUp}>Đăng nhập</a></p>
                </div>
                <form className='registerForm' onSubmit={formik.handleSubmit}>
                    <div className='registerUser'>
                        <input type='text' placeholder='Họ và Tên' name='name' value={formik.values.name} onChange={formik.handleChange} />
                        {formik.errors.name && formik.touched.name && (
                            <p>{formik.errors.name}</p>
                        )}
                    </div>
                    <div className='registerPw'>
                        <input type={eyeSignInPw ? 'text' : 'password'} placeholder='Mật khẩu' name='password' value={formik.values.password} onChange={formik.handleChange} />
                        <FontAwesomeIcon icon={faEye} className={eyeSignInPw ? 'pwEye active' : 'pwEye'} onClick={() => setEyeSignInPw(!eyeSignInPw)}></FontAwesomeIcon>
                        {formik.errors.password && formik.touched.password && (
                            <p>{formik.errors.password}</p>
                        )}
                    </div>
                    <div className='registerRePw'>
                        <input type={eyeSignInRePw ? 'text' : 'password'} placeholder='Nhập lại mật khẩu' name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} />
                        <FontAwesomeIcon icon={faEye} className={eyeSignInRePw ? 'pwEye active' : 'pwEye'} onClick={() => setEyeSignInRePw(!eyeSignInRePw)}></FontAwesomeIcon>
                        {formik.errors.rePassword && formik.touched.rePassword && (
                            <p>{formik.errors.rePassword}</p>
                        )}
                    </div>
                    <div className='registerEmail'>
                        <input type='text' placeholder='Email' name='email' value={formik.values.email} onChange={formik.handleChange} />
                        {formik.errors.email && formik.touched.email && (
                            <p>{formik.errors.email}</p>
                        )}
                    </div>
                    <div className='registerBottom'>
                        <button type="submit" className='registerLogin' >Đăng Ký</button>
                    </div>
                </form>
            </div>
            <ToastContainer position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
        </div>
    )
}
export default Register