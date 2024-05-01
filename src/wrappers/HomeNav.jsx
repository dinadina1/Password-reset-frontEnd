import { Link, Outlet } from 'react-router-dom'

const HomeNav = () => {
  return (
    <>
      <nav className="navbar " style={{ backgroundColor: "rgba(248,240,250,0.1)" }} >
        <div className="container-fluid">
          <Link className="navbar-brand ps-3 fw-bold">FASHION</Link>
          <div>
            <Link to={'/register'} className='nav-item ps-3 pt-2 pe-3 pb-2 me-4'>Register
            </Link>
            <Link to={'/login'} className='nav-item ps-3 pt-2 pe-3 pb-2'>Login
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}

export default HomeNav