import React, { Component } from 'react';
import PhoneInput from 'react-phone-number-input'
import { Form, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Col, Button } from 'reactstrap';

import Search from '../../components/SearchAuto';
import { candidateService } from "../../services";


class CreateUpdatedAgency extends Component {

    constructor(props) {
        super(props)

        this.state = {
            searchResults: [],
            selectedSearchValue: {},
            searchDropdown: false,
            searchValue: "",
            searchLoading: false,
            focus: false,
            tempData: [],
            city: '',
            address: {
                city: '',
                state: '',
                zipCode: '',
                street: '',
            },
        }
    }

    locationSearch = (place) => {
        candidateService.getLocationSuggestion(place).then(response => {

            let suggestions = []
            suggestions = response?.data?.suggestions;

            let list = [];
            if (suggestions.length > 0) {
                suggestions.forEach((item, index) => {
                    list.push({
                        id: item?.address?.postalCode,
                        zip: item?.address?.postalCode,
                        city: item?.address?.city,
                        country: item?.address?.country,
                        name: item?.label,
                        state: item?.address?.state
                    })
                });
            }
            this.setState({
                tempData: list,
                searchDropdown: true
            })
        }).catch(e => {
            console.log('ERERE', e)
        })
    }

    handleCityName = (e) => {
        const { value } = e.target;
        this.locationSearch(value)
        const { address } = this.props;
        address({
            city: value,
        })

    }

    handleSelectedCity = (e) => {
        this.setState({
            searchDropdown: false
        })
        const { address } = this.props;
        address(e)
    }

    handleSearchClose = () => {
        const { address } = this.props;
        address({
            city: "",
            state: "",
            zip: ""
        })
    }


    render() {

        const { modalType, name, imageUrl, modal, status, ein, phone, street, errors, city, state, zip } = this.props.agencyState
        const {
            searchDropdown,
            searchLoading,
            tempData,
        } = this.state;

        return (

            <Modal size="lg" isOpen={modal} modalClassName="modal-default modal-opportunity" >
                <ModalHeader toggle={this.props.modalToggle}>
                    {modalType === 'edit' ? 'Edit Agency' : 'Create Agency'}
                </ModalHeader>
                <ModalBody onClick={this.handleCloseSearchDropdown}>

                    {/* Update Image  */}
                    {modalType === 'edit' ?
                        <FormGroup row className="form-group-img">
                            <Label for="feature-img" sm={3}>Agency Image</Label>
                            <Col sm={9}>
                                <Input type="file" name="imageUrl" onChange={this.props.changeImage} id="feature-img" />
                                <div className="text-center">
                                    <img src={imageUrl} alt={name} />
                                </div>
                            </Col>
                        </FormGroup> :
                        ""
                    }

                    {/* Submit Form  */}
                    <Form onSubmit={this.props.submitAgency}>
                        {/* name  */}
                        <FormGroup row>
                            <Label for="name" sm={3}>Name</Label>
                            <Col sm={9}>
                                <Input type="text" name="name" onChange={this.props.onChange} id="name" value={name} />
                                {this.props.validator.message('Name', name, 'required', { className: 'text-danger mt-1' })}
                            </Col>
                        </FormGroup>

                        {/* position  */}
                        <FormGroup row>
                            <Label for="status" sm={3}>Status</Label>
                            <Col sm={9}>
                                <Input type="select" name="status" id="status"
                                    onChange={this.props.onChange}
                                    value={status}
                                >
                                    <option value="">Select Status</option>
                                    <option value="NOT_CONTACTED">Not Connected</option>
                                    <option value="CONTACTED">Connected</option>
                                    <option value="CONVERTED">Converted</option>
                                    <option value="NOT_CONVERTED">Not Converted</option>
                                    <option value="ENDED">Ended</option>
                                </Input>
                                {this.props.validator.message('status', status, 'required', { className: 'text-danger mt-1' })}
                            </Col>

                        </FormGroup>

                        {/* Company EIN */}
                        <FormGroup row>
                            <Label for="ein" sm={3}>Company EIN</Label>
                            <Col sm={9}>
                                <Input type="text" id="ein" name="ein" onChange={this.props.onChange} value={ein} />
                                {this.props.validator.message('ein', ein, ['required', { max: 9 }, { min: 9 }, "numeric"], { className: 'text-danger mt-1' })}
                            </Col>
                        </FormGroup>

                        {/* Phone */}
                        <FormGroup row>
                            <Label for="phone" sm={3}>Phone Number</Label>
                            <Col sm={9}>
                                {/* <Input type="text" id="phone" name="phone" onChange={this.props.onChange} value={phone} /> */}
                                <PhoneInput
                                    className='phone-number-wrapper'
                                    placeholder="Enter phone number"
                                    defaultCountry="US"
                                    value={phone}
                                    onChange={this.props.phone} />
                                {this.props.validator.message('phone', phone, 'required', { className: 'text-danger mt-1' })}
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label htmlFor="workAuthorization" sm={3}>Type City (current location)</Label>
                            <Col sm={9}>
                                <Search
                                    onChange={this.handleCityName}
                                    results={tempData}
                                    handleSelectedValue={this.handleSelectedCity}
                                    value={city}
                                    close={this.handleSearchClose}
                                    dropdown={searchDropdown}
                                    loading={searchLoading}
                                />
                                {this.props.validator.message('city', city, 'required', { className: 'text-danger mt-1' })}
                            </Col>

                        </FormGroup>

                        {/* State  */}
                        <FormGroup row>
                            <Label htmlFor="state" sm={3}>State</Label>
                            <Col sm={9}>
                                <Input type="text" id="state" value={state} />
                                {this.props.validator.message('state', state, 'required', { className: 'text-danger mt-1' })}
                            </Col>
                        </FormGroup>

                        {/* Zip */}
                        <FormGroup row>
                            <Label for="zip" sm={3}>Zip</Label>
                            <Col sm={9}>
                                <Input type="text" name="zip" id="zip" value={zip} />
                                {this.props.validator.message('zip', zip, 'required', { className: 'text-danger mt-1' })}
                            </Col>
                        </FormGroup>

                        {/* Street  */}
                        <FormGroup row>
                            <Label for="street" sm={3}>Street</Label>
                            <Col sm={9}>
                                <Input type="text" id="street" name="street" onChange={this.props.onChange} value={street} />
                                {this.props.validator.message('street', street, 'required', { className: 'text-danger mt-1' })}
                            </Col>
                        </FormGroup>



                        <div className="d-flex justify-content-between align-items-center">
                            {/* Erorrs  */}
                            <span className="text-danger text-capitalize">
                                {errors ? errors : null}
                            </span>


                            <Button className="btn-success">Submit</Button>
                        </div>

                    </Form>
                </ModalBody>

            </Modal>
        )
    }
}


export default CreateUpdatedAgency;
