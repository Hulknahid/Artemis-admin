import React, { Component } from 'react';
import Paginate from 'react-paginate';
import { Form, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import classnames from 'classnames'

import axious from '.././../axious-config';
import authHeader from '../../helper/authHeader';
import SimpleReactValidator from 'simple-react-validator';
import { functions } from "../../helper/functions";





class Contacts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            loading: false,
            skillList: [],
            limit: 50,
            pageId: 0,
            approvalStatuses: "PENDING",
            errors: null,
            modal: false,
            status: ""

        }


        // Invoke the validator
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });

        this.getSkillData(0)
    }

    // Get All Data Invoke
    getSkillData(pageId) {
        const { limit, approvalStatuses } = this.state;
        this.setState({
            loading: true,
        })
        const requestOptions = {
            headers: authHeader()
        }
        axious.get(`/skills?pageId=${pageId}&limit=${limit}&approvalStatuses=${approvalStatuses}`, requestOptions)
            .then(res => {

                this.setState({
                    skillList: res.data.records,
                    pageCount: Math.ceil(res.data.count / limit),
                    loading: false
                })
            })
            .catch(err =>
                functions.openToaster(`Skills faild`)
            )
    }

    // Handle Page Click
    handlePageClick = (data) => {
        this.setState({
            pageId: data.selected
        });
        this.getSkillData(data.selected)

        console.log(data.selected);
        // this.props.getAgenceisWithPaginte(data.selected, this.state.limit)
    };



    // Toggle Modal
    handleModalToggle = (type, data) => {
        console.log("dadfdf");
        this.setState(state => ({
            modal: !state.modal,
            modalType: !state.modal ? type : ""
        }));

        if (type === 'edit') {
            this.setState({
                name: data.name,
                id: data.id,
                status: data.status
            })
        } else {
            this.setState({
                name: '',
                status: ''
            })
        }
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
        const { name, id, modalType, skillList, status } = this.state;

        const data = {
            name
        }

        if (modalType === 'add') {
            if (this.validator.allValid()) {

                axious.post(`/skills`, data, requestOptions)
                    .then(res => {

                        // Invoke Toaster
                        functions.openToaster(`Skill created successfully!`)

                        this.getSkillData(0)
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

            if (this.validator.allValid()) {

                data.status = status;

                console.log("skill updated");

                axious.put(`/skills/${id}`, data, requestOptions)
                    .then(res => {

                        functions.openToaster(`Skill Updated successfully!`)

                        const updateSkillList = skillList.map(e => {
                            if (e.id === id) {
                                return {
                                    ...res.data
                                }
                            }
                            return e
                        })


                        this.setState({
                            modal: false,
                            skillList: updateSkillList
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


    handleStatus = (e) => {
        const { value, pageId } = e.target;

        this.setState({
            approvalStatuses: value
        }, () => {
            this.getSkillData(0)
        })

    }

    getName = (e) => {
        const { salutation, firstName, lastName } = e.names;
        return `${salutation} ${firstName} ${lastName}`
    }

    // Hande On Change
    handleOnChange = (e) => {
        // console.log(e.target);
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });

    }

    handleApproved = (e) => {
        const requestOptions = {
            headers: authHeader()
        }
        const { id, name } = e;
        const data = {
            name,
            status: 'ACCEPTED'
        }

        const { skillList } = this.state;

        axious.put(`/skills/${id}`, data, requestOptions)
            .then(res => {

                const updateSkillList = skillList.filter(e => {
                    if (e.id !== id) {
                        return e
                    }
                })

                functions.openToaster(`Approved Done!`);

                this.setState({
                    skillList: updateSkillList
                })

            })
            .catch(err => {
                const { status, message } = err.response.data;

                if (status === 409) {
                    functions.openToaster(message)
                }

            })
    }

    render() {
        // const { agencyLoading, agencies } = this.props.agencies;
        const { skillList, loading, name, errors, modal, modalType, approvalStatuses } = this.state;
        const user = JSON.parse(localStorage.getItem('user'))

        return (
            <>
                <div className="container-fluid">
                    <div className="card">

                        <div className="card-header bg-white border-bottom-0 d-flex align-items-center">
                            <div className='d-flex'>
                                <h4 className="mb-0 text-dark mr-3">Skills</h4>
                                <select className="form-control" onChange={this.handleStatus} value={approvalStatuses}>
                                    <option value="ACCEPTED">Accepted</option>
                                    <option value="PENDING">Pending</option>
                                </select>
                            </div>

                            <button className="btn btn-primary ml-auto" onClick={() => this.handleModalToggle('add', null)}>Add Skill</button>
                        </div>
                        <div className="card-body pt-0 px-2">
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>createdBy</th>
                                            <th>status</th>
                                            {user.role === 'SUPER_ADMIN' || user.role === 'ADMIN' ? <th>Action</th> : null}

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


                                        {skillList.map((e, i) => {

                                            return (
                                                <tr key={e.id}>

                                                    <td>{e.name}</td>
                                                    <td>
                                                        {
                                                            e.createdBy && e.createdBy.names && this.getName(e.createdBy)
                                                        }
                                                    </td>
                                                    <td>
                                                        {e.status}
                                                    </td>
                                                    {
                                                        user.role === 'SUPER_ADMIN' || user.role === 'ADMIN' ?

                                                            <td>
                                                                {
                                                                    approvalStatuses === 'PENDING' ? <button className={e.status === "ACCEPTED" ? " btn-success btn btn-sm mr-3" : "btn-warning btn btn-sm mr-3"}
                                                                        onClick={() => this.handleApproved(e)} >
                                                                        {e.status === "PENDING" ? "Approve" : "Approved"}

                                                                    </button>
                                                                        : null
                                                                }

                                                                <button className="btn btn-secondary btn-sm mr-3" onClick={() => this.handleModalToggle("edit", e)} >Edit</button>
                                                                <button className="btn btn-danger btn-sm">Delete</button>
                                                            </td>
                                                            :
                                                            null
                                                    }

                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>

                            </div>

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

                    <Modal isOpen={modal} >
                        <ModalHeader toggle={this.handleModalToggle}>
                            {modalType === 'edit' ? 'Edit Skill' : 'Create Skill'}
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


            </>
        )
    }

}

export default Contacts
