import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { Button, Modal, ModalHeader, ModalBody, Form, Row, Col, FormGroup, Label, Input, } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';

import PhoneInput from 'react-phone-number-input';
import { updateContact, updateContactImg, getAllContactsById } from '../../actions/contact-actions';
import axiosInstance from '../../axious-config';
import authHeader from '../../helper/authHeader';
import { functions } from '../../helper/functions'

class ProfileContacts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            nickName: '',
            salutation: '',
            primaryPhone: '',
            secondaryPhone: '',
            email: '',
            passwordResetRequired: false,
            accountStatus: '',
            title: '',
            notes: '',
            level: '',
            relationshipStatus: '',
            imageUrl: '',

            modal: false,
            // showContactModal: false,
            reqMethod: '',
            // Single contact Show
            singleContact: {},
            errors: ""
        }
        // this.handleAddContactModalOpen = this.handleAddContactModalOpen.bind(this);
        this.handleAddContactModalClose = this.handleAddContactModalClose.bind(this);
        this.handleContactChange = this.handleContactChange.bind(this);
        this.handleContactSubmit = this.handleContactSubmit.bind(this);
        this.handleShowContactModalOpen = this.handleShowContactModalOpen.bind(this);
        this.handleOnChangeImage = this.handleOnChangeImage.bind(this);

        // Invoke the validator
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    // Contact Create Modal Open
    handleContactModalToggle = (e, method, data) => {
        // e.preventDefault();
        // this.props.contactCreateModalOpen();
        this.setState(state => ({
            modal: !state.modal,
            reqMethod: !state.modal ? method : ""
        }));

        if (method === 'get') {
            this.setState({
                singleContact: data
            })
        } else if (method === 'put') {

            this.setState({
                firstName: data.names.firstName,
                lastName: data.names.lastName,
                nickName: data.names.nickName,
                salutation: data.names.salutation,
                primaryPhone: data.primaryPhone,
                secondaryPhone: data.secondaryPhone,
                email: data.email,
                accountStatus: data.accountStatus,
                imageUrl: data.imageUrl,
                relationshipStatus: data.relationshipStatus,
                contactId: data.id,

                title: data.title,
                notes: data.notes,
                level: data.level,
            })
        } else {
            this.setState({
                firstName: "",
                lastName: "",
                nickName: "",
                salutation: "",
                primaryPhone: "",
                secondaryPhone: "",
                email: "",
                accountStatus: "",
                imageUrl: "",
                relationshipStatus: "",
                contactId: "",

                title: "",
                notes: "",
                level: "",
            })
        }

        // console.log(data);

        // this.setState({
        //     reqMethod: method
        // });

        // const route = this.state.profile.route

        // if (method === 'put' && route === 'clients') {
        // this.setState({
        //     firstName: data.names.firstName,
        //     lastName: data.names.lastName,
        //     nickName: data.names.nickName,
        //     salutation: data.names.salutation,
        //     primaryPhone: data.primaryPhone,
        //     secondaryPhone: data.secondaryPhone,
        //     email: data.email,
        //     accountStatus: data.accountStatus,
        //     imageUrl: data.imageUrl,
        //     relationshipStatus: data.clientContact.relationshipStatus,
        //     contactId: data.id,

        //     title: data.clientContact.title,
        //     notes: data.clientContact.notes,
        //     level: data.clientContact.level,
        //     contactRole: data.clientContact.contactRole,
        // })
        // } else if (method === 'put' && route === 'agencies') {
        //     this.setState({
        //         firstName: data.names.firstName,
        //         lastName: data.names.lastName,
        //         nickName: data.names.nickName,
        //         salutation: data.names.salutation,
        //         primaryPhone: data.primaryPhone,
        //         secondaryPhone: data.secondaryPhone,
        //         email: data.email,
        //         accountStatus: data.accountStatus,
        //         imageUrl: data.imageUrl,
        //         relationshipStatus: data.agencyContact.relationshipStatus,
        //         contactId: data.id,

        //         title: data.agencyContact.title,
        //         notes: data.agencyContact.notes,
        //         level: data.agencyContact.level,
        //         contactRole: data.agencyContact.contactRole,
        //     })
        // }
    }

    // Create Contact Modal Close
    handleAddContactModalClose(e) {
        e.preventDefault();

        this.props.contactCreateModalClose()
        this.validator.hideMessages()

        this.setState({
            firstName: '',
            lastName: '',
            nickName: '',
            salutation: '',
            primaryPhone: '',
            secondaryPhone: '',
            email: '',
            passwordResetRequired: false,
            accountStatus: '',
            title: '',
            notes: '',
            level: '',
            relationshipStatus: '',
            contactRole: '',
            reqMethod: '',
            imageUrl: '',
            contactId: '',
            profile: {}
        })
    }

    //Show Contact Modal Open
    handleShowContactModalOpen(e, singleContact) {
        this.setState(state => ({
            showContactModal: !state.showContactModal
        }))

        this.setState({
            singleContact: singleContact
        })
    }

    // Change Image
    handleOnChangeImage(e, route, contactId, profileId) {
        // const { profileId } = this.props.contacts;



        if (e.target.files[0] !== undefined) {
            const formData = new FormData()
            formData.append('img', e.target.files[0]);

            if (route === 'agencies') {
                axiosInstance.put(`/agency-contacts/picture/${contactId}`, formData, {
                    headers: {
                        'content-type': 'multipart/form-data',
                        ...authHeader()
                    }
                })
                    .then(res => {
                        functions.openToaster('Image Uploaded Done!')

                        this.props.getAllContactsById('agencies', profileId);

                    })
                    .catch(err => {
                        functions.openToaster('Image did not uploaded')
                    })

            } else if (route === 'clients') {

                axiosInstance.put(`/client-contacts/picture/${contactId}`, formData, {
                    headers: {
                        'content-type': 'multipart/form-data',
                        ...authHeader()
                    }
                })
                    .then(res => {
                        functions.openToaster('Image Uploaded Done!')

                        this.props.getAllContactsById('clients', profileId);
                    })
                    .catch(err => {
                        functions.openToaster('Image did not uploaded')
                    })
            }

        }
    }

    // Handle Change Input
    handleContactChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // Contact Submit
    handleContactSubmit(e) {
        e.preventDefault();
        const requestOptions = {
            headers: authHeader()
        }
        const { profileId } = this.props.contacts;

        const {
            firstName,
            lastName,
            nickName,
            salutation,
            primaryPhone,
            secondaryPhone,
            email,
            accountStatus,
            title,
            notes,
            level,
            relationshipStatus,
            reqMethod,
            contactId
        } = this.state;

        // fix route name
        let changeroute = "";
        if (profileId.route === 'agencies') {
            changeroute = 'agency';

        } else if (profileId.route === 'clients') {
            changeroute = 'client';
        }

        const data = {
            names: {
                firstName: firstName,
                lastName: lastName,
                nickName: nickName,
                salutation: salutation,
            },
            accountStatus,
            [changeroute]: {
                id: profileId.id
            },
            email,
            level,
            notes,
            relationshipStatus,
            primaryPhone,
            title,
        };

        if (secondaryPhone !== "") {
            data.secondaryPhone = secondaryPhone;
        }

        if (profileId.route === 'agencies' && reqMethod === 'post') {
            if (this.validator.allValid()) {
                // Invoke createContact action
                // Add password
                data.password = 'Abc123';

                axiosInstance.post('/agency-contacts', data, requestOptions)
                    .then(res => {
                        functions.openToaster('Agency Contact Created Done!')

                        this.props.getAllContactsById('agencies', profileId.id);
                        this.setState({
                            modal: false
                        })
                    })
                    .catch(err => {
                        const { status, message } = err.response.data;

                        if (status === 409) {
                            this.setState({
                                errors: message
                            })
                        }
                        // alert('Error create agency contact!')
                    })

            } else {
                this.validator.showMessages();
            }
        } else if (profileId.route === 'agencies' && reqMethod === 'put') {
            if (this.validator.allValid()) {

                data.passwordResetRequired = false;

                axiosInstance.put(`/agency-contacts/${contactId}`, data, requestOptions)
                    .then(res => {

                        functions.openToaster('Agency Contact Updated Done!')

                        this.props.getAllContactsById('agencies', profileId.id);
                        this.setState({
                            modal: false
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
        } else if (profileId.route === 'clients' && reqMethod === 'post') {

            if (this.validator.allValid()) {
                // Invoke createContact action
                data.password = "Abc123";

                axiosInstance.post('/client-contacts', data, requestOptions)
                    .then(res => {

                        functions.openToaster('Client Contacts Created Done!')

                        this.props.getAllContactsById('clients', profileId.id);
                        this.setState({
                            modal: false
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

        } else if (profileId.route === 'clients' && reqMethod === 'put') {
            if (this.validator.allValid()) {
                // Invoke createContact action

                data.passwordResetRequired = false;

                axiosInstance.put(`/client-contacts/${contactId}`, data, requestOptions)
                    .then(res => {
                        functions.openToaster('Client Contacts Updated Done! ')

                        this.props.getAllContactsById('clients', profileId.id);
                        this.setState({
                            modal: false
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

    onChangePhoneNumber = (phoneNumber, type) => {
        if (type === 'primary') {
            this.setState({
                primaryPhone: phoneNumber
            })
        } else {
            this.setState({
                secondaryPhone: phoneNumber
            })
        }
    }

    render() {
        const { contacts, profileId } = this.props.contacts;
        const {
            errors,
            singleContact,
            // profile,
            reqMethod,
            firstName,
            lastName,
            nickName,
            salutation,
            primaryPhone,
            secondaryPhone,
            email,
            accountStatus,
            title,
            notes,
            level,
            relationshipStatus,
            imageUrl,
            contactId,
            modal

        } = this.state;

        let message = '';
        let ContactError = '';

        // for (const key in errors) {
        //     console.log(key)
        //     if (errors.hasOwnProperty('message') && errors.hasOwnProperty('errors')) {
        //         ContactError = errors['errors']
        //     } else if (errors.hasOwnProperty('message')) {
        //         ContactError = errors['message']
        //     } else if (errors.hasOwnProperty('errors')) {
        //         ContactError = errors['errors']
        //     }
        // }



        return (
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center bg-white border-bottom-0">
                    <h4 className="mb-0 text-dark">Contacts</h4>
                    <button onClick={(e) => this.handleContactModalToggle(e, 'post', null)} className="btn btn-link">Add contact</button>
                </div>

                {/* Customers Contacts  */}
                <PerfectScrollbar style={{ maxHeight: '250px' }}>
                    <div className="card-body pt-0 pb-2">
                        {
                            contacts.map((e, i) => {

                                return <div className="media py-2 align-items-center " key={i}>
                                    <div className="avatar mr-3 cursor-pointer" onClick={(event) => this.handleContactModalToggle(event, 'get', e)} >
                                        <img className="img-fluid border-rounded" src={e.imageUrl} alt="User" />
                                    </div>
                                    <div className="media-body d-flex justify-content-between align-items-center">
                                        <div className="cursor-pointer" onClick={(event) => this.handleContactModalToggle(event, 'get', e)} >
                                            <span className="d-block text-dark" >
                                                {e && e.names.firstName + ' ' + e.names.lastName}
                                            </span>
                                            <span className="font-small"> {e.title} </span>
                                        </div>
                                        <div className='d-flex'>
                                            <button className='btn btn-success btn-sm mr-1'>Call</button>
                                            <button className='btn btn-info btn-sm mr-1'>SMS</button>
                                            <button className='btn btn-danger btn-sm mr-1' onClick={(event) => this.handleContactModalToggle(event, 'put', e)}>Edit</button>
                                        </div>
                                        {/* <UncontrolledDropdown className="dropdown-icon">
                                            <DropdownToggle tag="a" className="toggler">
                                                <i className="mdi mdi-dots-horizontal"></i>
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem>Call</DropdownItem>
                                                <DropdownItem>SMS</DropdownItem>
                                                <DropdownItem onClick={(event) => this.handleContactModalToggle(event, 'put', e)}>Edit</DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown> */}
                                    </div>
                                </div>




                            })
                        }
                    </div>
                </PerfectScrollbar>


                <Modal size="lg" isOpen={modal}  >
                    <ModalHeader toggle={this.handleContactModalToggle}>
                        {
                            reqMethod === 'post' ? "Add contact" : reqMethod === 'put' ? "Update contact" : "Contact Details"
                        }




                    </ModalHeader>
                    <ModalBody>

                        {/* Update Image  */}
                        {reqMethod === 'put' ?
                            <FormGroup row className="form-group-img">
                                <Label for="feature-img" sm={3}>Contact Image</Label>
                                <Col sm={9}>
                                    <Input type="file" name="imageUrl" onChange={(e) => this.handleOnChangeImage(e, profileId.route, contactId, profileId.id)} id="feature-img" />
                                    <div className="text-left mt-3">
                                        <img src={imageUrl} alt={firstName} />
                                    </div>
                                </Col>
                            </FormGroup> :
                            null
                        }
                        {reqMethod !== 'get' ?
                            <Form onSubmit={this.handleContactSubmit} >
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="firstName">First Name</Label>
                                            <Input type="text" name="firstName" id="firstName" onChange={this.handleContactChange} value={firstName} />
                                            {this.validator.message('first name', firstName, 'required', { className: 'text-danger my-2' })}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="lastName">Last Name</Label>
                                            <Input type="text" name="lastName" id="lastName" onChange={this.handleContactChange} value={lastName} />
                                            {this.validator.message('last name', lastName, 'required', { className: 'text-danger my-2' })}

                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="nickName">Nick Name</Label>
                                            <Input type="text" name="nickName" id="nickName" onChange={this.handleContactChange} value={nickName} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="salutation">Salutation</Label>
                                            <Input type="select" name="salutation" id="salutation" onChange={this.handleContactChange} value={salutation} >
                                                <option value="">Select Salutation</option>
                                                <option value="Mr">Mr</option>
                                                <option value="Mrs">Mrs</option>
                                                <option value="Ms">Ms</option>
                                                <option value="Dr">Dr</option>
                                                <option value="Prof">Prof</option>
                                            </Input>
                                            {this.validator.message('salutation', salutation, 'required', { className: 'text-danger my-2' })}

                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="primaryPhone">Primary Phone</Label>
                                            {/* <Input type="text" name="primaryPhone" id="primaryPhone" onChange={this.handleContactChange} value={primaryPhone} /> */}

                                            <PhoneInput
                                                className="phone-number-wrapper"
                                                placeholder="Enter primary phone"
                                                defaultCountry="US"
                                                value={primaryPhone}
                                                onChange={(e) => this.onChangePhoneNumber(e, 'primary')}
                                            />



                                            {this.validator.message('primary phone', primaryPhone, 'required', { className: 'text-danger my-2' })}

                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="secondaryPhone">Secondary Phone</Label>
                                            {/* <Input type="text" name="secondaryPhone" id="secondaryPhone" onChange={this.handleContactChange} value={secondaryPhone} /> */}
                                            <PhoneInput
                                                className="phone-number-wrapper"
                                                placeholder="Enter secondary phone"
                                                defaultCountry="US"
                                                value={secondaryPhone}
                                                onChange={(e) => this.onChangePhoneNumber(e, 'secondary')}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="email">Email</Label>
                                            <Input type="email" name="email" id="email" onChange={this.handleContactChange} value={email} autoComplete="off" />
                                            {this.validator.message('email', email, 'required', { className: 'text-danger my-2' })}

                                        </FormGroup>
                                    </Col>


                                    {/* Title */}
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="title">Title</Label>
                                            <Input type="text" name="title" id="title" onChange={this.handleContactChange} value={title} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="notes">Notes</Label>
                                            <Input type="textarea" name="notes" id="notes" onChange={this.handleContactChange} value={notes} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="accountStatus">Account Status</Label>
                                            <Input type="select" name="accountStatus" id="accountStatus" onChange={this.handleContactChange} value={accountStatus}>
                                                <option value="">Select Role</option>
                                                <option value="ACTIVE">Active</option>
                                                <option value="LOCKED">Locked</option>
                                                <option value="TERMINATED">Terminated</option>
                                            </Input>
                                            {this.validator.message('account status', accountStatus, 'required', { className: 'text-danger my-2' })}
                                        </FormGroup>
                                    </Col>



                                    {/* <Col md={6}>
                                    <FormGroup>
                                        <Label for="contactRole">Contact Roles</Label>
                                        <Input type="select" name="contactRole" id="contactRole" onChange={this.handleContactChange} value={contactRole} disabled={profile && profile.route !== 'clients' ? false : true} >
                                            <option value="">Select Account Status</option>
                                            <option value="MANAGER">Manager</option>
                                            <option value="CONTACT">Contact</option>
                                        </Input>

                                        {

                                            profile && profile.route !== 'clients' && reqMethod === 'put' ?
                                                this.validator.message('contact role', contactRole, 'required', { className: 'text-danger my-2' })
                                                : ''
                                        }
                                    </FormGroup>
                                </Col> */}


                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="level">Level</Label>
                                            <Input type="select" name="level" id="level" onChange={this.handleContactChange} value={level}>
                                                <option value="">Select Level</option>
                                                <option value="PRIMARY">Primary</option>
                                                <option value="SECONDARY">Secondary</option>
                                                <option value="TERTIARY">Tertiary</option>
                                            </Input>
                                            {this.validator.message('level', this.state.level, 'required', { className: 'text-danger my-2' })}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="relationshipStatus">Relationship Status</Label>
                                            <Input type="select" name="relationshipStatus" id="relationshipStatus" onChange={this.handleContactChange} value={relationshipStatus} >
                                                <option value="">Select Relationship Status</option>
                                                <option value="CONTACTED">Contacted</option>
                                                <option value="NOT_CONTACTED">Not Contacted </option>
                                                <option value="CONVERTED">Converted</option>
                                                <option value="NOT_CONVERTED">Not Converted</option>
                                                <option value="ENDED">ENDED</option>
                                            </Input>
                                            {this.validator.message('relationship status', this.state.relationshipStatus, 'required', { className: 'text-danger my-2' })}
                                        </FormGroup>
                                    </Col>

                                </Row>

                                <div className="d-flex justify-content-between align-items-center">
                                    {/* Erorrs  */}
                                    <span className="text-danger text-capitalize">
                                        {errors ? errors : null}
                                    </span>
                                    <Button className="btn-success">Submit</Button>
                                </div>

                                {/* <div className="d-flex justify-content-between align-items-center">
                                    Erorrs
                                    <span className="text-danger text-capitalize">
                                        {message ? message + "," : ''}
                                        {ContactError ? ContactError : ''}
                                    </span>

                                    <Button className="btn-success">Contact Submit</Button>
                                </div> */}

                            </Form>
                            : null

                        }



                        {/* Contact Details  */}
                        {reqMethod === 'get' ?
                            <div className="single-contact-show">
                                <div className="single-contact-img">
                                    <img src={singleContact && singleContact.imageUrl} alt="" />
                                </div>
                                <div className="single-contact-details">
                                    <div>
                                        {singleContact && singleContact.names &&
                                            <h4 className="text-dark mb-0">

                                                {`${singleContact.names.firstName} ${singleContact.names.lastName} ${singleContact.names.lastName}`}
                                            </h4>
                                        }

                                        {singleContact && singleContact.agencyContact &&
                                            <p className="text-green mb-0">{singleContact.agencyContact.contactRole}</p>
                                        }

                                    </div>
                                    <p className="single-item mt-3">
                                        <span className="sub-title">Primary Phone:</span>
                                        <span className="sub-details">{singleContact && singleContact.primaryPhone}</span>
                                    </p>
                                    {
                                        singleContact && singleContact.secondaryPhone && <p className="single-item">
                                            <span className="sub-title">Secondary Phone:</span>
                                            <span className="sub-details">{singleContact && singleContact.secondaryPhone}</span>
                                        </p>
                                    }

                                    <p className="single-item">
                                        <span className="sub-title">Email:</span>
                                        <span className="sub-details">{singleContact && singleContact.email}</span>
                                    </p>
                                    {
                                        singleContact && singleContact.agencyContact && singleContact.agencyContact.title && <p className="single-item">
                                            <span className="sub-title">Title:</span>
                                            <span className="sub-details">{singleContact.agencyContact.title}</span>
                                        </p>
                                    }

                                    {
                                        singleContact && singleContact.clientContact && singleContact.clientContact.title && <p className="single-item">
                                            <span className="sub-title">Title:</span>
                                            <span className="sub-details">{singleContact.clientContact.title}</span>
                                        </p>
                                    }

                                    {
                                        singleContact && singleContact.agencyContact && singleContact.agencyContact.notes && <p className="single-item">
                                            <span className="sub-title">Title:</span>
                                            <span className="sub-details">{singleContact.agencyContact.notes}</span>
                                        </p>
                                    }

                                    {
                                        singleContact && singleContact.clientContact && singleContact.clientContact.notes && <p className="single-item">
                                            <span className="sub-title">Title:</span>
                                            <span className="sub-details">{singleContact.clientContact.notes}</span>
                                        </p>
                                    }

                                    <p className="single-item">
                                        <span className="sub-title">Accout Status:</span>
                                        <span className="sub-details"> {singleContact && singleContact.accountStatus}</span>
                                    </p>

                                    {singleContact && singleContact.clientContact &&
                                        <p className="single-item">
                                            <span className="sub-title">Level:</span>
                                            <span className="sub-details"> {singleContact.clientContact.level}</span>
                                        </p>
                                    }

                                    {singleContact && singleContact.agencyContact &&
                                        <p className="single-item">
                                            <span className="sub-title">Level:</span>
                                            <span className="sub-details"> {singleContact.agencyContact.level}</span>
                                        </p>
                                    }

                                    {singleContact && singleContact.clientContact &&
                                        <p className="single-item">
                                            <span className="sub-title">Relationship Status:</span>
                                            <span className="sub-details"> {singleContact.clientContact.relationshipStatus}</span>
                                        </p>
                                    }

                                    {singleContact && singleContact.agencyContact &&
                                        <p className="single-item">
                                            <span className="sub-title">Relationship Status:</span>
                                            <span className="sub-details"> {singleContact.agencyContact.relationshipStatus}</span>
                                        </p>
                                    }

                                </div>
                            </div>
                            :
                            null
                        }

                    </ModalBody>
                </Modal>



            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        contacts: state.contacts
    }
}

export default connect(
    mapStateToProps, {
    // createContact,
    updateContact,
    updateContactImg,
    getAllContactsById
})(ProfileContacts);

