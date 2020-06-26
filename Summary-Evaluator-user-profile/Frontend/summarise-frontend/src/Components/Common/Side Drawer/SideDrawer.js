import React from 'react';
import './SideDrawer.css';

function SideDrawer(props){

    return (

        <nav className="side-drawer">
            <ul>
                <li><a href="/"> Sign In </a></li>
                <li><a href="/"> Join Now </a></li>
            </ul>
        </nav>

        );

}

export default SideDrawer;