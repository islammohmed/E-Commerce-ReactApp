import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import baseUrl from '../../utils/baseUrl'
import { useNavigate } from 'react-router-dom'
import { notify } from '../../utils/notify'

export default function Login({ saveUserData }) {

    const [Loading, setLoading] = useState(false)
    let navigate = useNavigate()
    let validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
    })
    let registerFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema
        ,
        onSubmit: (values) => {
            setLoading(true)
            axios.post(`${baseUrl}/signIn`, values).then((data) => {
                if (data.status == 200) {
                    localStorage.setItem('token', data.data.token)
                    setLoading(false)
                    saveUserData()
                    notify('Login succesfully', 'success')
                    navigate('/')
                }
            }).catch((error) => {
                if (error.response.status == 401) {
                    setLoading(false)
                    notify(error.response.data.error, 'error')
                }
                if (error.response.status == 404) {
                    setLoading(false)
                    notify(error.response.data.error, 'error')
                }
            })
        }
    })
    return (
        <>
            <div className="w-50 m-auto my-5">
                <h2>Login Now</h2>
                <form onSubmit={registerFormik.handleSubmit}>

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

                    <button disabled={!(registerFormik.dirty && registerFormik.isValid && !Loading)} type='submit' className='btn bg-main text-white'>
                        {!Loading ? "Login" : <i className='fas fa-spinner fa-spin'></i>}
                    </button>
                </form>
            </div>
        </>
    )
}
