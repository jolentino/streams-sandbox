import streams from '../api/streams';

export const signIn = (userId) => {
	return {
		type: 'SIGNED_IN',
		payload: userId,
	};
};

export const signOut = () => {
	return {
		type: 'SIGNED_OUT',
	};
};

export const createStream = (formValues) => {
	return async (dispatch) => {
		// Make a POST request to our endpoint with our values.
		const { data } = await streams.post('/streams', formValues);

		dispatch({ type: 'CREATE_STREAM', payload: data });
	};
};
