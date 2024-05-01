// import required packages
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik"
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom"
import ContextData from "../../context/ContextProvider";

// Formik validation
const validate = values => {

  // create errors object
  const errors = {};

  // validate email
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  // validate password
  if (!values.password) {
    errors.password = 'Password is required';
  }

  // return errors object
  return errors;
}

const Login = () => {

  // get variables from context
  const { login, axiosError, navigate, setNavigate } = useContext(ContextData);

  // assgning navigation variable
  const navigation = useNavigate();

  // call navigate
  useEffect(() => {
    navigation(navigate);
    setNavigate(null);
  }, [navigate])

  // form validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validate,
    onSubmit: values => {
      email = values.email.trim()
      password = values.password.trim()
    }
  })

  return (
    <>
      <h1 className='text-center pt-2 pb-3'>Login</h1>
      <article className='container register-container' >
        <form style={{ height: "80vh", padding: "0px 20%" }} onSubmit={formik.handleSubmit}>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input type="email" className="form-control" id="email" placeholder="Ex. john@gmail.com" style={{ border: "1px solid", borderRadius: "0" }}
              name='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>

          {/* error check if email is valid or empty */}
          {
            (formik.touched.email && formik.errors.email) ? (
              <div className='text-danger'>{formik.errors.email}</div>
            ) : (
              null
            )
          }

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input type="password" className="form-control" id="password" placeholder='Password' style={{ border: "1px solid", borderRadius: "0" }}
              name='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </div>

          {/* error check if password is valid or empty */}
          {
            (formik.touched.password && formik.errors.password) ? (
              <div className='text-danger'>{formik.errors.password}</div>
            ) : (
              null
            )
          }

          {/* error check if axios error */}
          <p className='text-danger'>{axiosError}</p>

          {/* submit button */}
          <div className='text-center pt-3'>
            <Link  >
              <button className='nav-item pt-2 pe-3 pb-2 ps-3' disabled={!(formik.dirty && formik.isValid)} onClick={() => { login(formik.values) }}>
                Login
              </button>
            </Link>
          </div>
          <div className='text-center pt-3'>
            <Link to={'/forgot-password'} className='text-decoration-none'> Forgot Password</Link>
          </div>

          <div className='text-center pt-3'>
            <p>Don't have an account:
              <Link to={'/register'} className='text-decoration-none'> Sign up</Link>
            </p>
          </div>

        </form>
      </article>
    </>
  )
}

// export login component
export default Login