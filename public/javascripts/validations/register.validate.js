const validateRegister = (data) => {
    let errors = {};

	data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
	data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
	data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    
    if (validator.isEmpty(data.first_name)) {
		errors.first_name = "First name field is required";
    }

    if (validator.isEmpty(data.last_name)) {
		errors.last_name = "Last name field is required";
    }

	if (!validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}

	if (validator.isEmpty(data.email)) {
		errors.email = "Email field is required";
	}

    if (!validator.isLength(data.password, { min: 6 })) {
        errors.password = "Password must be 6 characters long";
    }
    
	if (validator.isEmpty(data.password)) {
		errors.password = "Password field is required";
    }

	return {
		errors,
		isValid: isEmpty(errors),
	};
};