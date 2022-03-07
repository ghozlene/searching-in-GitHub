import axios from 'axios';

const GITHUB_URL = process.env.REACT_APP_GIT_URL;
const GITHUB_TOKEN = process.env.REACT_APP_gitToken;

const urlAxios = axios.create({
	baseURL: GITHUB_URL,
	headers: {
		Authorization: `token ${GITHUB_TOKEN}`,
	},
});
//Get Search Results
export const searchUsers = async (text) => {
	const params = new URLSearchParams({
		q: text,
	});
	const resp = await urlAxios.get(`/search/users?${params}`);
	return resp.data.items;
};
