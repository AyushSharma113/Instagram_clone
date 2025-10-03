import React from 'react'
import { Outlet } from 'react-router-dom';
import Feed from './Feed';

const Home = () => {

    return (
        <div className='flex'>
            <div className='flex-grow'>
                <Feed />
                <Outlet />
            </div>
        </div>
    )
}

export default Home