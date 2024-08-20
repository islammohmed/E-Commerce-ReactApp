import { useFormik } from 'formik'

export default function Checkout() {
    let checkoutFormik = useFormik({
        initialValues: {
            street: "",
            city: "",
            phone: ""
        },
        onSubmit: (values) => {
            console.log(values);
        }
    })
    return (
        <>
            <div className="w-50 m-auto my-5">
                <form onSubmit={checkoutFormik.handleSubmit}>
                    <label htmlFor="street">Street</label>
                    <input onChange={checkoutFormik.handleChange} onBlur={checkoutFormik.handleBlur} type="text" name='street' id='street' className='form-control my-3' />
                    <label htmlFor="city">City</label>
                    <input onChange={checkoutFormik.handleChange} onBlur={checkoutFormik.handleBlur} type="text" name='city' id='city' className='form-control my-3' />
                    <label htmlFor="phone">Phone</label>
                    <input onChange={checkoutFormik.handleChange} onBlur={checkoutFormik.handleBlur} type="text" name='phone' id='phone' className='form-control my-3' />
                    <button className='btn bg-main text-white'>PLACE ORDER</button>
                </form>
            </div>

        </>
    )
}
