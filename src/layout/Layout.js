import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Header from '../components/Header/Header';
import Sidebar from '../components/LeftSidebar/LeftSidebar';
import Profile from '../components/Profile/Profile';
import OpportunityDetails from '../components/Jobs/JobsDetails'
import {userFromLocalStorage} from "../axious-config";





class Layout extends Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   headerSidebar: true
    // }

  }





  componentDidMount() {

    // // const { location } = this.props;
    // console.log(this.props.location);

    // // // console.log(this.props);
    // if (this.props.location.pathname === '/login') {
    //   this.setState({ headerSidebar: false })
    // } else {
    //   this.setState({ headerSidebar: true })
    // }


    // // if (location.pathname !== '/login') {
    // //   this.setState({ headerSidebar: false })
    // // } else {
    // //   this.setState({ headerSidebar: true })
    // // }
  }


  render() {
    const { pathname } = this.props.location;

    return (
      <div className="main-wrapper">
        {pathname !== '/login' ? <Header /> : ''}
        <main className="page-wrapper">
          {pathname !== '/login' ? <Sidebar /> : ''}

          <div className="page-content">
            {this.props.children}
          </div>


        </main>
        {userFromLocalStorage()?.token && <Profile />}

        {/* <OpportunityDetails /> */}

      </div>
    )
  }
}

export default withRouter(Layout);
