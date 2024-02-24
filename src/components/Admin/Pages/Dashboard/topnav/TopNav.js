import React, { useEffect, useState } from 'react'
import './topnav.scss';
import { getCustomerApis } from '../../../../../api/Customer';

const TopNav = () => {
    const [User, setUser] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await getCustomerApis();
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const openSidebar = () => {
        document.body.classList.add('sidebar-open');
    };
    return (
        <div className='topnav'>
            <div className='user-info'>
                <div className="user-info__name">
                    <span>{User.name}</span>
                </div>
            </div>
            <div className="sidebar-toggle" onClick={openSidebar}>
                <i className='bx bx-menu-alt-right'></i>
            </div>
        </div>
    )
}

export default TopNav
