export const isLoggedIn = () => {
	return localStorage.getItem('authToken') !== null;
};

export const setAuthToken = (token) => {
	localStorage.setItem('authToken', token);
};

export const getAuthToken = () => {
	return localStorage.getItem('authToken');
};
export const deleteAuthToken = () => {
	return localStorage.removeItem('authToken');
};
