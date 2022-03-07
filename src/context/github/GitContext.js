import { createContext, useReducer } from 'react';
import GitReducer from './GitReducer';

const GitContext = createContext();

export const GitProvider = ({ children }) => {
	const intialState = {
		users: [],
		user: {},
		loading: false,
		repos: [],
	};
	const [state, dispatch] = useReducer(GitReducer, intialState);

	return (
		<GitContext.Provider
			value={{
				...state,
				dispatch,
			}}>
			{children}
		</GitContext.Provider>
	);
};

export default GitContext;
