import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import baseUrl from '../../utils/baseUrl'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Helmet } from "react-helmet";
export default function Register() {
    const notify = (msg, type) => toast[type](msg);
    const [Loading, setLoading] = useState(false)
    let navigate = useNavigate()
    let validationSchema = Yup.object({
        name: Yup.string().min(3).max(15).required(),
        email: Yup.string().email().required(),
        password: Yup.string().matches(/^[A-Z][a-z0-9@#$%]{5,8}$/, 'password must match the Pattern => "start with capital and follow with smal and @|#|$|%"').required(),
        rePassword: Yup.string().oneOf([Yup.ref('password')], 'password and RePassword not match').required(),
    })
    let registerFormik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
        },
        validationSchema
        ,
        onSubmit: (values) => {
            setLoading(true)
            axios.post(`${baseUrl}/signUp`, values).then((data) => {
                if (data.status == 200) {
                    setLoading(false)
                    notify('Register succesfully', 'success')
                    navigate('/login')
                }
            }).catch((error) => {
                if (error.response.status == 409) {
                    setLoading(false)
                    notify(error.response.data.error, 'error')
                }
            })
        }
    })
    return (
        <>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <div className="w-50 m-auto my-5">
                <h2>Register Now</h2>
                <form onSubmit={registerFormik.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input value={registerFormik.values.name} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} type="text" className='form-control my-3' id='name' name='name' />
                    {registerFormik.touched.name && registerFormik.errors.name ? (
                        <div className='alert alert-danger'>{registerFormik.errors.name}</div>
                    ) : null}
                    <label htmlFor="email">Email</label>
                    <input value={registerFormik.values.email} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} type="email" className='form-control my-3' id='email' name='email' />
                    {registerFormik.touched.email && registerFormik.errors.email ? (
                        <div className='alert alert-danger'>{registerFormik.errors.email}</div>
                    ) : null}
                    <label htmlFor="password">Password</label>
                    <input value={registerFormik.values.password} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} type="password" className='form-control my-3' id='password' name='password' />
                    {registerFormik.touched.password && registerFormik.errors.password ? (
                        <div className='alert alert-danger'>{registerFormik.errors.password}</div>
                    ) : null}
                    <label htmlFor="rePassword">Repassword</label>
                    <input value={registerFormik.values.rePassword} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} type="password" className='form-control my-3' id='rePassword' name='rePassword' />
                    {registerFormik.touched.rePassword && registerFormik.errors.rePassword ? (
                        <div className='alert alert-danger'>{registerFormik.errors.rePassword}</div>
                    ) : null}
                    <button disabled={!(registerFormik.dirty && registerFormik.isValid && !Loading)} type='submit' className='btn bg-main text-white'>
                        {!Loading ? "Register" : <i className='fas fa-spinner fa-spin'></i>}
                    </button>
                </form>
            </div>
        </>
    )
}
