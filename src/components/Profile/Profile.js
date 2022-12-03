import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import classname from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { profileInvisible } from '../../actions/profile-actions';

import ProfileContacts from './Profile-Contacts';
import Notes from './Notes';
//import axios from '../../axious-config';
import authHeader from "../../helper/authHeader";
const requestsOption = {
  headers: authHeader()
}
class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profileIn: false,
    }
    // this.testLoad();
  }

  // testLoad = () => {

  //   axios.get('/app-settings',requestsOption)
  //     .then(res => {
  //       //console.log(res.data.refData);
  //     })
  //     .catch(err => console.log(err.response))
  // }

  handleAddInfo = (e) => {
    e.preventDefault();
    console.log('handle add info');
  }

  handleClose = () => {
    this.props.profileInvisible();
  }

  render() {
    // const { singleProfile, contactList } = this.state;
    const { profileLoading, singleProfile, profileIn } = this.props.profile;
    const { contactLoading } = this.props.contacts;

    return (
      <div className={classname("profile-wrapper", { active: profileIn })} style={{ height: '100vh' }}>

        {profileLoading && contactLoading && (
          <div className="loader-wrapper">
            <div className="sk-fading-circle">
              <div className="sk-circle1 sk-circle"></div>
              <div className="sk-circle2 sk-circle"></div>
              <div className="sk-circle3 sk-circle"></div>
              <div className="sk-circle4 sk-circle"></div>
              <div className="sk-circle5 sk-circle"></div>
              <div className="sk-circle6 sk-circle"></div>
              <div className="sk-circle7 sk-circle"></div>
              <div className="sk-circle8 sk-circle"></div>
              <div className="sk-circle9 sk-circle"></div>
              <div className="sk-circle10 sk-circle"></div>
              <div className="sk-circle11 sk-circle"></div>
              <div className="sk-circle12 sk-circle"></div>
            </div>
          </div>
        )
        }

        <div className="profile-header">
          <span className="close" onClick={this.handleClose}>
            <i className="mdi mdi-close"></i>
          </span>
          <div className="row">
            <div className="col-xl-4">
              <div>
                <h2 className="text-dark">{singleProfile && singleProfile.name ? singleProfile.name : ''}</h2>
                <div className="">
                  <span className="border-right pr-2">
                    <i className="mdi mdi-phone mr-2"></i> {singleProfile && singleProfile.phone ? singleProfile.phone : ''}
                  </span>
                  {/* <span className="px-2">
                    <i className="mdi mdi-email mr-2"></i> mai.dipu2013@gmail.com
                  </span> */}
                </div>

              </div>
            </div>
            <div className="col-xl-8">
              {/* Card Box Wrapper  */}
              <div className="row top-box">
                {/* card */}
                <div className="col-md-4 col-lg-2 col-xxxl-2">
                  <div className="card card-default card-sm bg-green-opcity border-rounded mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <div className="left icon">
                        <i className="mdi mdi-file-document"></i>
                      </div>
                      <div className="right">
                        <span className="text-lg">2</span>
                      </div>
                    </div>
                    <span className="font-small">Documents</span>
                  </div>
                </div>

                {/* card */}
                <div className="col-md-4 col-lg-2 col-xxxl-2">
                  <div className="card card-default card-sm bg-warning-opcity border-rounded mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <div className="left icon">
                        <i className="mdi mdi-clipboard-outline"></i>
                      </div>
                      <div className="right">
                        <span className="text-lg">0</span>
                      </div>
                    </div>
                    <span className="font-small">No Contract</span>
                  </div>
                </div>

                {/* card */}
                <div className="col-md-4 col-lg-2 col-xxxl-2">
                  <div className="card card-default card-sm bg-info-opcity border-rounded mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <div className="left icon">
                        <i className="mdi mdi-image-multiple"></i>
                      </div>
                      <div className="right">
                        <span className="text-lg">0</span>
                      </div>
                    </div>
                    <span className="font-small">No Photo</span>
                  </div>
                </div>

                {/* card */}
                <div className="col-md-4 col-lg-2 col-xxxl-2">
                  <div className="card card-default card-sm bg-primary-opcity border-rounded mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <div className="left icon">
                        <i className="mdi mdi-briefcase-variant"></i>
                      </div>
                      <div className="right">
                        <span className="text-lg">7</span>
                      </div>
                    </div>
                    <span className="font-small">Opportunities</span>
                  </div>
                </div>

                {/* card */}
                <div className="col-md-4 col-lg-2 col-xxxl-2">
                  <div className="card card-default card-sm bg-teal-opcity border-rounded mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <div className="left icon">
                        <i className="mdi mdi-contacts"></i>
                      </div>
                      <div className="right">
                        <span className="text-lg">4</span>
                      </div>
                    </div>
                    <span className="font-small">Contacts</span>
                  </div>
                </div>

                {/* card */}
                <div className="col-md-4 col-lg-2 col-xxxl-2">
                  <div className="card card-default card-sm bg-teal-opcity border-rounded mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <div className="left icon">
                        <i className="mdi mdi-account-multiple"></i>
                      </div>
                      <div className="right">
                        <span className="text-lg">121</span>
                      </div>
                    </div>
                    <span className="font-small">Candidates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="row">
          <div className="col-xl-7">

            {/* Companies Haire Informations  */}
            <div className="card" style={{ maxHeight: '345px' }}>
              <PerfectScrollbar>
                <div className="hired-infromation-wrapper">
                  <div className="add-info">
                    <ul className="list-unstyled mb-0">

                      <li className="list-item">
                        <Notes
                          profile={this.props.profile}
                        />
                      </li>

                      <li className="list-item">
                        <a className="item-link" onClick={this.handleAddInfo} href="/" >
                          <i className="mdi mdi-clipboard-check"></i>
                          <span>Task</span>
                        </a>
                      </li>

                      <li className="list-item">
                        <a className="item-link" onClick={this.handleAddInfo} href="/" >
                          <i className="mdi mdi-coffee"></i>
                          <span>Coffee Meeting</span>
                        </a>
                      </li>

                      <li className="list-item">
                        <a className="item-link" onClick={this.handleAddInfo} href="/" >
                          <i className="mdi mdi-responsive"></i>
                          <span>Screen</span>
                        </a>
                      </li>

                      <li className="list-item">
                        <a className="item-link" onClick={this.handleAddInfo} href="/" >
                          <i className="mdi mdi-account-supervisor-circle-outline"></i>
                          <span>Ref.Check</span>
                        </a>
                      </li>

                      <li className="list-item">
                        <a className="item-link" onClick={this.handleAddInfo} href="/" >
                          <i className="mdi mdi-contacts"></i>
                          <span>Contract</span>
                        </a>
                      </li>

                    </ul>
                  </div>

                  {/* Hired Informations  */}
                  <div className="hired-infromation">

                    {/* Single Item  */}
                    <div className="media media-icon">
                      <div className="icon mr-3 rounded-circle bg-light">
                        <i className="mdi mdi-briefcase-variant-outline"></i>
                      </div>
                      <div className="media-body">
                        <div className="single-item">
                          <div>
                            <p className="text-dark mb-0">Crelate - CEO</p>
                            <span className="font-small">12/08/2020</span>
                          </div>
                          <div className="text-right">
                            <p className="text-primary mb-0">Hired</p>
                            <span className="font-small">26 Candidates</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Single Item  */}
                    <div className="media media-icon">
                      <div className="icon mr-3 rounded-circle bg-light">
                        <i className="mdi mdi-briefcase-variant-outline"></i>
                      </div>
                      <div className="media-body">
                        <div className="single-item">
                          <div>
                            <p className="text-dark mb-0">Crelate - Customer Service Representative </p>
                            <span className="font-small">12/08/2020</span>
                          </div>
                          <div className="text-right">
                            <p className="text-primary mb-0">Hired</p>
                            <span className="font-small">26 Candidates</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Single Item  */}
                    <div className="media media-icon">
                      <div className="icon mr-3 rounded-circle bg-light">
                        <i className="mdi mdi-briefcase-variant-outline"></i>
                      </div>
                      <div className="media-body">
                        <div className="single-item">
                          <div>
                            <p className="text-dark mb-0">Crelate - Hiring Manager</p>
                            <span className="font-small">12/08/2020</span>
                          </div>
                          <div className="text-right">
                            <p className="text-primary mb-0">Hired</p>
                            <span className="font-small">25 Candidates</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Single Item  */}
                    <div className="media media-icon">
                      <div className="icon mr-3 rounded-circle bg-light">
                        <i className="mdi mdi-briefcase-variant-outline"></i>
                      </div>
                      <div className="media-body">
                        <div className="single-item">
                          <div>
                            <p className="text-dark mb-0">Crelate - Lead Developer</p>
                            <span className="font-small">12/08/2020</span>
                          </div>
                          <div className="text-right">
                            <p className="text-danger mb-0">Lost</p>
                            <span className="font-small">5 Candidates</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Single Item  */}
                    <div className="media media-icon">
                      <div className="icon mr-3 rounded-circle bg-light">
                        <i className="mdi mdi-briefcase-variant-outline"></i>
                      </div>
                      <div className="media-body">
                        <div className="single-item">
                          <div>
                            <p className="text-dark mb-0">Crelate - Supervisor </p>
                            <span className="font-small">12/08/2020</span>
                          </div>
                          <div className="text-right">
                            <p className="text-primary mb-0">Hired</p>
                            <span className="font-small">26 Candidates</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Single Item  */}
                    <div className="media media-icon">
                      <div className="icon mr-3 rounded-circle bg-light">
                        <i className="mdi mdi-briefcase-variant-outline"></i>
                      </div>
                      <div className="media-body">
                        <div className="single-item">
                          <div>
                            <p className="text-dark mb-0">Crelate - Vice President  </p>
                            <span className="font-small">12/08/2020</span>
                          </div>
                          <div className="text-right">
                            <p className="text-primary mb-0">Hired</p>
                            <span className="font-small">26 Candidates</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Single Item  */}
                    <div className="media media-icon">
                      <div className="icon mr-3 rounded-circle bg-light">
                        <i className="mdi mdi-briefcase-variant-outline"></i>
                      </div>
                      <div className="media-body">
                        <div className="single-item">
                          <div>
                            <p className="text-dark mb-0">Crelate - Vice President </p>
                            <span className="font-small">12/08/2020</span>
                          </div>
                          <div className="text-right">
                            <p className="text-primary mb-0">Hired</p>
                            <span className="font-small">26 Candidates</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </PerfectScrollbar>
            </div>

            {/* Icon List with Result  */}
            <div className="card">
              <PerfectScrollbar style={{ minWidth: '250px' }}>
                <div className="result-icon-list py-3">
                  <ul className="list-unstyled mb-0">

                    <li className="list-item">
                      <i className="mdi mdi-file-document"></i>
                      <span>10</span>
                    </li>

                    <li className="list-item">
                      <i className="mdi mdi-clipboard-outline"></i>
                      <span>20</span>
                    </li>

                    <li className="list-item">
                      <i className="mdi mdi-email-outline"></i>
                      <span>6</span>
                    </li>

                    <li className="list-item">
                      <i className="mdi mdi-inbox"></i>
                      <span>17</span>
                    </li>

                    <li className="list-item">
                      <i className="mdi mdi-account-multiple"></i>
                      <span>42</span>
                    </li>
                    <li className="list-item">
                      <i className="mdi mdi-laptop"></i>
                      <span>31</span>
                    </li>
                    <li className="list-item">
                      <i className="mdi mdi-coffee-outline"></i>
                      <span>42</span>
                    </li>
                    <li className="list-item">
                      <i className="mdi mdi-pencil-outline"></i>
                      <span>54</span>
                    </li>
                    <li className="list-item">
                      <i className="mdi mdi-account-reactivate-outline"></i>
                      <span>53</span>
                    </li>
                  </ul>
                </div>
              </PerfectScrollbar>
            </div>


            {/* Activities */}
            <div className="card">
              <div className="card-header bg-white border-bottom-0">
                <h4 className="mb-0 text-dark"> Activities</h4>
              </div>
              <PerfectScrollbar style={{ maxHeight: '250px' }}>
                <div className="card-body pt-0 pb-2">
                  {/* Single Item  */}
                  <div className="media py-2">
                    <div className="icon mr-3 rounded-circle bg-light">
                      <i className="mdi mdi-phone"></i>
                    </div>
                    <div className="media-body">
                      <div className="row">
                        <div className="col-5">
                          <p className="text-dark mb-0">Crelate - CEO</p>
                          <p className="mb-0">
                            Regarding <a href="#" className="text-primary text-underline">Crelate- Lead Developer</a>
                          </p>
                        </div>
                        <div className="col-5">
                          <span className="text-green">Screened</span>
                        </div>
                        <div className="col-2 ">
                          <div className="text-right">
                            <p className="text-primary mb-0 ">2/7</p>
                            <span className="font-small">Jan</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Single Item  */}
                  <div className="media py-2">
                    <div className="icon mr-3 rounded-circle bg-light">
                      <i className="mdi mdi-file-document-outline"></i>
                    </div>
                    <div className="media-body">
                      <div className="row">
                        <div className="col-5">
                          <p className="text-dark mb-0">John.Kimberlee</p>
                          <p className="mb-0">
                            Regarding <a href="#" className="text-primary text-underline">Crelate- Lead Developer</a>
                          </p>
                        </div>
                        <div className="col-5">
                          <span className="text-green">Screened</span>
                        </div>
                        <div className="col-2 ">
                          <div className="text-right">
                            <p className="text-primary mb-0 ">2/7</p>
                            <span className="font-small">Jan</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Single Item  */}
                  <div className="media py-2">
                    <div className="icon mr-3 rounded-circle bg-light">
                      <i className="mdi mdi-file-document-outline"></i>
                    </div>
                    <div className="media-body">
                      <div className="row">
                        <div className="col-5">
                          <p className="text-dark mb-0">John.Kimberlee</p>
                          <p className="mb-0">
                            Regarding <a href="#" className="text-primary text-underline">Crelate- Lead Developer</a>
                          </p>
                        </div>
                        <div className="col-5">
                          <span className="text-green">Screened</span>
                        </div>
                        <div className="col-2 ">
                          <div className="text-right">
                            <p className="text-primary mb-0 ">2/7</p>
                            <span className="font-small">Jan</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Single Item  */}
                  <div className="media py-2">
                    <div className="icon mr-3 rounded-circle bg-light">
                      <i className="mdi mdi-file-document-outline"></i>
                    </div>
                    <div className="media-body">
                      <div className="row">
                        <div className="col-5">
                          <p className="text-dark mb-0">John.Kimberlee</p>
                          <p className="mb-0">
                            Regarding <a href="#" className="text-primary text-underline">Crelate- Lead Developer</a>
                          </p>
                        </div>
                        <div className="col-5">
                          <span className="text-green">Screened</span>
                        </div>
                        <div className="col-2 ">
                          <div className="text-right">
                            <p className="text-primary mb-0 ">2/7</p>
                            <span className="font-small">Jan</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Single Item  */}
                  <div className="media py-2">
                    <div className="icon mr-3 rounded-circle bg-light">
                      <i className="mdi mdi-file-document-outline"></i>
                    </div>
                    <div className="media-body">
                      <div className="row">
                        <div className="col-5">
                          <p className="text-dark mb-0">John.Kimberlee</p>
                          <p className="mb-0">
                            Regarding <a href="#" className="text-primary text-underline">Crelate- Lead Developer</a>
                          </p>
                        </div>
                        <div className="col-5">
                          <span className="text-green">Screened</span>
                        </div>
                        <div className="col-2 ">
                          <div className="text-right">
                            <p className="text-primary mb-0 ">2/7</p>
                            <span className="font-small">Jan</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Single Item  */}
                  <div className="media py-2">
                    <div className="icon mr-3 rounded-circle bg-light">
                      <i className="mdi mdi-file-document-outline"></i>
                    </div>
                    <div className="media-body">
                      <div className="row">
                        <div className="col-5">
                          <p className="text-dark mb-0">John.Kimberlee</p>
                          <p className="mb-0">
                            Regarding <a href="#" className="text-primary text-underline">Crelate- Lead Developer</a>
                          </p>
                        </div>
                        <div className="col-5">
                          <span className="text-green">Screened</span>
                        </div>
                        <div className="col-2 ">
                          <div className="text-right">
                            <p className="text-primary mb-0 ">2/7</p>
                            <span className="font-small">Jan</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Single Item  */}
                  <div className="media py-2">
                    <div className="icon mr-3 rounded-circle bg-light">
                      <i className="mdi mdi-file-document-outline"></i>
                    </div>
                    <div className="media-body">
                      <div className="row">
                        <div className="col-5">
                          <p className="text-dark mb-0">John.Kimberlee</p>
                          <p className="mb-0">
                            Regarding <a href="#" className="text-primary text-underline">Crelate- Lead Developer</a>
                          </p>
                        </div>
                        <div className="col-5">
                          <span className="text-green">Screened</span>
                        </div>
                        <div className="col-2 ">
                          <div className="text-right">
                            <p className="text-primary mb-0 ">2/7</p>
                            <span className="font-small">Jan</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Single Item  */}
                  <div className="media py-2">
                    <div className="icon mr-3 rounded-circle bg-light">
                      <i className="mdi mdi-file-document-outline"></i>
                    </div>
                    <div className="media-body">
                      <div className="row">
                        <div className="col-5">
                          <p className="text-dark mb-0">John.Kimberlee</p>
                          <p className="mb-0">
                            Regarding <a href="#" className="text-primary text-underline">Crelate- Lead Developer</a>
                          </p>
                        </div>
                        <div className="col-5">
                          <span className="text-green">Screened</span>
                        </div>
                        <div className="col-2 ">
                          <div className="text-right">
                            <p className="text-primary mb-0 ">2/7</p>
                            <span className="font-small">Jan</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Single Item  */}
                  <div className="media py-2">
                    <div className="icon mr-3 rounded-circle bg-light">
                      <i className="mdi mdi-file-document-outline"></i>
                    </div>
                    <div className="media-body">
                      <div className="row">
                        <div className="col-5">
                          <p className="text-dark mb-0">John.Kimberlee</p>
                          <p className="mb-0">
                            Regarding <a href="#" className="text-primary text-underline">Crelate- Lead Developer</a>
                          </p>
                        </div>
                        <div className="col-5">
                          <span className="text-green">Screened</span>
                        </div>
                        <div className="col-2 ">
                          <div className="text-right">
                            <p className="text-primary mb-0 ">2/7</p>
                            <span className="font-small">Jan</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Single Item  */}
                  <div className="media py-2">
                    <div className="icon mr-3 rounded-circle bg-light">
                      <i className="mdi mdi-file-document-outline"></i>
                    </div>
                    <div className="media-body">
                      <div className="row">
                        <div className="col-5">
                          <p className="text-dark mb-0">John.Kimberlee</p>
                          <p className="mb-0">
                            Regarding <a href="#" className="text-primary text-underline">Crelate- Lead Developer</a>
                          </p>
                        </div>
                        <div className="col-5">
                          <span className="text-green">Screened</span>
                        </div>
                        <div className="col-2 ">
                          <div className="text-right">
                            <p className="text-primary mb-0 ">2/7</p>
                            <span className="font-small">Jan</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </PerfectScrollbar>

            </div>

          </div>
          <div className="col-xl-5">
            <div className="row">
              <div className="col-md-6 col-xl-12 col-xxl-6">
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center bg-white border-bottom-0">
                    <h4 className="mb-0 text-dark">Details</h4>
                    <UncontrolledDropdown>
                      <DropdownToggle caret tag="a" className="text-secondary">
                        <span className="text-primary">Edit</span>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>Action1</DropdownItem>
                        <DropdownItem>Action2</DropdownItem>
                        <DropdownItem>Action3</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>

                  </div>

                  {/* Company Details  */}
                  <div className="card-body pt-0 pb-2">
                    {/* Business Name  */}
                    <div className="media py-2">
                      <div className="icon icon-border mr-3 border-rounded bg-purple">
                        <i className="mdi mdi-briefcase-variant text-white"></i>
                      </div>
                      <div className="media-body">
                        <span className="d-block font-small">Business Name</span>
                        <span className="text-dark">{singleProfile && singleProfile.name ? singleProfile.name : ''}</span>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="media py-2">
                      <div className="icon icon-border mr-3 border-rounded bg-green">
                        <i className="mdi mdi-cellphone-android text-white"></i>
                      </div>
                      <div className="media-body">
                        <span className="d-block font-small">Phone</span>
                        <span className="text-dark">{singleProfile && singleProfile.phone ? singleProfile.phone : ''}</span>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="media py-2">
                      <div className="icon icon-border mr-3 border-rounded bg-warning">
                        <i className="mdi mdi-email-outline text-white"></i>
                      </div>
                      <div className="media-body">
                        <span className="d-block font-small">Email</span>
                        <span className="text-dark"></span>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="media py-2">
                      <div className="icon icon-border mr-3 border-rounded bg-info">
                        <i className="mdi mdi-map-marker-outline text-white"></i>
                      </div>
                      <div className="media-body">
                        <span className="d-block font-small">Address</span>
                        <span className="text-dark">


                          {singleProfile && singleProfile.address ?
                            `${singleProfile.address.street} ${singleProfile.address.state} ${singleProfile.address.city} ${singleProfile.address.state} `
                            : ''}
                        </span>
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div className="media py-2">
                      <div className="icon icon-border mr-3 border-rounded bg-primary">
                        <i className="mdi mdi-wallet-outline text-white"></i>
                      </div>
                      <div className="media-body">
                        <span className="d-block font-small">Billing Address</span>
                        <span className="text-dark"></span>
                      </div>
                    </div>

                    {/* Application Form */}
                    <div className="media py-2">
                      <div className="icon icon-border mr-3 border-rounded bg-secondary">
                        <i className="mdi mdi-file-document-outline text-white"></i>
                      </div>
                      <div className="media-body">
                        <span className="d-block font-small">Application Form</span>
                        <span className="text-dark"></span>
                      </div>
                    </div>

                    {/* Company Source */}
                    <div className="media py-2">
                      <div className="icon icon-border mr-3 border-rounded bg-teal">
                        <i className="mdi mdi-office-building-outline text-white"></i>
                      </div>
                      <div className="media-body">
                        <span className="d-block font-small">Company Source</span>
                        <span className="text-dark"></span>
                      </div>
                    </div>


                  </div>

                </div>

                {/* Add Owners */}
                <div className="card px-4">
                  <div className="media py-3 align-items-center">
                    <div className="icon icon-border mr-3 border-rounded bg-light">
                      <i className="mdi mdi-account-circle-outline"></i>
                    </div>
                    <div className="media-body">
                      <span className="d-block text-dark">Company Source</span>
                    </div>
                  </div>
                </div>

                {/* Add Tags */}
                <div className="card px-4">
                  <div className="media py-3 align-items-center">
                    <div className="icon icon-border mr-3 border-rounded bg-light">
                      <i className="mdi mdi-tag-outline mdi-rotate-90"></i>
                    </div>
                    <div className="media-body">
                      <span className="d-block text-dark">Add Tags</span>
                    </div>
                  </div>
                </div>


              </div>

              <div className="col-md-6 col-xl-12 col-xxl-6">

                <ProfileContacts />
              </div>

            </div>
          </div>
        </div>






      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    contacts: state.contacts
  }
}


export default connect(mapStateToProps, { profileInvisible })(Profile);
