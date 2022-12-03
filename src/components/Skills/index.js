import React, { Component } from 'react';
import { connect } from 'react-redux'
import Search from '../SearchAuto';
import axios from '../../axious-config'
import authHeader from '../../helper/authHeader'
import SimpleReactValidator from 'simple-react-validator';
import { functions } from "../../helper/functions";
import { modalActions } from '../../actions/modal-action';



class Skills extends Component {
    constructor(props) {
        super(props)

        this.state = {
            skillList: [],
            searchResults: [],
            searchValue: "",
            proficiency: "",
            selectedSearchValue: {}
        }

        this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    }

    handleChange = (e) => {
        const { value, name } = e.target;

        this.setState({
            [name]: value
        })

    }



    handleChangeSearch = (e) => {
        const requestOptions = {
            headers: authHeader()
        }

        const { value } = e.target;

        if (value.length > 0) {
            this.setState({
                searchLoading: true
            })

            axios.get(`/skills?searchText=${value}&page=0&size=15&approvalStatuses=ACCEPTED`, requestOptions)
                .then(res => {

                    //console.log(res.data);

                    const data = res.data.records.map(e => {
                        return {
                            id: e.id,
                            name: `${e.name}`
                        }
                    })

                    this.setState({
                        searchResults: data,
                        searchLoading: false
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })

            this.setState({
                searchDropdown: true
            })
        } else {
            this.setState({
                searchDropdown: false
            })
        }

        this.setState({
            searchValue: value
        })

    }

    handleSelectSearchValue = (e) => {
        this.setState({
            selectedSearchValue: e,
            searchValue: e.name,
            searchDropdown: false
        })
    }

    handleSearchClose = () => {
        this.setState({
            selectedSearchValue: {},
            searchValue: "",
            searchResults: [],
            searchDropdown: false

        });

    }

    handleCloseSearchDropdown = () => {
        this.setState({
            searchDropdown: false
        })
    }

    handleAddSkill = () => {
        const { selectedSearchValue, proficiency, skillList } = this.state;
        const { handleSkill } = this.props

        if (this.validator.allValid()) {

            const skillCheck = skillList.filter(e => e.skill.id === selectedSearchValue.id).length === 0;

            //console.log(skillCheck);

            if (skillCheck) {
                const data = {
                    skill: selectedSearchValue,
                    proficiency
                }
                const skillLists = skillList.concat(data)

                this.setState({
                    skillList: skillLists
                }, () => {
                    handleSkill(this.state.skillList)
                })

                this.handleSearchClose()
                this.setState({
                    proficiency: ""
                })
                this.validator.hideMessages();
            } else {
                functions.openToaster('Dublicate Error')
            }

        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    handleCloseSkill = (skill) => {
        const { skillList } = this.state;
        const { handleSkill } = this.props

        //console.log(skill.skill.id);

        const colseSkills = skillList.filter(e => e.skill.id !== skill.skill.id);

        // console.log(colseSkills);

        this.setState({
            skillList: colseSkills
        }, () => {
            handleSkill(this.state.skillList)
        })
    }

    componentDidMount() {
        this.setState({
            skillList: this.props.skills
        })
    }


    handleModalToggle = (type) => {
        const { searchValue, skillList } = this.state;
        const requestOptions = {
            headers: authHeader()
        }

        const data = {
            name: searchValue
        }

        axios.post(`/skills`, data, requestOptions)
            .then(res => {

                const id = res.data.id;
                data.status = 'ACCEPTED';

                axios.put(`/skills/${id}`, data, requestOptions)
                    .then(updateResponse => {
                        functions.openToaster(`Skill created successfully!`);
                        console.log(updateResponse);
                        const { id, name } = updateResponse.data;
                        const makeData = {
                            id,
                            name
                        }
                        this.setState({
                            selectedSearchValue: makeData,
                            searchDropdown: false,
                            // skillList: skillList.concat(makeData)
                        })

                    })
            })
            .catch(err => {
                if (err.response.status === 409) {
                    functions.openToaster(err.response.data.message);
                }
            })

        // dispatch(modalActions.modalToggle(type));

        // console.log(type);
    }





    render() {
        const {
            searchResults,
            searchValue,
            searchDropdown,
            searchLoading,
            skillList,
            proficiency,
            selectedSearchValue

        } = this.state;

        return (
            <div >
                <div className="row">
                    <div className='col-7'>
                        <div className='d-flex'>
                            <Search
                                onChange={this.handleChangeSearch}
                                results={searchResults}
                                handleSelectedValue={this.handleSelectSearchValue}
                                value={searchValue}
                                close={this.handleSearchClose}
                                dropdown={searchDropdown}
                                loading={searchLoading}
                            />
                            <button className='btn btn-primary btn-sqr' onClick={() => this.handleModalToggle('add', null)}>
                                <i className="mdi mdi-plus"></i>
                            </button>
                        </div>

                        <p className='text-danger mb-0'>{this.validator.message('skill', selectedSearchValue && selectedSearchValue.id, 'required')}</p>

                    </div>
                    <div className='col-4'>
                        <input className='form-control' type="number" placeholder='Please write proficiency level' name="proficiency"
                            onChange={this.handleChange} value={proficiency} />
                        <p className='text-danger'>{this.validator.message('proficiency', proficiency, 'required|numeric|min:0,num|max:10,num')}</p>
                    </div>
                    <div className='col-1'>
                        <button className='btn btn-primary btn-sqr' onClick={this.handleAddSkill}>
                            <i className="mdi mdi-plus"></i>
                        </button>

                    </div>

                </div>

                <div className="skill-wrapper">

                    {
                        skillList.map(e => {
                            return <button class="btn btn-primary mr-2 " >
                                {e.skill.name}
                                <span class="badge badge-light ml-2">{e.proficiency}</span>
                                <span className="close" onClick={() => this.handleCloseSkill(e)}>
                                    <i className="mdi mdi-close"></i>
                                </span>

                            </button>
                        })
                    }


                </div>




            </div>
        )
    }
}

const mapSateToProps = (state) => {
    return {
        modal: state.modal
    }
}

export default connect(mapSateToProps)(Skills)