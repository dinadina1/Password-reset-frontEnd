// import required packages
import { useNavigate } from 'react-router-dom'
import { useFormik } from "formik"
import { useContext, useEffect } from "react"
import ContextData from "../../context/ContextProvider"

// Formik validation
const validate = values => {

  // create error object
  const errors = {}

  // check if email is empty or valid
  if (!values.email) {
    errors.email = 'Required'
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }

  // return error object
  return errors
}

const ForgotPassword = () => {

  // get variables from context
  const { axiosError, forgotPassword, navigate, setNavigate } = useContext(ContextData);

  // assgning navigation variable
  const navigation = useNavigate();

  // navigation on submit
  useEffect(() => {
    navigation(navigate);
    setNavigate(null);
  }, [navigate])


  // formik
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: values => {
      values.email = values.email.trim();
    },
  })


  return (
    <>
      <article className='container register-container mt-5' >
        <form style={{ height: "80vh", padding: "0px 20%" }} onSubmit={formik.handleSubmit}>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Enter Registered Email:</label>
            <input type="email"
              className="form-control"
              id="email"
              placeholder="Ex. john@gmail.com"
              style={{ border: "1px solid", borderRadius: "0" }}
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

          {/* error check if axios error */}
          {
            (axiosError) ? (
              <div className='text-danger'>{axiosError}</div>
            ) : (
              null
            )
          }

          {/* submit button */}
          <div className='text-center pt-3'>
            <button className='nav-item pt-2 pe-3 pb-2 ps-3'
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              onClick={() => forgotPassword(formik.values)}
            >
              Submit
            </button>
          </div>
        </form>
      </article>
    </>
  )
}

// export ForgotPassword component
export default ForgotPassword