var startDateInput = $("#edit-start-date");
var startTimeInput = $("#edit-start-time");
var endDateInput = $("#edit-end-date");
var endTimeInput = $("#edit-end-time");
var commentInput = $("#edit-grid-comment");
var appointmentId = $("#edit-appointment-id").val();
var bookAppointmentErrorsParent = $("#edit-book-appointment-alert");
var bookAppointmentErrors = $("#edit-book-appointment-errors");
var editAppoinmentBtn = $('#edit-appointment-btn');

editAppoinmentBtn.click(() => {
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
			.post(`http://localhost:8000/update_appointment/${appointmentId}`, {
				date,
				hours,
				comments,
			})
			.then((result) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your appointment has been updated',
                    showConfirmButton: false,
                    timer: 1500
                }).then((result) => {
                    window.location.href = "http://localhost:8000/profile";
                });
			})
			.catch((err) => {
				console.error(err.response);
				let serverErrors = {};

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
			});
	}
});