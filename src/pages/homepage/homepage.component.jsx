import React from 'react';
import { Link } from 'react-router-dom';

import Directory from '../../components/directory/directory.component';
import './homepage.styles.scss';

const HomePage = () => {
    return (
        <div className='homepage'>
            <Link to='/hats'> Hats</Link>
            <Directory />
        </div>
    )
}

export default HomePage;
