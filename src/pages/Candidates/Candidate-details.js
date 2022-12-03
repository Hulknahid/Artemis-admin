import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import classname from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

// import { resumeIn } from '../../actions/candidate-action';

import { candidateDetailsOut } from '../../actions/candidate-action';


class CandidateDetails extends Component {


    // handleClose = () => {
    //     this.props.candidateDetailsOut()
    // }

    // handelResumeOpen = () => {
    //     this.props.resumeIn()
    // }






    render() {

        const { detailsIn, singleCandidate, detailsClose, resumeIn, jobList } = this.props;

        //console.log(singleCandidate);

        return (
            <div className={classname("profile-wrapper profile-candidate", { active: detailsIn })} style={{ height: '100vh' }}>

                <div className="profile-header">
                    <span className="close" onClick={detailsClose}>
                        <i className="mdi mdi-close"></i>
                    </span>
                    <div className="row">
                        <div className="col-xl-4">
                            <div>
                                <h2 className="text-dark">
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
                        <div className="col-xl-7">

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
                        <div className="col-xl-5">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center bg-white border-bottom-0">
                                    <h4 className="mb-0 text-dark">Details</h4>
                                </div>

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



                            </div>

                            {/* Add Owners */}
                            <div className="card px-4">
                                <div className="media py-3 align-items-center">
                                    <div className="icon icon-border mr-3 border-rounded bg-light">
                                        <i className="mdi mdi-account-circle-outline"></i>
                                    </div>
                                    <div className="media-body">
                                        <span className="d-block text-dark">Recruitment Agency</span>
                                        <span className="text-dark">
                                            {singleCandidate && singleCandidate.candidate && singleCandidate.candidate.recruiter ?
                                                singleCandidate.candidate.recruiter.appUserAgencyContact.names.salutation + ' ' +
                                                singleCandidate.candidate.recruiter.appUserAgencyContact.names.firstName + ' ' +
                                                singleCandidate.candidate.recruiter.appUserAgencyContact.names.lastName + ' ' +
                                                singleCandidate.candidate.recruiter.appUserAgencyContact.names.nickName : ''
                                            }
                                        </span>

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
                                        <span className="d-block text-dark">Add Note</span>
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>

                    <div className="card-body pt-0 px-2">
                        <h2>Applied List</h2>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Client Names</th>
                                        <th>Job title</th>
                                        <th>Hiring Type</th>
                                        <th>Status</th>
                                        <th>Expiration Date</th>
                                        <th>Keywords</th>
                                    </tr>
                                </thead>
                                <tbody>


                                    {jobList.map(job => {

                                        console.log(job);

                                        return (
                                            <tr key={job.id}>
                                                <td className="cursor-pointer">
                                                    {job.opening.client.name}
                                                </td>
                                                <td className="cursor-pointer">{job.opening.title}</td>

                                                <td>{job.opening.hiringType}</td>

                                                <td>{job.opening.status}</td>
                                                <td>{job.opening.expirationDate}</td>
                                                <td className="keyword">
                                                    <div className="d-flex flex-wrap">
                                                        {job.opening.keywords.map((keyword, i) => {
                                                            return (
                                                                <span key={i} className="px-2 py-1 rounded-pill bg-info text-white mr-1 mb-1">
                                                                    {keyword}
                                                                </span>
                                                            )
                                                        })}
                                                    </div>
                                                </td>


                                            </tr>
                                        )
                                    })}


                                </tbody>
                            </table>
                            {/* <nav className="pagination-wrapper">
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
              </nav> */}
                        </div>
                    </div>

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
