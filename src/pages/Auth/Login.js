import React, { Component } from "react";
import { connect } from "react-redux";
import SimpleReactValidator from 'simple-react-validator';

import { loginAction, emptyError } from '../../actions/user-actions'

// Import Custom
import Logo from "../../assets/img/logo.svg";
import {userFromLocalStorage} from "../../axious-config";

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			error: ''
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.validator = new SimpleReactValidator({ autoForceUpdate: this });
	}

	componentDidMount() {
	    let userData = userFromLocalStorage();
		if (Object.keys(userData).length > 0 && userData.token) {
			this.props.history.push('/dashboard')
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.auth.loginFailure !== prevState.error) {
			return { error: nextProps.auth.failureMessage };
		} else {
			return null
		}
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
		if (this.state.error !== "") {
			this.props.emptyError()
		}
	}

	onSubmit = (e) => {
		e.preventDefault();
		const data = {
			email: this.state.email,
			password: this.state.password
		}
		if (this.validator.allValid()) {
			// Call Login Action And send the data
			this.props.loginAction(data, this.props.history)
		} else {
			this.validator.showMessages();
		}
	}

	render() {
		return (
			<div className="login-wrapper">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-6">
							<div className="card p-5">
								<header className="mb-5 text-center">
									<img src={Logo} alt="Logo" />
								</header>

								<form onSubmit={this.onSubmit}>
									<div className="form-group">
										<label htmlFor="exampleInputEmail1">Email address</label>
										<input type="email" name="email" className="form-control" onChange={this.onChange} />
										{this.validator.message('email', this.state.email, 'required', { className: 'text-danger my-2' })}
									</div>

									<div className="form-group">
										<label htmlFor="password">Password</label>
										<input type="password" name="password" className="form-control" onChange={this.onChange} />
										{this.validator.message('password', this.state.password, 'required', { className: 'text-danger my-2' })}
									</div>

									{(this.state.error !== '') ?
										<div className="text-danger mb-5">
											{this.state.error}
										</div> :
										''
									}
									<button type="submit" className="btn btn-primary">Submit</button>
								</form>

							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

}




const mapToStateProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapToStateProps, { loginAction, emptyError })(Login);
