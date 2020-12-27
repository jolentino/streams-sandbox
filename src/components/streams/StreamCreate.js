import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {
	// <Field /> passes 'renderInput' props to configure <input> element.
	renderInput = ({ input, meta, label }) => {
		// Destructured 'input' properties to be passed as props for <input> element.
		return (
			<div className="field">
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	// Conditional rendering of error.
	renderError({ touched, error }) {
		if (touched && error) {
			return <div className="ui negative message">{error}</div>;
		}
		return null;
	}

	onFormSubmit = (formValues) => {
		this.props.createStream(formValues);
	};

	render() {
		return (
			<form className="ui form" onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
				<Field name="title" component={this.renderInput} label="Enter Title" />
				<Field name="description" component={this.renderInput} label="Enter Desription" />
				<button className="ui primary button">Submit</button>
			</form>
		);
	}
}

const validate = (formValues) => {
	const errors = {};

	if (!formValues.title) {
		errors.title = 'Please enter a title.';
	}
	if (!formValues.description) {
		errors.description = 'Please enter a description.';
	}

	return errors;
};

// 'formWrapped' references our redux-form'ed StreamCreate component.
const formWrapped = reduxForm({
	form: 'streamCreate',
	validate,
})(StreamCreate);

// We pass 'formWrapped' to our connect function to combine redux-form and redux.
export default connect(null, { createStream })(formWrapped);
