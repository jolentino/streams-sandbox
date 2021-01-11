import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
	componentDidMount() {
		this.props.fetchStreams();
	}

	// Helper method to check if the user logged in created the stream.
	// Refactored to provide stream id for edit and delete functionality.
	renderAdmin = (userId, id) => {
		if (userId === this.props.currentUserId) {
			return (
				<div className="right floated content">
					<Link to={`/streams/edit/${id}`} className="ui button primary">
						Edit
					</Link>
					<Link to={`/streams/delete/${id}`} className="ui button negative">
						Delete
					</Link>
				</div>
			);
		}
	};

	// Helper method to create a new stream if user is logged in.
	renderCreate = () => {
		if (this.props.isSignedIn) {
			return (
				<div style={{ textAlign: 'right' }}>
					<Link to="/streams/new" className="ui button primary">
						Create Stream
					</Link>
				</div>
			);
		}
	};

	renderStreams = () => {
		if (this.props.streams.length > 0) {
			return this.props.streams.map(({ id, title, description, userId }) => {
				return (
					<Link to={`/streams/show/${id}`} key={id} className="item">
						{this.renderAdmin(userId, id)}
						<i className="large middle aligned icon camera" />
						<div className="content">
							{title}
							<div className="description">{description}</div>
						</div>
					</Link>
				);
			});
		}
		return null;
	};

	render() {
		return (
			<div>
				<h2>Streams</h2>
				<div className="ui celled list">{this.renderStreams()}</div>
				{this.renderCreate()}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	// 'Object.values' creates an array of our streams.
	return {
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn,
	};
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
