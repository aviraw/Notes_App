import React, { Component } from "react";
import {
	Row,
	FormGroup,
	FormControl,
	FormLabel,
	Button,
} from "react-bootstrap";

import { isEmail, isEmpty, isLength, isContainWhiteSpace } from "./validator";
import "./login.css";
class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {}, // Contains login form data
			errors: {}, // Contains login field errors
			formSubmitted: false, // Indicates submit status of login form
			loading: false, // Indicates in progress state of login form
		};
	}

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		let { formData } = this.state;
		formData[name] = value;

		this.setState({
			formData: formData,
		});
	};

	validateLoginForm = (e) => {
		let errors = {};
		const { formData } = this.state;

		if (isEmpty(formData.email)) {
			errors.email = "Email can't be blank";
		} else if (!isEmail(formData.email)) {
			errors.email = "Please enter a valid email";
		}

		if (isEmpty(formData.password)) {
			errors.password = "Password can't be blank";
		} else if (isContainWhiteSpace(formData.password)) {
			errors.password = "Password should not contain white spaces";
		} else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
			errors.password = "Password's length must between 6 to 16";
		}

		if (isEmpty(errors)) {
			return true;
		} else {
			return errors;
		}
	};

	login = (e) => {
		e.preventDefault();

		let errors = this.validateLoginForm();

		if (errors === true) {
			alert("You are successfully signed in...");
			window.location.reload();
		} else {
			this.setState({
				errors: errors,
				formSubmitted: true,
			});
		}
	};

	render() {
		const { errors, formSubmitted } = this.state;

		return (
			<div className="Login-container">
				<Button type="submit" bsStyle="primary">
					Sign-In
				</Button>
				<Button type="submit" bsStyle="primary">
					Sign-Up
				</Button>
				<Row>
					<form onSubmit={this.login}>
						<FormGroup
							controlId="email"
							validationState={
								formSubmitted ? (errors.email ? "error" : "success") : null
							}
						>
							<FormLabel>Email</FormLabel>
							<FormControl
								type="text"
								name="email"
								placeholder="Enter your email"
								onChange={this.handleInputChange}
							/>
							{errors.email && (
								<span className="text-danger">{errors.email}</span>
							)}
							{/* {errors.email && <HelpBlock>{errors.email}</HelpBlock>} */}
						</FormGroup>
						<FormGroup
							controlId="password"
							validationState={
								formSubmitted ? (errors.password ? "error" : "success") : null
							}
						>
							<FormLabel>Password</FormLabel>
							<FormControl
								type="password"
								name="password"
								placeholder="Enter your password"
								onChange={this.handleInputChange}
							/>
							{errors.password && (
								<span className="text-danger">{errors.password}</span>
							)}
							{/* {errors.password && <HelpBlock>{errors.password}</HelpBlock>} */}
						</FormGroup>
						<Button type="submit" bsStyle="primary">
							Log In
						</Button>
						<Button type="submit" bsStyle="primary">
							Get Started
						</Button>
					</form>
				</Row>
			</div>
		);
	}
}

export default Login;
