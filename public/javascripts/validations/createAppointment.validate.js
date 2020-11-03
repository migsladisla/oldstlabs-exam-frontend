const validateCreateAppointment = (data) => {
	let errors = {};

	data.start_date = !isEmpty(data.start_date) ? data.start_date : "";
	data.start_time = !isEmpty(data.start_time) ? data.start_time : "";
	data.end_date = !isEmpty(data.end_date) ? data.end_date : "";
	data.end_time = !isEmpty(data.end_time) ? data.end_time : "";
	data.comments = !isEmpty(data.comments) ? data.comments : "";

	if (validator.isAfter(data.start_date)) {
		errors.start_date = "Start date is invalid";
	}

	if (validator.isAfter(data.end_date)) {
		errors.end_date = "End date is invalid";
	}

	if (
		!validator.isBefore(
			data.start_date + " " + data.start_time,
			data.end_date + " " + data.end_time
		)
	) {
		errors.start_date = "Start date must not be ahead of End date";
	}

	if (validator.isEmpty(data.start_time)) {
		errors.start_time = "Start time field is required. Please select a time";
	}

	if (validator.isEmpty(data.end_time)) {
		errors.end_time = "End time field is required. Please select a time";
	}

	if (validator.isEmpty(data.start_date)) {
		errors.start_date = "Start date field is required. Please select a date";
	}

	if (validator.isEmpty(data.end_date)) {
		errors.end_date = "End date field is required. Please select a date";
	}

	if (validator.isEmpty(data.comments)) {
		errors.comments = "Comment field is required";
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};