import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Col, Row, Button } from 'reactstrap';
import Select from 'react-select';
import SimpleReactValidator from 'simple-react-validator';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import axiosInstance from '.././../axious-config';
import authHeader from '../../helper/authHeader';
import moment from 'moment';
import { WithContext as ReactTags } from 'react-tag-input';
import Search from '../../components/SearchAuto';
import { functions } from "../../helper/functions";

const workAuthorizationList = ["CPT_EAD", "OPT_EAD", "H4_EAD", "H1B", "GREEN_CARD", "CITIZEN"];
const statusList = ["DRAFT", "PENDING_APPROVAL", "OPEN", "HOLD", "FILLED", "CLOSED"];


const KeyCodes = {
  comma: 188,
  enter: 13
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];


class Opportunities extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      clientReqNum: '',
      details: '',
      expirationDate: '',
      hiringType: '',
      jobType: '',
      contractMin: 0,
      contractMax: 0,
      fullTimeMin: 0,
      fullTimeMax: 0,
      referralCompensationAmount: 0,
      workLocation: '',
      remoteWorkPercent: 0,
      priority: 0,
      status: '',
      keywords: [],
      clients: [],
      selectClient: [{ value: '' }],
      selectedClient: { id: '', value: '', label: '' },
      selectedWorkAtuh: [],
      errors: {},
      id: '',
      startDate: new Date(),
      experience: '',
      clientsLoading: false,
      allClients: [],
      workAuthorizationList: [],

      searchResults: [],
      selectedSearchValue: {},
      searchDropdown: false,
      searchValue: "",
      searchLoading: false,


      testSeletData: [],

      settings: JSON.parse(localStorage.getItem("appSettings")).refData
    }

    // Invoke the validator
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });


    this.getSingleJob(this.props.location.state.id)
    // this.getAllClients();
    // this.workLocationList()
  }

  getSingleJob = (id) => {
    const requestOptions = {
      headers: authHeader()
    }

    if (this.props.location.state.id) {
      axiosInstance.get(`job-openings/${id}`, requestOptions)
        .then(res => {

          const { client,
            title,
            clientReqNum,
            details,
            expirationDate,
            hiringType,
            jobType,
            contractWage,
            fullTimeWage,
            referralCompensationAmount,
            workLocation,
            remoteWorkPercent,
            priority,
            status,
            keywords,
            workAuthorizations,
            experience,
            id

          } = res.data;


          const _keywords = keywords.map((e, i) => {
            return {
              id: i,
              text: e
            }
          });

          const _client = {
            id: client.id,
            name: `${client.name} [${client.website}]`
          }

          // console.log(client);
          console.log(_client);

          const _selectedWorkAtuh = workAuthorizations.map(e => {
            return {
              value: e,
              label: e
            }
          })

          console.log(client);

          this.setState({
            selectedSearchValue: _client,
            title,
            clientReqNum,
            details,
            expirationDate,
            hiringType,
            jobType,
            contractMin: contractWage.minimum,
            contractMax: contractWage.maximum,
            fullTimeMin: fullTimeWage.minimum,
            fullTimeMax: fullTimeWage.maximum,
            referralCompensationAmount,
            workLocation,
            remoteWorkPercent,
            priority,
            status,
            selectedWorkAtuh: _selectedWorkAtuh,
            id,
            experience,
            keywords: _keywords,
            searchValue: `${client.name} [${client.website}]`
          })
        })
        .catch(err => console.log(err.response))
    }
  }

  componentDidMount() {
    const workAuthList = workAuthorizationList.map(e => {
      return {
        value: e,
        label: e
      }
    });

    this.setState({
      workAuthorizationList: workAuthList
    })

  }


  // Job Details Come
  handleTextEditor = (value) => {
    this.setState({
      details: value
    })
  }

  // Hande On Change
  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  //handleExpiration
  handleExpiration = (data) => {
    this.setState({
      startDate: data
    })
  }

  // Select Client
  handleSelectClient = (client) => {

    this.setState({
      selectedClient: client
    });
    if (client === null) {
      this.setState({
        selectedClient: { id: '', value: '', label: '' },
      });
    }
  }

  // Select Work Authorization
  handleWorkAuth = (workAuth) => {
    this.setState({
      selectedWorkAtuh: workAuth
    });
    if (workAuth === null) {
      this.setState({
        selectedWorkAtuh: "",
      });
    }
  }


  // Submit
  handleJobSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      headers: authHeader()
    }

    const {
      selectedClient,
      title,
      clientReqNum,
      details,
      hiringType,
      contractMin,
      contractMax,
      fullTimeMin,
      fullTimeMax,
      referralCompensationAmount,
      workLocation,
      remoteWorkPercent,
      priority,
      status,
      keywords,
      selectedWorkAtuh,
      id,
      startDate,
      jobType,
      experience,
      selectedSearchValue
    } = this.state;

    // Selected Auth
    const workAuthorizations = selectedWorkAtuh ? selectedWorkAtuh.map(e => e.value) : [];
    const expirationDate = moment(startDate).format('YYYY-MM-DD');
    const _keywords = keywords.map(e => e.text)

    // Data
    const data = {
      client: {
        id: selectedSearchValue.id,
      },

      title,
      clientReqNum,
      details,
      expirationDate,
      hiringType,
      jobType,
      contractWage: {
        minimum: parseInt(contractMin),
        maximum: parseInt(contractMax),
      },
      fullTimeWage: {
        minimum: parseInt(fullTimeMin),
        maximum: parseInt(fullTimeMax)
      },
      referralCompensationAmount: parseInt(referralCompensationAmount),
      workLocation,
      remoteWorkPercent: parseInt(remoteWorkPercent),
      priority: parseInt(priority),
      status,
      keywords: _keywords,
      workAuthorizations,
      experience
    }

    if (this.props.location.state.id) {

      axiosInstance.put(`job-openings/${id}`, data, requestOptions)
        .then(() => {
          functions.openToaster("Job Updated done!")
        })
        .catch(err => {
          functions.openToaster("There are some issue")
        });

    } else {
      if (this.validator.allValid()) {

        axiosInstance.post('job-openings', data, requestOptions)
          .then(() => {
            functions.openToaster("Job created Done!");

            this.setState({
              title: '',
              clientReqNum: '',
              details: '',
              expirationDate: '',
              hiringType: '',
              jobType: '',
              contractMin: 0,
              contractMax: 0,
              fullTimeMin: 0,
              fullTimeMax: 0,
              referralCompensationAmount: 0,
              workLocation: '',
              remoteWorkPercent: 0,
              priority: 0,
              status: '',
              keywords: [],
              clients: [],
              selectClient: [{ value: '' }],
              selectedClient: { id: '', value: '', label: '' },
              selectedWorkAtuh: [],
              startDate: new Date(),
              experience: '',
              clientsLoading: false,
              workAuthorizationList: [],

              searchResults: [],
              selectedSearchValue: {},
              searchDropdown: false,
              searchValue: "",
            })
            this.validator.hideMessages()
          })
          .catch(err => {
            functions.openToaster("There are some issue")
          });

      } else {
        this.validator.showMessages();
      }
    }

  }

  handleTagAdd = (tag) => {
    let { keywords } = this.state;
    this.setState({ keywords: [...keywords, { id: keywords.length + 1, text: tag }] });
  }


  handleTagDelete = (i) => {
    const { keywords } = this.state;

    this.setState({
      keywords: keywords.filter((tag, index) => index !== i)
    })
  }

  handleChangeSearch = (e) => {
    const { value } = e.target;
    const requestOptions = {
      headers: authHeader()
    }

    if (value.length > 0) {
      this.setState({
        searchLoading: true
      })

      axiosInstance.get(`/clients?searchText=${value}&page=0&size=15`, requestOptions)
        .then(res => {

          console.log(res.data);

          const data = res.data.records.map(e => {
            return {
              id: e.id,
              name: `${e.name} [${e.website}]`
            }
          })

          this.setState({
            searchResults: data,
            searchLoading: false
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
        searchDropdown: false
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
      searchResults: [],
      searchDropdown: false

    });

  }

  handleCloseSearchDropdown = () => {
    this.setState({
      searchDropdown: false
    })
  }


  render() {

    const {
      clientReqNum,
      selectedClient,
      errors,
      title,
      details,
      expirationDate,
      hiringType,
      contractMin,
      contractMax,
      fullTimeMin,
      fullTimeMax,
      referralCompensationAmount,
      workLocation,
      remoteWorkPercent,
      priority,
      status,
      keywords,
      clientsLoading,
      allClients,
      workAuthorizationList,
      selectedWorkAtuh,
      startDate,
      settings,
      experience,
      jobType,
      testSeletData,
      searchResults,
      selectedSearchValue,
      searchValue,
      searchDropdown,
      searchLoading

    } = this.state;
    // const { clientsLoading } = this.props.clients;
    // const { jobsLoading, jobsWithPaginate } = this.props.jobs;

    // console.log(keywords);

    // console.log(this.loadOptions());

    return (
      <div className="container-fluid">
        <div className="card">
          <div className="card-header bg-white border-bottom-0 ">
            <Link to="/jobs">Back to job list</Link>
          </div>

          <div className="card-body pt-0 px-2">
            <div className="row">
              <div className="col-xl-5">
                {/* Select Client  */}
                <FormGroup row>
                  <Label for="selectedClient" sm={3}>Select Client</Label>
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
                    {/* {this.validator.message('Select Recruter', selectedSearchValue.name, 'required', { className: 'text-danger my-2' })} */}


                    {/* {clientsLoading ? 'Loading...' :
                      <Select
                        isClearable={true}
                        placeholder="Select Client"
                        onChange={this.handleSelectClient}
                        options={allClients}
                        value={selectedClient}
                        id="selectedClient"
                      />
                    }
                    {this.validator.message('Select Client', selectedClient.value, 'required', { className: 'text-danger mt-1' })} */}
                  </Col>
                </FormGroup>

                {/* Job title  */}
                <FormGroup row>
                  <Label for="title" sm={3}>Job Title</Label>
                  <Col sm={9}>
                    <Input type="text" name="title" onChange={this.handleOnChange} value={title} id="title" />
                    {this.validator.message('Title', title, 'required', { className: 'text-danger mt-1' })}
                  </Col>
                </FormGroup>

                {/* Client Req#  */}
                <FormGroup row>
                  <Label for="clientReqNum" sm={3}>Client Req#</Label>
                  <Col sm={9}>
                    <Input type="text" name="clientReqNum" onChange={this.handleOnChange} value={clientReqNum} id="clientReqNum" />
                    {this.validator.message('Client Req#', clientReqNum, 'required', { className: 'text-danger mt-1' })}
                  </Col>
                </FormGroup>

                {/* Expiration Date  */}
                <FormGroup row>
                  <Label for="date" sm={3}>Expiration Date</Label>
                  <Col sm={9}>
                    <DatePicker className='form-control' selected={startDate} onChange={(date) => this.handleExpiration(date)} id="date" />
                    {this.validator.message('Expiration Date', startDate, 'required', { className: 'text-danger mt-1' })}

                  </Col>
                </FormGroup>

                {/* Job Type  */}
                <FormGroup row>
                  <Label for="jobType" sm={3}>Job Type</Label>
                  <Col sm={9}>
                    <Input type="select" name="jobType" id="jobType" onChange={this.handleOnChange} value={jobType}>
                      <option value="">Select Job Type</option>
                      {
                        settings.JobType.map(e => <option value={e} key={e}>{e}</option>)
                      }
                    </Input>
                    {this.validator.message('Hiring Type', jobType, 'required', { className: 'text-danger mt-1' })}

                  </Col>
                </FormGroup>

                {/* Hiring Type  */}
                <FormGroup row>
                  <Label for="hiringType" sm={3}>Hiring Type</Label>
                  <Col sm={9}>
                    <Input type="select" name="hiringType" id="hiringType" onChange={this.handleOnChange} value={hiringType}>
                      <option value="">Select Hiring</option>
                      {
                        settings.HiringType.map(e => <option value={e} key={e}>{e}</option>)
                      }
                    </Input>
                    {this.validator.message('Hiring Type', hiringType, 'required', { className: 'text-danger mt-1' })}

                  </Col>
                </FormGroup>

                {/* Experience  */}
                <FormGroup row>
                  <Label for="experience" sm={3}>Experience</Label>
                  <Col sm={9}>
                    <Input type="text" name="experience" onChange={this.handleOnChange} value={experience} id="experience" />
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

                {/* Referral Compensation Amount  */}
                <FormGroup row>
                  <Label for="referralCompensationAmount" sm={3}>Referral Compensation Amount</Label>
                  <Col sm={9}>
                    <Input type="number" name="referralCompensationAmount" onChange={this.handleOnChange} value={referralCompensationAmount} min="0" />
                    {this.validator.message('Referral Compensation Amount', referralCompensationAmount, 'required', { className: 'text-danger mt-1' })}
                  </Col>
                </FormGroup>

                {/* Remote Work Percent */}
                <FormGroup row>
                  <Label for="remoteWorkPercent" sm={3}>Remote Work Percent</Label>
                  <Col sm={9}>
                    <Input type="number" name="remoteWorkPercent" onChange={this.handleOnChange} value={remoteWorkPercent} min="0" />
                    {this.validator.message('Remote Work Percent', remoteWorkPercent, 'required', { className: 'text-danger mt-1' })}
                  </Col>
                </FormGroup>

                {/* Work Location */}
                <FormGroup row>
                  <Label for="workLocation" sm={3}>Work Location</Label>
                  <Col sm={9}>
                    <Input type="text" name="workLocation" onChange={this.handleOnChange} value={workLocation} />
                    {this.validator.message('Work Location', workLocation, 'required', { className: 'text-danger mt-1' })}
                  </Col>
                </FormGroup>

                {/* Priority */}
                <FormGroup row>
                  <Label for="priority" sm={3}>priority</Label>
                  <Col sm={9}>
                    <Input type="number" name="priority" onChange={this.handleOnChange} value={priority} min="0" />
                    {this.validator.message('Priority', priority, 'required', { className: 'text-danger mt-1' })}
                  </Col>
                </FormGroup>

                {/* Status  */}
                <FormGroup row>
                  <Label for="status" sm={3}>Status</Label>
                  <Col sm={9}>
                    <Input type="select" name="status" id="status" onChange={this.handleOnChange} value={status}>
                      <option value="">Select Status</option>
                      {statusList.map(e => <option value={e} key={e}>{e}</option>)}
                    </Input>
                    {this.validator.message('Status', status, 'required', { className: 'text-danger mt-1' })}
                  </Col>
                </FormGroup>

                {/* Keywords  */}
                <FormGroup row>
                  <Label for="keywords" sm={3}>Keywords</Label>
                  <Col sm={9}>
                    <ReactTags
                      tags={keywords}
                      delimiters={delimiters}
                      handleDelete={this.handleTagDelete}
                      handleAddition={this.handleTagAdd}
                      // handleDrag={handleDrag}
                      // handleTagClick={this.handleTagClick}
                      inputFieldPosition="left"
                      autocomplete
                    />
                    {/* <Input type="text" name="keywords" id="keywords" onChange={this.handleOnChange} value={keywords} />
                    {this.validator.message('Keywords', keywords, 'required', { className: 'text-danger mt-1' })} */}

                  </Col>
                </FormGroup>

                {/* Work Authorizations  */}
                {/* <FormGroup row>
                <Label for="workAuthorizations" sm={3}>Work Authorizations</Label>
                <Col sm={9}>
                  <Input type="select" name="workAuthorizations" id="workAuthorizations" onChange={this.handleOnChange} value={workAuthorizations}>
                    <option value="">Select Status</option>
                    {workAuthorizationList.map(e => <option value={e} key={e}>{e}</option>)}
                  </Input>
                  {this.validator.message('Work Authorizations', workAuthorizations, 'required', { className: 'text-danger mt-1' })}
                </Col>
              </FormGroup> */}

                {/* Work Authorizations  */}
                <FormGroup row>
                  <Label for="workAuthorizations" sm={3}>Work Authorizations</Label>
                  <Col sm={9}>
                    <Select
                      className="basic-multi-select"
                      isMulti
                      placeholder="Add Work Authorization"
                      onChange={this.handleWorkAuth}
                      options={workAuthorizationList}
                      value={selectedWorkAtuh}
                    />
                    {/* {this.validator.message('Work Authorizations', selectedWorkAtuh[0].value, 'required', { className: 'text-danger mt-1' })} */}
                  </Col>
                </FormGroup>


              </div>
              <div className="col-xl-7">

                {/* Details */}
                <FormGroup >
                  {/* <Label for="exampleSelect" sm={3}>Details</Label> */}
                  <div className="react-quill-default">
                    <ReactQuill
                      placeholder="Write Job details"
                      // style={{ height: "100vh" }}
                      value={details}
                      onChange={this.handleTextEditor}
                    />
                  </div>
                  {this.validator.message('Job Details', details, 'required', { className: 'text-danger mt-1' })}
                </FormGroup>


                <div className="d-flex justify-content-between align-items-center">
                  {/* Erorrs  */}
                  <span className="text-danger text-capitalize">
                    {/* {message ? message + "," : ''}
                    {jobError ? jobError : ''} */}
                  </span>

                  <Button className="btn-success" onClick={this.handleJobSubmit}>Submit</Button>
                </div>
              </div>
            </div>
          </div>

        </div>



        {/* <JobsApply />
        <JobApplyList /> */}


      </div >
    )
  }
}

// const mapStateToProps = state => {
//   return {
//     jobs: state.jobs,
//     clients: state.clients
//   }
// }


export default Opportunities;
