import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { profileInvisible } from '../../actions/profile-actions';
import classnames from 'classnames';
import SidebarDropdown from './SidebarDropdown';


class LeftSidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      focus: false,
      dropdown: false
    }
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.profileInvisible()
  }

  render() {
    return (
      <aside className="left-sidebar">
        <div className="sidebar">

          <nav>
            <ul className="sidebar-nav">

              <li className="nav-item">
                <NavLink exact to="/dashboard" className="nav-link" activeClassName="activete" onClick={this.handleClose}>
                  <i className="mdi mdi-home-outline"></i>
                </NavLink>
              </li>

              {/* Agency  */}
              <li className="nav-item">
                <NavLink exact to="/agencies" className="nav-link" activeClassName="activete" onClick={this.handleClose}>
                  <i className="mdi mdi-office-building"></i>
                </NavLink>
              </li>

              {/* Clients  */}
              <li className="nav-item">
                <NavLink exact to="/clients" className="nav-link" activeClassName="activete" onClick={this.handleClose}>
                  <i className="mdi mdi-account-multiple-outline"></i>
                </NavLink>
              </li>

              {/* Calender  */}
              <li className="nav-item">
                <NavLink exact to="/appointments" className="nav-link" activeClassName="activete" onClick={this.handleClose}>
                  <i className="mdi mdi-calendar-check"></i>
                </NavLink>
              </li>

              {/* Jobs  */}
              <li className="nav-item">
                <NavLink exact to="/jobs" className="nav-link" activeClassName="activete" onClick={this.handleClose}>
                  <i className="mdi mdi-briefcase-variant-outline"></i>
                </NavLink>
              </li>

              <SidebarDropdown
                routes={["skills", "candidates"]}
                iconName="mdi-account-tie"
              />

              {/* Candidate  */}
              {/* <li className="nav-item">
                <span className="nav-link" on>
                  <i className="mdi mdi-account-tie"></i>
                </span>

                <ul className='dropdown'>
                  <li>
                    <NavLink exact to="/candidates" className="nav-link" activeClassName="activete" onClick={this.handleClose}>
                      <i className="mdi mdi-account-tie"></i>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/candidates" className="nav-link" activeClassName="activete" onClick={this.handleClose}>
                      <i className="mdi mdi-account-tie"></i>
                    </NavLink>
                  </li>
                </ul>

              </li> */}



            </ul>
          </nav>
        </div>
      </aside>
    )
  }
}

export default connect(null, { profileInvisible })(LeftSidebar);