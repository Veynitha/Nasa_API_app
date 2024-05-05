import React, { useState } from 'react';
import '../../utils/styles/SideBar.css';
import SignOutComponent from '../Auth/SignOut';
import { HomeOutlined, RocketOutlined, CalendarMonth, Info, ExitToApp, ListOutlined  } from '@mui/icons-material';

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
                        <ListOutlined sx={{ color: 'black', marginBottom: '20px'}}/>
                    </button>
                </div>
                <ul className="nav-row">
                    {showBoxIcons && (
                        <>
                            <li>
                            <HomeOutlined sx={{ color: 'black', marginLeft: '10px', marginRight: '10px'}}/>
                                <a href='/'>Home</a>
                            </li>                                      
                            <li>
                                <CalendarMonth sx={{ color: 'black', marginLeft: '10px', marginRight: '10px'}}/>
                                <a href='/daily'>APOD</a>
                            </li>                                     
                            <li>
                                <RocketOutlined sx={{ color: 'black', marginLeft: '10px', marginRight: '10px'}}/>
                                <a href='/rover'>Rover Pics</a>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <nav className='sidebar-inner'>
                <ul className="nav-row">
                    <li>
                        <Info sx={{ color: 'black',marginLeft: '10px', marginRight: '10px'}}/>
                        <a href='/login'>Sign In</a>
                    </li>                                      
                    <li>
                        <ExitToApp sx={{ color: 'black', marginLeft: '10px', marginRight: '10px'}}/>
                        <SignOutComponent />
                    </li>                                                           
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
