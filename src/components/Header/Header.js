import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link, withRouter } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Media
} from 'reactstrap';
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { logoutAction } from '../../actions/user-actions'

import Logo from '../../assets/img/logo.svg';
import User from '../../assets/img/user-1.jpg';
import HeaderSearch from '../HeaderSearch/HeaderSearch';
import {functions} from "../../helper/functions";


class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      historyToggle: false,
      user: JSON.parse(localStorage.getItem('user'))
    }
    this.handleHistoryToggle = this.handleHistoryToggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  // Logout
  handleLogout() {
    this.props.logoutAction(this.props.history)
  }

  // Call History
  handleHistoryToggle(e) {
    e.preventDefault()
    this.setState(state => ({
      historyToggle: !state.historyToggle
    }))
  }

  render() {
    const { historyToggle,user } = this.state;

    return (
      <header>
        <Navbar expand="md" className="navbar-custom">
          <span className="baricon">
            <i className="mdi mdi-menu"></i>
          </span>

          <Link to="/dashboard">
            <img src={Logo} alt="Artimis" />
          </Link>

          <Collapse navbar>
            <Nav navbar>

              <NavItem>
                <Media className="media-sm">

                  <Media left className="mr-2">
                    <Media object src={User} alt="Generic placeholder image" />
                  </Media>

                  <Media body>
                    <Media heading >{user?.names?.firstName+" "+user?.names?.lastName}</Media>
                    <ul className="list-unstyled" >
                      <li>
                        <i className="mdi mdi-cellphone-iphone"></i>
                        {functions.formatPhoneNumbers(user?.primaryPhone)}</li>
                      <li>
                        <i className="mdi mdi-email"></i>
                        {user?.email}
                      </li>

                    </ul>
                  </Media>


                </Media>
              </NavItem>

            </Nav>

            <Nav navbar className="navbar-nav-right">
              <li>
                <HeaderSearch />
              </li>
              {/* Calling History  */}
              <NavItem className="nav-item-history" >
                <div className="nav-link" onClick={this.handleHistoryToggle}>
                  <i className="mdi mdi-message-settings-outline"></i>
                </div>
                {/*className="history-wrrapper"*/}
                <div  className={classnames('history-wrrapper', { active: historyToggle })}>
                  <div className="history-content" >
                    <div className="history-header">
                      <div className="filter">
                        <div className="filter-toggler">
                          <i className="mdi mdi-format-list-bulleted"></i>
                          <span>Filter</span>
                        </div>
                        <div className="filter-content">

                        </div>
                      </div>
                      <div className="title">Recent Communications </div>
                      <button className="btn btn-close" onClick={this.handleHistoryToggle}>
                        <i className="mdi mdi-close"></i>
                      </button>
                    </div>
                    <div className="history-body" >
                      <PerfectScrollbar>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>
                        <div className="single-history">
                          <Media className="media-sm">
                            <Media left className="mr-2">
                              <Media object src={User} alt="Generic placeholder image" />
                            </Media>

                            <Media body className="d-flex flex-wrap justify-content-between">
                              <div className="d-flex flex-wrap flex-column">
                                <h6>Aliul islam dipu</h6>
                                <span>mai.dipu2013@gmail.com</span>
                                <span>Sat, Oct 24 2020 11:54 am</span>
                              </div>
                              <div className="d-flex flex-wrap">
                                <button className="btn">
                                  <i className="mdi mdi-email-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-comment-multiple-outline"></i>
                                </button>
                                <button className="btn">
                                  <i className="mdi mdi-phone-outline"></i>
                                </button>
                              </div>
                            </Media>
                          </Media>
                        </div>

                      </PerfectScrollbar>
                    </div>
                    <div className="history-footer" style={{ height: '70px' }}></div>
                  </div>
                </div>
              </NavItem>



              <UncontrolledDropdown nav inNavbar className="dropdown-notify">
                <DropdownToggle nav >
                  <i className="mdi mdi-bell-ring-outline"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem> Option 1 </DropdownItem>
                  <DropdownItem> Option 2 </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem> Reset </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              {/* Logout  */}
              <NavItem className="nav-item-logout">
                <div className="nav-link" onClick={this.handleLogout}>
                  <i className="i mdi mdi-logout"></i>
                </div>
              </NavItem>

            </Nav>




          </Collapse>
        </Navbar>
      </header>
    )
  }
}

export default connect(null, { logoutAction })(withRouter(Header))
