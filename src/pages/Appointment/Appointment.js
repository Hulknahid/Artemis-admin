import React, { Component } from 'react'
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { Form, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Col } from 'reactstrap';
import TimePicker from 'rc-time-picker';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker'
import Select from 'react-select';
import SimpleReactValidator from 'simple-react-validator';


import { appointmentTime } from '../../actions/job-action';
import axios from '../../axious-config';



import ClientSearch from '../../components/AppointmentClientSearch/AppointmentClientSearch';
// import contactData from '../../pages/Contacts/data-contacts';


import 'rc-time-picker/assets/index.css';


const format = 'h:mm a';

const now = moment().hour(0).minute(0);


class MyFullCalendar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      title: '',
      client: '',
      events: [],
      start: '',
      end: '',
      loading: true,
      selectedPartise: [],
      partiesList: [],
      mandatory: "True",
      partyId: "",
      setArr: [{}],
      modalParties: false,
      partyType: "",
      tempParty: {},
      startDate: new Date(),
      endDate: new Date(),


      settings: JSON.parse(localStorage.getItem("appSettings")).refData
    }

    // this.handleAppointmentSeleteTime = this.handleAppointmentSeleteTime.bind(this);
    // this.handleAppointmentToggle = this.handleAppointmentToggle.bind(this);
    // this.handleChangeTime = this.handleChangeTime.bind(this);
    // this.handleOnSubmit = this.handleOnSubmit.bind(this);


    // this.handleTestMaliha = this.handleTestMaliha.bind(this);
    // Invoke the validator
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    this.validator2 = new SimpleReactValidator({ autoForceUpdate: this });
  }

  // handleTestMaliha = (newValue) => {
  //   console.log(newValue);

  //   this.setState({
  //     title: newValue
  //   })
  // }

  // onChange = (event, { newValue }) => {
  //   this.setState({
  //     value: newValue
  //   });
  // };

  handleAppointmentToggle = () => {
    this.setState(state => ({
      modal: !state.modal
    }))
  }

  handleAppointmentSeleteTime = (info) => {
    this.setState(state => ({
      modal: !state.modal,
      start: info.startStr,
      end: info.endStr
    }))
    // this.handleAppointmentToggle()
    // console.log(info.startStr)
    // console.log(info.endStr)
    // const start = info.startStr;
    // const end = info.endStr
    // this.props.appointmentTime(start, end)

    console.log(info);
  }

  // handleChangeTime(value) {
  //   // console.log(value && value.format(format));
  //   this.setState({
  //     start: value
  //   })
  // }


  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });

  }

  handleSelectClient = (partise) => {
    this.setState({
      tempParty: partise
    });

  }

  handleClosePartise = (e) => {
    const parties = this.state.selectedPartise.filter(data => data.partyId.value !== e.partyId.value);

    this.setState({
      selectedPartise: parties
    })
  }

  handlePartiesModalToggle = () => {
    this.setState(state => ({
      modalParties: !state.modalParties
    }))
  }

  // Party Search 
  handlePartySearch = (e) => {
    const { value } = e.target
    this.setState({
      partyType: value
    })

    if (value === 'CANDIDATE') {
      this.setState({
        loading: true
      })


      axios.get(`/candidate?page=0&size=100`)
        .then(res => {

          console.log(res.data.records);
          const allCandidates = res.data.records.map(e => {
            return {
              value: e.id,
              label: `${e.names.firstName} ${e.names.lastName} [${e.primaryPhone}]`,
              name: `${e.names.firstName} ${e.names.lastName} [${e.primaryPhone}]`
            }
          })

          this.setState({
            partiesList: allCandidates,
            loading: false
          })

        })
        .catch(err => console.log(err.response))

    } else if (value === 'AGENCY_CONTACT') {
      this.setState({
        loading: true
      })
      axios.get(`/agency-contacts?page=0&size=500`)
        .then(res => {
          console.log(res.data.records);

          const allRecruiter = res.data.records.map(e => {
            return {
              value: e.id,
              label: `${e.names.firstName} ${e.names.lastName} [${e.agency.name}] [${e.primaryPhone}]`,
              name: `${e.names.firstName} ${e.names.lastName} [${e.agency.name}] [${e.primaryPhone}]`
            }
          })

          this.setState({
            partiesList: allRecruiter,
            loading: false
          })

        })
        .catch(err => console.log(err.response))
    } else if (value === 'AGENCY_CONTACT') {

      this.setState({
        loading: true
      })

      axios.get(`/clients?size=100&page=0`)
        .then(res => {

          const allClients = res.data.records.map(e => {
            return {
              value: e.id,
              label: <div><img src={e.imageUrl} height="30px" width="30px" /> {e.name} </div>,
              name: e.name
            }
          })
          this.setState({
            partiesList: allClients,
            loading: false
          })

        })
        .catch(err => console.log(err.response));
    }
  }

  handleAddParty = () => {
    const { mandatory, partyType, tempParty, selectedPartise } = this.state;

    const data = {
      mandatory: mandatory === "True" ? true : false,
      partyType,
      partyId: tempParty
    }

    if (this.validator2.allValid()) {

      this.setState({
        selectedPartise: selectedPartise.concat([data]),
        tempParty: {}
      })
      this.validator2.hideMessages();

    } else {
      this.validator2.showMessages();
    }



  }

  // handleDatePickar = (date, type) => {
  //   if (type === 'startDate') {
  //     this.setState({
  //       startDate: date
  //     })
  //   } else {
  //     this.setState({
  //       endDate: date
  //     })
  //   }
  // }

  handleOnSubmit = (e) => {
    e.preventDefault();

    const { selectedPartise, startDate, endDate, status } = this.state;

    const from = moment(startDate).format("YYYY-MM-DDTHH:mm:ss")
    const to = moment(endDate).format("YYYY-MM-DDTHH:mm:ss")

    // const oldEvent = this.state.events;
    // const falseValue = {
    //   name: 'Maliha',
    //   title: 'Repeating Event',
    //   description: 'description for Repeating Event',
    //   start: '2022-1-6T02:00:00+06:00',
    //   end: '2022-1-7T03:00:00+06:00'
    // };

    // this.setState({
    //   events: oldEvent.concat(falseValue)
    // })

    // this.handleAppointmentToggle()

    const parties = selectedPartise.map(e => {
      return {
        mandatory: e.mandatory,
        partyId: e.partyId.value,
        partyType: e.partyType
      }
    })

    const data = {
      parties: parties,
      period: {
        to,
        from,
      },
      status
    }



    if (this.validator.allValid()) {

      if (selectedPartise.length === 0) {
        alert("Please add party")
      } else {
        console.log(data);
      }

      // axiosInstance.post('job-opening', data)
      //   .then(() => {
      //     alert("Job create done!")
      //   })
      //   .catch(err => alert("Job crate has problem"))
    } else {
      this.validator.showMessages();
    }

  }

  renderEventContent = (e) => {
    console.log(e);
  }



  render() {

    // console.log(this.state)

    const { modal, startDate, endDate, partiesList, loading, selectedPartise, settings, partyType, modalParties, tempParty, mandatory, status } = this.state;

    console.log(status);

    return (
      <div className="container-fluid">
        <div className="full-calendar-wrapper">
          <FullCalendar
            selectable={true}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            defaultView="dayGridWeek"
            plugins={[timeGridPlugin, dayGridPlugin, resourceTimeGridPlugin, interactionPlugin,]}
            select={this.handleAppointmentSeleteTime}
            events={this.state.events}
            eventContent={this.renderEventContent}




          // schedulerLicenseKey={"0255236413-fcs-1560176287"}
          />

          {/* Appointment Modal  */}
          <Modal isOpen={modal} toggle={this.handleAppointmentToggle} modalClassName="modal-appointment" size="lg" >
            <ModalHeader toggle={this.handleAppointmentToggle}>Add a appointment</ModalHeader>
            <ModalBody>

              <h5>Parties
                <button className='btn btn-icon bg-primary ml-3 btn-sm rounded-circle' onClick={this.handlePartiesModalToggle}>
                  <i className="mdi text-white mdi-plus" ></i>
                </button>
              </h5>

              {/* <div className="row">
                  <div className="col-md-6">

                  </div>
                  <div className="col-md-6">

                  </div>
                </div> */}

              {/* <FormGroup row>
                <Label htmlFor="status" sm={3}>Start Date</Label>
                <Col sm={5}>
                  <DatePicker selected={startDate} onChange={(date) => this.handleDatePickar(date, 'startDate')} className="form-control" />
                </Col>
              </FormGroup>


              <FormGroup row>
                <Label htmlFor="status" sm={3}>End Date</Label>
                <Col sm={5}>
                  <DatePicker selected={endDate} onChange={(date) => this.handleDatePickar(date, 'endDate')} className="form-control" />
                </Col>

              </FormGroup> */}

              <div className="addTimes my-3">

                <div className="row">
                  <div className="col-4">
                    <span className="mb-3">Start time</span>
                    {/* Time Picker */}
                    <TimePicker
                      showSecond={false}
                      defaultValue={now}
                      className="xxx"
                      onChange={this.handleChangeTime}
                      format={format}
                      use12Hours
                      inputReadOnly
                      placeholder={moment(this.state.start).format(format)}
                    />,
                  </div>
                  <div className="col-4">
                    <span className="mb-3">End time</span>
                    {/* Time Picker */}
                    <TimePicker
                      showSecond={false}
                      defaultValue={now}
                      className="xxx"
                      onChange={this.handleChangeTime}
                      format={format}
                      use12Hours
                      inputReadOnly
                    />,
                  </div>
                  <div className='col-4'>
                    <FormGroup row className='mb-5'>
                      <Label htmlFor="status" sm={3}>Status</Label>
                      <Col sm={9}>
                        <Input type="select" name="status" id="status" onChange={this.handleOnChange} value={status}>
                          <option value="" >Select Status</option>
                          {settings.AppointmentStatus.map(e => <option value={e} key={e}>{e}</option>)}
                        </Input>
                        {this.validator.message('status', status, 'required', { className: 'text-danger mt-1' })}
                      </Col>

                    </FormGroup>
                  </div>
                </div>
              </div>














              <div className='mb-3'>

                {
                  selectedPartise.map((e, i) => {
                    return (
                      <div className="d-flex justify-content-between mb-2" key={i}>
                        <span>{e.partyId.name}</span>
                        {/* <span>{e.partyType}</span> */}
                        <button className='btn btn-sm btn-danger' onClick={() => this.handleClosePartise(e)}>close</button>
                      </div>
                    )
                  })
                }

              </div>

              <div className="d-flex justify-content-end">
                <button className="btn btn-primary text-right " onClick={this.handleOnSubmit}>Submit</button>
              </div>

            </ModalBody>

          </Modal>



          {/* Parties Modal*/}
          <Modal isOpen={modalParties}>
            <ModalHeader toggle={this.handlePartiesModalToggle}>Add Party</ModalHeader>
            <ModalBody>
              {/* <div className="mb-5 d-flex justify-content-center">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" id="candidate" name="role" value="candidate" onChange={this.onChangeSearch} checked={role === 'candidate'} />
                  <label className="form-check-label" htmlhtmlFor="candidate">
                    Candidate
                  </label>
                </div>

                <div className="form-check form-check-inline  custom-control-inline">
                  <input className="form-check-input" type="radio" id="recruiter" name="role" value="recruiter" onChange={this.onChangeSearch} checked={role === 'recruiter'} />
                  <label className="form-check-label" htmlhtmlFor="recruiter">
                    Recruter
                  </label>
                </div>

                <div className="form-check form-check-inline  custom-control-inline">
                  <input className="form-check-input" type="radio" id="client" name="role" value="client" onChange={this.onChangeSearch} checked={role === 'client'} />
                  <label className="form-check-label" htmlhtmlFor="client">
                    client
                  </label>
                </div>

              </div> */}
              {/* Mandatory */}
              <FormGroup row>
                <Label htmlFor="mandatory1" sm={3}>Mandatory</Label>
                <Col sm={9}>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="mandatory1" name="mandatory" className="custom-control-input" value="True"
                      checked={mandatory === 'True'} onChange={this.handleOnChange} />
                    <label className="custom-control-label" htmlFor="mandatory1">True</label>
                  </div>

                  <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="mandatory2" name="mandatory" className="custom-control-input" value="False"
                      checked={mandatory === 'False'} onChange={this.handleOnChange} />
                    <label className="custom-control-label" htmlFor="mandatory2">False</label>
                  </div>

                </Col>

              </FormGroup>

              {/* Party Type  */}
              <FormGroup row >
                <Label htmlFor="status" sm={3}>Party Type</Label>
                <Col sm={9}>

                  <Input type="select" name="partyType" id="status" onChange={this.handlePartySearch} value={partyType}>
                    <option value="" >Select Party</option>
                    {settings.PartyType.map(e => <option value={e} key={e}>{e}</option>)}
                  </Input>
                  {this.validator2.message('partyType', partyType, 'required', { className: 'text-danger mt-1' })}
                </Col>

              </FormGroup>



              {loading ? 'Loading' :
                <FormGroup row>
                  <Label htmlFor="status" sm={3}>Party Id</Label>
                  <Col sm={9}>
                    <Select
                      placeholder="Search Party Type"
                      onChange={this.handleSelectClient}
                      options={partiesList}
                      value={tempParty}
                      id="selectedClient"
                    />
                    {this.validator2.message('partyType', tempParty.value, 'required', { className: 'text-danger mt-1' })}
                  </Col>
                </FormGroup>
              }

              <div className="d-flex justify-content-end">
                <button className='btn btn-primary btn-sm' onClick={this.handleAddParty}>Add</button>
              </div>

            </ModalBody>
          </Modal>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    name: state
  }
}

export default connect(mapStateToProps, { appointmentTime })(MyFullCalendar);