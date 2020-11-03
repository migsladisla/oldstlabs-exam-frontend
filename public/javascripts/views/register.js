var registerForm = $('#register-form');
var firstNameInput = $("#grid-first-name");
var lastNameInput = $("#grid-last-name");
var emailInput = $('#grid-email');
var passwordInput = $('#grid-password');
var registerErrorsParentDiv = $("#register-error-alert");
var registerErrorsDiv = $("#register-errors");
var signupButton = $("#sign-up-btn");

signupButton.click(() => {
    var first_name = firstNameInput.val();
    var last_name = lastNameInput.val();
    var email = emailInput.val();
    var password = passwordInput.val();
    const { errors, isValid } = validateRegister({ first_name, last_name, email, password });

    if (!isValid) {
		generateErrorElements(errors, registerErrorsDiv, registerErrorsParentDiv);
    } else {
		hideErrorMessages(registerErrorsParentDiv);
		
		axios
		.post('http://localhost:8000/register', { first_name, last_name, email, password })
		.then(result => {
			window.location.href = "http://localhost:8000/profile";
		})
		.catch(err => {
			console.error(err.response);
			if (err.response.data.errors) {
				err.response.data.errors.forEach(error => {
					serverErrors[error.param] = error.value;
				});
			}

			generateErrorElements({ password: err.response.data.message }, registerErrorsDiv, registerErrorsParentDiv);
		});
    }
});