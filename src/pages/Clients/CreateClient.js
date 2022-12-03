import React, { Component } from 'react';

import { Form, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Col, Button } from 'reactstrap';


class CreateUpdatedAgency extends Component {

    render() {

        const { modal, editOrCreate, name, status, website, jobPostingUrl, errors } = this.props.clientState;

        // let message = '';
        // let agencyError = '';

        // for (const key in errors) {
        //     if (errors.hasOwnProperty('message') && errors.hasOwnProperty('errors')) {
        //         // message = errors['message']
        //         agencyError = errors['errors']
        //     } else if (errors.hasOwnProperty('message')) {
        //         agencyError = errors['message']
        //     } else if (errors.hasOwnProperty('errors')) {
        //         agencyError = errors['errors']
        //     }
        // }

        const { RelationshipStatus: realStatus } = JSON.parse(localStorage.getItem("appSettings")).refData;


        return (

            <Modal size="lg" isOpen={modal} modalClassName="modal-default modal-opportunity" >
                <ModalHeader toggle={this.props.modalToggle}>
                    {editOrCreate === 'edit' ? 'Update Client' : 'Create Client'}
                </ModalHeader>
                <ModalBody>

                    {/* Update Image
                    {editOrCreate === 'edit' ?
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
                    } */}

                    {/* Submit Form  */}
                    <Form onSubmit={this.props.submitClient}>
                        {/* name  */}
                        <FormGroup row>
                            <Label for="name" sm={3}>Name</Label>
                            <Col sm={9}>
                                <Input type="text" name="name" onChange={this.props.onChange} id="name" value={name} />
                                {this.props.validator.message('Name', name, 'required', { className: 'text-danger mt-1' })}
                            </Col>
                        </FormGroup>
                        {/* name  */}
                        <FormGroup row>
                            <Label for="jobPostingUrl" sm={3}>Job Posting Url</Label>
                            <Col sm={9}>
                                <Input type="text" name="jobPostingUrl" onChange={this.props.onChange} id="jobPostingUrl" value={jobPostingUrl} />
                                {this.props.validator.message('jobPostingUrl', jobPostingUrl, 'required', { className: 'text-danger mt-1' })}
                            </Col>
                        </FormGroup>



                        {/* position  */}
                        <FormGroup row>
                            <Label for="status" sm={3}>Relationship Status</Label>
                            <Col sm={9}>

                                <Input type="select" name="status" id="status" onChange={this.props.onChange} value={status}>
                                    <option value="">Select Relationship</option>
                                    {
                                        realStatus.map(e => <option value={e} key={e}>{e}</option>)
                                    }
                                </Input>
                                {this.props.validator.message('status', status, 'required', { className: 'text-danger mt-1' })}
                            </Col>

                        </FormGroup>

                        {/* Website */}
                        <FormGroup row>
                            <Label for="website" sm={3}>Website</Label>
                            <Col sm={9}>
                                <Input type="text" id="website" name="website" onChange={this.props.onChange} value={website} />
                                {this.props.validator.message('website', website, 'required', { className: 'text-danger mt-1' })}
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
