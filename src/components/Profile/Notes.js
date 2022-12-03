import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Input, Collapse } from 'reactstrap';
import axios from '../../axious-config';
import authHeader from "../../helper/authHeader";

export default class Notes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            model: false,
            loading: false,
            noteList: [],
            noteFieldAria: false,
            content: "",
            noteType: ""
        }
    }

    // Get All Notes
    getAllNotes() {
        const { singleProfile, route } = this.props.profile;
        const requestOptions = {
            headers: authHeader()
        }

        const routes = route === 'agencies' ? "agency" : route === 'clients' ? "client" : "";

        this.setState({
            loading: true
        })

        if (singleProfile.id) {
            axios.get(`/${routes}-notes/${routes}/${singleProfile.id}`,requestOptions)
                .then(res => {
                    this.setState({
                        noteList: res.data,
                        loading: false
                    })
                })
                .catch(err => alert("Error to get agency note!!"))
        }

    }

    // Modal Toggle Notes
    handleModalToggleNotes = (type) => {
        const { model } = this.state;
        this.setState(state => ({
            model: !state.model,
            noteFieldAria: false
        }));

        if (!model) {
            this.getAllNotes()
        }

    }

    // Submit Note
    handleNotesSubmit = () => {
        const requestOptions = {
            headers: authHeader()
        }
        const { singleProfile, route } = this.props.profile;
        const { content, noteType, noteId } = this.state;

        const routes = route === 'agencies' ? "agency" : route === 'clients' ? "client" : "";

        const data = {
            [routes]: { id: singleProfile.id },
            content
        }

        if (noteType === 'add') {
            axios.post(`/${routes}-notes`, data,requestOptions)
                .then(res => {
                    this.setState({
                        content: "",
                        noteList: [...this.state.noteList, {
                            id: res.data.id,
                            [routes]: { id: routes === 'agency' ? res.data.agency.id : routes === 'client' ? res.data.client.id : "" },
                            content: res.data.content
                        }]
                    })
                    // this.getAllNotes()
                })
        } else {
            axios.put(`/${routes}-notes/${noteId}`, data,requestOptions)
                .then(res => {

                    const updateNoteList = this.state.noteList.map(e => {
                        if (e.id === noteId) {
                            return {
                                ...e,
                                content: res.data.content
                            }
                        }
                        return e;
                    });

                    this.setState({
                        noteList: updateNoteList,
                    })

                })
        }



    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleNote = (type, e) => {
        if (type === 'add') {
            this.setState(state => ({
                noteFieldAria: !state.noteFieldAria,
                noteType: type,
                content: ""
            }))
        } else {
            this.setState({
                noteFieldAria: true,
                content: e.content,
                noteType: type,
                noteId: e.id
            })
        }
    }




    render() {
        const { model, noteList, noteFieldAria, content, loading } = this.state;

        return (
            <div className="item-link cursor-pointer text-primary" onClick={() => this.handleModalToggleNotes('post')} >
                <i className="mdi mdi-file-document"></i>
                <span>Notes</span>

                <Modal isOpen={model} size="lg">
                    <ModalHeader toggle={this.handleModalToggleNotes}>
                        Notes

                        <button className='btn btn-icon bg-primary ml-3 btn-sm rounded-circle' onClick={() => this.handleNote('add')}>
                            <i className={!noteFieldAria ? "mdi text-white mdi-plus " : "mdi text-white mdi-minus "} ></i>
                        </button>

                    </ModalHeader>
                    <ModalBody style={{ maxHeight: '300px', overflowY: 'auto' }}>

                        <Collapse isOpen={noteFieldAria} className='mb-3'>
                            <Input type="textarea" name="content" value={content} onChange={this.handleChange} />
                            <button className='btn btn-primary mt-2 btn-sm' onClick={this.handleNotesSubmit}>Submit</button>

                        </Collapse>

                        {
                            loading ?
                                "Loading....."
                                :
                                noteList.length === 0 ? "There is no any list" :

                                    noteList.map(e => {
                                        return <div className='d-flex justify-content-between mb-2' key={e.id}>
                                            <span>{e.content}</span>
                                            <button className='btn btn-icon bg-info ml-3 btn-sm rounded-circle' onClick={() => this.handleNote('edit', e)}>
                                                <i className="mdi text-white mdi-pencil" ></i>
                                            </button>

                                        </div>
                                    })
                        }

                    </ModalBody>

                </Modal>
            </div>
        )
    }
}
