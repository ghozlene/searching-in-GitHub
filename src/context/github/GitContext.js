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
		repos: [],
	};
	const [state, dispatch] = useReducer(GitReducer, intialState);

	//Get One User
	const searchOneUser = async (login) => {
		setLoading();

		const res = await fetch(`${GITHUB_URL}/users/${login}`, {
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
	// Get user repos
	const getUserRepos = async (login) => {
		setLoading();

		const params = new URLSearchParams({
			sort: 'created',
			per_page: 10,
		});

		const response = await fetch(
			`${GITHUB_URL}/users/${login}/repos?${params}`,
			{
				headers: {
					Authorization: `token ${GITHUB_TOKEN}`,
				},
			}
		);

		const data = await response.json();

		dispatch({
			type: 'GET_REPOS',
			payload: data,
		});
	};
	return (
		<GitContext.Provider
			value={{
				...state,
				dispatch,
				clearUsers,
				searchOneUser,
				getUserRepos,
			}}>
			{children}
		</GitContext.Provider>
	);
};

export default GitContext;
