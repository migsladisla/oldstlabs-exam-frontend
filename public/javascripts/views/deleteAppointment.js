const deleteAppointment = (id) => {
	Swal.fire({
		title: "Are you sure?",
		text: "You won't be able to revert this!",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes, delete it!",
	}).then((result) => {
		if (result.isConfirmed) {
			axios
				.post(`http://localhost:8000/delete_appointment/${id}`)
				.then((res) => {
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Appointment has been deleted',
						showConfirmButton: false,
						timer: 1500
					}).then((result) => {
						window.location.href = "http://localhost:8000/profile";
					});
				})
				.catch((err) => console.error(err));
		}
	});
};
