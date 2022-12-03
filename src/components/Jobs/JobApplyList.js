import React, { Component } from 'react';
import classnames from 'classnames';
//import { connect } from 'react-redux';
//import axiosInstance from '../../axious-config';
import moment from 'moment';

//import { jobAppyListClose, jobApplyModalOpen, jobApplyModalClose } from '../../actions/job-apply-actions'

class JobListByJobId extends Component {

    render() {

        const { value, close, toggle, applyedList } = this.props;

        return (
            <div className={classnames('joblist-wrapper', { active: value })}>
                <div className="joblist-header">
                    <span className="close" onClick={() => close()}>
                        <i className="mdi mdi-close"></i>
                    </span>
                    <h2>(Senior) Backend Software Engineer (Node.js)</h2>
                </div>

                <div className="joblist-body">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Candidate Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    applyedList.map(e => {
                                        // console.log(e);
                                        return <tr key={e.id}>
                                            <td className="text-dark">
                                                {e.candidate.names.firstName} {e.candidate.names.firstName}
                                            </td>
                                            <td className="text-dark">
                                                {e.candidate.primaryPhone}
                                            </td>
                                            <td className="text-dark">
                                                {e.candidate.email}
                                            </td>
                                            <td className="text-dark">
                                                {moment(e.recruitmentStatusTime).format('YYYY-MM-DD')}
                                            </td>
                                            <td>
                                                <button className="btn btn-sm btn-info mr-3" onClick={() => toggle(e, 'put')}>Edit</button>
                                                <button className="btn btn-sm btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        )
    }
}

export default JobListByJobId;
