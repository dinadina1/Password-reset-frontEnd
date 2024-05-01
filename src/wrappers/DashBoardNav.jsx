import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

// Get current logged in user
const currentUser = async () => {
  try {
    const response = await axios.get('https://password-reset-qh1e.onrender.com/getUser', {
      headers: {
        authorization: `${localStorage.getItem('token')}`
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Logout user
const logout = async () => {
  try {
    const response = await axios.get('https://password-reset-qh1e.onrender.com/logout', {
      headers: {
        authorization: `${localStorage.getItem('token')}`
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Component
const DashboardNav = () => {

  // State for store response data
  const [data, setData] = useState('');
  const navigate = useNavigate();

  // Get current logged in user
  useEffect(() => {
    const fetchData = async () => {
      const userData = await currentUser();
      if (userData) {
        setData(userData.name);
      } else {
        console.log("something went wrong");
      }
    };

    fetchData();
  }, []);

  // Logout user
  const handleLogout = async () => {
    const response = await logout();
    if (response) {
      localStorage.removeItem('token');
      navigate('/');
    } else {
      console.log("something went wrong");
    }
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand ps-3 fw-bold">Welcome {data}</Link>
          <button className='navbar-brand ps-3 pe-3' onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default DashboardNav;
