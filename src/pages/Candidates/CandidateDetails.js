import React, { Component } from 'react';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Input, Button
} from 'reactstrap';
import { connect } from 'react-redux';
import classname from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import classnames from 'classnames';
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { candidateDetailsOut } from '../../actions/candidate-action';
import { candidateService } from "../../services";
import { functions } from "../../helper/functions";


class CandidateDetails extends Component {

  state = {
    activeTab: '1',
    notes: [],
    note: '',
    edit: false,
    noteId: '',

  }

  //initialize tabs
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  //initialize notes
  getNotes = () => {
    candidateService.getNotes(this.props.singleCandidate.id).then(response => {

      this.setState({
        notes: response.data,
        edit: false
      })
    }).catch(e => {
      console.log(e)
    })
  }

  componentDidMount() {
    this.setState({ activeTab: '1' })
    this.getNotes()
  }
  createNote = () => {
    let { note, edit, noteId } = this.state;
    let { singleCandidate } = this.props;
    let data = {
      candidate: {
        id: singleCandidate.id
      },
      content: note
    }
    candidateService.createNote(data, edit, noteId).then(response => {
      let key = edit == true ? 'updated' : 'added'
      functions.openToaster(`Note ${key} successfully!`)
      let noteList = [];

      if (edit == true) {
        noteList = this.state.notes.map(note => {
          if (note.id == noteId) {
            return {
              ...note,
              content: response.data.content
            }
          }
          return note;

        })
      } else {
        noteList = this.state.notes;
        noteList.push(response.data)
      }

      this.setState({
        notes: noteList,
        edit: false,
        note: '',
        noteId: ''
      })
    }).catch(e => {
      console.log(e)
    })
  }

  switchEditMode = (note) => {
    this.setState({
      noteId: note.id,
      note: note.content,
      edit: true
    })
  }

  render() {

    const { detailsIn, singleCandidate, detailsClose, resumeIn, jobList } = this.props;
    const { notes, edit, note } = this.state;

    console.log(singleCandidate);



    return (
      <div className={classname("profile-wrapper profile-candidate", { active: detailsIn })} style={{ height: '100vh' }}>


        <div className="profile-header">

          <div className="row">
            <div className="col-xl-4">
              <div>
                <h2 className="text-dark d-flex align-items-center">

                  <i style={{ fontSize: '40px' }} onClick={detailsClose} className="mdi mdi-arrow-left text-danger"></i>
                  {singleCandidate && singleCandidate.names ?
                    `${singleCandidate.names.firstName} ${singleCandidate.names.lastName}`
                    : ''
                  }
                </h2>
                <div className="">
                  <span className="border-right pr-2">
                    <i className="mdi mdi-phone mr-2"></i> {singleCandidate && singleCandidate.primaryPhone}
                  </span>
                  <span className="px-2">
                    <i className="mdi mdi-email mr-2"></i> {singleCandidate && singleCandidate.email}
                  </span>
                </div>

              </div>
            </div>
            <div className="col-xl-8">

              {/* Card Box Wrapper  */}
              <div className="row top-box">

                {/* card */}
                <div className="col-md-4 col-lg-2 col-xxxl-2">
                  <div className="card card-default card-sm bg-green-opcity border-rounded mb-3 cursor-pointer"
                    onClick={() => resumeIn(singleCandidate)}
                  >
                    <div className="d-flex justify-content-between mb-2">
                      <div className="left icon">
                        <i className="mdi mdi-file-document"></i>
                      </div>
                    </div>
                    <span className="font-small">Documents</span>
                  </div>
                </div>

                {/* card */}
                <div className="col-md-4 col-lg-2 col-xxxl-2">
                  <a href={singleCandidate && singleCandidate.candidate && singleCandidate.candidate.resume && singleCandidate.candidate.resume.url} download className="card card-default card-sm bg-info-opcity border-rounded mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <div className="left icon">
                        <i className="mdi mdi-download"></i>
                      </div>
                      <div className="right">
                        <span className="text-lg">0</span>
                      </div>
                    </div>
                    <span className="font-small">Download</span>
                  </a>
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

              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-4">

              {/* Activities */}
              <div className="card">
                <div className="card-header bg-white border-bottom-0">
                  <h4 className="mb-0 text-dark"> Activities</h4>
                </div>
                <PerfectScrollbar style={{ maxHeight: '480px' }}>
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
            <div className="col-xl-8">
              <div className="card">

                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '1' })}
                      onClick={() => {
                        this.toggle('1');
                      }}
                    >
                      Personal Info
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '2' })}
                      onClick={() => {
                        this.toggle('2');
                      }}
                    >
                      Address Info
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '3' })}
                      onClick={() => {
                        this.toggle('3');
                      }}
                    >
                      Description
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '4' })}
                      onClick={() => {
                        this.toggle('4');

                      }}
                    >
                      Notes
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab} className="tab-content-search">
                  <TabPane tabId="1">
                    {/* Company Details  */}
                    <div className="card-body pt-0 pb-2">
                      {/* Business Name  */}
                      <div className="media py-2">
                        <div className="icon icon-border mr-3 border-rounded bg-purple">
                          <i className="mdi mdi-briefcase-variant text-white"></i>
                        </div>
                        <div className="media-body">
                          <span className="d-block font-small">Candidate Name</span>
                          <span className="text-dark">

                            {singleCandidate && singleCandidate.names ? `${singleCandidate.names.salutation} ${singleCandidate.names.firstName} 
                                                ${singleCandidate.names.lastName} ${singleCandidate.names.nickName}` : ''}
                          </span>
                        </div>
                      </div>

                      {/* Primary Phone */}
                      <div className="media py-2">
                        <div className="icon icon-border mr-3 border-rounded bg-green">
                          <i className="mdi mdi-cellphone-android text-white"></i>
                        </div>
                        <div className="media-body">
                          <span className="d-block font-small">Primary Phone</span>
                          <span className="text-dark">{singleCandidate && singleCandidate.primaryPhone}</span>
                        </div>
                      </div>

                      {/* Secondary Phone */}
                      <div className="media py-2">
                        <div className="icon icon-border mr-3 border-rounded bg-green">
                          <i className="mdi mdi-cellphone-android text-white"></i>
                        </div>
                        <div className="media-body">
                          <span className="d-block font-small">Secondary Phone</span>
                          <span className="text-dark">{singleCandidate && singleCandidate.secondaryPhone}</span>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="media py-2">
                        <div className="icon icon-border mr-3 border-rounded bg-warning">
                          <i className="mdi mdi-email-outline text-white"></i>
                        </div>
                        <div className="media-body">
                          <span className="d-block font-small">Email</span>
                          <span className="text-dark">{singleCandidate && singleCandidate.email}</span>
                        </div>
                      </div>

                      {/* Account Status */}
                      <div className="media py-2">
                        <div className="icon icon-border mr-3 border-rounded bg-primary">
                          <i className="mdi mdi-wallet-outline text-white"></i>
                        </div>
                        <div className="media-body">
                          <span className="d-block font-small">Account Status</span>
                          <span className="text-dark">
                            {singleCandidate && singleCandidate.accountStatus}
                          </span>
                        </div>
                      </div>

                      {/* Application Form */}
                      {/* <div className="media py-2">
                                        <div className="icon icon-border mr-3 border-rounded bg-secondary">
                                            <i className="mdi mdi-file-document-outline text-white"></i>
                                        </div>
                                        <div className="media-body">
                                            <span className="d-block font-small">Application Form</span>
                                            <span className="text-dark"></span>
                                        </div>
                                    </div> */}

                      {/* Company Source */}
                      {/* <div className="media py-2">
                                        <div className="icon icon-border mr-3 border-rounded bg-teal">
                                            <i className="mdi mdi-office-building-outline text-white"></i>
                                        </div>
                                        <div className="media-body">
                                            <span className="d-block font-small">Recruter</span>

                                        </div>
                                    </div> */}


                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <h1>Address here</h1>
                    {/* Primary Phone */}
                    <div className="media py-2">
                      <div className="icon icon-border mr-3 border-rounded bg-green">
                        <i className="mdi mdi-cellphone-android text-white"></i>
                      </div>
                      <div className="media-body">
                        <span className="d-block font-small">Primary Phone</span>
                        <span className="text-dark">{singleCandidate && singleCandidate.primaryPhone}</span>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tabId="3">
                    <h1>others</h1>
                  </TabPane>
                  <TabPane tabId="4" className="note">
                    <div className="slimscroll">
                      <div className="row">
                        {notes.length > 0 && notes.map((note, index) => {
                          const { names } = note.createdBy;
                          const noteName = `${names && names.salutation} ${names && names.firstName} ${names && names.lastName}`;
                          return <div key={index} className="col-12">
                            <div className="note-inner">
                              <div className="note-body">
                                <p style={{ marginBottom: 0 }}>
                                  {
                                    note && note.createdBy && noteName
                                  }


                                  <span style={{ marginLeft: '20px' }}>({moment(note.updatedTime ? note.updatedTime : note.createdTime).format('hh:mm A')}  - {moment(note.updatedTime ? note.updatedTime : note.createdTime).format('DD MMMM, YY')})</span></p>

                                <p style={{ color: '#000', fontSize: '16px', marginBottom: 0 }}>{note.content}</p>

                              </div>
                              <div className="note-footer d-flex justify-content-end">
                                <Button style={{ opacity: '.5' }} className="btn btn-danger btn-sm"><i className="mdi mdi-trash-can-outline"></i></Button>
                                <Button style={{ opacity: '.5' }} onClick={() => this.switchEditMode(note)} className="btn btn-primary btn-sm"><i className="mdi mdi-pencil"></i></Button>
                              </div>
                            </div>
                          </div>
                        })}
                      </div>

                    </div>
                    <div className="note">
                      <Input
                        placeholder="Enter new notes"
                        onChange={(e) => this.setState({ note: e.target.value })}
                        style={{ height: '100px' }}
                        id="exampleText"
                        name="note"
                        type="textarea"
                        value={note}
                      />
                      <div className="d-flex justify-content-between note-button">
                        <div></div>
                        <div>
                          {edit == true && <Button className="btn btn-danger" onClick={() => this.setState({ edit: false, noteId: '', note: '' })}>Cancel</Button>}
                          <Button style={{ marginLeft: '5px' }} className="btn btn-primary" onClick={this.createNote} disabled={this.state.note == ''}>{edit == true ? 'Update Note' : 'Add New'}</Button>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                </TabContent>





              </div>

              {/* Add Owners */}
              {/*<div className="card px-4">*/}
              {/*    <div className="media py-3 align-items-center">*/}
              {/*        <div className="icon icon-border mr-3 border-rounded bg-light">*/}
              {/*            <i className="mdi mdi-account-circle-outline"></i>*/}
              {/*        </div>*/}
              {/*        <div className="media-body">*/}
              {/*            <span className="d-block text-dark">Recruitment Agency</span>*/}
              {/*            <span className="text-dark">*/}
              {/*                {singleCandidate && singleCandidate.candidate && singleCandidate.candidate.recruiter ?*/}
              {/*                    singleCandidate.candidate.recruiter.appUserAgencyContact.names.salutation + ' ' +*/}
              {/*                    singleCandidate.candidate.recruiter.appUserAgencyContact.names.firstName + ' ' +*/}
              {/*                    singleCandidate.candidate.recruiter.appUserAgencyContact.names.lastName + ' ' +*/}
              {/*                    singleCandidate.candidate.recruiter.appUserAgencyContact.names.nickName : ''*/}
              {/*                }*/}
              {/*            </span>*/}

              {/*        </div>*/}
              {/*    </div>*/}
              {/*</div>*/}

              {/*/!* Add Tags *!/*/}
              {/*<div className="card px-4">*/}
              {/*    <div className="media py-3 align-items-center">*/}
              {/*        <div className="icon icon-border mr-3 border-rounded bg-light">*/}
              {/*            <i className="mdi mdi-tag-outline mdi-rotate-90"></i>*/}
              {/*        </div>*/}
              {/*        <div className="media-body">*/}
              {/*            <span className="d-block text-dark">Add Note</span>*/}
              {/*        </div>*/}
              {/*    </div>*/}
              {/*</div>*/}




            </div>
          </div>

          {/*      <div className="card-body pt-0 px-2">*/}
          {/*          <h2>Applied List</h2>*/}
          {/*          <div className="table-responsive">*/}
          {/*              <table className="table">*/}
          {/*                  <thead>*/}
          {/*                  <tr>*/}
          {/*                      <th>Client Names</th>*/}
          {/*                      <th>Job title</th>*/}
          {/*                      <th>Hiring Type</th>*/}
          {/*                      <th>Status</th>*/}
          {/*                      <th>Expiration Date</th>*/}
          {/*                      <th>Keywords</th>*/}
          {/*                  </tr>*/}
          {/*                  </thead>*/}
          {/*                  <tbody>*/}


          {/*                  {jobList.map(job => {*/}

          {/*                      console.log(job);*/}

          {/*                      return (*/}
          {/*                          <tr key={job.id}>*/}
          {/*                              <td className="cursor-pointer">*/}
          {/*                                  {job.opening.client.name}*/}
          {/*                              </td>*/}
          {/*                              <td className="cursor-pointer">{job.opening.title}</td>*/}

          {/*                              <td>{job.opening.hiringType}</td>*/}

          {/*                              <td>{job.opening.status}</td>*/}
          {/*                              <td>{job.opening.expirationDate}</td>*/}
          {/*                              <td className="keyword">*/}
          {/*                                  <div className="d-flex flex-wrap">*/}
          {/*                                      {job.opening.keywords.map((keyword, i) => {*/}
          {/*                                          return (*/}
          {/*                                              <span key={i} className="px-2 py-1 rounded-pill bg-info text-white mr-1 mb-1">*/}
          {/*                                                      {keyword}*/}
          {/*                                                  </span>*/}
          {/*                                          )*/}
          {/*                                      })}*/}
          {/*                                  </div>*/}
          {/*                              </td>*/}


          {/*                          </tr>*/}
          {/*                      )*/}
          {/*                  })}*/}


          {/*                  </tbody>*/}
          {/*              </table>*/}
          {/*              /!* <nav className="pagination-wrapper">*/}
          {/*  <Paginate*/}
          {/*    previousLabel={'Previous'}*/}
          {/*    nextLabel={'Next'}*/}
          {/*    breakLabel={'...'}*/}
          {/*    breakClassName={'break-me'}*/}
          {/*    pageCount={this.state.pageCount}*/}
          {/*    marginPagesDisplayed={2}*/}
          {/*    pageRangeDisplayed={5}*/}
          {/*    onPageChange={this.handlePageClick}*/}
          {/*    containerClassName={'pagination'}*/}
          {/*    activeClassName={'active'}*/}
          {/*    pageClassName={'page-item'}*/}
          {/*    pageLinkClassName={'page-link'}*/}
          {/*    previousLinkClassName={'page-link'}*/}
          {/*    nextLinkClassName="page-link"*/}
          {/*  />*/}
          {/*</nav> *!/*/}
          {/*          </div>*/}
          {/*      </div>*/}

        </div>


      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    details: state.candidates.candidateDetails
  }
}


export default connect(mapStateToProps, { candidateDetailsOut })(CandidateDetails);
