export const getRequest = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
    });
    return response;
}

export const postRequest = async (url, data) => {
	const headers = new Headers({
		'Content-Type': 'application/json',
	});
	const response = await fetch(url, {
		body: JSON.stringify(data),
		method: 'POST',
		headers
	});
	return response;
}
