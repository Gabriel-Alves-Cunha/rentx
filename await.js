export async function awaitResOrErr(promise, message) {
	try {
		const data = await promise;
		return [data, null];
	} catch (error) {
		console.error(message, error);
		return [null, error];
	}
}

// usage:
// const [data, error] = await awesome(myPromise);
