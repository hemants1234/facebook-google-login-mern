//import React from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({setIsAuthenticated}) {

    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const data = localStorage.getItem('user-info');
        const fbData = localStorage.getItem('fb-user-info');
        const userId = JSON.parse(fbData)?.id;
        const token = JSON.parse(data)?.token;
        if (token) {
            setIsAuthenticated(true);
            if (location.pathname === '/' ||
                location.pathname === '/login'
            ) {
                navigate('/dashboard', { replace: false });
            }
        } else if(userId){
            setIsAuthenticated(true);
            if (location.pathname === '/' ||
                location.pathname === '/login'
            ) {
                navigate('/dashboard', { replace: false });
            }
        }
    }, [location, navigate, setIsAuthenticated])


    return (
          
            null
    )
}

export default RefreshHandler
