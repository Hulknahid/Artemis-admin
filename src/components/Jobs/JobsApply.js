import React, { Component } from 'react';
import { Form, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import axiosInstance from '.././../axious-config';
import authHeader from '../../helper/authHeader';

import Search from '../SearchAuto';
import { functions } from "../../helper/functions";



class JobsApply extends Component {
    constructor(props) {
        super(props)

        this.state = {
            interviewAvailability: '',
            resumptionAvailability: '',
            contractMin: '',
            contractMax: '',
            fullTimeMin: '',
            fullTimeMax: '',
            notes: '',
            recruitmentStatus: '',

            applyModal: false,
            candidates: [],
            selectedCandidate: { id: '', value: '', label: '' },
            errors: {},
            jobId: '',

            searchResults: [],
            selectedSearchValue: {},
            searchDropdown: false,
            searchValue: "",
            searchLoading: false,
            focus: false
        }

        // Invoke the validator
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    componentDidUpdate(prevState) {
        const {
            interviewAvailability,
            contractWage,
            fullTimeWage,
            notes,
            recruitmentStatus,
            resumptionAvailability,
            candidate
        } = this.props.single;

        if (prevState.single !== this.props.single && this.props.modal) {
            this.setState({
                interviewAvailability: interviewAvailability,
                resumptionAvailability: resumptionAvailability,
                contractMin: contractWage && contractWage.minimum,
                contractMax: contractWage && contractWage.maximum,
                fullTimeMin: fullTimeWage && fullTimeWage.minimum,
                fullTimeMax: fullTimeWage && fullTimeWage.maximum,
                notes: notes,
                recruitmentStatus: recruitmentStatus,
                selectedSearchValue: {
                    id: candidate.id,
                    name: `${candidate.names.firstName} ${candidate.names.lastName}  [${candidate.primaryPhone}]`
                },
                searchValue: `${candidate.names.firstName} ${candidate.names.lastName}  [${candidate.primaryPhone}]`
            })
        }
    }

    // getAllCandidates = () => {
    //     this.props.getAllCandidateNoPaginate()
    // }

    // Select Candidate

    // handleSelectClient = (candidate) => {
    //     this.setState({
    //         selectedCandidate: candidate
    //     });
    //     if (candidate === null) {
    //         this.setState({
    //             selectedCandidate: { id: '', value: '', label: '' },
    //         });
    //     }

    //     console.log(candidate);
    // }


    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    // Search
    handleChangeSearch = (e) => {
        const requestOptions = {
            headers: authHeader()
        }

        const { value } = e.target;

        if (value.length > 0) {
            axiosInstance.get(`/candidate/search?query=${value}`, requestOptions)
                .then(res => {

                    const data = res.data.map(e => {
                        return {
                            id: e.id,
                            name: `${e.names.firstName} ${e.names.lastName} [${e.primaryPhone}]`
                        }
                    })

                    this.setState({
                        searchResults: data,
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })

            this.setState({
                searchDropdown: true
            })
        } else {
            this.setState({
                searchResults: []
            })
        }

        this.setState({
            searchValue: value
        })

    }

    handleSelectSearchValue = (e) => {
        this.setState({
            selectedSearchValue: e,
            searchValue: e.name,
            searchDropdown: false
        })
    }

    handleSearchClose = () => {
        this.setState({
            selectedSearchValue: {},
            searchValue: "",
            searchResults: []
        });

    }

    handleCloseSearchDropdown = () => {
        this.setState({
            searchDropdown: false
        })
    }

    handleJobApplySubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            headers: authHeader()
        }

        const {
            interviewAvailability,
            resumptionAvailability,
            contractMin,
            contractMax,
            fullTimeMin,
            fullTimeMax,
            notes,
            recruitmentStatus,
            selectedSearchValue,

        } = this.state;

        const { jobId, modalType, single } = this.props;

        const data = {
            opening: {
                id: jobId
            },
            candidate: {
                id: selectedSearchValue.id
            },
            interviewAvailability: interviewAvailability,
            resumptionAvailability: resumptionAvailability,
            contractWage: {
                minimum: parseFloat(contractMin),
                maximum: parseFloat(contractMax),
            },
            fullTimeWage: {
                minimum: parseFloat(fullTimeMin),
                maximum: parseFloat(fullTimeMax),
            },
            notes: notes,
            recruitmentStatus: recruitmentStatus,
        }

        // Create Job Apply
        if (modalType === 'post') {
            if (this.validator.allValid()) {
                axiosInstance.post('/candidate-job-application', data, requestOptions)
                    .then(() => {
                        functions.openToaster('Job Apply Done!')
                    })
                    .catch(err => {
                        console.log(err.response);
                    });

            } else {
                this.validator.showMessages();
            }
        } else {
            if (this.validator.allValid()) {
                axiosInstance.put(`/candidate-job-application/${single.id}`, data, requestOptions)
                    .then(() => {
                        functions.openToaster('Job Apply Done!')
                    })
                    .catch(err => {
                        console.log(err.response);
                    });


            } else {
                this.validator.showMessages();
            }
        }

    }



    render() {
        const {
            interviewAvailability,
            resumptionAvailability,
            contractMin,
            contractMax,
            fullTimeMin,
            fullTimeMax,
            notes,
            recruitmentStatus,
            searchResults,
            searchValue,
            searchDropdown,
            searchLoading
        } = this.state;

        // Props
        const { modal, toggle } = this.props;

        //Get Recruitment Status from Appsetting
        const { RecruitmentStatus } = JSON.parse(localStorage.getItem('appSettings')).refData;

        return (
            <div>
                <Modal isOpen={modal} toggle={toggle} size="lg">

                    <ModalHeader toggle={toggle}>Job Apply</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleJobApplySubmit}>

                            {/* Select Candidate  */}
                            <FormGroup row>
                                <Label for="exampleSelect" sm={3}>Candidate Name</Label>
                                <Col sm={9}>
                                    <Search
                                        onChange={this.handleChangeSearch}
                                        results={searchResults}
                                        handleSelectedValue={this.handleSelectSearchValue}
                                        value={searchValue}
                                        close={this.handleSearchClose}
                                        dropdown={searchDropdown}
                                        loading={searchLoading}
                                    />
                                </Col>
                            </FormGroup>

                            {/* Recruitment Status Time  */}
                            <FormGroup row>
                                <Label for="recruitmentStatus" sm={3}>Recruitment Status Time</Label>
                                <Col sm={9}>
                                    <Input type="select" name="recruitmentStatus" id="recruitmentStatus" onChange={this.handleOnChange} value={recruitmentStatus}>
                                        <option value="">Select Status</option>
                                        {RecruitmentStatus.map(e => <option value="LEAD" key={e}>{e}</option>)}
                                    </Input>
                                </Col>
                            </FormGroup>

                            {/* Contract Wage (max)  */}
                            <FormGroup row>
                                <Label for="exampleSelect" sm={3}>Contract Wage</Label>
                                <Col sm={9}>
                                    <FormGroup className="form-group-range-jobs">
                                        <Col lg={6} className="d-flex flex-column">
                                            <div className="d-flex align-items-center">
                                                <Label for="contractMin" className="label">Min</Label>
                                                <Input type="number" name="contractMin" id="contractMin" onChange={this.handleOnChange} value={contractMin} min="0" />
                                            </div>

                                            {this.validator.message('Contract Wage Max', contractMin, 'required', { className: 'text-danger mt-1' })}
                                        </Col>
                                        <Col lg={6} className="d-flex flex-column">
                                            <div className="d-flex align-items-center">
                                                <Label for="contractMax" className="label">Max</Label>
                                                <Input type="number" name="contractMax" id="contractMax" onChange={this.handleOnChange} value={contractMax} min="0" />
                                            </div>
                                            {this.validator.message('Contract Wage Min', contractMax, 'required', { className: 'text-danger mt-1' })}
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </FormGroup>

                            {/* Full Time Wage(min)  */}
                            <FormGroup row>
                                <Label for="exampleSelect" sm={3}>Full Time Wage</Label>
                                <Col sm={9}>
                                    <FormGroup className="form-group-range-jobs">
                                        <Col lg={6} className="d-flex flex-column">
                                            <div className="d-flex align-items-center">
                                                <Label for="fullTimeMin" className="label">Min</Label>
                                                <Input type="number" name="fullTimeMin" id="fullTimeMin" onChange={this.handleOnChange} value={fullTimeMin} min="0" />
                                            </div>
                                            {this.validator.message('Full Time Min', fullTimeMin, 'required', { className: 'text-danger mt-1' })}
                                        </Col>
                                        <Col lg={6} className="d-flex flex-column">
                                            <div className="d-flex align-items-center">
                                                <Label for="fullTimeMax" className="label">Max</Label>
                                                <Input type="number" name="fullTimeMax" id="fullTimeMax" onChange={this.handleOnChange} value={fullTimeMax} min="0" />
                                            </div>
                                            {this.validator.message('Full Time Max', fullTimeMax, 'required', { className: 'text-danger mt-1' })}
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </FormGroup>

                            {/* Interview Availability  */}
                            <FormGroup row>
                                <Label for="exampleSelect" sm={3}>Interview Availability</Label>
                                <Col sm={9}>
                                    <Input type="text" name="interviewAvailability" id="interviewAvailability" onChange={this.handleOnChange} value={interviewAvailability} />
                                </Col>
                            </FormGroup>

                            {/* Resumption Availability  */}
                            <FormGroup row>
                                <Label for="exampleSelect" sm={3}>Resumption Availability</Label>
                                <Col sm={9}>
                                    <Input type="text" name="resumptionAvailability" id="resumptionAvailability" onChange={this.handleOnChange} value={resumptionAvailability} />
                                </Col>
                            </FormGroup>

                            {/* Notes */}
                            <FormGroup row>
                                <Label for="notes" sm={3}>Notes</Label>
                                <Col sm={9}>
                                    <Input type="textarea" name="notes" id="notes" onChange={this.handleOnChange} value={notes} />
                                </Col>
                            </FormGroup>

                            <div className="d-flex justify-content-end">
                                {/* Erorrs  */}
                                {/* <span className="text-danger text-capitalize">
                                    {message ? message + "," : ''}
                                    {jobError ? jobError : ''}
                                </span> */}

                                <Button className="btn-success">Apply</Button>
                            </div>

                        </Form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}



export default JobsApply

