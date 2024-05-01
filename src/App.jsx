import { RouterProvider, createBrowserRouter } from "react-router-dom"
import HomeNav from "./wrappers/HomeNav"
import Home from "./components/Home"
import Register from "./components/Register"
import Login from "./components/Login"
import DashboardNav from "./wrappers/DashBoardNav"
import { ToastContainer } from "react-toastify"
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"
import Dashboard from "./components/Dashboard"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeNav />,
    children: [
      {
        path: "/",
        element: <Home />
      },
    ]
  },
  {
    path: "register",
    element: <Register />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "dashboard",
    element: <DashboardNav />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      }
    ]
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "reset-password",
    element: <ResetPassword />
  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App