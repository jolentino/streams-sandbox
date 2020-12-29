import React from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	renderContent() {
		if (!this.props.stream) {
			return 'Are you sure you want to delete this stream?';
		}
		return `Are you sure you want to delete "${this.props.stream.title}"?`;
	}

	// Helper methods.
	onActionClick = () => {
		this.props.deleteStream(this.props.match.params.id);
	};
	onReturnClick = () => {
		history.push('/');
	};

	actionButton = (
		<button onClick={this.onActionClick} className="ui button negative">
			Delete
		</button>
	);

	render() {
		return (
			<Modal
				config={{
					headerText: 'Delete Stream',
					contentText: this.renderContent(),
					actionButton: this.actionButton,
					onReturnClick: this.onReturnClick,
				}}
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
