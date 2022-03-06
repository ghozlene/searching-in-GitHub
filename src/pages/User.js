import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GitContext from '../context/github/GitContext';
const User = () => {
	const { searchOneUser, user } = useContext(GitContext);

	const params = useParams();
	useEffect(() => {
		searchOneUser(params.login);
	}, []);
	return <div>User</div>;
};

export default User;
