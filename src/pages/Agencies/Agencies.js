import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paginate from 'react-paginate';
import { profileVisible, getSingleProfile } from '../../actions/profile-actions';
import { getProfileRouteInfo, getAllContactsById } from '../../actions/contact-actions';

import axious from '.././../axious-config'
import authHeader from '../../helper/authHeader'

import CreateAgencyMy from './CreateAgency'
import SimpleReactValidator from 'simple-react-validator';
import { functions } from "../../helper/functions";




class Contacts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      status: '',
      ein: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      imageUrl: '',
      id: '',
      loading: true,
      page: 0,

      editOrCreate: '',
      size: 50,
      agencyList: [],
      modal: false,
      modalType: "",
      totalCount: 0,
      errors: ""

    }


    // Invoke the validator
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.getAgencyData(0)
  }

  // Get All Data Invoke
  getAgencyData(page) {
    const requestOptions = {
      headers: authHeader()
    }
    const { size } = this.state;

    this.setState({
      loading: true,
    })
    axious.get(`/agencies?page=${page}&size=${size}`, requestOptions)
      .then(res => {
        this.setState({
          agencyList: res.data.records,
          pageCount: Math.ceil(res.data.count / size),
          loading: false
        })
      })
      .catch(err => functions.openToaster(`Agency get request is faild`))
  }

  // Handle Page Click
  handlePageClick = (data) => {
    this.setState({
      page: data.selected
    });
    this.getAgencyData(data.selected)

    console.log(data.selected);
    // this.props.getAgenceisWithPaginte(data.selected, this.state.size)
  };

  // Toggle Modal
  handleModalToggle = (type, data) => {
    this.setState(state => ({
      modal: !state.modal,
      modalType: !state.modal ? type : ""
    }));

    if (type === 'edit') {
      this.setState({
        name: data.name,
        status: data.status,
        ein: data.ein,
        phone: data.phone,
        street: data.address.street,
        city: data.address.city,
        state: data.address.state,
        zip: data.address.zip,
        imageUrl: data.imageUrl,
        id: data.id
      })
    } else {
      this.setState({
        name: '',
        status: '',
        ein: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        imageUrl: '',
        id: '',
        errors: ""
      })
    }
  }

  // Change Image
  handleOnChangeImage = (e) => {

    const { id, page } = this.state;

    if (e.target.files[0] !== undefined) {
      const formData = new FormData()
      formData.append('img', e.target.files[0]);

      // console.log(authHeader());

      axious.put(`/agencies/picture/${id}`, formData, {
        headers: {
          'content-type': 'multipart/form-data',
          ...authHeader(),
        }
      })
        .then(res => {
          // Invoke Toaster
          functions.openToaster(`Agency Image Uploaded Done!`)

          // this.getAgencyData(page)

        })
        .catch(err => {
          alert(err.response.data.message)
        })

    }

  }

  // Handle In Profile
  handelProfileIn = (e, route, id) => {
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
    // console.log(e.target);
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });

  }

  // Handle Phone change
  handlePhone = (phoneNumber) => {
    this.setState({
      phone: phoneNumber
    })
  }

  handleAddress = (e) => {
    console.log(e);
    const { city, state, zip } = e;
    this.setState({
      city: city,
      state: state,
      zip: zip
    })
  }

  // Submit Agency
  handleSubmitAgency = (e) => {
    const requestOptions = {
      headers: authHeader()
    }
    e.preventDefault();
    const { agencyList, modalType, name, status, ein, phone, street, id, city, state, zip } = this.state

    const data = {
      name,
      status,
      ein,
      phone,
      address: {
        city,
        state,
        zip,
        street,
      }
    }

    if (modalType === 'add') {
      if (this.validator.allValid()) {

        axious.post(`/agencies`, data, requestOptions)
          .then(res => {

            // Invoke Toaster
            functions.openToaster(`Agency created successfully!`)

            this.getAgencyData(0)
            this.setState({
              modal: false
            })

            // Hide error message
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

    } else if (modalType === 'edit') {
      const requestOptions = {
        headers: authHeader()
      }
      if (this.validator.allValid()) {

        axious.put(`/agencies/${id}`, data, requestOptions)
          .then(res => {

            const data = res.data;

            const updateAgency = agencyList.map(e => {
              if (e.id === id) {
                return {
                  address: {
                    street: data.address.street,
                    city: data.address.city,
                    state: data.address.state,
                    zip: data.address.zip,
                  },
                  ein: data.ein,
                  id: data.id,
                  imageUrl: data.imageUrl,
                  name: data.name,
                  phone: data.phone,
                  status: data.status,
                }
              }
              return e
            })

            functions.openToaster(`Agency Updated successfully!`)

            this.setState({
              modal: false,
              agencyList: updateAgency
            })

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
    }
  }



  // static getDerivedStateFromProps(nextProps, privState) {

  //   if (nextProps.agencies.agencies && nextProps.agencies.totalAgencies > 0 && !nextProps.agencies.modal) {
  //     return {
  //       pageCount: Math.ceil(nextProps.agencies.totalAgencies / privState.size),
  //     }
  //   } else if (nextProps.agencies.errors !== privState.errors) {
  //     return {
  //       errors: nextProps.agencies.errors
  //     }
  //   } else if (nextProps.agencies.modal) {
  //     return {
  //       modal: nextProps.agencies.modal,
  //     }
  //   }
  //   else if (nextProps.agencies.success) {
  //     return {
  //       name: '',
  //       relationshipStatus: '',
  //       ein: '',
  //       phone: '',
  //       street: '',
  //       city: '',
  //       state: '',
  //       zip: '',
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
  //   if (nextProps.agencies.modal !== this.props.agencies.modal) {
  //     this.setState({
  //       modal: false,
  //     })
  //   }
  // }



  render() {
    const { agencyList, loading } = this.state;

    return (
      <>
        <div className="container-fluid">
          <div className="card">

            <div className="card-header bg-white border-bottom-0 d-flex align-items-center">
              <h4 className="mb-0 text-dark mr-3">Agencies</h4>

              <div className="search">
                <input type="text" className="form-control text-secondary" />
              </div>

              <button className="btn btn-primary ml-auto" onClick={() => this.handleModalToggle('add', null)}>Add Agency</button>
            </div>
            <div className="card-body pt-0 px-2">
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th>Agency Name</th>
                      <th>Agency Image</th>
                      <th>Status</th>
                      <th>Company EIN</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody >
                    {loading && (
                      <tr style={{ position: 'relative' }}>
                        <td colSpan="7" className=''>

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


                    {agencyList && agencyList.map(e => {

                      return (
                        <tr key={e.id}>
                          <td onClick={(event) => this.handelProfileIn(event, 'agencies', e.id)} className="cursor-pointer">{e.name}</td>
                          <td>
                            <img src={e.imageUrl} alt={e.name} style={{ width: '50px', borderRadius: '5px', maxHeight: '35px', objectFit: 'cover' }} />
                          </td>
                          <td>{e.status}</td>
                          <td>{e.ein}</td>

                          <td className="text-primary text-underline"> {e.phone}</td>

                          <td>{`${e.address.street}, ${e.address.city}, ${e.address.state}, ${e.address.zip}`}</td>
                          <td>
                            <button className="btn btn-secondary btn-sm mr-3" onClick={() => this.handleModalToggle("edit", e)} >Edit</button>
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

          <CreateAgencyMy
            agencyState={this.state}
            changeImage={this.handleOnChangeImage}
            submitAgency={this.handleSubmitAgency}
            onChange={this.handleOnChange}
            validator={this.validator}
            modalToggle={this.handleModalToggle}
            phone={this.handlePhone}
            address={this.handleAddress}
          />

        </div >


      </>
    )
  }


}

const mapStateToProps = state => {
  return {
    profileIn: state.profile.profileIn,
    // agencies: state.agencies
  }
}


export default connect(
  mapStateToProps,
  {
    profileVisible,
    getSingleProfile,
    getProfileRouteInfo,
    getAllContactsById,
  }
)(Contacts);
