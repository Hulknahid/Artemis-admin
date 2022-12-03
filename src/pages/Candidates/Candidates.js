import React, { Component } from 'react';
import Paginate from 'react-paginate';
import SimpleReactValidator from 'simple-react-validator';
import { FileUploader } from "react-drag-drop-files";

import axiosInstance from '.././../axious-config'
import authHeader from '../../helper/authHeader'
import 'react-toastify/dist/ReactToastify.css';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Row,
	Col,
	FormGroup,
	Label,
	Input,
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink,
	InputGroup,
	InputGroupAddon,
	InputGroupText,

} from 'reactstrap';
import CandidateDetails from './CandidateDetails'
import Resume from './Candidate-resume';
import PhoneInput from 'react-phone-number-input'
import Search from '../../components/SearchAuto';
import classnames from 'classnames';
import { candidateService } from "../../services";

import Tags from "../../components/Tags/tags";
import { functions } from "../../helper/functions";
import Skills from '../../components/Skills';
import SkillModal from '../../components/Modals/SkillModal'



const fileTypes = ["docx", "pdf"];

class Contacts extends Component {
	constructor(props) {
		super(props)

		this.state = {

			refData: JSON.parse(localStorage.getItem('appSettings')).refData,


			firstName: '',
			lastName: '',
			nickName: '',
			salutation: '',
			primaryPhone: '',
			secondaryPhone: '',
			email: '',
			accountStatus: '',
			role: '',
			workAuthorization: '',
			clearance: '',
			recruitmentStatus: '',
			resume: '',
			recruiter: '',
			imageUrl: '',
			resumeUrl: '',

			getAllAgencyContactList: [],
			agencyContactSelected: { value: '', label: '' },
			size: 50,
			errors: {},
			id: '',
			modalType: '',
			agencyContacts: [],
			singleCandidate: {},
			candidateList: [],
			modal: false,

			loading: true,
			agencyContactLoading: true,
			detailsIn: false,
			resumeIn: false,

			searchResults: [],
			selectedSearchValue: {},
			searchDropdown: false,
			searchValue: "",
			searchLoading: false,
			focus: false,
			jobList: [],
			activeTab: '1',
			note: '',
			//auto search address
			city: '',
			tempData: [],
			address: {
				city: '',
				state: '',
				zipCode: '',
				street: '',
			},

			skills: [],
			designation: '',
			selectedPlatform: '',

			platform: JSON.parse(localStorage.getItem('appSettings')).refData.RecruitmentPlatform,
			failure: '',
			uploadProgress: '',

			//search
			search: [],
			searchText: '',
			searchOption: 'normal',


			//search tab
			activeSearch: '1',
			RecStatus: [],
			checkBoxDataStatus: [],
			checkBoxDataPlatforms: [],
			reqSendStatusText: "",
			reqSendPlatformText: "",
			tagList: "",

			editMode: false,
			yearsOfExperience: "",
			resumeFile: null,
		}


		this.toggle = this.toggle.bind(this);
		this.toggleSearchTab = this.toggleSearchTab.bind(this);

		this.getCandidates(0)
		// this.getAllagencyContacts()

		// Invoke the validator
		this.validator = new SimpleReactValidator({ autoForceUpdate: this });

		this.latestRequest = null;

		this.myRef = React.createRef();
		this.dropdownNode = React.createRef();

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

	//initialize tabs
	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}

	//initialize tabs
	toggleSearchTab(tab) {
		if (this.state.activeSearch !== tab) {
			this.setState({
				activeSearch: tab,
				RecStatus: [],
				checkBoxDataStatus: [],
				checkBoxDataPlatforms: [],
				reqSendStatusText: "",
				reqSendPlatformText: "",
				tagList: ""

			});
		}
		if (this.myRef.current) {
			this.myRef.current.clearState();
		}
		this.getCandidates(0)
	}

	// Get All Candidate
	getCandidates(page) {
		const requestOptions = {
			headers: authHeader()
		}
		const { reqSendStatusText, reqSendPlatformText, tagList } = this.state;
		this.setState({
			loading: true
		})
		let url = `/candidates?page=${page}&size=${this.state.size}`;
		if (reqSendStatusText) {
			url += `&statuses=${reqSendStatusText}`;
		}
		if (reqSendPlatformText) {
			url += `&platforms=${reqSendPlatformText}`;
		}
		if (tagList) {
			url += `&searchText=${tagList}`;
		}
		axiosInstance.get(url, requestOptions)
			.then(res => {
				this.setState({
					candidateList: res.data.records,
					pageCount: Math.ceil(res.data.count / this.state.size),
					loading: false
				})

			})
			.catch(err => console.log(err.response))
	}

	// Get all agency Contacs
	// getAllagencyContacts() {
	//   axiosInstance.get(`/agency-contacts?page=0&size=100`)
	//     .then(res => {


	//       const allRecruiter = res.data.records.map(e => {
	//         return {
	//           value: e.id,
	//           label: `${e.names.firstName} ${e.names.lastName} [${e.agency.name}] [${e.primaryPhone}]`
	//         }
	//       })

	//       this.setState({
	//         getAllAgencyContactList: allRecruiter,
	//         agencyContactLoading: false
	//       })

	//     })
	//     .catch(err => console.log(err.response))
	// }

	// Toggle Modal
	handleModalToggle = (type, data, affirmative) => {

		this.setState(state => ({
			modal: affirmative,
			modalType: !state.modal ? type : "",
			uploadProgress: '',
			activeTab: "1",
			failure: ""

		}));


		if (type === 'put') {
			let skills = data.skills.map((e,) => {
				return {
					proficiency: e.proficiencyLevel,
					skill: {
						id: e.skill.id,
						name: e.skill.name
					}
				}
			})

			this.setState({
				id: data.id,
				selectedPlatform: data.platform,
				firstName: data.names.firstName,
				lastName: data.names.lastName,
				nickName: data.names.nickName,
				salutation: data.names.salutation,
				primaryPhone: data.primaryPhone,
				secondaryPhone: data.secondaryPhone,
				email: data.email,
				imageUrl: data.imageUrl,
				accountStatus: data.accountStatus,
				workAuthorization: data.workAuthorization,
				clearance: data.clearance,
				recruitmentStatus: data.recruitmentStatus,
				skills: skills,
				selectedSearchValue: {
					id: data.recruiter.id,
					name: `${data.recruiter.names.firstName} ${data.recruiter.names.lastName} [${data.recruiter.agency.name}] [${data.primaryPhone}]`
				},
				searchValue: `${data.recruiter.names.firstName} ${data.recruiter.names.lastName} [${data.recruiter.agency.name}] [${data.primaryPhone}]`,
				address: {
					...data.address
				},
				city: data?.address?.city,
				designation: data.designation,
				yearsOfExperience: data.yearsOfExperience,
				resumeFile: data.resume
			}, () => {
				setTimeout(() => {
					if (this.myRef.current) {
						this.myRef.current.setStates(this.state.skills)
					}
				}, 1000)
			})

		} else {

			this.setState({
				id: "",
				firstName: '',
				lastName: '',
				nickName: '',
				salutation: '',
				primaryPhone: '',
				secondaryPhone: '',
				email: '',
				accountStatus: '',
				workAuthorization: '',
				clearance: '',
				recruitmentStatus: '',
				selectedSearchValue: {},
				searchValue: "",
				skills: [],
				yearsOfExperience: "",
				designation: "",
				city: "",
				address: {
					state: "",
					zip: ""
				},
				resumeFile: ""
			})
		}

		this.validator.hideMessages()

	}

	// Candidate Details In
	detailsIn = (e) => {
		const requestOptions = {
			headers: authHeader()
		}

		this.setState({
			detailsIn: true,
			singleCandidate: e,
			resumeIn: false
		})

		axiosInstance.get(`/candidate-job-applications/candidate/${e.id}?size=10&page=0`, requestOptions)
			.then(res => {
				this.setState({
					jobList: res.data.records,
					// pageCount: Math.ceil(res.data.count / this.state.size),
					// loading: false
				})

			})
			.catch(err => console.log(err.response))


	}
	// Candidate Details Out
	detailsOut = () => {
		this.setState({
			detailsIn: false,
		})
	}

	// Resume In
	resumeIn = (e) => {
		this.setState({
			resumeIn: true,
			singleCandidate: e
		})

	}
	// Resume In
	resumeOut = (e) => {
		this.setState({ resumeIn: false })

	}

	// Select Agency Contact
	handleSelectAgencyContact = (contact) => {
		// this.setState({
		//   agencyContactSelected: contact
		// });
		// if (contact === null) {
		//   this.setState({
		//     agencyContactSelected: { id: '', value: '', label: '' },
		//   });
		// }

	}

	// Handle Change Input
	handleOnChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	// Change Image
	handleOnChangeImage = (e) => {
		const requestOptions = {
			headers: authHeader()
		}

		if (e.target.files[0] !== undefined) {
			const { size, id, candidateList } = this.state
			const formData = new FormData();

			formData.append('img', e.target.files[0]);
			axiosInstance.put(`/candidates/picture/${id}`, formData, {
				...requestOptions,
				onUploadProgress: progressEvent => {
					this.setState({ uploadProgress: Math.round(progressEvent.loaded / progressEvent.total * 100) + '%' })
				}
			})
				.then(res => {
					let list = candidateList.map(item => {
						if (item.id == id) {
							return {
								...item,
								imageUrl: localStorage.getItem('currentImage')
							}
						}
						return item

					})
					this.setState({
						candidateList: list,
						uploadProgress: ''
					})

				})
				.catch(err => {
					this.setState({ uploadProgress: 'Failed!' })
				})

			// this.props.updateCandidateImage(0, size, id, formData)
		}
	}

	// Change Image
	handleOnChangeResume = (e) => {

		const { modalType, id } = this.state;

		// if (e.target.files[0] !== undefined) {

		// 	const fileType = e.target.files[0].name.split(".").pop();

		// 	console.log(e.target.files[0]);

		// 	if (fileType === 'pdf' || fileType === 'docx') {

		// 		if (modalType === 'put') {

		// 			const requestOptions = {
		// 				headers: authHeader()
		// 			}

		// 			const formData = new FormData()
		// 			formData.append('resume', e.target.files[0]);

		// 			// axiosInstance.put(`/candidates/resume/${id}`, formData, requestOptions)
		// 			// 	.then(res => {
		// 			// 		functions.openToaster(`Your cv Updated done!`)
		// 			// 	})
		// 			// 	.catch(err => functions.openToaster(`you can't Updated please check your file`))

		// 		} else {
		// 			this.setState({
		// 				resumeFile: e.target.files[0]
		// 			})
		// 		}

		// 	} else {
		// 		functions.openToaster(`Please Select pdf or docx file`)
		// 	}

		// }

		if (modalType === 'put') {

			const requestOptions = {
				headers: authHeader()
			}

			const formData = new FormData()
			formData.append('resume', e);

			axiosInstance.put(`/candidates/resume/${id}`, formData, requestOptions)
				.then(res => {
					functions.openToaster(`Your cv Updated done!`)
				})
				.catch(err => functions.openToaster(`you can't Updated please check your file`))

		} else {
			this.setState({
				resumeFile: e
			})
		}


	}

	// Phone number Change
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

	// Handle Page Click
	handlePageClick = (data) => {
		this.setState({
			page: data.selected
		});
		this.getCandidates(data.selected)
	};


	handleChangeSearch = (e) => {
		const requestOptions = {
			headers: authHeader()
		}

		const { value } = e.target;

		if (value.length > 0) {

			this.setState({
				searchLoading: true
			})

			axiosInstance.get(`/agency-contacts?page=0&size=15&searchText=${value}`, requestOptions)
				.then(res => {
					const data = res.data.records.map(e => {
						return {
							id: e.id,
							name: `${e.names.firstName} ${e.names.lastName} [${e.agency.name}] [${e.primaryPhone}]`
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
				searchResults: []
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

	handleCityName = (e) => {
		const { value } = e.target;
		this.setState({ city: value })
		this.locationSearch(value)
	}

	handleSelectedCity = (e) => {
		this.setState({
			city: e.city,
			address: {
				...e
			}
		})
	}

	handleCloseAddrees = () => {
		this.setState({
			city: "",
			address: {
				state: "",
				zip: ""
			}
		})
	}


	handleTagAdd = (skills) => {
		this.setState({ skills });
	}

	//start search with tags

	startSearching = (tags) => {
		let tagList = tags.map(e => e.text).join(" and ")
		this.setState({
			tagList
		}, () => {
			this.getCandidates(0)
		})

	}

	// Sourece
	setSource = (source) => {
		if (source == 'FACEBOOK') {
			return 'facebook'
		} else if (source == 'INDEED') {
			return 'indeed'
		} else if (source == 'LINKEDIN') {
			return 'linkedin'
		} else if (source == 'DICE') {
			return 'dice-5'
		} else if (source == 'GOOGLE') {
			return 'google'
		}

	}

	// Status
	changeStatus = (e, type) => {

		const { value } = e.target;

		if (type === 'status') {

			const oldStatus = this.state.checkBoxDataStatus;

			let newSatuses = [];

			if (oldStatus.includes(value)) {
				newSatuses = oldStatus.filter(e => e !== value)
			} else {
				newSatuses = oldStatus.concat(value)
			}
			let sendReqAsStatus = newSatuses.toString();


			this.setState({
				checkBoxDataStatus: newSatuses,
				reqSendStatusText: sendReqAsStatus
			}, () => {
				this.getCandidates(0)
			})

		} else if (type === 'platform') {
			const oldPlatforms = this.state.checkBoxDataPlatforms;

			let result = [];

			if (oldPlatforms.includes(value)) {
				result = oldPlatforms.filter(e => e !== value)
			} else {
				result = oldPlatforms.concat(value)
			}
			let sendReqAsPlatfrom = result.toString();

			this.setState({
				checkBoxDataPlatforms: result,
				reqSendPlatformText: sendReqAsPlatfrom
			}, () => {
				this.getCandidates(0)
			})


		}

	}

	handleOnNormalSearch = (e) => {
		const { value } = e.target;
		this.setState({
			tagList: value
		})
	}

	handleonClickNormalSearch = () => {
		this.getCandidates(0)
	}

	handleNormalSearchClear = () => {
		this.setState({
			tagList: ""
		}, () => {
			this.getCandidates(0)
		})
	}

	setEditMode = (candidate) => {


		this.setState({
			singleCandidate: candidate,
			editMode: candidate.id
		})
		this.handleModalToggle('put', candidate, false)

		setTimeout(() => {
			this.dropdownNode.current.focus()
		}, 1000)


	}

	updateRecruitmentStatus = (e) => {

		this.setState({
			recruitmentStatus: e.target.value,
			modalType: 'put',
			singleCandidate: {
				...this.state.singleCandidate,
				recruitmentStatus: e.target.value
			}
		}, () => {
			this.handleCandidateSubmit()
			this.closeEdit()
		})

	}


	closeEdit = () => {
		this.setState({
			editMode: false
		})
	}

	handleSkill = (e) => {
		this.setState({
			skills: e
		})
	}

	// Candidate Submit
	handleCandidateSubmit = (e) => {
		// e.preventDefault();
		const requestOptions = {
			headers: authHeader()
		}

		const {
			firstName,
			lastName,
			nickName,
			salutation,
			primaryPhone,
			secondaryPhone,
			email,
			accountStatus,
			workAuthorization,
			clearance,
			recruitmentStatus,
			selectedSearchValue,
			modalType,
			id,
			address,
			skills,
			selectedPlatform,
			designation,
			yearsOfExperience,
			resumeFile,
			city
		} = this.state;

		const skillList = skills.map(e => {
			return {
				proficiencyLevel: e.proficiency,
				skill: {
					id: e.skill.id
				}
			}
		});

		if (address.country === undefined) {
			address.country = "United States";
			address.city = city;
		}

		const data = {
			names: {
				firstName,
				lastName,
				nickName,
				salutation
			},
			primaryPhone,
			email,
			accountStatus,
			recruitmentStatus,
			clearance,
			workAuthorization,
			skills: skillList,
			platform: selectedPlatform,
			designation,
			recruiter: {
				id: selectedSearchValue.id
			},
			address,
			yearsOfExperience: parseInt(yearsOfExperience)
		}

		// Secondary
		if (secondaryPhone !== "") {
			data.secondaryPhone = secondaryPhone;
		}


		if (modalType === 'post') {
			if (this.validator.allValid()) {

				data.sendCredentials = false;
				data.password = "Abc123";


				axiosInstance.post(`/candidates`, data, requestOptions)
					.then(sumitedData => {
						const cid = sumitedData.data.id;

						const formData = new FormData()
						formData.append('resume', resumeFile);


						axiosInstance.put(`/candidates/resume/${cid}`, formData, requestOptions)
							.then(() => {
								// Invoke Toaster
								functions.openToaster(`Candidate created successfully!`)

								this.getCandidates(0)
								this.setState({
									modal: false,
									activeTab: 0,
									skills: [],
									failure: ""

								})
							})

					})
					.catch(err => this.setState({ failure: err.response.data.message }))

			} else {
				this.validator.showMessages();
			}


		} else if (modalType === 'put') {

			if (this.validator.allValid()) {

				axiosInstance.put(`/candidates/${id}`, data, requestOptions)
					.then(() => {
						// Invoke Toaster
						functions.openToaster(`Candidate updated successfully!`)

						this.getCandidates(0)
						this.setState({
							modal: false,
							failure: ""
						})
					})
					.catch(err => this.setState({ failure: err.response.data.message }))

			} else {
				this.validator.showMessages();
			}
		}

	}

	handleOnChange2 = (e) => {

		const { name, value } = e.target;
		const { address } = this.state;
		this.setState({
			address: {
				...address,
				[name]: value
			}
		})

	}

	render() {
		const {
			firstName,
			lastName,
			nickName,
			salutation,
			primaryPhone,
			secondaryPhone,
			email,
			accountStatus,
			errors,
			modalType,
			workAuthorization,
			clearance,
			recruitmentStatus,
			agencyContactSelected,
			getAllAgencyContactList,
			imageUrl,
			candidateList,
			loading,
			agencyContactLoading,
			singleCandidate,
			detailsIn,
			resumeIn,
			searchResults,
			selectedSearchValue,
			searchValue,
			searchDropdown,
			searchLoading,
			jobList,
			city,
			tempData,
			address,
			skills,
			platform,
			selectedPlatform,
			failure,
			search,
			searchOption,
			refData,
			checkBoxDataStatus,
			designation,
			yearsOfExperience,
			resumeFile
		} = this.state;

		const skillFirst = skills[0];

		return (
			<>

				<div className="container-fluid">
					<div className="card">
						<div className="search-tabs">
							<Nav tabs>
								<NavItem>
									<NavLink
										className={classnames({ active: this.state.activeSearch === '1' })}
										onClick={() => {
											this.toggleSearchTab('1');
										}}
									>
										Normal Search
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: this.state.activeSearch === '2' })}
										onClick={() => {
											this.toggleSearchTab('2');
										}}
									>
										Advance Search
									</NavLink>
								</NavItem>

							</Nav>

							<TabContent activeTab={this.state.activeSearch} className="tab-content-search">
								<TabPane tabId="1">
									<Col sm={7}>
										<InputGroup>
											<Input style={{ backgroundColor: 'white', color: 'Black' }}
												placeholder="name, email, phone...."
												onChange={this.handleOnNormalSearch} value={this.state.tagList}>
											</Input>
											<InputGroupAddon addonType="append">
												<InputGroupText className='bg-white' style={{ cursor: 'pointer', marginLeft: '-2px' }}>
													<i className="mdi mdi-close text-danger" onClick={this.handleNormalSearchClear}></i>
												</InputGroupText>
											</InputGroupAddon>
											<InputGroupAddon addonType="append">
												<InputGroupText className='bg-white' style={{ cursor: 'pointer', marginLeft: '-1px' }}>
													<span className='text-primary' onClick={this.handleonClickNormalSearch}>Search Candidates</span>
												</InputGroupText>
											</InputGroupAddon>
										</InputGroup>
									</Col>
								</TabPane>
								<TabPane tabId="2">
									<Row className="align-items-center">
										<Col sm={6}>
											<FormGroup>
												<Tags ref={this.myRef} getTags={this.startSearching} placeholder="Search..." />
											</FormGroup>
										</Col>
										<Col sm={6}>
											<Row>
												<Col sm={6}>

													{refData.RecruitmentStatus.length > 0 && refData.RecruitmentStatus.map((status, key) => {
														return key % 2 == 0 ? (<><FormGroup
															check
															inline
														>
															<Input onChange={(e) => this.changeStatus(e, 'status')} value={status} type="checkbox" />
															<Label check>
																{status.split('_')[0]} {status.split('_')[1] != undefined ? status.split('_')[1] : null}
															</Label>
														</FormGroup><br /></>) : <FormGroup
															check
															inline
														>
															<Input onChange={(e) => this.changeStatus(e, 'status')} value={status}
																type="checkbox" />
															<Label check>
																{status.split('_')[0]} {status.split('_')[1] != undefined ? status.split('_')[1] : null}
															</Label>
														</FormGroup>
													})}
												</Col>
												<Col sm={6}>
													{refData.RecruitmentPlatform.length > 0 && refData.RecruitmentPlatform.map((status, key) => {
														return key % 2 == 0 ? (<><FormGroup
															check
															inline
														>
															<Input onChange={(e) => this.changeStatus(e, 'platform')} value={status} type="checkbox" />
															<Label check>
																{status.split('_')[0]} {status.split('_')[1] != undefined ? status.split('_')[1] : null}
															</Label>
														</FormGroup><br /></>) : <FormGroup
															check
															inline
														>
															<Input onChange={(e) => this.changeStatus(e, 'platform')} value={status}
																type="checkbox" />
															<Label check>
																{status.split('_')[0]} {status.split('_')[1] != undefined ? status.split('_')[1] : null}
															</Label>
														</FormGroup>
													})}
												</Col>
											</Row>
										</Col>
									</Row>
								</TabPane>

							</TabContent>
						</div>


						<div style={{ height: '10px' }}></div>


						<div className="card-header bg-white border-bottom-0 d-flex align-items-center">


							<button className="btn btn-link ml-auto" onClick={() => this.handleModalToggle('post', '', true)}>New
								Candidate
							</button>
						</div>
						<div className="card-body pt-0 px-2">
							<div className="table-responsive">
								<table className="table table-bordered">
									<thead>
										<tr>
											<th>Name</th>
											<th>Designation</th>
											<th>Resume</th>
											<th>Re.status</th>
											{/*<th>Picture</th>*/}
											<th>Phone</th>
											<th>Email</th>
											<th>Ac.status</th>
											<th>Experience</th>
											<th>Source</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>

										{candidateList.map(candidate => {
											return (
												<tr key={candidate.id}>
													<td onClick={() => this.detailsIn(candidate)}
														className="cursor-pointer">
														{`${candidate.names.firstName} ${candidate.names.lastName}`}
													</td>
													<td>
														{candidate.designation}
													</td>
													<td>
														<div>
															<span onClick={() => this.resumeIn(candidate)} style={{
																color: 'blue',
																borderBottom: '.5px solid blue',
																marginRight: '20px'
															}}>resume</span>
															<a disabled target="_blank" href={candidate?.resume?.url}><i
																className="mdi mdi-cloud-download"></i></a>
														</div>
													</td>

													<td style={{ color: candidate.recruitmentStatus == 'REJECTED' ? 'red' : candidate.recruitmentStatus == 'WITHDRAWN' ? 'goldenrod' : candidate.recruitmentStatus == 'HOLD' ? 'pink' : 'green' }}>

														{this.state.editMode == candidate.id ? <Input onBlur={this.closeEdit} ref={this.dropdownNode} id={`id-${candidate.id}`} style={{ width: '200px' }} type="select" name="recruitmentStatus"
															onChange={this.updateRecruitmentStatus} value={singleCandidate.recruitmentStatus}>
															<option value="">Recr.Status</option>
															{refData.RecruitmentStatus.length > 0 && refData.RecruitmentStatus.map((ac, key) => {
																return <option value={ac}>{ac}</option>
															})}
														</Input> : <label onClick={() => this.setEditMode(candidate)} htmlFor={`id-${candidate.id}`}>{candidate.recruitmentStatus == 'HIRED' ? candidate.recruitmentStatus + ' ✌️' : candidate.recruitmentStatus == 'OFFERED' ? candidate.recruitmentStatus + ' 🙂️' : candidate.recruitmentStatus}<i style={{ marginLeft: '20px' }} className="mdi mdi-arrow-down"></i></label>}
													</td>

													{/*<td>*/}
													{/*    <img style={{width: '30px', height: 'auto'}} src={candidate.imageUrl}*/}
													{/*         alt={`${candidate.names.firstName} ${candidate.names.lastName} ${candidate.names.nickName}`}/>*/}
													{/*</td>*/}
													<td>
														{candidate.primaryPhone}
													</td>
													<td>
														{candidate.email}
													</td>
													<td style={{ color: candidate.accountStatus == 'ACTIVE' ? 'green' : candidate.accountStatus == 'TERMINATED' ? 'red' : 'goldenrod' }}>
														{candidate.accountStatus.toLowerCase()}
													</td>

													<td>
														{candidate.yearsOfExperience} years
													</td>
													<td>{candidate.platform}</td>
													<td>
														<button className="btn btn-secondary btn-sm mr-2"
															onClick={() => this.handleModalToggle('put', candidate, true)}>
															Edit
														</button>
														{/* <button className="btn btn-danger btn-sm">Delete</button> */}
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

					<Modal isOpen={this.state.modal}
						className="modal-default modal-opportunity" size="lg" onClick={this.handleOnBlur}>
						<ModalHeader toggle={() => this.handleModalToggle('post', '', false)}>
							{modalType === 'post' ? 'New Candidate' : 'Update Candidate'}
						</ModalHeader>
						<ModalBody onClick={this.handleCloseSearchDropdown}>

							<div className="d-flex justify-content-between align-items-center">
								{/* Update Image  */}
								{modalType === 'put' ?

									<Col>
										<FormGroup row className="form-group-img">
											<Label sm={12}>
												<p style={{ marginBottom: '0px' }}>Candidate Image <span
													style={{ color: this.state.uploadProgress != 'Failed!' ? 'green' : 'red' }}>{`${this.state.uploadProgress}`}</span>
												</p>
												<img className="profile-pic" src={imageUrl} alt="" />
											</Label>
											<Col sm={8}>
												<Input style={{ display: 'none' }} type="file" name="imageUrl"
													onChange={this.handleOnChangeImage}
													id="feature-img" />

											</Col>
										</FormGroup>
									</Col>
									:
									null
								}

								{/* <Col>
									<FormGroup row className="form-group-img">
										<Label htmlFor="resume" sm={8}>Candidate Resume</Label>
										<Col sm={8}>
											<Input type="file" name="resume" onChange={this.handleOnChangeResume}
												id="resume" />

											{modalType === 'post' ? this.validator.message('resume', resumeFile, 'required', { className: 'text-danger my-2' }) : null}

											<div className="text-left mt-5">
											</div>
										</Col>
									</FormGroup>
								</Col> */}
								<Col>
									<FormGroup row className="form-group-img">
										<Label htmlFor="resume" sm={8}>Candidate Resume</Label>
										<Col sm={8}>
											<FileUploader
												multiple={false}
												handleChange={this.handleOnChangeResume}
												name="resume"
												types={fileTypes}
											/>
											{modalType === 'post' ? this.validator.message('resume', resumeFile, 'required', { className: 'text-danger my-2' }) : null}
										</Col>
									</FormGroup>
								</Col>


							</div>



							<Nav tabs>
								<NavItem>
									<NavLink
										className={classnames({ active: this.state.activeTab === '1' })}
										onClick={() => {
											this.toggle('1');
										}}
									>
										Personal Info
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: this.state.activeTab === '2' })}
										onClick={() => {
											this.toggle('2');
										}}
									>
										Address Info
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: this.state.activeTab === '3' })}
										onClick={() => {
											this.toggle('3');
										}}
									>
										Description
									</NavLink>
								</NavItem>
							</Nav>
							<div style={{ height: '30px' }}></div>
							<TabContent activeTab={this.state.activeTab}>
								<TabPane tabId="1">
									<Row>
										<Col sm="12">
											<Row form>
												<Col sm={12}>
													<FormGroup>
														<Input
															onChange={this.handleOnChange}
															name="designation"
															type="text"
															value={designation}
															placeholder="Position"
														/>
														{this.validator.message('designation', designation, 'required', { className: 'text-danger my-2' })}
													</FormGroup>
												</Col>
												{/* Salutation */}
												<Col md={12}>
													<FormGroup>
														<Input
															type="select"
															name="salutation"
															id="salutation"
															onChange={this.handleOnChange} value={salutation || ""}>
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
												{/* First Name */}
												<Col md={12}>
													<FormGroup >
														<Input placeholder="First Name *" type="text" name="firstName"
															id="firstName"
															onChange={this.handleOnChange} value={firstName} />
														{this.validator.message('first name', firstName, 'required', { className: 'text-danger my-2' })}
													</FormGroup>
												</Col>

												{/* Last Name */}
												<Col md={12}>
													<FormGroup>
														<Input placeholder="Last Name *" type="text" name="lastName"
															id="lastName" onChange={this.handleOnChange} value={lastName} />
														{this.validator.message('last name', lastName, 'required', { className: 'text-danger my-2' })}

													</FormGroup>
												</Col>

												{/* Nick Name */}
												<Col md={12}>
													<FormGroup>
														<Input placeholder="Nick Name" type="text" name="nickName"
															id="nickName"
															onChange={this.handleOnChange} value={nickName || ''} />
													</FormGroup>
												</Col>
												{/* Email */}
												<Col md={12}>
													<FormGroup>
														<Input placeholder="Email *" type="email" name="email" id="email"
															onChange={this.handleOnChange} value={email} />
														{this.validator.message('email', email, 'required', { className: 'text-danger my-2' })}

													</FormGroup>
												</Col>

												{/* Primary Phone */}
												<Col md={12}>
													<FormGroup>
														<PhoneInput
															className="phone-number-wrapper"
															placeholder="Enter primary phone *"
															defaultCountry="US"
															value={primaryPhone}
															onChange={(e) => this.onChangePhoneNumber(e, 'primary')}
														/>
														{this.validator.message('primary phone', primaryPhone, 'required', { className: 'text-danger my-2' })}

													</FormGroup>
												</Col>
												{/* Secondary Phone */}
												<Col md={12}>
													<FormGroup>
														<PhoneInput
															className="phone-number-wrapper"
															placeholder="Enter secondary phone"
															defaultCountry="US"
															value={secondaryPhone}
															onChange={(e) => this.onChangePhoneNumber(e, 'secondary')}
														/>
													</FormGroup>
												</Col>

											</Row>
											<div className="d-flex justify-content-between align-items-center">

												<Button className="btn-success" onClick={() => {
													this.toggle('2');
												}}>Next Step</Button>
											</div>
										</Col>
									</Row>
								</TabPane>
								<TabPane tabId="2">
									<Row form>

										<Col md={12}>
											<FormGroup>
												<Label htmlFor="Country">Country</Label>
												<Input disabled type="text" name="Country" id="Country" value="United States" />
											</FormGroup>
										</Col>

										<Col md={12}>
											<FormGroup>
												<Label >Type City</Label>
												<Search
													onChange={this.handleCityName}
													results={tempData}
													handleSelectedValue={this.handleSelectedCity}
													value={city}
													close={this.handleCloseAddrees}
													dropdown={searchDropdown}
													loading={searchLoading}
													placeholder="Search City"
												/>

											</FormGroup>
										</Col>

										<Col md={12}>
											<FormGroup>
												<Label htmlFor="state">State</Label>
												<Input type="text" name="state" id="state" value={address.state} onChange={this.handleOnChange2} />
											</FormGroup>
										</Col>

										<Col md={12}>
											<FormGroup>
												<Label htmlFor="zip">Zip Code</Label>
												<Input type="text" name="zip" id="zip" value={address.zip} onChange={this.handleOnChange2} />
											</FormGroup>
										</Col>

										<Col md={12}>
											<FormGroup>
												<Label htmlFor="street">Current Location</Label>
												<Input type="text" name="street" id="street" value={address.street} />
											</FormGroup>
										</Col>

									</Row>
									<div className="d-flex justify-content-between">
										<Button onClick={() => {
											this.toggle('1');
										}} className="btn-primary">Back</Button>
										<Button onClick={() => {
											this.toggle('3');
										}} className="btn-success">Next</Button>

									</div>

								</TabPane>
								<TabPane tabId="3">
									<Row form>
										{/* Select Recruter */}
										<Col md={12}>
											<FormGroup>
												<Label htmlFor="workAuthorization">Select Recruiter *</Label>

												<Search
													onChange={this.handleChangeSearch}
													results={searchResults}
													handleSelectedValue={this.handleSelectSearchValue}
													value={searchValue}
													close={this.handleSearchClose}
													dropdown={searchDropdown}
													loading={searchLoading}
												/>
												{this.validator.message('Select Recruter', selectedSearchValue.name, 'required', { className: 'text-danger my-2' })}

											</FormGroup>
										</Col>

										{/* Account Status */}
										<Col md={6}>
											<FormGroup>
												<Input type="select" name="accountStatus" id="accountStatus" onChange={this.handleOnChange} value={accountStatus}>
													<option value="">Select Account Status *</option>
													{refData.AccountStatus.length > 0 && refData.AccountStatus.map((ac, key) => {
														return <option value={ac}>{ac}</option>
													})}
												</Input>
												{this.validator.message('account status', accountStatus, 'required', { className: 'text-danger my-2' })}
											</FormGroup>
										</Col>

										{/* Work Authorizations */}
										<Col md={6}>
											<FormGroup>
												<Input type="select" name="workAuthorization" id="workAuthorization"
													onChange={this.handleOnChange} value={workAuthorization}>
													<option value="">Select Work Authorizations *</option>
													{refData.WorkAuthorization.map(e => <option value={e}
														key={e}> {e} </option>)}
												</Input>
												{this.validator.message('workAuthorization', workAuthorization, 'required', { className: 'text-danger my-2' })}
											</FormGroup>
										</Col>

										{/* Security Clearance */}
										<Col md={6}>
											<FormGroup>
												<Input type="select" name="clearance" id="clearance"
													onChange={this.handleOnChange} value={clearance}>
													<option value="">Security Clearance *</option>
													{refData.SecurityClearance.length > 0 && refData.SecurityClearance.map((ac, key) => {
														return <option value={ac}>{ac}</option>
													})}
												</Input>
												{this.validator.message('relationship status', clearance, 'required', { className: 'text-danger my-2' })}
											</FormGroup>
										</Col>

										{/* Recruitment Status */}
										<Col md={6}>
											<FormGroup>
												<Input type="select" name="recruitmentStatus" id="recruitmentStatus"
													onChange={this.handleOnChange} value={recruitmentStatus}>
													<option value="">Recruitment Status *</option>
													{refData.RecruitmentStatus.length > 0 && refData.RecruitmentStatus.map((ac, key) => {
														return <option value={ac}>{ac}</option>
													})}
												</Input>
												{this.validator.message('relationship status', recruitmentStatus, 'required', { className: 'text-danger my-2' })}
											</FormGroup>
										</Col>

										<Col md={12}>
											<FormGroup>
												<Input type="select" name="selectedPlatform" id="recruitmentStatus"
													onChange={this.handleOnChange} value={this.state.selectedPlatform}>
													<option value="">Select Source *</option>
													{platform.length > 0 && platform.map((p, key) => {
														return <option value={p}>{p}</option>
													})}
												</Input>
												{this.validator.message('selectedPlatform', selectedPlatform, 'required', { className: 'text-danger my-2' })}
											</FormGroup>
										</Col>

										<Col md={12}>
											<FormGroup>
												{/* <Label htmlFor="yearsOfExperience">Years of Experience</Label> */}
												<Input type="number" name="yearsOfExperience" id="yearsOfExperience"
													placeholder='Years of experience'
													onChange={this.handleOnChange}
													value={yearsOfExperience} min={0} max={10}


												/>
												{this.validator.message('yearsOfExperience', yearsOfExperience, 'required', { className: 'text-danger my-2' })}
											</FormGroup>
										</Col>



										<Col sm={12}>
											<FormGroup row>
												<Label htmlFor="keywords" sm={2}>Skills *</Label>
												<Col sm={10}>
													{/* <Tags ref={this.myRef} getTags={this.handleTagAdd} /> */}
													<Skills
														skills={skills}
														handleSkill={this.handleSkill}
													/>
													{this.validator.message('Skills', skillFirst && skillFirst.skill.id, 'required', { className: 'text-danger' })}


												</Col>
											</FormGroup>
										</Col>

									</Row>

									<div className="d-flex justify-content-between" style={{ padding: '0 5px' }}>
										<Button className="btn-primary" onClick={() => {
											this.toggle('2');
										}}>Back</Button>
										<Button onClick={this.handleCandidateSubmit} className="btn-success">
											{modalType === 'post' ? 'Candidate Submit' : 'Candidate Update'}
										</Button>

									</div>

									<div className="d-flex justify-content-between align-items-center">
										<span
											className="text-danger text-capitalize">{failure ? failure + "," : ''}</span>

									</div>

								</TabPane>
							</TabContent>

						</ModalBody>

					</Modal>
					{detailsIn == true &&
						<CandidateDetails
							singleCandidate={singleCandidate}
							detailsIn={detailsIn}
							detailsClose={this.detailsOut}
							resumeIn={this.resumeIn}
							jobList={jobList}
						/>
					}


					<Resume
						singleCandidate={this.state.singleCandidate}
						resumeIn={resumeIn}
						resumeClose={this.resumeOut}
					/>

				</div>
			</>
		)
	}
}


export default Contacts;
