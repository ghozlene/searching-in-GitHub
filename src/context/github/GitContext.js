import { createContext, useReducer } from 'react';
import GitReducer from './GitReducer';

const GitContext = createContext();
const GITHUB_URL = process.env.REACT_APP_GIT_URL;
const GITHUB_TOKEN = process.env.REACT_APP_gitToken;

export const GitProvider = ({ children }) => {
	const intialState = {
		users: [],
		user: {},
		loading: false,
	};
	const [state, dispatch] = useReducer(GitReducer, intialState);
	//Get Search Results
	const searchUsers = async (text) => {
		setLoading();
		const params = new URLSearchParams({
			q: text,
		});
		const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
			},
		});

		const { items } = await res.json();
		dispatch({
			type: 'GET_USERS',
			payload: items,
		});
	};

	//Get One User
	const searchOneUser = async (login) => {
		setLoading();

		const res = await fetch(`${GITHUB_URL}/search/users/${login}`, {
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
			},
		});

		if (res.status === 404) {
			window.location = '/notfound';
		} else {
			const data = await res.json();
			dispatch({
				type: 'GET_USER',
				payload: data,
			});
		}
	};

	//set loading:
	const setLoading = () => {
		dispatch({ type: 'SET_LOADING' });
	};
	const clearUsers = () => {
		setLoading();
		dispatch({
			type: 'CLEAR_USERS',
		});
	};
	return (
		<GitContext.Provider
			value={{
				users: state.users,
				loading: state.loading,
				user: state.user,
				searchUsers,
				clearUsers,
				searchOneUser,
			}}>
			{children}
		</GitContext.Provider>
	);
};

export default GitContext;
