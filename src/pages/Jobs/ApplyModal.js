import React, { Component } from 'react';

import { Form, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Col, Row, Button } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';



class ApplyModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            contractMin: 0,
            contractMax: 0,
            fullTimeMin: 0,
            fullTimeMax: 0,
        }

        // Invoke the validator
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }


    handleOnChange = () => {
        const { name, value } = this.state;

        this.setState({
            [name]: value
        });

    }






    render() {

        const {
            contractMin,
            contractMax,
            fullTimeMin,
            fullTimeMax

        } = this.state;

        const { modal, toggle } = this.props;

        return <div>
            {/* Parties Modal*/}
            <Modal isOpen={modal} size="lg">
                <ModalHeader toggle={toggle}>Apply Job</ModalHeader>

                <ModalBody>

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



                    <div className="d-flex justify-content-end">
                        <button className='btn btn-primary btn-sm' onClick={this.handleAddParty}>Apply</button>
                    </div>

                </ModalBody>
            </Modal>
        </div>;
    }
}


export default ApplyModal;