export const populateOptions = (array) => {
	const options = [];
	array?.forEach((item) => {
		options.push({ value: item, label: item });
	});
	return options;
};
