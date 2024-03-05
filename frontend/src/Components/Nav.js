import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    let auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('\signup')
    }

    return (

        auth ?
            <ul className='nav-ul'>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/add'}>Add</Link></li>
                {/* <li><Link to={'/update'}>Update</Link></li> */}
                <li><Link to={'/signup'} onClick={handleLogout}>Logout ({JSON.parse(auth).name}) </Link></li>
            </ul> :
            <ul className='nav-ul nav-right'>
                <li><Link to={'/signup'}>Signup</Link></li>
                <li className='li-right'><Link to={'/login'}>Login</Link></li>
            </ul>


    )
}

export default Nav;