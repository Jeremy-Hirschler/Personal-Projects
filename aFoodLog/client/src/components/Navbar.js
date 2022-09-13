import React from 'react'
import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
                <div className='column d-flex justify-content-around align-items-center p-2'>
                    <h4>Quick Links:</h4>
                    <div className='w-50 d-flex justify-content-between mx-5'>
                        <NavLink to='/foodlog/about'>About</NavLink>
                        <NavLink to='/foodlog/home'>Home</NavLink>
                        <NavLink to='/foodlog/new'>Add New Entry</NavLink>
                    </div>
                </div>
    )
}

export default Navbar;