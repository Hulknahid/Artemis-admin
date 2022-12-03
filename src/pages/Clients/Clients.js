import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paginate from 'react-paginate';


import { profileVisible, getSingleProfile } from '../../actions/profile-actions';
import { getProfileRouteInfo, getAllContactsById } from '../../actions/contact-actions';

import {
  // getClientsWithPaginate,
  createClient,
  editClient,
  editClientImg
} from '../../actions/client-actions';

import axios from '.././../axious-config'
import authHeader from '../../helper/authHeader';

import CreateClient from './CreateClient'
import SimpleReactValidator from 'simple-react-validator';
import { functions } from "../../helper/functions";



class Clients extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      status: '',
      jobPostingUrl: '',
      date: '',
      website: '',
      id: '',
      size: 50,
      page: 0,
      loading: true,
      clientList: [],
      modal: false,
      errors: ""
    }


    // Invoke the validator
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.getAllClients(this.state.page)
  }


  // Get All Data Invoke
  getAllClients(page) {
    const requestOptions = {
      headers: authHeader()
    }
    this.setState({
      loading: true
    })

    axios.get(`/clients?page=${page}&size=${this.state.size}`, requestOptions)
      .then(res => {
        // const data = res.data;\
        console.log(res.data);
        this.setState({
          clientList: res.data.records,
          pageCount: Math.ceil(res.data.count / this.state.size),
          loading: false
        })
        // console.log(data);


      })
      .catch(err => console.log(err.response))
  }

  // Toggle Modal
  handleModalToggle = (type, data) => {
    this.setState(state => ({
      modal: !state.modal,
      modalType: !state.modal ? type : ""
    }));

    if (type === 'put') {
      this.setState({
        id: data.id,
        name: data.name,
        status: data.status,
        website: data.website,
        jobPostingUrl: data.jobPostingUrl,
        errors: ''
      })
    } else if (type == 'post') {
      this.setState({
        name: '',
        status: '',
        website: '',
        id: '',
        jobPostingUrl: '',
        errors: ''
      })
    }

  }


  // Handle Page Click
  handlePageClick = (data) => {
    this.setState({
      page: data.selected
    });
    this.getAllClients(data.selected)
  };


  // Handle In Profile
  handelInProfile = (e, route, id) => {
    e.preventDefault();

    // Profile Visible
    this.props.profileVisible()

    //Get Single Profile
    this.props.getSingleProfile(route, id)

    // Get Profile data
    this.props.getProfileRouteInfo(route, id)

    //Get Contact by Id
    this.props.getAllContactsById(route, id)
  }

  // Hande On Change
  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }



  // Submit Client
  handleSubmitClient = (e) => {
    e.preventDefault();
    const requestOptions = {
      headers: authHeader()
    }
    const { modalType, name, status, website, jobPostingUrl, id, clientList } = this.state

    const data = {
      name,
      jobPostingUrl,
      status,
      website
    }

    // console.log(this.state);

    if (modalType === 'post') {
      if (this.validator.allValid()) {

        axios.post(`/clients`, data, requestOptions)
          .then(res => {

            // Invoke Toaster
            functions.openToaster(`Client created successfully!`)

            this.getAllClients(0)
            this.setState({
              modal: false
            })
            this.validator.hideMessages();

          })
          .catch(err => {
            const { status, message } = err.response.data;

            if (status === 409) {
              this.setState({
                errors: message
              })
            }
          })

      } else {
        this.validator.showMessages();
      }

    } else if (modalType === 'put') {

      if (this.validator.allValid()) {
        axios.put(`/clients/${id}`, data, requestOptions)
          .then(res => {
            // Invoke Toaster
            functions.openToaster(`Client updated successfully!`)

            const data = res.data;

            const updateClient = clientList.map(e => {
              if (e.id === id) {
                return {
                  id: data.id,
                  imageUrl: data.imageUrl,
                  jobPostingUrl: data.jobPostingUrl,
                  name: data.name,
                  status: data.status,
                  website: data.website,
                }
              }
              return e
            })

            this.setState({
              modal: false,
              clientList: updateClient
            })

          })
          .catch(err => {
            const { status, message } = err.response.data;

            if (status === 409) {
              this.setState({
                errors: message
              })
            }
            // alert(err.response.data.message)
          })
        // Invoke edit agency action
        // this.props.editClient(data, this.state.id)
      } else {
        this.validator.showMessages();
      }
    }

  }



  // static getDerivedStateFromProps(nextProps, privState) {

  //   if (
  //     nextProps.clients.clientsWithPaginate &&
  //     nextProps.clients.totalClients > 0 &&
  //     !nextProps.clients.modal
  //   ) {
  //     return {
  //       pageCount: Math.ceil(nextProps.clients.totalClients / privState.size),
  //     }
  //   } else if (nextProps.clients.errors !== privState.errors) {
  //     return {
  //       errors: nextProps.clients.errors
  //     }
  //   } else if (nextProps.clients.clientsWithPaginate && nextProps.clients.totalClients > 0 && nextProps.clients.modal) {
  //     return {
  //       modal: nextProps.clients.modal,
  //     }
  //   }
  //   else if (nextProps.clients.success) {
  //     return {
  //       name: '',
  //       status: '',
  //       website: '',
  //       imageUrl: '',
  //       id: '',
  //       editOrCreate: '',
  //     }
  //   }
  //   else {
  //     return null;
  //   }

  // }

  // componentDidUpdate(nextProps, privState) {
  //   if (nextProps.clients.modal !== this.props.clients.modal) {
  //     this.setState({
  //       modal: false,
  //     })
  //   }
  // }



  render() {
    const { clientsLoading, clientsWithPaginate } = this.props.clients;
    const { clientList, loading } = this.state;

    return (
      <>
        <div className="container-fluid">
          <div className="card">

            <div className="card-header bg-white border-bottom-0 d-flex align-items-center">
              <h4 className="mb-0 text-dark mr-3">Clients</h4>

              <div className="search">
                <input type="text" className="form-control text-secondary" />
              </div>

              <button className="btn btn-link ml-auto" onClick={() => this.handleModalToggle('post')}>Add Client</button>
            </div>
            <div className="card-body pt-0 px-2">
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th>Client Name</th>
                      <th>Logo</th>
                      <th>Status</th>
                      <th>Job url</th>
                      <th>Website</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr style={{ position: 'relative' }}>
                      <td colSpan="7">

                        {loading && (
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
                      </td>

                    </tr>


                    {clientList.map(e => {
                      console.log(e.id);
                      return (
                        <tr key={e.id}>
                          <td onClick={(event) => this.handelInProfile(event, 'clients', e.id)} className="cursor-pointer">{e.name}</td>
                          <td>
                            <img src={e.imageUrl} alt={e.name} style={{ width: '50px' }} />
                          </td>
                          <td>{e.status}</td>
                          <td>{e.jobPostingUrl}</td>
                          {/* <td>{e.statusTime.slice(0, 10)}</td> */}
                          <td> {e.website}</td>
                          <td>
                            <button className="btn btn-secondary btn-sm mr-3" onClick={() => this.handleModalToggle("put", e)} >Edit</button>
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

          <CreateClient
            clientState={this.state}
            // changeImage={this.handleOnChangeImage}
            submitClient={this.handleSubmitClient}
            onChange={this.handleOnChange}
            validator={this.validator}
            modalToggle={this.handleModalToggle}
          />

        </div >


      </>
    )
  }


}

const mapStateToProps = state => {
  return {
    profileIn: state.profile.profileIn,
    clients: state.clients
  }
}


export default connect(
  mapStateToProps,
  {
    profileVisible,
    getSingleProfile,
    getProfileRouteInfo,
    getAllContactsById,
    // getClientsWithPaginate,
    // createClient,
    // clientModalOpen,
    // clientModalClose,
    // editClient,
    // editClientImg
  }
)(Clients);
