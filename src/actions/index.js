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
