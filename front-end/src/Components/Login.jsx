import React from 'react';
import GoogleLogin from './login-details/GoogleLogin';
import FacebookLogin from './login-details/FacebookLogin';
import { GoogleOAuthProvider } from "@react-oauth/google";


function Login() {
    const GoogleWrapper = () => (
        <GoogleOAuthProvider clientId="239931340773-blusi2s9lf08spi7f2i2jhhfdn3171s0.apps.googleusercontent.com">
            <GoogleLogin></GoogleLogin>
        </GoogleOAuthProvider>
    )

    return (
        <>
            <div className="flex items-center justify-center h-screen gap-4 mx-auto">
                <GoogleWrapper />
                <FacebookLogin />
            </div>
        </>
    )
}

export default Login
