import React, { useState } from 'react';
import '../../utils/styles/SideBar.css';
import { BoxIconElement } from 'boxicons';
import SignOutComponent from '../Auth/SignOut';

function Sidebar() {
    const [showBoxIcons, setShowBoxIcons] = useState(true);

    const handleButtonClick = () => {
        setShowBoxIcons(!showBoxIcons);
    };

    const handleLinkClick = (event) => {
        if (event.target.tagName === 'LI') {
            const link = event.target.querySelector('a');
            if (link) {
                window.location.href = link.href;
            }
        }
    };

    return (
        <div className={`sidebar ${showBoxIcons ? '' : 'box-icons-only'}`}>
            <nav className='sidebar-inner' onClick={handleLinkClick}>
                <div className="logo">
                    <button className="icon-button" onClick={handleButtonClick}>
                        <box-icon name='list-ul' size='lg'></box-icon>
                    </button>
                </div>
                <ul className="nav-row">
                    {showBoxIcons && (
                        <>
                            <li>
                                <box-icon name='home' className="icon" ></box-icon>
                                <a href='/'>Home</a>
                            </li>                                      
                            <li>
                                <box-icon name='calendar-alt'></box-icon>
                                <a href='/daily'>APOD</a>
                            </li>                                     
                            <li>
                                <box-icon name='rocket' className="icon" ></box-icon>
                                <a href='/rover'>Rover Pics</a>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <nav className='sidebar-inner'>
                <ul className="nav-row">
                    <li>
                        <box-icon name='info-square'></box-icon>
                        <a href='/login'>Sign In</a>
                    </li>                                      
                    <li>
                        <box-icon type='solid' name='log-out'></box-icon>
                        <SignOutComponent />
                    </li>                                                           
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
