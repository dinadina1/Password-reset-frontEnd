// import required packages
import { useFormik } from 'formik'
import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import ContextData from '../../context/ContextProvider';

// Formik validation
const validate = (values) => {

  // create errors object
  const errors = {};

  // check if name is valid or empty
  if (!values.name) {
    errors.name = 'Name is required';
  } else if (values.name.length < 3) {
    errors.name = 'Name must be 3 characters or more';
  }

  // check if email is valid or empty
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  // check if password is valid or empty
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be 6 characters or more';
  }

  // check if phone number is valid or empty
  if (!values.phoneNo) {
    errors.phoneNo = 'Phone Number is required';
  } else if (values.phoneNo.length < 10) {
    errors.phoneNo = 'Phone Number must be 10 digits';
  }

  // return errors object
  return errors;
}


const Register = () => {

  // get variables from context
  const { register, axiosError, navigate, setNavigate } = useContext(ContextData)

  // assgning navigation variable
  const navigation = useNavigate();

  // call navigate
  useEffect(() => {
    navigation(navigate);
    setNavigate(null);
  }, [navigate])


  // formik form
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phoneNo: ''
    },
    validate,
    onSubmit: values => {
      values.name = values.name.trim()
      values.email = values.email.trim()
      values.password = values.password.trim()
      values.phoneNo = values.phoneNo.trim()
    }
  })

  return (
    <>
      <h1 className='text-center pt-2 pb-3'>Register</h1>
      <article className='container register-container' >
        <form style={{ height: "80vh", padding: "0px 20%" }} onSubmit={formik.handleSubmit}>

          <div className="mb-3" >
            <label htmlFor="name" className="form-label">Name:</label>
            <input type="text" className="form-control" id="name" placeholder="Ex. John" style={{ border: "1px solid", borderRadius: "0" }}
              name='name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name} />
          </div>

          {/* display error message if name is invalid */}
          {formik.touched.name && formik.errors.name ? (
            <div className='text-danger'>{formik.errors.name}</div>
          ) : null}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" className="form-control" id="email" placeholder="Ex. john@gmail.com" style={{ border: "1px solid", borderRadius: "0" }}
              name='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>

          {/* display error message if email is invalid */}
          {formik.touched.email && formik.errors.email ? (
            <div className='text-danger'>{formik.errors.email}</div>
          ) : null}

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input type="password" className="form-control" id="password" placeholder='Password' style={{ border: "1px solid", borderRadius: "0" }}
              name='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </div>

          {/* display error message if password is invalid */}
          {formik.touched.password && formik.errors.password ? (
            <div className='text-danger'>{formik.errors.password}</div>
          ) : null}

          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">Phone number:</label>
            <input type="tel" className="form-control" id="phoneNumber" placeholder="Phone number" maxLength={10} style={{ border: "1px solid", borderRadius: "0" }}
              name='phoneNo'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNo}
            />
          </div>

          {/* display error message if phone number is invalid */}
          {formik.touched.phoneNo && formik.errors.phoneNo ? (
            <div className='text-danger'>{formik.errors.phoneNo}</div>
          ) : null}

          {/* display error message if any error occured */}
          <p className='text-danger'>{axiosError}</p>

          {/* display register button */}
          <div className='text-center pt-3'>
            <Link >
              <button className='nav-item pt-2 pe-3 pb-2 ps-3' disabled={!(formik.dirty && formik.isValid)} onClick={() => { register(formik.values) }}
              >Register</button>
            </Link>
          </div>
          <div className='text-center pt-3'>
            <p>If already have an account:
              <Link to={'/login'} className='text-decoration-none'> Login here</Link>
            </p>
          </div>
        </form>
      </article>
    </>
  )
}

export default Register