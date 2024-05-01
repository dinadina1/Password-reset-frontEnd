// import required packages
import { useFormik } from "formik"
import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import ContextData from "../../context/ContextProvider"

// Formik validation
const validate = values => {

  // create error object
  const errors = {}

  // validate newPassword
  if (!values.newPassword) {
    errors.newPassword = 'Password Required'
  } else if (values.newPassword.length < 8) {
    errors.newPassword = 'Password must be 8 characters or more'
  }

  // validate confirm password
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Password Required'
  } else if (values.confirmPassword.length < 8) {
    errors.confirmPassword = 'Password must be 8 characters or more'
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = 'Password does not match'
  }

  // validate password reset code
  if (!values.passwordResetCode) {
    errors.passwordResetCode = 'Token Required'
  } else if (values.passwordResetCode.length !== 6) {
    errors.passwordResetCode = 'Must be 6 characters'
  }

  // return error object
  return errors;
}


const ResetPassword = () => {

  // get variables from context
  const { axiosError, resetPassword, navigate, setNavigate } = useContext(ContextData);

  // assgning navigation variable
  const navigation = useNavigate();

  // navigation on submit
  useEffect(() => {
    navigation(navigate);
    setNavigate(null);
  }, [navigate])

  // form validation
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
      passwordResetCode: ''
    },
    validate,
    onSubmit: values => {
      values.newPassword = values.newPassword.trim();
      values.passwordResetCode = values.passwordResetCode.trim();
    }
  })

  return (
    <>
      <article className='container register-container pt-5' >
        <form style={{ height: "80vh", padding: "0px 20%" }} onSubmit={formik.handleSubmit}>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Enter new Password:</label>
            <input type="password"
              className="form-control"
              id="password"
              placeholder='New Password'
              style={{ border: "1px solid", borderRadius: "0" }}
              name="newPassword"
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              onBlur={formik.handleBlur}
            />
          </div>

          {/* display error message if password is invalid */}
          {
            (formik.touched.newPassword && formik.errors.newPassword) ? (
              <div className='text-danger'>{formik.errors.newPassword}</div>
            ) : (
              null
            )
          }

          <div className="mb-3">
            <label htmlFor="confirm-password" className="form-label">Confirm Password:</label>
            <input type="password"
              className="form-control"
              id="confirm-password"
              placeholder='Confirm Password'
              style={{ border: "1px solid", borderRadius: "0" }}
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
            />
          </div>

          {/* display error message if confirm password is invalid */}
          {
            (formik.touched.confirmPassword && formik.errors.confirmPassword) ? (
              <div className='text-danger'>{formik.errors.confirmPassword}</div>
            ) : (
              null
            )
          }

          <div className="mb-3">
            <label htmlFor="token" className="form-label">Enter Email Token:</label>
            <input type="text"
              className="form-control"
              id="token"
              placeholder='Your token'
              style={{ border: "1px solid", borderRadius: "0" }}
              name="passwordResetCode"
              onChange={formik.handleChange}
              value={formik.values.passwordResetCode}
              onBlur={formik.handleBlur}
            />
          </div>

          {/* display error message if token is invalid */}
          {
            (formik.touched.passwordResetCode && formik.errors.passwordResetCode) ? (
              <div className='text-danger'>{formik.errors.passwordResetCode}</div>
            ) : (
              null
            )
          }

          {/* display error message if any error occured */}
          {
            axiosError ? (
              <div className='text-danger'>{axiosError}</div>
            ) : (
              null
            )
          }

          <div className='text-center pt-3'>
            <button type="submit"
              className='nav-item pt-2 pe-3 pb-2 ps-3'
              onClick={() => resetPassword(formik.values)}
              disabled={!(formik.dirty && formik.isValid)}
            >
              Save
            </button>
          </div>
        </form>
      </article>
    </>
  )
}

export default ResetPassword