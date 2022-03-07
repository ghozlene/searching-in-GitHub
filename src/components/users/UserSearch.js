import React from 'react';
import { useState, useContext } from 'react';
import GitContext from '../../context/github/GitContext';
import AlertContext from '../../context/alert/AlertContext';
import { searchUsers } from '../../context/github/GitAction';

const UserSearch = () => {
	const [text, setText] = useState('');
	const { users, dispatch } = useContext(GitContext);
	const { setAlert } = useContext(AlertContext);

	const textHandler = (e) => {
		setText(e.target.value);
	};
	const sumbitHandler = async (e) => {
		e.preventDefault();
		if (text === '') {
			setAlert('Enter something for searching', 'error');
		} else {
			dispatch({ type: 'SET_LOADING' });
			const users = await searchUsers(text);
			dispatch({ type: 'GET_USERS', payload: users });
			setText('');
		}
	};
	const ClearHandler = () => {
		dispatch({ type: 'CLEAR_USERS' });
	};
	return (
		<div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
			<div>
				<form onSubmit={sumbitHandler}>
					<div className='form-control'>
						<div className='relative'>
							<input
								type='text'
								placeholder='Search here'
								className='w-full pr-40 input input-lg input-bordered input-primary'
								value={text}
								onChange={textHandler}
							/>
							<button
								type='submit'
								className='absolute top-0 right-0 rounded-l-none w-20 btn btn-outline btn-success btn-lg'>
								Go
							</button>
						</div>
					</div>
				</form>
			</div>

			{users.length > 0 && (
				<div>
					<button
						className='btn btn-outline btn-warning btn-lg'
						onClick={ClearHandler}>
						Clear
					</button>
				</div>
			)}
		</div>
	);
};

export default UserSearch;
