import React from 'react';
import { connect } from 'react-redux';

import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
	// Callback function passed to StreamForm
	// Invokes StreamCreate's action creator when form is submitted.
	onFormSubmit = (formValues) => {
		this.props.createStream(formValues);
	};

	render() {
		return (
			<div>
				<h3>Create a Stream</h3>
				<StreamForm onFormSubmit={this.onFormSubmit} />
			</div>
		);
	}
}

export default connect(null, { createStream })(StreamCreate);
