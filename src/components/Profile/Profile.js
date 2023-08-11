import React from 'react';
import { useNavigate } from 'react-router';
import './style.css';

function Profile() {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("Email");
        localStorage.removeItem("displayName");
        window.alert("Logout successfully")
        window.location.reload();
        navigate('/Login')
    }

    return (
        <>
            <div className='profileContainer'>
                <div className='profile'>
                    <p>{localStorage.getItem('displayName') && localStorage.getItem('displayName')}</p>
                    <p>{localStorage.getItem('Email')}</p>
                    <button onClick={handleLogout}>Log out</button>
                </div>
            </div>
        </>
    )
}

export default Profile