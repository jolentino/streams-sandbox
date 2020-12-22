import React from 'react';

class GoogleAuth extends React.Component {
	state = { isSignedIn: null };

	componentDidMount() {
		// 'gapi' is initialized during component render.
		// The first argument is a configuration to obtain OAuth Google services.
		// The second argument is a callback that gets invoked when config finishes.
		window.gapi.load('client:auth2', () => {
			// This callback initializes the OAuth library.
			window.gapi.client
				.init({
					clientId: '353981216852-ldtkta1mp38brtbqfbe1mgov102cjgmu.apps.googleusercontent.com',
					scope: 'email',
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.setState({ isSignedIn: this.auth.isSignedIn.get() });
					// Creates an event listener for 'isSignedIn' object.
					this.auth.isSignedIn.listen(this.onAuthChanged);
				});
		});
	}

	onAuthChanged = () => {
		// Callback is invoked when 'isSignedIn' changes i.e. when user signs in or out.
		// As a result, we update the state for conditional rendering of button.
		this.setState({ isSignedIn: this.auth.isSignedIn.get() });
	};

	renderAuthButton() {
		if (!this.auth) return null;

		if (this.state.isSignedIn) {
			return (
				<button onClick={this.auth.signOut} className="ui button">
					<i className="google icon" />
					Sign Out
				</button>
			);
		} else
			return (
				<button onClick={this.auth.signIn} className="ui button">
					<i className="google icon" />
					Sign In
				</button>
			);
	}

	render() {
		return this.renderAuthButton();
	}
}

export default GoogleAuth;
