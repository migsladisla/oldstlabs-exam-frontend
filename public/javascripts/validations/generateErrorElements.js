const generateErrorElements = (errors, errorDiv, errorAlert) => {
    let errorMsg = "";

    Object.keys(errors).forEach((error, idx) => {
        errorMsg += `<p id="login-error-${idx}">${idx + 1}. ${errors[error]}</p>`;
    });

    errorDiv.html(errorMsg);
    errorAlert.removeClass("hidden");
}

const hideErrorMessages = errorDiv => {
    errorDiv.addClass("hidden");
}