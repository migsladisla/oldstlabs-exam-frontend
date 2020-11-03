var createAppointmentForm = $("#book-appointment-form");
var startDateInput = $("#start-date");
var startTimeInput = $("#start-time");
var endDateInput = $("#end-date");
var endTimeInput = $("#end-time");
var commentInput = $("#grid-comment");
var bookAppointmentErrorsParent = $("#book-appointment-alert");
var bookAppointmentErrors = $("#book-appointment-errors");
var createAppointmentButton = $("#book-appointment-btn");

createAppointmentButton.click(() => {
	var start_date = startDateInput.val();
	var start_time = startTimeInput.val();
	var end_date = endDateInput.val();
	var end_time = endTimeInput.val();
	var comments = commentInput.val();
	const { errors, isValid } = validateCreateAppointment({
		start_date,
		start_time,
		end_date,
		end_time,
		comments,
	});

	if (!isValid) {
		generateErrorElements(
			errors,
			bookAppointmentErrors,
			bookAppointmentErrorsParent
		);
	} else {
		hideErrorMessages(bookAppointmentErrorsParent);

		const date = [start_date, end_date];
		const hours = [start_time, end_time];

		axios
			.post("http://localhost:8000/create_appointment", {
				date,
				hours,
				comments,
			})
			.then((result) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your appointment has been created',
                    showConfirmButton: false,
                    timer: 1500
                }).then((result) => {
                    window.location.href = "http://localhost:8000/profile";
                });
			})
			.catch((err) => {
				console.error(err.response);
				let serverErrors = {};

				if (err.response.status === 429) {
					Swal.fire({
						icon: 'info',
						title: 'Oops...',
						text: `We're sorry. You are limited to only 5 bookings per day. Please try again next time.`,
					}).then((result) => {
						window.location.href = "http://localhost:8000/profile";
					});
				} else {
					if (err.response.data.errors) {
						err.response.data.errors.forEach((error) => {
							serverErrors[error.param] = error.msg;
						});
					}
	
					generateErrorElements(
						serverErrors,
						bookAppointmentErrors,
						bookAppointmentErrorsParent
					);
				}
			});
	}
});
