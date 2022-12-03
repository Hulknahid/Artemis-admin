import React, { Component } from 'react'
import { Form, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
import axios from '../../axious-config';
// import axious from '.././../axious-config';
import { connect } from 'react-redux';

import { modalActions } from '../../actions/modal-action';
import authHeader from '../../helper/authHeader';
import { functions } from "../../helper/functions";

class SkillModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: ""
        }

        // Invoke the validator
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    handleModalToggle = () => {
        const { dispatch } = this.props;
        dispatch(modalActions.modalToggle())
    }

    // Hande On Change
    handleOnChange = (e) => {

        const { name, value } = e.target;

        this.setState({
            [name]: value
        });

    }


    // Submit Agency
    submitAgency = (e) => {
        e.preventDefault();
        const requestOptions = {
            headers: authHeader()
        }
        const { name, id, skillList, status } = this.state;

        const { modal: { modal, reqType }, dispatch } = this.props;

        console.log(this.props);

        const data = {
            name
        }


        if (reqType === 'add') {
            if (this.validator.allValid()) {

                axios.post(`/skills`, data, requestOptions)
                    .then(res => {

                        const id = res.data.id;

                        data.status = 'ACCEPTED';


                        axios.put(`/skills/${id}`, data, requestOptions)
                            .then(updateResponse => {
                                functions.openToaster(`Skill created successfully!`);
                                dispatch(modalActions.modalToggle())

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

        } else if (reqType === 'edit') {

            if (this.validator.allValid()) {

                data.status = status;

                console.log("updated: skill");
                axios.put(`/skills/${id}`, data, requestOptions)
                    .then(res => {

                    })
                    .catch(err => {
                        console.log(err.response);
                    })

                // axios.put(`/skills/${id}`, data, requestOptions)
                //     .then(res => {

                //         functions.openToaster(`Skill Updated successfully!`)

                //         const updateSkillList = skillList.map(e => {
                //             if (e.id === id) {
                //                 return {
                //                     ...res.data
                //                 }
                //             }
                //             return e
                //         })


                //         this.setState({
                //             modal: false,
                //             skillList: updateSkillList
                //         })



                //     })
                //     .catch(err => {
                //         const { status, message } = err.response.data;

                //         if (status === 409) {
                //             this.setState({
                //                 errors: message
                //             })
                //         }

                //     })


            } else {
                this.validator.showMessages();
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps !== undefined && nextProps.skills.name !== prevState.name) {
            return {
                name: nextProps.skills.name,
                id: nextProps.skills.id
            }
        } else {
            return null
        }
    }


    render() {
        const { name, errors } = this.state;
        const { modal, reqType } = this.props.modal

        console.log(this.state);

        return (
            <div>

                <Modal isOpen={modal} >
                    <ModalHeader toggle={this.handleModalToggle}>
                        {reqType === 'edit' ? 'Edit Skill' : 'Create Skill'}
                    </ModalHeader>
                    <ModalBody>

                        {/* Submit Form  */}
                        <Form onSubmit={this.submitAgency}>


                            {/* name  */}
                            <FormGroup row>
                                <Label for="name" sm={3}>Name</Label>
                                <Col sm={9}>
                                    <Input type="text" name="name" onChange={this.handleOnChange} id="name" value={name} />
                                    {/* {this.props.validator.message('Name', name, 'required', { className: 'text-danger mt-1' })} */}
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
            </div >
        )
    }
}

const mapSateToProps = (state) => {
    return {
        modal: state.modal,
        skills: state.skills
    }
}


export default connect(mapSateToProps)(SkillModal) 