import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId: '353981216852-ldtkta1mp38brtbqfbe1mgov102cjgmu.apps.googleusercontent.com',
					scope: 'email',
				})
				.then(() => {
					// Create OAuth object.
					this.auth = window.gapi.auth2.getAuthInstance();
					// Initializes initial state for 'store.'
					this.onAuthChanged(this.auth.isSignedIn.get());
					// Creates listener event for 'isSignedIn' when user signs in or out.
					this.auth.isSignedIn.listen(this.onAuthChanged);
				});
		});
	}

	// Invokes appropriate 'action creator' according to 'isSignedIn' status.
	onAuthChanged = (isSignedIn) => {
		isSignedIn ? this.props.signIn() : this.props.signOut();
	};

	renderAuthButton() {
		if (!this.auth) return null;
		if (this.props.isSignedIn) {
			return (
				<button onClick={this.auth.signOut} className="ui button">
					<i className="google icon" />
					Sign Out
				</button>
			);
		}
		return (
			<button onClick={this.auth.signIn} className="ui button">
				<i className="google icon" />
				Sign In
			</button>
		);
	}

	render() {
		return <div classname="item">{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
