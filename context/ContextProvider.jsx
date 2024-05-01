// import required packages
import { useState } from 'react';
import { createContext } from "react";
import { instance } from '../services/instance';

// create context
const ContextData = createContext({})

// create context provider
export const ContextProvider = ({ children }) => {

    // state for axiosError
    const [axiosError, setAxiosError] = useState(null);

    // state for navigate
    const [navigate, setNavigate] = useState(null)

    // Register user
    const register = async (user) => {
        try {
            setAxiosError(null);

            // call register api
            await instance.post("/register", user)

            return (
                alert("Registered Successfully"),
                setNavigate("/")
            )
        }
        catch (error) {
            setAxiosError("User already exists");
            console.log(error);
        }
    }

    // Login user
    const login = async (user) => {
        try {
            setAxiosError(null);

            // call login api
            const data = await instance.post("/login", user);

            // store token in local storage
            localStorage.setItem("token", data.data.token);
            return (
                alert("Logged in Successfully"),
                setNavigate("/dashboard"),
                console.log(data)
            )
        } catch (error) {
            setAxiosError("Invalid Credentials");
            console.log(error);
        }
    }

    // forgot password
    const forgotPassword = async (email) => {
        try {
            setAxiosError(null);

            // call forgot password api
            await instance.post("/forgot-password", email);
            return (
                alert("Check your mail"),
                setNavigate("/reset-password")
            )
        } catch (error) {
            setAxiosError("Invalid email");
            console.log(error);
        }
    }

    // Reset password
    const resetPassword = async (password) => {
        try {
            setAxiosError(null);

            // call reset password api
            await instance.post("/reset-password", {
                newPassword: password.newPassword,
                passwordResetCode: password.passwordResetCode
            });
            return (
                alert("Password changed successfully"),
                setNavigate("/")
            )
        } catch (error) {

            // set error message
            setAxiosError(error.response.data.message);
            console.log(error);
        }
    }

    return (
        <ContextData.Provider value={{
            register, setNavigate, login, forgotPassword, resetPassword, axiosError, navigate
        }}>
            {children}
        </ContextData.Provider>
    )
}

// export ContextData
export default ContextData;
