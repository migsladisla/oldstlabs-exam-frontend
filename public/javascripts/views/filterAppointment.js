var filterStartDate = $("#filter-start-date");
var filterEndDate = $("#filter-end-date");
var filterDateErrorAlert = $('#filter-date-alert');
var filterAppointmentButton = $("#filter-appointment-btn");

filterAppointmentButton.click(() => {
    if (isEmpty(filterStartDate.val()) || isEmpty(filterEndDate.val())) {
        filterDateErrorAlert.removeClass("hidden");
    } else {
        window.location.href = `http://localhost:8000/profile/appointments?start=${filterStartDate.val()}&end=${filterEndDate.val()}`;
    }
});
