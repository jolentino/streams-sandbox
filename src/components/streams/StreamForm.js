import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
	renderInput = ({ input, meta, label }) => {
		return (
			<div className="field">
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	renderError({ touched, error }) {
		if (touched && error) {
			return <div className="ui negative message">{error}</div>;
		}
		return null;
	}

	render() {
		return (
			<form className="ui form" onSubmit={this.props.handleSubmit(this.props.onFormSubmit)}>
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

export default reduxForm({
	form: 'streamForm',
	validate,
})(StreamForm);
