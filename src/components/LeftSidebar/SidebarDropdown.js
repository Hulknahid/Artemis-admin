import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

function SidebarDropdown(props) {
    const [isShown, setIsShown] = useState(false);



    return (
        <li className="nav-item"
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
        >
            <span className="nav-link">
                <i className={`mdi ${props.iconName}`}></i>
            </span>

            <ul className={classnames("dropdown ", { show: isShown })}>
                {
                    props.routes.map(e => {
                        return <li>
                            <NavLink exact to={`/${e}`} className="nav-link-dropdown" activeClassName="activete">
                                {e}
                            </NavLink>
                        </li>
                    })
                }


            </ul>

        </li>
    )
}

export default SidebarDropdown;
