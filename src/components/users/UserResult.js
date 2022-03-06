import React, { useContext } from 'react';
import { FireworkSpinner } from '../layout/assets/FireworkSpinner';
import UserItem from './UserItem';
import GitContext from '../../context/github/GitContext';
const UserResult = () => {
	const { users, loading } = useContext(GitContext);

	if (!loading) {
		return (
			<div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
				{users.map((user) => (
					<UserItem key={user.id} user={user} />
				))}
			</div>
		);
	} else {
		return (
			<center>
				<FireworkSpinner />
			</center>
		);
	}
};

export default UserResult;
