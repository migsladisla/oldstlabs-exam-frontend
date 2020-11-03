var loginForm = $('#login-form');
var emailInput = $("#email");
var passwordInput = $("#password");
var loginErrorsParentDiv = $("#login-error-alert");
var loginErrorsDiv = $("#login-errors");
var signinButton = $("#sign-in-btn");

signinButton.click(() => {
    var email = emailInput.val();
    var password = passwordInput.val();
    const { errors, isValid } = validateLogin({ email, password });

    if (!isValid) {
		generateErrorElements(errors, loginErrorsDiv, loginErrorsParentDiv);
    } else {
		hideErrorMessages(loginErrorsParentDiv);
		
		axios
		.post('http://localhost:8000/login', { email, password })
		.then(result => {
			window.location.href = "http://localhost:8000/profile";
		})
		.catch(err => {
			console.error(err.response);
			if (err.response.data) {
				generateErrorElements({ password: err.response.data.message }, loginErrorsDiv, loginErrorsParentDiv);
			}
		});
    }
});
