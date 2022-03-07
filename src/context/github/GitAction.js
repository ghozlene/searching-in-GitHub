const GITHUB_URL = process.env.REACT_APP_GIT_URL;
const GITHUB_TOKEN = process.env.REACT_APP_gitToken;

//Get Search Results
export const searchUsers = async (text) => {
	const params = new URLSearchParams({
		q: text,
	});
	const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
		headers: {
			Authorization: `token ${GITHUB_TOKEN}`,
		},
	});

	const { items } = await res.json();
	return items;
};
