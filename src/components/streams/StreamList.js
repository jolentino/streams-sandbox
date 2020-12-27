import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
	componentDidMount() {
		this.props.fetchStreams();
	}

	renderStreams = () => {
		if (this.props.streams.length > 0) {
			return this.props.streams.map(({ id, title, description }) => {
				return (
					<div key={id} className="item">
						<i className="large middle aligned icon camera" />
						<div className="content">
							{title}
							<div className="description">{description}</div>
						</div>
					</div>
				);
			});
		}
	};

	render() {
		return (
			<div>
				<h2>Streams</h2>
				<div className="ui celled list">{this.renderStreams()}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	// 'Object.values' creates an array of our streams.
	return { streams: Object.values(state.streams) };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
