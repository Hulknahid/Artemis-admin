import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//import { Form, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Col, Row, Button } from 'reactstrap';
//import Select from 'react-select';
//import SimpleReactValidator from 'simple-react-validator';
//import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Paginate from 'react-paginate';

import axiosInstance from '.././../axious-config';
import authHeader from '../../helper/authHeader';
import JobsApply from '../../components/Jobs/JobsApply';
import ApplyedList from '../../components/Jobs/JobApplyList';
import JobDetails from '../../components/Jobs/JobsDetails';


class Opportunities extends Component {
  constructor(props) {
    super(props)

    this.state = {
      size: 50,
      loading: true,
      jobList: [],
      jobDetailsIn: false,

      applayModal: false,
      applayModalType: '',
      jobId: '',
      applyListIn: false,
      applyId: '',
      singleJobData: {},
      page: 0,
      applyedList: [],
      singleApplyData: {}
    }

    this.getAllJobs(0)

    // this.refTest =
  }

  // Get All Data Invoke
  getAllJobs(page) {
    const requestOptions = {
      headers: authHeader()
    }

    this.setState({
      loading: true
    })
    axiosInstance.get(`/job-openings?page=${page}&size=${this.state.size}`, requestOptions)
      .then(res => {
        console.log(res)
        this.setState({
          jobList: res.data.records,
          pageCount: Math.ceil(res.data.count / this.state.size),
          loading: false
        })
      })
      .catch(err => {
        alert("Get all client has job opening list");
      })

  }

  // Handle Page Click
  handlePageClick = (data) => {
    this.setState({
      page: data.selected
    });
    this.getAllJobs(data.selected)
  };


  handleApplyModalToggle = (jobInfo, type) => {

    const { applayModal, page } = this.state;

    this.setState(state => ({
      applayModal: !state.applayModal,
      applayModalType: !state.applayModal ? type : "",
      // singleApplyData: !state.applayModal ? singleApplyData : "",
    }));

    if (type === 'post') {
      this.setState(state => ({
        jobId: jobInfo
      }));
    } else if (type === 'put') {

      // console.log(jobInfo);
      this.setState({
        singleApplyData: jobInfo
      });
    } else {
      this.setState({
        singleApplyData: {}
      });
    }



  }

  handleJobAppyListIn = (jobId) => {
    const requestOptions = {
      headers: authHeader()
    }

    this.setState({
      applyListIn: true,
      jobId,
    });

    axiosInstance.get(`/candidate-job-application/opening/${jobId}?size=10&page=0`, requestOptions)
      .then(res => {

        this.setState({
          applyedList: res.data.records
        });

      })
      .catch(err => {
        console.log(err.response);
      })

  }

  handleJobAppyListOut = () => {

    this.setState(state => ({
      applyListIn: false,
      applyId: "",
    }));

  }


  handleJobOpeningDetailsIn = (signleData) => {
    this.setState(({
      jobDetailsIn: true,
      singleJobData: signleData,
    }))
  }

  handleJobOpeningDetailsOut = () => {
    this.setState(({
      jobDetailsIn: false,
      singleJobData: {},
    }))
  }



  render() {

    const {
      loading,
      jobList,
      applayModal,
      jobId,
      applayModalType,
      applyListIn,
      jobDetailsIn,
      singleJobData,
      applyedList,
      singleApplyData
    } = this.state;

    return (
      <div className="container-fluid">
        <div className="card">
          <div className="card-header bg-white border-bottom-0 d-flex align-items-center">
            <h4 className="mb-0 text-dark mr-3">Job Opening</h4>

            <div className="search">
              <input type="text" className="form-control text-secondary" />
            </div>

            <Link className='btn btn-link ml-auto'
              to={{
                pathname: "/job-create",
                state: { id: "" }
              }}>
              Add New Job
            </Link>

            {/* <button className="btn btn-link ml-auto"  >Add New Job</button> */}

          </div>
          <div className="card-body pt-0 px-2">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Client Names</th>
                    <th>Job title</th>
                    <th>Job Apply</th>
                    <th>Hiring Type</th>
                    <th>Candidates</th>
                    <th>Status</th>
                    <th>Expiration Date</th>
                    <th>Keywords</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr style={{ position: 'relative' }}>
                      <td colSpan="8">
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
                      </td>
                    </tr>
                  )
                  }

                  {jobList.map(job => {

                    return (
                      <tr key={job.id}>
                        <td onClick={() => this.handleJobOpeningDetailsIn(job)} className="cursor-pointer">
                          {job.client.name}
                        </td>
                        <td onClick={() => this.handleJobOpeningDetailsIn(job)} className="cursor-pointer">{job.title}</td>
                        <td>
                          <button className="btn btn-success btn-sm" onClick={() => this.handleApplyModalToggle(job.id, 'post')}>Apply</button>
                        </td>
                        <td>{job.hiringType}</td>
                        <td>
                          <button className="btn btn- btn-sm btn-secondary" onClick={() => this.handleJobAppyListIn(job.id)}>{job.noOfApplicants}</button>
                        </td>
                        <td>{job.status}</td>
                        <td>{job.expirationDate}</td>
                        <td className="keyword">
                          <div className="d-flex flex-wrap">
                            {job.keywords.map((keyword, i) => {
                              return (
                                <span key={i} className="px-2 py-1 rounded-pill bg-info text-white mr-1 mb-1">
                                  {keyword}
                                </span>
                              )
                            })}
                          </div>
                        </td>
                        <td>

                          <Link className='btn btn-secondary btn-sm mr-3'
                            to={{
                              pathname: "/job-create",
                              state: { id: job.id }
                            }}

                          >Edit</Link>

                          {/* <button className="btn btn-secondary btn-sm mr-3" onClick={() => this.handleModalToggle('put', job)}>Edit</button> */}
                          <button className="btn btn-danger btn-sm">Delete</button>
                        </td>

                      </tr>
                    )
                  })}


                </tbody>
              </table>
              <nav className="pagination-wrapper">
                <Paginate
                  previousLabel={'Previous'}
                  nextLabel={'Next'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={'pagination'}
                  activeClassName={'active'}
                  pageClassName={'page-item'}
                  pageLinkClassName={'page-link'}
                  previousLinkClassName={'page-link'}
                  nextLinkClassName="page-link"
                />
              </nav>
            </div>
          </div>

        </div>

        {/*  Job Apply Modal  */}
        <JobsApply
          modal={applayModal}
          toggle={this.handleApplyModalToggle}
          jobId={jobId}
          modalType={applayModalType}
          single={singleApplyData}
        />

        {/* Applied Job List  */}
        <ApplyedList
          value={applyListIn}
          close={this.handleJobAppyListOut}
          jobId={jobId}
          applyedList={applyedList}
          toggle={this.handleApplyModalToggle}
        />

        {/* Job Details  */}
        <JobDetails
          detailsIn={jobDetailsIn}
          toggle={this.handleJobOpeningDetailsOut}
          data={singleJobData}


        />






      </div >
    )
  }
}




export default Opportunities;
