import streams from '../api/streams';
import history from '../history';

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
	return async (dispatch, getState) => {
		const { userId } = getState().auth;
		const { data } = await streams.post('/streams', { ...formValues, userId });

		dispatch({ type: 'CREATE_STREAM', payload: data });

		// Programmatically navigates user back to root route.
		history.push('/');
	};
};

export const fetchStreams = () => {
	return async (dispatch) => {
		const { data } = await streams.get('/streams');

		dispatch({ type: 'FETCH_STREAMS', payload: data });
	};
};

export const fetchStream = (id) => {
	return async (dispatch) => {
		const { data } = await streams.get(`/streams/${id}`);

		dispatch({ type: 'FETCH_STREAM', payload: data });
	};
};

export const editStream = (id, formValues) => {
	return async (dispatch) => {
		const { data } = await streams.put(`/streams/${id}`, formValues);

		dispatch({ type: 'EDIT_STREAM', payload: data });
	};
};

export const deleteStream = (id) => {
	return async (dispatch) => {
		await streams.delete(`/streams/${id}`);

		dispatch({ type: 'DELETE_STREAM', payload: id });
	};
};
