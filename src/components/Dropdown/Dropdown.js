import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

const CustomDropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} tag="li" className="nav-item">
        <DropdownToggle caret tag="a" className="nav-link">
          {props.title}
        </DropdownToggle>

        <DropdownMenu tag='ul'>
          {props.children}
        </DropdownMenu>
      </Dropdown>


    </>
  );
}

export default CustomDropdown;